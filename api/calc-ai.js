function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function stripImageFields(value) {
  if (Array.isArray(value)) return value.map(stripImageFields);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => ![
        "image",
        "imageUrl",
        "images",
        "imagePath",
        "imageSrc",
        "answer_image",
        "answerImage",
        "answer_images",
        "answerImages",
        "source_images",
        "sourceImages"
      ].includes(key))
      .map(([key, item]) => [key, stripImageFields(item)])
  );
}

function buildQaSystemPrompt() {
  return [
    "你是工程项目管理计算题答疑助手。",
    "你只回答当前计算题相关问题。",
    "你不能查看图片，也不要假装看到了图片。",
    "你只能根据题目文字、公式、标准答案、解题步骤、易错点回答。",
    "如果学生问的问题和当前计算题无关，请提醒他只支持本题答疑。",
    "如果学生问某一步为什么这样算，请解释公式、变量含义和使用条件。",
    "不要重新生成整道题完整答案，除非学生明确要求“重新讲一遍完整过程”。",
    "回答要简洁，适合手机阅读。"
  ].join("\n");
}

function buildQaUserPrompt(question, userQuestion) {
  return JSON.stringify({
    instruction: "请只回答学生提出的问题，不要默认输出完整解析。",
    userQuestion,
    question
  });
}

function aiConfig() {
  const apiKey = process.env.DASHSCOPE_API_KEY || process.env.DEEPSEEK_API_KEY;
  const apiUrl =
    process.env.BAILIAN_BASE_URL ||
    process.env.DEEPSEEK_API_URL ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const model =
    process.env.BAILIAN_MODEL ||
    process.env.DEEPSEEK_MODEL ||
    "deepseek-v3";
  return { apiKey, apiUrl: apiUrl.replace(/\/$/, ""), model };
}

function completionUrl(apiUrl) {
  return apiUrl.endsWith("/chat/completions") ? apiUrl : `${apiUrl}/chat/completions`;
}

async function callChatCompletion({ apiKey, apiUrl, model, messages }) {
  const response = await fetch(completionUrl(apiUrl), {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error?.message || `AI service request failed: ${response.status}`;
    throw new Error(message);
  }
  return payload.choices?.[0]?.message?.content || "";
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { ok: false, message: "Only POST requests are allowed." });
    return;
  }

  let body;
  try {
    body = JSON.parse(await readRequestBody(request) || "{}");
  } catch {
    sendJson(response, 400, { ok: false, message: "请求格式错误，请稍后重试。" });
    return;
  }

  if (body.mode !== "qa") {
    sendJson(response, 400, { ok: false, message: "当前接口只支持计算题答疑模式。" });
    return;
  }

  const questionId = String(body.questionId || "");
  const userQuestion = String(body.userQuestion || "").trim();
  const question = stripImageFields(body.question || {});

  if (!questionId || !userQuestion || !question.id) {
    sendJson(response, 400, { ok: false, message: "缺少题目或问题内容。" });
    return;
  }

  const { apiKey, apiUrl, model } = aiConfig();
  if (!apiKey) {
    sendJson(response, 500, {
      ok: false,
      message: "AI 服务还没有配置 API Key，请先在 Vercel 环境变量中配置 DASHSCOPE_API_KEY 或 DEEPSEEK_API_KEY。"
    });
    return;
  }

  try {
    const answer = await callChatCompletion({
      apiKey,
      apiUrl,
      model,
      messages: [
        { role: "system", content: buildQaSystemPrompt() },
        { role: "user", content: buildQaUserPrompt(question, userQuestion) }
      ]
    });
    sendJson(response, 200, {
      ok: true,
      mode: "qa",
      questionId,
      answer: answer || "AI 暂时没有返回内容，请换个问法再试。"
    });
  } catch (error) {
    sendJson(response, 502, {
      ok: false,
      message: "AI 服务暂时无法回答，请稍后重试。",
      detail: error.message
    });
  }
};
