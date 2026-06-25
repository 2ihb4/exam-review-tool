(function () {
  "use strict";

  const state = {
    selectedId: "",
    loading: false,
    error: "",
    messagesByQuestion: {},
  };

  const solutionIdeaByMethod = {
    "chain-substitution-cost-factor": "本题适合用连环替代法：先确定目标成本，再按因素顺序逐个替换，计算每个因素造成的成本差额。",
    "network-node-time-parameter": "本题适合用节点计算法：正推节点最早时间，逆推节点最迟时间，再判断计算工期和关键线路。",
    "aoa-network-drawing": "本题适合先整理紧前、紧后关系，再按工作逻辑从左到右绘制双代号网络图。"
  };

  function questions() {
    return Array.isArray(window.CALC_EXAMPLE_QUESTIONS) ? window.CALC_EXAMPLE_QUESTIONS : [];
  }

  function selectedQuestion() {
    const list = questions();
    return list.find((question) => question.id === state.selectedId) || list[0] || null;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stripImageFields(value) {
    if (Array.isArray(value)) return value.map(stripImageFields);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => ![
          "imageUrl",
          "image",
          "images",
          "imagePath",
          "imageSrc",
          "answer_image",
          "answer_images",
          "answerImage",
          "answerImages",
          "source_images",
          "sourceImages"
        ].includes(key))
        .map(([key, item]) => [key, stripImageFields(item)])
    );
  }

  function questionProblemText(question) {
    return question.problem_text || question.questionText || question.title || "";
  }

  function questionStandardSteps(question) {
    return question.standard_steps || question.standardSteps || (Array.isArray(question.standardAnswer) ? question.standardAnswer : []);
  }

  function questionStandardAnswer(question) {
    if (question.standard_answer) return question.standard_answer;
    if (typeof question.standardAnswer === "string") return question.standardAnswer;
    return question.correct_answer || "";
  }

  function questionCommonMistakes(question) {
    return question.common_mistakes || question.commonMistakes || [];
  }

  function questionSolutionIdea(question) {
    return question.solution_idea || solutionIdeaByMethod[question.methodId] || "先识别计算题类型，再按公式、步骤和核对结果的顺序完成作答。";
  }

  function trustedFormulaHtml(question) {
    if (!question.formulaHtml) return "";
    return escapeHTML(question.formulaHtml)
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
      .replace(/&lt;sub&gt;/gi, "<sub>")
      .replace(/&lt;\/sub&gt;/gi, "</sub>");
  }

  function renderFormula(question) {
    const formulaHtml = trustedFormulaHtml(question);
    if (formulaHtml) return formulaHtml;
    return escapeHTML(question.formula || "");
  }

  function requestPayload(question, userQuestion) {
    return {
      mode: "qa",
      questionId: question.id,
      userQuestion,
      question: stripImageFields({
        id: question.id,
        title: question.title,
        problem_text: questionProblemText(question),
        formula: question.formula || "",
        standard_steps: questionStandardSteps(question),
        standard_answer: questionStandardAnswer(question),
        solution_idea: questionSolutionIdea(question),
        common_mistakes: questionCommonMistakes(question),
        calculation_type: question.calculation_type || "",
        tags: question.tags || [],
        relations: question.relations || [],
        works: question.works || question.realWorks || [],
        virtual_works: question.virtual_works || question.dummyWorks || [],
        known_conditions: question.known_conditions || []
      })
    };
  }

  function renderList(question) {
    return questions().map((item, index) => `
      <button class="calc-ai-question ${item.id === question?.id ? "calc-ai-question-active" : ""}" type="button" data-calc-question-id="${escapeHTML(item.id)}">
        <span>${index + 1}</span>
        <strong>${escapeHTML(item.title)}</strong>
      </button>
    `).join("");
  }

  function renderArray(items, ordered = false) {
    if (!Array.isArray(items)) return items ? `<p>${escapeHTML(items)}</p>` : `<p>暂无内容</p>`;
    if (!items.length) return `<p>暂无内容</p>`;
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</${tag}>`;
  }

  function renderStandardAnswer(question) {
    const steps = questionStandardSteps(question);
    const standardAnswer = questionStandardAnswer(question);
    if (Array.isArray(steps) && steps.length) {
      return renderArray(steps, true);
    }
    return `<p>${escapeHTML(standardAnswer || "暂无标准答案")}</p>`;
  }

  function uniqueImageList(...groups) {
    const result = [];
    groups.flat().filter(Boolean).forEach((src) => {
      if (!result.includes(src)) result.push(src);
    });
    return result;
  }

  function sourceImageList(question) {
    const sourceImages = question.source_images || question.sourceImages || [];
    if (Array.isArray(sourceImages) && sourceImages.length) return uniqueImageList(sourceImages);
    return uniqueImageList(
      question.imageUrl,
      question.image,
      question.images,
      question.answer_image,
      question.answer_images,
      question.answerImage,
      question.answerImages
    );
  }

  function renderSourceImageGroup(urls, alt) {
    if (!Array.isArray(urls) || !urls.length) return "";
    return `
      <section class="calc-source-image-section">
        <h4>题目与答案原图</h4>
        <div class="calc-source-image-grid">
          ${urls.map((url, index) => `
            <figure class="calc-source-image-card">
              <a href="${escapeHTML(url)}" target="_blank" rel="noopener">
                <img src="${escapeHTML(url)}" alt="${escapeHTML(`${alt}${urls.length > 1 ? ` ${index + 1}` : ""}`)}" loading="lazy" />
              </a>
              <figcaption class="calc-source-image-note">原图仅供学生查看，AI 不读取图片，也不识别图片内容。</figcaption>
            </figure>
          `).join("")}
        </div>
      </section>
    `;
  }

  function messages(questionId) {
    state.messagesByQuestion[questionId] ||= [];
    return state.messagesByQuestion[questionId];
  }

  function renderMessages(questionId) {
    const list = messages(questionId);
    if (!list.length) {
      return `<div class="calc-ai-chat-empty">看完答案后，如果某一步不理解，可以问 AI。</div>`;
    }
    return list.map((message) => `
      <div class="calc-ai-message ${message.role}">
        <span>${escapeHTML(message.content)}</span>
      </div>
    `).join("");
  }

  function appendCalcAiMessage(role, content) {
    const question = selectedQuestion();
    if (!question) return;
    messages(question.id).push({ role, content });
    render();
    const box = document.querySelector("[data-calc-ai-messages]");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function renderDetail(question) {
    if (!question) {
      return `<div class="calc-ai-empty"><strong>暂无计算题数据</strong></div>`;
    }
    const sourceImages = sourceImageList(question);

    return `
      <article class="calc-ai-detail">
        <div class="calc-ai-detail-head">
          <p class="calc-ai-eyebrow">计算题讲解</p>
          <h3>${escapeHTML(question.title)}</h3>
        </div>
        <section class="calc-ai-result-section">
          <h4>题目</h4>
          <p class="calc-ai-question-text">${escapeHTML(questionProblemText(question))}</p>
        </section>
        ${question.formula || question.formulaHtml ? `
          <section class="calc-ai-result-section">
            <h4>公式</h4>
            <p class="calc-ai-formula">${renderFormula(question)}</p>
          </section>
        ` : ""}
        ${renderSourceImageGroup(sourceImages, `${question.title} 题目与答案原图`)}
        <section class="calc-standard-answer">
          <h4>标准答案 / 解题步骤</h4>
          ${renderStandardAnswer(question)}
        </section>
        <section class="calc-solution-idea">
          <h4>解题思路</h4>
          <p>${escapeHTML(questionSolutionIdea(question))}</p>
        </section>
        <section class="calc-common-mistakes">
          <h4>易错点</h4>
          ${renderArray(questionCommonMistakes(question))}
        </section>
        <section class="calc-ai-chat" aria-label="AI 答疑">
          <div>
            <h4>AI 答疑</h4>
            <p>看完答案后，如果某一步不理解，可以问 AI。</p>
          </div>
          <div class="calc-ai-chat-messages" data-calc-ai-messages>
            ${renderMessages(question.id)}
          </div>
          <textarea class="calc-ai-input" data-calc-ai-input placeholder="例如：为什么损耗率 4% 要写成 1.04？"></textarea>
          <button class="calc-ai-primary" type="button" data-action="calc-ai-ask" data-id="${escapeHTML(question.id)}" ${state.loading ? "disabled" : ""}>
            ${state.loading ? "思考中..." : "发送问题"}
          </button>
          ${state.error ? `<div class="calc-ai-error">${escapeHTML(state.error)}</div>` : ""}
        </section>
      </article>
    `;
  }

  function render() {
    const root = document.querySelector("[data-calc-ai-root]");
    if (!root) return;
    const question = selectedQuestion();
    if (question && !state.selectedId) state.selectedId = question.id;
    root.innerHTML = `
      <section class="calc-ai-module" aria-label="AI 计算题讲解助手">
        <div class="calc-ai-header">
          <div>
            <p class="calc-ai-eyebrow">Calculation Assistant</p>
            <h2>AI 计算题讲解助手</h2>
            <p>先看标准答案，再针对不理解的步骤向 AI 提问。AI 不识别图片，不批改手写步骤。</p>
          </div>
        </div>
        <div class="calc-ai-layout">
          <aside class="calc-ai-list" aria-label="计算题列表">
            ${renderList(question)}
          </aside>
          ${renderDetail(question)}
        </div>
      </section>
    `;
  }

  async function askCalculationAi(questionId, userQuestion) {
    const question = questions().find((item) => item.id === questionId);
    if (!question) throw new Error("未找到当前计算题。");
    const response = await fetch("/api/calc-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload(question, userQuestion))
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) {
      throw new Error(payload.message || payload.error || "AI 暂时无法回答，请稍后重试。");
    }
    return payload.answer || "AI 暂时没有返回内容。";
  }

  document.addEventListener("click", async (event) => {
    const questionButton = event.target.closest("[data-calc-question-id]");
    if (questionButton) {
      state.selectedId = questionButton.dataset.calcQuestionId || "";
      state.error = "";
      render();
      return;
    }

    const button = event.target.closest('[data-action="calc-ai-ask"]');
    if (!button) return;
    if (!button.closest("[data-calc-ai-root]")) return;
    const questionId = button.dataset.id;
    const input = document.querySelector("[data-calc-ai-input]");
    const userQuestion = input ? input.value.trim() : "";

    if (!userQuestion) {
      if (typeof window.showToast === "function") window.showToast("请输入你不理解的问题");
      else alert("请输入你不理解的问题");
      return;
    }

    try {
      state.error = "";
      state.loading = true;
      appendCalcAiMessage("user", userQuestion);
      if (input) input.value = "";
      const answer = await askCalculationAi(questionId, userQuestion);
      appendCalcAiMessage("assistant", answer);
    } catch (error) {
      console.error(error);
      state.error = error.message || "AI 暂时无法回答，请稍后重试。";
      appendCalcAiMessage("assistant", state.error);
    } finally {
      state.loading = false;
      render();
    }
  });

  window.CalcAiAssistant = {
    render,
    requestPayload,
    stripImageFields,
    uniqueImageList,
    askCalculationAi,
    appendCalcAiMessage
  };
})();
