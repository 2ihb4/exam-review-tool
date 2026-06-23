const STORAGE_KEY = "final-review-mvp-data-v1";
const SESSION_KEY = "final-review-mvp-session-v1";
const dataService = window.ReviewDataService;
const DAILY_LIMIT = 8;
const AI_DAILY_LIMIT = 5;
const RECOVERY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const RECOVERY_MAX_ATTEMPTS = 5;
const RECOVERY_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_DEMO_PASSWORD_HASH = "c60d771b500d1b4f8a1c8438b0e0f8d89ee8bac756a768efd4057b7011a367d5";
const QUESTION_TYPES = ["选择题", "判断题", "填空题", "名词解释", "简答题", "论述题", "计算题", "案例分析题", "简答题 / 选择题", "选择题 / 简答题", "简答题 / 计算题基础", "简答题 / 论述题"];
const QUESTION_STATUSES = ["draft", "pending_review", "published", "hidden", "archived"];
const QUESTION_SOURCES = ["老师划题", "课本习题", "往年题", "课堂截图整理", "AI 生成", "管理员录入"];

const seedData = {
  users: [
    {
      id: "u-admin",
      nickname: "管理员",
      role: "admin",
      status: "active",
      created_at: "2026-06-01",
      updated_at: "2026-06-10",
    },
  ],
  subjects: [
    {
      id: "s-management",
      name: "工程项目管理",
      description: "聚焦项目组织、进度、质量、成本与风险等期末重点。",
      exam_date: "2026-06-25",
      exam_time: "08:30~10:30",
      exam_location: "日新楼D204*",
      admin_id: "u-admin",
      is_open: true,
      created_at: "2026-06-01",
      updated_at: "2026-06-10",
    },
    {
      id: "s-marketing",
      name: "工程安全与环境保护",
      description: "整理工程安全管理、环境保护与风险预防相关内容。",
      exam_date: "2026-06-25",
      exam_time: "15:00~17:00",
      exam_location: "乐知楼F204*",
      admin_id: "u-admin",
      is_open: true,
      created_at: "2026-06-01",
      updated_at: "2026-06-11",
    },
    {
      id: "s-accounting",
      name: "工程合同管理",
      description: "复习合同订立、履行、变更、索赔和争议处理。",
      exam_date: "2026-06-26",
      exam_time: "15:00~17:00",
      exam_location: "乐知楼F204*",
      admin_id: "u-admin",
      is_open: true,
      created_at: "2026-06-01",
      updated_at: "2026-06-12",
    },
    {
      id: "s-hr",
      name: "工程造价管理",
      description: "梳理造价构成、计价依据、预算控制和结算管理。",
      exam_date: "2026-06-29",
      exam_time: "08:30~10:30",
      exam_location: "乐知楼F204*",
      admin_id: "u-admin",
      is_open: true,
      created_at: "2026-06-01",
      updated_at: "2026-06-09",
    },
  ],
  key_points: [
    {
      id: "kp-1",
      subject_id: "s-management",
      chapter: "第一章 管理导论",
      title: "管理的四项基本职能",
      content:
        "管理通常包括计划、组织、领导和控制。计划解决目标和路径，组织解决资源配置，领导解决人员动员，控制解决结果偏差修正。",
      importance: "high",
      source: "课堂重点整理",
      is_public: true,
      editor_id: "u-admin",
      sort_order: 1,
      created_at: "2026-06-05",
      updated_at: "2026-06-10",
    },
    {
      id: "kp-2",
      subject_id: "s-management",
      chapter: "第二章 决策",
      title: "科学决策过程",
      content:
        "科学决策通常经历识别问题、确定目标、拟定方案、评价方案、选择方案、实施方案和反馈修正。考试常要求按步骤解释案例。",
      importance: "high",
      source: "老师课件第二章",
      is_public: true,
      editor_id: "u-admin",
      sort_order: 2,
      created_at: "2026-06-06",
      updated_at: "2026-06-10",
    },
    {
      id: "kp-3",
      subject_id: "s-management",
      chapter: "第四章 组织",
      title: "组织结构设计原则",
      content:
        "组织结构设计需要兼顾目标一致、分工协作、权责对等、管理幅度适当和统一指挥。案例题可能要求判断组织设计问题。",
      importance: "medium",
      source: "复习课板书",
      is_public: true,
      editor_id: "u-admin",
      sort_order: 3,
      created_at: "2026-06-06",
      updated_at: "2026-06-10",
    },
    {
      id: "kp-6",
      subject_id: "s-accounting",
      chapter: "第二章 会计要素",
      title: "会计恒等式",
      content:
        "会计恒等式为资产等于负债加所有者权益，是复式记账和资产负债表编制的基础。遇到业务题先判断要素变化。",
      importance: "high",
      source: "教材第二章",
      is_public: true,
      editor_id: "u-admin",
      sort_order: 1,
      created_at: "2026-06-08",
      updated_at: "2026-06-12",
    },
    {
      id: "kp-7",
      subject_id: "s-accounting",
      chapter: "第三章 借贷记账",
      title: "借贷记账法规则",
      content:
        "资产、成本、费用类账户增加记借方，减少记贷方；负债、所有者权益、收入类账户增加记贷方，减少记借方。",
      importance: "high",
      source: "习题课整理",
      is_public: true,
      editor_id: "u-admin",
      sort_order: 2,
      created_at: "2026-06-08",
      updated_at: "2026-06-12",
    },
  ],
  predicted_questions: [
    {
      id: "q-1",
      subject_id: "s-management",
      question_type: "简答题",
      question_content: "简述管理的四项基本职能，并举例说明。",
      reference_answer:
        "管理包括计划、组织、领导和控制。计划明确目标与方案；组织配置资源和岗位；领导激励成员完成目标；控制检查结果并纠正偏差。",
      explanation: "该题对应管理导论基础概念，适合按“定义加例子”的结构作答。",
      related_key_point_ids: ["kp-1"],
      probability: "high",
      is_public: true,
      created_at: "2026-06-10",
      updated_at: "2026-06-10",
    },
    {
      id: "q-2",
      subject_id: "s-management",
      question_type: "案例分析题",
      question_content: "某社团活动效果不佳，请用科学决策过程分析改进方案。",
      reference_answer:
        "可从识别问题、确定目标、拟定多个方案、评价方案、选择方案、实施与反馈七个步骤展开。",
      explanation: "关键词是“过程”和“案例对应”，不要只背步骤。",
      related_key_point_ids: ["kp-2"],
      probability: "medium",
      is_public: true,
      created_at: "2026-06-10",
      updated_at: "2026-06-10",
    },
    {
      id: "q-4",
      subject_id: "s-accounting",
      question_type: "填空题",
      question_content: "会计恒等式为：资产 = ______ + ______。",
      reference_answer: "负债；所有者权益。",
      explanation: "该公式是后续账务处理和报表理解的基础。",
      related_key_point_ids: ["kp-6"],
      probability: "high",
      is_public: true,
      created_at: "2026-06-12",
      updated_at: "2026-06-12",
    },
  ],
  questions: [],
  answer_records: [],
  wrong_questions: [],
  subject_visits: [],
  comments: [
    {
      id: "c-1",
      subject_id: "s-management",
      key_point_id: "kp-1",
      parent_comment_id: null,
      content: "这个点适合背成“计划组织领导控制”四个词，再展开解释。",
      user_id: "u-admin",
      user_role: "admin",
      is_deleted: false,
      created_at: "2026-06-10 20:30",
      updated_at: "2026-06-10 20:30",
    },
  ],
  ai_qa_logs: [],
  operation_logs: [],
};

const costManagementDirectory = [
  ["第一章", 1, "什么是建设工程造价？包括哪些内容？", "P7"],
  ["第一章", 2, "定额计价与清单计价的联系与区别？", "P36-37"],
  ["第一章", 3, "国产设备原价的构成及计算", "P13"],
  ["第一章", 4, "进口设备抵岸价的构成及计算", "P15-16"],
  ["第一章", 5, "预备费", "P30-31"],
  ["第一章", 6, "建设期贷款利息", "P31-32"],
  ["第二章", 1, "有效控制工程造价应遵循哪些基本原则？", "P41-42"],
  ["第二章", 2, "建设投资静态投资部分估算", "P73-75"],
  ["第二章", 3, "单位生产能力估算法、生产能力指数法", ""],
  ["第二章", 4, "流动资金估算方法", "P82"],
  ["第三章", 1, "选择建设地点的要求主要有哪些？", "P60"],
  ["第三章", 2, "建设项目可行性研究报告的内容主要分为哪三大部分？", ""],
  ["第四章", 1, "工程设计要坚持哪些原则？", "P91"],
  ["第四章", 2, "设计阶段工程造价计价与控制的重要意义有哪些？", "P91"],
  ["第四章", 3, "设计方案优化可以通过哪些措施？", "P108-117"],
  ["第四章", 4, "静态投资效益评价法", "P106-107"],
  ["第四章", 5, "投资回收期法、计算费用法", "P106-107"],
  ["第五章", 1, "招投标阶段工程造价控制的主要内容？", "P139-140"],
  ["第五章", 2, "工程投标报价影响因素有哪些？", "P149-150"],
  ["第五章", 3, "投标报价的策略有哪些？", "P150-151"],
  ["第六章", 1, "工程索赔的处理原则是什么？", "P186"],
  ["第六章", 2, "施工项目成本管理的内容有哪些？", "P227"],
  ["第六章", 3, "施工项目成本控制的内涵是什么？", "P227"],
  ["第六章", 4, "建筑施工行业常用的成本控制系统主要有哪些？", "P228"],
  ["第六章", 5, "工程量偏差引起的合同价款调整方法", "P177-178"],
  ["第六章", 6, "工程预付款扣回起扣点计算", "P204-205"],
  ["第六章", 7, "工程款结算", "P213-217"],
  ["第六章", 8, "投资偏差与进度偏差", "P221"],
  ["第七章", 1, "简述建设工程项目竣工验收的概念。", "P244"],
  ["第七章", 2, "建设项目竣工决算的作用有哪几方面？", "P248"],
  ["第八章", 1, "简述建设项目造价审计的内涵及目标。", "P266"],
];

const engineeringFinalFocusSeed = [
  [1, "项目的四个特征是什么？", "选择题", "已有书本图片标记", "已有书本来源", ["项目基础"], "只需要记四个特征，作为选择题处理"],
  [2, "工程项目按主体如何分类？不同主体分别负责什么？", "简答题", "已有书本图片标记", "已有书本来源", ["工程项目分类"], "注意是按主体分类，不是按章节分类"],
  [3, "安装工程相关内容", "简答题", "缺少图片", "待补拍", ["安装工程"], "目前没有拍书本内容，答案必须留空"],
  [4, "必须进行招投标的工程建设项目有哪些？金额标准是什么？", "简答题", "教材第78页图片标记内容", "已有书本来源", ["招投标"], "重点记必须招标范围和金额标准"],
  [5, "可分包与不可分包的项目分别有哪些？", "简答题", "缺少图片", "待补拍", ["分包管理"], "目前没有书本图片，答案必须留空"],
  [6, "工程质量保证中“四新”指什么？", "简答题", "已有书本图片标记", "已有书本来源", ["质量管理"], "只整理书本标记内容"],
  [7, "网络计划六个时间参数的概念是什么？", "简答题", "教材第155页，网络计划六个时间参数标记内容。", "已有书本来源", ["网络计划", "时间参数", "最早开始时间", "最早完成时间", "最迟开始时间", "最迟完成时间", "总时差", "自由时差"], "概念性复习内容，不作为计算题练习展示"],
  [8, "项目风险识别的九种方法是什么？", "选择题", "图片不完整", "待补拍", ["风险管理"], "只需要知道九个方法名称，缺完整书本来源前不要补答案"],
  [9, "安全网的特征 / 设置要求是什么？", "简答题", "已有书本图片标记", "已有书本来源", ["安全管理"], "根据安全网页标记内容整理"],
  [10, "建设项目管理信息化的含义是什么？", "简答题", "教材第253页图片标记内容", "已有书本来源", ["信息化管理"], "只整理书本中圈出的含义"],
  [11, "施工顺序标准是什么？", "简答题", "缺少图片", "待补拍", ["施工管理"], "没有书本来源前答案留空"],
  [12, "横道图和网络图的优缺点是什么？", "论述题", "横道图已有图片，网络图来源不足", "待补拍", ["进度管理"], "横道图可先根据已有图片整理，网络图优缺点需补书本来源"],
  [13, "竣工验收标准是什么？", "简答题", "已有部分书本图片标记", "已有书本来源", ["竣工验收"], "根据已拍的单项工程、建设项目竣工验收标准整理"],
  [14, "职能式组织的优点和缺点是什么？", "简答题", "已有书本图片标记", "已有书本来源", ["组织管理"], "根据圈出的职能式组织优缺点整理"],
  [15, "人工智能在建筑行业应用的优缺点是什么？", "论述题", "缺少书本来源", "待补拍", ["人工智能", "建筑行业"], "不能根据常识写，必须等我补书本资料"],
  [16, "计算题：6-1、6-5、7-1", "计算题", "缺少完整题目图片", "待补拍", ["计算题", "进度管理", "成本管理"], "需要后续补充完整题目、公式和解题步骤"],
  [17, "简述工程项目成本超支原因。", "简答题", "目前只有思考题图片，缺正文来源", "待补拍", ["成本管理"], "缺正文答案来源，不要自动生成答案"],
  [18, "什么是人机固定？什么是三定制度？", "简答题", "教材第127页图片标记内容", "已有书本来源", ["安全管理", "机械设备管理"], "根据书本中人机固定和三定制度整理"],
];

let data = loadData();
let session = loadSession();
let currentSubjectId = data.subjects[0]?.id || "";
let activeTab = "points";
let activeAdminPage = "dashboard";
let importanceFilter = "all";
let chapterFilter = "all";
let questionTypeFilter = "all";
let predictionLevelFilter = "all";
let practiceChapterFilter = "all";
let practicePointFilter = "all";
let practiceStatusFilter = "all";
let practiceMode = "all";
let practiceFocusId = "";
let wrongPointFilter = "all";
let wrongSort = "count";
let hideMasteredWrong = true;
let focusView = "all";
let focusStatusFilter = "all";
let focusTypeFilter = "all";
let focusSourceFilter = "all";
let focusMasteryFilter = "all";
let focusDrawerId = "";
let focusDrawerEditing = false;
let focusAdvancedOpen = false;
let focusDisplayMode = "list";
let focusReviewIndex = 0;
let focusListScrollY = 0;
let focusDetailTouchStartX = 0;
let focusDetailTouchStartY = 0;
let adminQuestionFilters = {
  subject_id: "all",
  is_final_focus: "all",
  chapter: "all",
  question_type: "all",
  key_point_id: "all",
  source: "all",
  is_prediction: "all",
  is_self_test: "all",
  is_ai_knowledge: "all",
  status: "all",
  keyword: "",
};
let questionDrawerId = "";
let expandedSelfTests = new Set();
let selfTestFeedback = {};
let expandedDetails = new Set();
let expandedComments = new Set();
let collapsedChapters = new Set();
let replyingTo = "";

const $ = (selector) => document.querySelector(selector);

function loadData() {
  const raw = dataService.get(STORAGE_KEY);
  if (!raw) {
    const migrated = migrateData(structuredClone(seedData));
    if (migrated.__needsSave) {
      delete migrated.__needsSave;
      dataService.set(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  }
  try {
    const migrated = migrateData({ ...structuredClone(seedData), ...JSON.parse(raw) });
    if (migrated.__needsSave) {
      delete migrated.__needsSave;
      dataService.set(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    const migrated = migrateData(structuredClone(seedData));
    if (migrated.__needsSave) {
      delete migrated.__needsSave;
      dataService.set(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  }
}

function migrateData(current) {
  delete current.invite_codes;
  current.answer_records = Array.isArray(current.answer_records) ? current.answer_records : [];
  current.wrong_questions = Array.isArray(current.wrong_questions) ? current.wrong_questions : [];
  current.subject_visits = Array.isArray(current.subject_visits) ? current.subject_visits : [];
  current.operation_logs = Array.isArray(current.operation_logs) ? current.operation_logs : [];
  current.users = (current.users || []).map((user) => {
    const { invite_code, ...rest } = user;
    return user.role === "admin" ? rest : {
      ...rest,
      anonymous_user_id: user.anonymous_user_id || user.id,
      recovery_code_hash: user.recovery_code_hash || "",
      last_active_at: user.last_active_at || user.updated_at || today(),
    };
  });
  const removedSubjectIds = new Set(["s-construction-safety"]);
  current.subjects = (current.subjects || []).filter((subject) => !removedSubjectIds.has(subject.id));
  current.key_points = (current.key_points || []).filter((point) => !removedSubjectIds.has(point.subject_id));
  current.questions = (current.questions || []).filter((question) => !removedSubjectIds.has(question.subject_id));
  current.predicted_questions = (current.predicted_questions || []).filter((question) => !removedSubjectIds.has(question.subject_id));
  current.answer_records = current.answer_records.filter((record) => !removedSubjectIds.has(record.subject_id));
  current.wrong_questions = current.wrong_questions.filter((record) => !removedSubjectIds.has(record.subject_id));
  current.subject_visits = current.subject_visits.filter((visit) => !removedSubjectIds.has(visit.subject_id));
  const oldSafetyEnvironmentDemoPointIds = new Set(["kp-4", "kp-5"]);
  const oldSafetyEnvironmentDemoQuestionIds = new Set(["q-3"]);
  current.key_points = current.key_points.filter((point) => !oldSafetyEnvironmentDemoPointIds.has(point.id));
  current.predicted_questions = current.predicted_questions.filter((question) => !oldSafetyEnvironmentDemoQuestionIds.has(question.id));
  current.questions = current.questions.filter((question) => !oldSafetyEnvironmentDemoQuestionIds.has(question.id));
  current.answer_records = current.answer_records.filter((record) => !oldSafetyEnvironmentDemoQuestionIds.has(record.question_id));
  current.wrong_questions = current.wrong_questions.filter((record) => !oldSafetyEnvironmentDemoQuestionIds.has(record.question_id));
  const examSubjects = [
    ["s-management", "工程项目管理", "聚焦项目组织、进度、质量、成本与风险等期末重点。", "2026-06-25", "08:30~10:30", "日新楼D204*"],
    ["s-marketing", "工程安全与环境保护", "整理工程安全管理、环境保护与风险预防相关内容。", "2026-06-25", "15:00~17:00", "乐知楼F204*"],
    ["s-accounting", "工程合同管理", "复习合同订立、履行、变更、索赔和争议处理。", "2026-06-26", "15:00~17:00", "乐知楼F204*"],
    ["s-hr", "工程造价管理", "梳理造价构成、计价依据、预算控制和结算管理。", "2026-06-29", "08:30~10:30", "乐知楼F204*"],
  ];
  const alreadySeeded = current.meta?.exam_schedule_seeded_v1;
  const examSubjectIds = examSubjects.map(([id]) => id);
  const coreSubjects = examSubjects.map(([id, name, description, exam_date, exam_time, exam_location]) => {
    const existing = current.subjects.find((subject) => subject.id === id) || {};
    return {
      ...existing,
      id,
      name: alreadySeeded ? existing.name || name : name,
      description: alreadySeeded ? existing.description || description : description,
      exam_date: alreadySeeded ? existing.exam_date || exam_date : exam_date,
      exam_time: alreadySeeded ? existing.exam_time || exam_time : exam_time,
      exam_location: alreadySeeded ? existing.exam_location || exam_location : exam_location,
      is_open: true,
      admin_id: existing.admin_id || "u-admin",
      created_at: existing.created_at || "2026-06-01",
      updated_at: existing.updated_at || today(),
    };
  });
  const extraSubjects = current.subjects
    .filter((subject) => !examSubjectIds.includes(subject.id))
    .map((subject) => ({
      ...subject,
      exam_date: subject.exam_date || "",
      exam_time: subject.exam_time || "",
      exam_location: subject.exam_location || "",
    }));
  current.subjects = [...coreSubjects, ...extraSubjects];
  current.key_points = (current.key_points || []).map((point) => ({
    ...point,
    sequence: point.sequence || point.sort_order || 1,
    page_range: point.page_range || "",
    ai_enabled: point.ai_enabled !== false,
    source: point.source || "期末重点目录",
  }));
  current.questions = migrateQuestions(current);
  if (!current.meta?.engineering_final_focus_seeded_v1) {
    const existingIds = new Set(current.questions.map((question) => question.id));
    const focusQuestions = engineeringFinalFocusSeed.map(([order, title, type, source, sourceStatus, tags, note]) => normalizeQuestion({
      id: `final-focus-${String(order).padStart(2, "0")}`,
      subject_id: "s-management",
      chapter: "",
      key_point_ids: [],
      question_type: type,
      question_content: title,
      title,
      order,
      options: [],
      correct_answer: "",
      explanation: "",
      source,
      source_status: sourceStatus,
      tags,
      mastery_status: "未开始",
      note,
      difficulty: "medium",
      importance: "high",
      prediction_level: "medium",
      is_final_focus: true,
      is_prediction: false,
      is_self_test: false,
      is_ai_knowledge: false,
      is_public: true,
      status: "published",
      created_by: "u-admin",
      created_at: today(),
      updated_at: today(),
    }));
    current.questions.push(...focusQuestions.filter((question) => !existingIds.has(question.id)));
    current.__needsSave = true;
  }
  if (!current.meta?.engineering_word_questions_imported_v1) {
    (window.EngineeringQuestionSeed || []).forEach((seed) => {
      const complete = !seed.incomplete;
      const imported = normalizeQuestion({
        id: seed.id,
        subject_id: "s-management",
        chapter: "期末重点",
        key_point_ids: [],
        question_type: seed.question_type,
        question_content: seed.title,
        title: seed.title,
        order: seed.order,
        options: [],
        correct_answer: seed.correct_answer,
        explanation: "",
        source: seed.source,
        source_status: complete ? "已有书本来源" : "待补拍",
        tags: seed.tags,
        memory_tip: seed.memory_tip || seed.mnemonic || seed.tip || "",
        mastery_status: "未开始",
        note: complete ? "答案和来源已从 Word 复习资料导入。" : "资料待补充，不得自动生成答案。",
        difficulty: "medium",
        importance: "high",
        prediction_level: "high",
        is_final_focus: true,
        is_prediction: complete,
        is_self_test: complete,
        is_ai_knowledge: complete,
        is_public: complete,
        status: complete ? "published" : "pending_review",
        created_by: "u-admin",
        created_at: today(),
        updated_at: today(),
      });
      const existing = current.questions.find((question) => question.id === seed.id);
      if (existing) Object.assign(existing, imported);
      else current.questions.push(imported);
    });
    current.__needsSave = true;
  }
  const engineeringQuestionSeed = window.EngineeringQuestionSeed || [];
  const projectManagerDutySeed = engineeringQuestionSeed.find((seed) => seed.id === "project-management-focus-manager-duty");
  if (projectManagerDutySeed && !current.questions.some((question) => question.id === projectManagerDutySeed.id)) {
    const complete = !projectManagerDutySeed.incomplete;
    current.questions.push(normalizeQuestion({
      id: projectManagerDutySeed.id,
      subject_id: "s-management",
      chapter: "期末重点",
      key_point_ids: [],
      question_type: projectManagerDutySeed.question_type,
      question_content: projectManagerDutySeed.title,
      title: projectManagerDutySeed.title,
      order: projectManagerDutySeed.order,
      options: [],
      correct_answer: projectManagerDutySeed.correct_answer,
      explanation: "",
      source: projectManagerDutySeed.source,
      source_status: complete ? "已有书本来源" : "待补拍",
      tags: projectManagerDutySeed.tags,
      memory_tip: projectManagerDutySeed.memory_tip || projectManagerDutySeed.mnemonic || projectManagerDutySeed.tip || "",
      mastery_status: "未开始",
      note: complete ? "答案和来源已从 Word 复习资料导入。" : "资料待补充，不得自动生成答案。",
      difficulty: "medium",
      importance: "high",
      prediction_level: "high",
      is_final_focus: true,
      is_prediction: complete,
      is_self_test: complete,
      is_ai_knowledge: complete,
      is_public: complete,
      status: complete ? "published" : "pending_review",
      created_by: "u-admin",
      created_at: today(),
      updated_at: today(),
    }));
    current.__needsSave = true;
  }
  const completionAcceptanceSeed = engineeringQuestionSeed.find((seed) => seed.id === "final-focus-13");
  const completionAcceptanceQuestion = current.questions.find((question) =>
    question.id === "final-focus-13" ||
    (question.subject_id === "s-management" && String(question.title || "").includes("竣工验收标准"))
  );
  if (
    completionAcceptanceSeed &&
    completionAcceptanceQuestion &&
    /照片没有拍完整|只能整理到已拍清楚的内容|工业建设项目竣工验收标准/.test(completionAcceptanceQuestion.correct_answer || "")
  ) {
    completionAcceptanceQuestion.correct_answer = completionAcceptanceSeed.correct_answer;
    completionAcceptanceQuestion.updated_at = today();
    current.__needsSave = true;
  }
  engineeringQuestionSeed.forEach((seed) => {
    const memoryTip = seed.memory_tip || seed.mnemonic || seed.tip || "";
    if (!memoryTip) return;
    const question = current.questions.find((item) => item.id === seed.id && item.subject_id === "s-management");
    if (!question || question.memory_tip === memoryTip) return;
    question.memory_tip = memoryTip;
    question.updated_at = today();
    current.__needsSave = true;
  });
  const networkTimeQuestions = current.questions.filter((question) =>
    question.id === "final-focus-07" || question.title === "网络计划六个时间参数的概念是什么？"
  );
  const networkTimeQuestion = networkTimeQuestions.find((question) => question.id === "final-focus-07") || networkTimeQuestions[0];
  if (networkTimeQuestion) {
    const normalizedNetworkQuestion = normalizeQuestion({
      ...networkTimeQuestion,
      id: "final-focus-07",
      subject_id: "s-management",
      chapter: "期末重点",
      question_type: "简答题",
      question_content: "网络计划六个时间参数的概念是什么？",
      title: "网络计划六个时间参数的概念是什么？",
      order: 7,
      source: "教材第155页，网络计划六个时间参数标记内容。",
      source_status: "已有书本来源",
      tags: ["网络计划", "时间参数", "最早开始时间", "最早完成时间", "最迟开始时间", "最迟完成时间", "总时差", "自由时差"],
      mastery_status: networkTimeQuestion.mastery_status || "未开始",
      note: networkTimeQuestion.note || "概念性复习内容，不作为计算题练习展示。",
      is_final_focus: true,
      is_self_test: false,
      is_ai_knowledge: true,
      is_public: true,
      status: "published",
      updated_at: today(),
    });
    Object.assign(networkTimeQuestion, normalizedNetworkQuestion);
    current.questions = current.questions.filter((question) =>
      question === networkTimeQuestion || question.title !== "网络计划六个时间参数的概念是什么？"
    );
    current.__needsSave = true;
  }
  const safetyEnvironmentSeed = window.SafetyEnvironmentFocusSeed || [];
  const needsSafetyEnvironmentImport =
    !current.meta?.safety_environment_focus_imported_v1 ||
    safetyEnvironmentSeed.some((seed) => !current.questions.some((question) => question.id === seed.id));
  if (needsSafetyEnvironmentImport) {
    safetyEnvironmentSeed.forEach((seed) => {
      const complete = !seed.incomplete && Boolean(seed.correct_answer);
      const answerLines = String(seed.correct_answer || "").split("\n");
      const explanation = answerLines.filter((line) => line.startsWith("说明") || line.includes("建议以课本或课件原文为准")).join("\n");
      const imported = normalizeQuestion({
        id: seed.id,
        subject_id: "s-marketing",
        chapter: seed.chapter || "期末重点",
        key_point_ids: [],
        question_type: seed.question_type,
        question_content: seed.title,
        title: seed.title,
        order: seed.order,
        options: [],
        correct_answer: seed.correct_answer,
        explanation,
        source: seed.source || "建设工程施工安全与文明施工复习资料.docx",
        source_status: complete ? seed.source_status || "已有书本来源" : "待补充资料",
        tags: seed.tags || [],
        memory_tip: seed.memory_tip || seed.mnemonic || seed.tip || "",
        mastery_status: seed.mastery_status || "未开始",
        note: seed.note || "来源为用户提供的 Word 复习资料，未提供具体教材页码。",
        difficulty: "medium",
        importance: "high",
        prediction_level: "high",
        is_final_focus: true,
        is_prediction: complete,
        is_self_test: complete,
        is_ai_knowledge: complete,
        is_public: complete,
        status: complete ? "published" : "pending_review",
        created_by: "u-admin",
        created_at: today(),
        updated_at: today(),
      });
      const existing = current.questions.find((question) => question.id === seed.id);
      if (existing) Object.assign(existing, imported);
      else current.questions.push(imported);
    });
    current.__needsSave = true;
  }
  if (safetyEnvironmentSeed.length) {
    const safetyMemoryTipById = new Map(
      safetyEnvironmentSeed.map((seed) => [seed.id, seed.memory_tip || seed.mnemonic || seed.tip || ""])
    );
    current.questions.forEach((question) => {
      if (question.subject_id !== "s-marketing" || !safetyMemoryTipById.has(question.id)) return;
      const memoryTip = safetyMemoryTipById.get(question.id);
      if (memoryTip && question.memory_tip !== memoryTip) {
        question.memory_tip = memoryTip;
        current.__needsSave = true;
      }
    });
  }
  if (!current.meta?.cost_directory_seeded_v1) {
    const existingPointIds = new Set(current.key_points.map((point) => point.id));
    const costPoints = costManagementDirectory.map(([chapter, sequence, title, page_range], index) => {
      const pageText = page_range || "页码待补充";
      return {
        id: `cost-kp-${String(index + 1).padStart(2, "0")}`,
        subject_id: "s-hr",
        chapter,
        sequence,
        title,
        content: `期末重点目录：${title}。请结合教材对应页码复习：${pageText}。`,
        page_range,
        importance: "high",
        ai_enabled: true,
        source: "工程造价管理期末重点目录",
        is_public: true,
        editor_id: "u-admin",
        sort_order: 1000 + index,
        created_at: today(),
        updated_at: today(),
      };
    });
    current.key_points.push(...costPoints.filter((point) => !existingPointIds.has(point.id)));
    current.__needsSave = true;
  }
  current.meta = { ...(current.meta || {}), exam_schedule_seeded_v1: true };
  current.meta.cost_directory_seeded_v1 = true;
  current.meta.question_bank_seeded_v1 = true;
  current.meta.engineering_final_focus_seeded_v1 = true;
  current.meta.engineering_word_questions_imported_v1 = true;
  current.meta.safety_environment_focus_imported_v1 = true;
  current.meta.construction_safety_word_questions_imported_v1 = false;
  current.__needsSave = true;
  if (!alreadySeeded) current.__needsSave = true;
  return current;
}

function migrateQuestions(current) {
  const existing = Array.isArray(current.questions) ? current.questions : [];
  const normalized = existing.map(normalizeQuestion);
  const existingIds = new Set(normalized.map((question) => question.id));
  const migrated = (current.predicted_questions || [])
    .filter((question) => !existingIds.has(question.id))
    .map((question) => normalizeQuestion({
      id: question.id,
      subject_id: question.subject_id,
      chapter: findChapterFromPointIds(question.related_key_point_ids || []),
      key_point_ids: question.related_key_point_ids || [],
      question_type: question.question_type,
      question_content: question.question_content,
      options: [],
      correct_answer: question.reference_answer,
      explanation: question.explanation,
      source: "老师划题",
      difficulty: "medium",
      importance: "high",
      prediction_level: question.probability || "medium",
      is_prediction: true,
      is_self_test: true,
      is_ai_knowledge: true,
      is_public: question.is_public !== false,
      status: question.is_public === false ? "hidden" : "published",
      created_by: "u-admin",
      created_at: question.created_at,
      updated_at: question.updated_at,
    }));
  if (migrated.length || !Array.isArray(current.questions)) current.__needsSave = true;
  return [...normalized, ...migrated];
}

function normalizeQuestion(question) {
  const status = QUESTION_STATUSES.includes(question.status) ? question.status : question.is_public === false ? "hidden" : "published";
  return {
    id: question.id || uid("q"),
    subject_id: question.subject_id || "s-management",
    chapter: question.chapter || findChapterFromPointIds(question.key_point_ids || question.related_key_point_ids || []),
    key_point_ids: question.key_point_ids || question.related_key_point_ids || [],
    question_type: question.question_type || "简答题",
    question_content: question.question_content || "",
    title: question.title || question.question_content || "",
    order: Number(question.order || 0),
    options: Array.isArray(question.options) ? question.options : parseOptions(question.options || ""),
    correct_answer: question.correct_answer || question.reference_answer || "",
    explanation: question.explanation || "",
    source: question.source || "管理员录入",
    source_status: question.source_status || "已有书本来源",
    tags: Array.isArray(question.tags) ? question.tags : [],
    memory_tip: question.memory_tip || question.mnemonic || question.tip || "",
    mastery_status: question.mastery_status || "未开始",
    note: question.note || "",
    is_final_focus: question.is_final_focus === true,
    difficulty: question.difficulty || "medium",
    importance: question.importance || "medium",
    prediction_level: question.prediction_level || question.probability || "medium",
    is_prediction: question.is_prediction === true,
    is_self_test: question.is_self_test === true,
    is_ai_knowledge: question.is_ai_knowledge !== false,
    is_public: question.is_public !== false,
    status,
    created_by: question.created_by || "u-admin",
    created_at: question.created_at || today(),
    updated_at: question.updated_at || today(),
  };
}

function findChapterFromPointIds(pointIds = []) {
  const point = seedData.key_points.find((item) => pointIds.includes(item.id));
  return point?.chapter || "";
}

function parseOptions(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function saveData() {
  dataService.set(STORAGE_KEY, JSON.stringify(data));
}

function loadSession() {
  const raw = dataService.get(SESSION_KEY);
  if (!raw) return { user: null, admin: false, aiUsage: {}, recoveryAttempts: [] };
  try {
    return { user: null, admin: false, aiUsage: {}, recoveryAttempts: [], ...JSON.parse(raw) };
  } catch {
    return { user: null, admin: false, aiUsage: {}, recoveryAttempts: [] };
  }
}

function saveSession() {
  dataService.set(SESSION_KEY, JSON.stringify(session));
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function generateRecoveryCode(length = 10) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => RECOVERY_ALPHABET[byte % RECOVERY_ALPHABET.length]).join("");
}

async function hashText(value) {
  const bytes = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function defaultNickname() {
  return `匿名同学${Math.floor(1000 + Math.random() * 9000)}`;
}

async function createAnonymousStudent(nickname) {
  const recoveryCode = generateRecoveryCode();
  const user = {
    id: uid("student"),
    anonymous_user_id: crypto.randomUUID ? crypto.randomUUID() : uid("anonymous"),
    nickname: nickname || defaultNickname(),
    role: "student",
    recovery_code_hash: await hashText(recoveryCode),
    status: "active",
    created_at: today(),
    updated_at: today(),
    last_active_at: nowText(),
  };
  data.users.push(user);
  session.user = user;
  session.admin = false;
  session.pendingRecoveryCode = recoveryCode;
  saveData();
  saveSession();
  return user;
}

async function startAnonymousReview() {
  try {
    const nicknameInput = document.querySelector("[data-nickname-input]") || $("#nicknameInput");
    const nickname = nicknameInput ? nicknameInput.value.trim() : "";
    try {
      await createAnonymousStudent(nickname);
    } catch (createError) {
      console.error("Failed to create student recovery profile, using guest session", createError);
      session.user = {
        id: uid("anonymous"),
        nickname: nickname || "匿名同学",
        role: "guest",
        status: "active",
        created_at: today(),
        updated_at: today(),
      };
      session.admin = false;
      session.isAnonymous = true;
      session.aiUsage = session.aiUsage || {};
      session.recoveryAttempts = session.recoveryAttempts || [];
      saveSession();
    }
    render();
  } catch (error) {
    console.error("Failed to enter anonymous review", error);
    const errorNode = $("#entryError");
    if (errorNode) errorNode.textContent = "进入失败，请刷新后重试。";
    toast("进入失败，请刷新后重试。");
  }
}

function currentStudentId() {
  return session.user?.role === "student" ? session.user.id : "";
}

function touchStudent() {
  const user = data.users.find((item) => item.id === currentStudentId());
  if (!user) return;
  user.last_active_at = nowText();
  user.updated_at = today();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nowText() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSubject(id) {
  return data.subjects.find((subject) => subject.id === id);
}

function subjectPoints(subjectId) {
  return data.key_points
    .filter((point) => point.subject_id === subjectId && point.is_public)
    .sort((a, b) => {
      const chapterDiff = chapterRank(a.chapter) - chapterRank(b.chapter);
      if (chapterDiff !== 0) return chapterDiff;
      const sequenceDiff = Number(a.sequence || 0) - Number(b.sequence || 0);
      if (sequenceDiff !== 0) return sequenceDiff;
      return a.sort_order - b.sort_order;
    });
}

function subjectKnowledgePoints(subjectId) {
  return subjectPoints(subjectId).filter((point) => point.ai_enabled !== false);
}

function allPointsSorted() {
  return [...data.key_points].sort((a, b) => {
    const subjectDiff = (getSubject(a.subject_id)?.name || "").localeCompare(getSubject(b.subject_id)?.name || "", "zh-CN");
    if (subjectDiff !== 0) return subjectDiff;
    const chapterDiff = chapterRank(a.chapter) - chapterRank(b.chapter);
    if (chapterDiff !== 0) return chapterDiff;
    const sequenceDiff = Number(a.sequence || 0) - Number(b.sequence || 0);
    if (sequenceDiff !== 0) return sequenceDiff;
    return a.sort_order - b.sort_order;
  });
}

function subjectQuestions(subjectId) {
  return data.questions.filter(
    (question) =>
      question.subject_id === subjectId &&
      question.is_prediction &&
      question.is_public &&
      question.status === "published",
  );
}

function subjectSelfTestQuestions(subjectId, pointId) {
  return data.questions.filter(
    (question) =>
      question.subject_id === subjectId &&
      question.key_point_ids.includes(pointId) &&
      question.is_self_test &&
      question.is_public &&
      question.status === "published",
  );
}

function subjectPracticeQuestions(subjectId) {
  return data.questions.filter(
    (question) =>
      question.subject_id === subjectId &&
      question.is_self_test &&
      question.is_public &&
      question.status === "published",
  );
}

function studentAnswerRecords(subjectId = "") {
  return data.answer_records.filter(
    (record) => record.student_id === currentStudentId() && (!subjectId || record.subject_id === subjectId),
  );
}

function studentWrongQuestions(subjectId = "") {
  return data.wrong_questions.filter(
    (record) => record.student_id === currentStudentId() && (!subjectId || record.subject_id === subjectId),
  );
}

function latestAnswerFor(questionId) {
  return studentAnswerRecords()
    .filter((record) => record.question_id === questionId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
}

function upsertWrongQuestion(question, feedback) {
  const existing = data.wrong_questions.find(
    (item) => item.student_id === currentStudentId() && item.question_id === question.id,
  );
  if (!feedback.correct) {
    if (existing) {
      existing.wrong_count += 1;
      existing.last_wrong_at = nowText();
      existing.mastery_status = "未掌握";
      existing.next_review_at = today();
    } else {
      data.wrong_questions.unshift({
        id: uid("wrong"),
        student_id: currentStudentId(),
        subject_id: question.subject_id,
        question_id: question.id,
        wrong_count: 1,
        last_wrong_at: nowText(),
        mastery_status: "未掌握",
        next_review_at: today(),
      });
    }
  } else if (existing && existing.mastery_status === "未掌握") {
    existing.mastery_status = "复习中";
  }
}

function recordAnswer(question, answer, feedback, usedTime = 0) {
  if (!currentStudentId()) return;
  data.answer_records.unshift({
    id: uid("answer"),
    student_id: currentStudentId(),
    subject_id: question.subject_id,
    question_id: question.id,
    answer_content: String(answer || ""),
    is_correct: feedback.correct,
    score: feedback.correct ? 90 : 65,
    used_time: usedTime,
    created_at: nowText(),
  });
  upsertWrongQuestion(question, feedback);
  touchStudent();
  saveData();
}

function recordSubjectVisit(subjectId) {
  if (!currentStudentId()) return;
  data.subject_visits.unshift({
    id: uid("visit"),
    student_id: currentStudentId(),
    subject_id: subjectId,
    created_at: nowText(),
  });
  touchStudent();
  saveData();
}

function logOperation(action, entityType, entityId, details = {}) {
  data.operation_logs.unshift({
    id: uid("operation"),
    admin_id: "u-admin",
    action,
    entity_type: entityType,
    entity_id: entityId,
    details,
    created_at: nowText(),
  });
}

function subjectAiQuestions(subjectId) {
  return data.questions.filter(
    (question) =>
      question.subject_id === subjectId &&
      question.is_ai_knowledge &&
      question.status === "published",
  );
}

function questionRelatedText(question) {
  const related = question.key_point_ids
    .map((id) => data.key_points.find((point) => point.id === id)?.title)
    .filter(Boolean)
    .join("、");
  return related || (question.tags || []).join("、");
}

function chapterRank(chapter = "") {
  const order = ["第一章", "第二章", "第三章", "第四章", "第五章", "第六章", "第七章", "第八章", "第九章", "第十章"];
  const exact = order.indexOf(chapter);
  if (exact >= 0) return exact + 1;
  const matched = order.findIndex((item) => chapter.startsWith(item));
  return matched >= 0 ? matched + 1 : 999;
}

function sortedSubjects() {
  return [...data.subjects].sort((a, b) => {
    const aTime = examStartTimestamp(a);
    const bTime = examStartTimestamp(b);
    if (aTime === bTime) return a.name.localeCompare(b.name, "zh-CN");
    return aTime - bTime;
  });
}

function examStartTimestamp(subject) {
  if (!subject.exam_date || !subject.exam_time) return Number.MAX_SAFE_INTEGER;
  const start = subject.exam_time.split("~")[0]?.trim();
  const time = new Date(`${subject.exam_date}T${start || "23:59"}:00`).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

function examEndTimestamp(subject) {
  if (!subject.exam_date || !subject.exam_time) return 0;
  const end = subject.exam_time.split("~")[1]?.trim() || subject.exam_time.split("~")[0]?.trim();
  const time = new Date(`${subject.exam_date}T${end || "00:00"}:00`).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function examStatus(subject) {
  if (!subject.exam_date || !subject.exam_time) return { label: "待更新", className: "pending" };
  const now = Date.now();
  const startsAt = examStartTimestamp(subject);
  const endsAt = examEndTimestamp(subject);
  if (endsAt && now > endsAt) return { label: "已结束", className: "ended" };
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  if (startsAt - now > 0 && startsAt - now < threeDays) return { label: "小于 3 天", className: "urgent" };
  return { label: "待考试", className: "normal" };
}

function formatExamDate(subject) {
  return subject.exam_date || "考试时间待更新";
}

function formatExamTime(subject) {
  return subject.exam_time || "考试时间待更新";
}

function formatExamLocation(subject) {
  return subject.exam_location || "考场待更新";
}

function renderExamInfo(subject, variant = "card") {
  const status = examStatus(subject);
  return `
    <div class="exam-info ${variant} ${status.className}">
      <div class="exam-status">${status.label}</div>
      <div class="exam-line">
        <span>考试日期</span>
        <strong>${escapeHTML(formatExamDate(subject))}</strong>
      </div>
      <div class="exam-line">
        <span>考试时间</span>
        <strong>${escapeHTML(formatExamTime(subject))}</strong>
      </div>
      <div class="exam-line">
        <span>考场地点</span>
        <strong>${escapeHTML(formatExamLocation(subject))}</strong>
      </div>
    </div>
  `;
}

function compactExamTime(subject) {
  return formatExamTime(subject).replace("~", "-");
}

function compactExamDate(subject) {
  return subject.exam_date ? subject.exam_date.slice(5) : "时间待更新";
}

function renderExamLine(subject) {
  return `考试：${compactExamDate(subject)} ${compactExamTime(subject)}｜${formatExamLocation(subject)}`;
}

function renderExamSummary(subject) {
  const status = examStatus(subject);
  return `
    <details class="exam-summary">
      <summary>
        <span class="exam-status mini ${status.className}">${status.label}</span>
        <strong>${escapeHTML(formatExamDate(subject))}</strong>
        <span>${escapeHTML(compactExamTime(subject))}</span>
        <span>${escapeHTML(formatExamLocation(subject))}</span>
      </summary>
      ${renderExamInfo(subject, "detail")}
    </details>
  `;
}

function importanceLabel(value) {
  return { high: "高", medium: "中", low: "低" }[value] || value;
}

function probabilityLabel(value) {
  return { high: "高", medium: "中", low: "低" }[value] || value;
}

function difficultyLabel(value) {
  return { easy: "简单", medium: "中等", hard: "较难" }[value] || value;
}

function statusLabel(value) {
  return {
    draft: "草稿",
    pending_review: "待确认",
    published: "已发布",
    hidden: "已隐藏",
    archived: "已归档",
  }[value] || value;
}

function levelClass(value) {
  return { high: "red", medium: "orange", low: "green" }[value] || "";
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 2400);
}

function showApp() {
  $("#studentGate").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  $("#studentName").textContent = session.user ? session.user.nickname : "访客";
}

function showView(name) {
  ["homeView", "subjectView", "adminLoginView", "adminView"].forEach((id) => {
    $(`#${id}`).classList.toggle("hidden", id !== name);
  });
}

function render() {
  if (!session.user) {
    $("#studentGate").classList.remove("hidden");
    $("#appShell").classList.add("hidden");
    return;
  }
  showApp();
  renderHome();
  renderSubject();
  renderAdminLogin();
  renderAdmin();
  showView(session.admin ? "adminView" : "homeView");
}

function nextExamSubject() {
  return sortedSubjects().find((subject) => examEndTimestamp(subject) >= Date.now()) || sortedSubjects()[0];
}

function examCountdownText(subject) {
  if (!subject || !subject.exam_date) return "考试时间待更新";
  const days = Math.ceil((examStartTimestamp(subject) - Date.now()) / 86400000);
  if (days > 1) return `距 ${subject.name} 还有 ${days} 天`;
  if (days === 1) return `明天考 ${subject.name}`;
  if (days === 0) return `今天考 ${subject.name}`;
  return `${subject.name} 已结束`;
}

function studentProgressSummary() {
  const records = studentAnswerRecords();
  const uniqueDone = new Set(records.map((record) => record.question_id)).size;
  const correct = records.filter((record) => record.is_correct).length;
  const mastery = records.length ? Math.round((correct / records.length) * 100) : 0;
  const wrong = studentWrongQuestions().filter((item) => item.mastery_status !== "已掌握").length;
  return { records, uniqueDone, mastery, wrong };
}

function defaultQuestionProgress() {
  return {
    status: "not_started",
    mastery: "unknown",
    isFavorite: false,
    isWrong: false,
  };
}

function getHomeDashboardStats() {
  const focusQuestions = Array.isArray(data.questions)
    ? data.questions.filter((question) => question.is_final_focus === true)
    : [];
  const service = reviewProgressService();
  const stats = focusQuestions.reduce((summary, question) => {
    let progress = defaultQuestionProgress();
    try {
      progress = service?.getQuestionProgress(question.id) || progress;
    } catch {
      progress = defaultQuestionProgress();
    }
    const reviewed = progress.status === "reviewed";
    if (reviewed) summary.reviewed += 1;
    if (progress.mastery === "known") summary.known += 1;
    if (reviewed && (progress.mastery === "unknown" || progress.isWrong === true)) summary.wrong += 1;
    if (progress.isFavorite === true) summary.favorite += 1;
    return summary;
  }, {
    total: focusQuestions.length,
    reviewed: 0,
    known: 0,
    wrong: 0,
    favorite: 0,
    masteryPercent: 0,
    usedToday: 0,
    aiRemaining: AI_DAILY_LIMIT,
  });
  stats.masteryPercent = stats.total > 0 ? Math.round((stats.known / stats.total) * 100) : 0;
  const todayKey = today();
  const legacyTodayKey = `${session.user?.id || "guest"}-${todayKey}`;
  stats.usedToday = session.aiUsage?.[todayKey] ?? session.aiUsage?.[legacyTodayKey] ?? 0;
  stats.aiRemaining = Math.max(0, AI_DAILY_LIMIT - stats.usedToday);
  return stats;
}

function getHomeAdviceText(stats) {
  if (stats.reviewed === 0) {
    return "今天建议先从最近考试的科目开始，优先看高重要度重点。";
  }

  if (stats.wrong > 0) {
    return `你还有 ${stats.wrong} 个待复习重点，建议先处理不熟内容，再继续新重点。`;
  }

  if (stats.masteryPercent < 60) {
    return "当前掌握度还不高，建议先完成未开始重点，再集中复习收藏内容。";
  }

  return "当前复习状态不错，建议继续推进未完成重点，并用 AI 生成下一步计划。";
}

function renderRecoveryBanner() {
  if (!session.pendingRecoveryCode) return "";
  return `
    <section class="recovery-banner">
      <div>
        <p class="eyebrow">请截图保存</p>
        <h2>你的进度恢复码</h2>
        <code>${escapeHTML(session.pendingRecoveryCode)}</code>
        <p>换设备或清理浏览器后，可用它找回答题记录和错题本。恢复码不会用于登录后台。</p>
      </div>
      <button class="small-button" data-action="dismiss-recovery-code">我已保存</button>
    </section>
  `;
}

function renderHome() {
  const stats = getHomeDashboardStats();
  const progress = studentProgressSummary();
  const nextExam = nextExamSubject();
  const latest = progress.records[0];
  const latestQuestion = latest ? data.questions.find((question) => question.id === latest.question_id) : null;

  $("#homeView").innerHTML = `
    ${renderRecoveryBanner()}
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">复习驾驶舱</p>
        <h1>${escapeHTML(examCountdownText(nextExam))}</h1>
        <p class="lead">${escapeHTML(getHomeAdviceText(stats))}</p>
      </div>
      <button class="primary-button dashboard-start" data-action="start-today-review" type="button">开始今日复习</button>
    </section>

    <section class="dashboard-metrics" aria-label="个人复习数据">
      <div class="stat"><strong>${stats.reviewed}</strong><span>已做题目</span></div>
      <div class="stat"><strong>${stats.wrong}</strong><span>待复习错题</span></div>
      <div class="stat"><strong>${stats.masteryPercent}%</strong><span>当前掌握度</span></div>
      <div class="stat"><strong>${stats.aiRemaining}</strong><span>今日剩余 AI</span></div>
    </section>

    <section class="today-plan">
      <button type="button" data-action="home-open-important"><span>1</span><strong>重点</strong><p>复习未开始重点</p></button>
      <button type="button" data-action="home-open-practice"><span>2</span><strong>练习</strong><p>继续未开始重点</p></button>
      <button type="button" data-action="home-open-wrong"><span>3</span><strong>错题</strong><p>优先复习还不熟</p></button>
      <button type="button" data-action="home-open-last-progress"><span>4</span><strong>最近进度</strong><p>${latestQuestion ? escapeHTML(`${getSubject(latest.subject_id)?.name || ""} · ${latestQuestion.question_content.slice(0, 28)}`) : "继续上次重点"}</p></button>
    </section>

    <section class="home-section">
      <div class="section-heading">
        <p class="eyebrow">科目入口</p>
        <h2>选择科目开始复习</h2>
      </div>
      <div class="subject-grid">
        ${sortedSubjects().map(renderSubjectCard).join("")}
      </div>
    </section>

    <section class="study-note">
      <strong>隐私提示</strong>
      <span>系统只使用匿名学习身份保存你的进度，不收集真实姓名、学号、手机号、邮箱或班级。</span>
    </section>
  `;
}

function renderSubjectCard(subject) {
  const focusQuestions = finalFocusQuestions(subject.id);
  const points = focusQuestions.length || subjectPoints(subject.id).length;
  const questions = subjectQuestions(subject.id).length;
  return `
    <article class="card">
      <h3>${escapeHTML(subject.name)}</h3>
      <p>${escapeHTML(subject.description)}</p>
      <p class="exam-line-home">${escapeHTML(renderExamLine(subject))}</p>
      <div class="card-meta">
        <span>重点 ${points}</span>
        <span>预测题 ${questions}</span>
        <span>更新 ${escapeHTML(subject.updated_at.slice(5))}</span>
      </div>
      <button class="${subject.is_open ? "primary-button" : "ghost-button"}" data-action="enter-subject" data-id="${subject.id}" ${subject.is_open ? "" : "disabled"}>
        ${subject.is_open ? "进入复习" : "暂未开放"}
      </button>
    </article>
  `;
}

function renderSubject() {
  const subject = getSubject(currentSubjectId) || data.subjects[0];
  if (!subject) return;
  currentSubjectId = subject.id;
  if (activeTab !== "ai") activeTab = "points";
  const visibleTab = activeTab;

  $("#subjectView").innerHTML = `
    <div class="subject-workspace">
      <button class="back-link" data-action="back-home" type="button">← 返回首页</button>
      <section class="subject-hero">
        <p class="eyebrow">当前科目</p>
        <h1>${escapeHTML(subject.name)}</h1>
        <p>${escapeHTML(subject.description)}</p>
        ${renderExamSummary(subject)}
      </section>

      <div class="core-tabs">
        <button class="tab-button ${visibleTab === "points" ? "active" : ""}" data-action="set-tab" data-value="points">重点</button>
        <button class="tab-button ${visibleTab === "ai" ? "active" : ""}" data-action="set-tab" data-value="ai">AI</button>
      </div>

      <section class="content-panel">
        ${visibleTab === "ai"
          ? renderAiPanel(subject, "mobile")
          : renderPoints(subject)}
      </section>
    </div>
  `;
}

function renderPoints(subject) {
  if (finalFocusQuestions(subject.id).length) return renderFinalFocus(subject);
  const allPoints = subjectPoints(subject.id);
  const grouped = allPoints.reduce((groups, point) => {
    groups[point.chapter] ||= [];
    groups[point.chapter].push(point);
    return groups;
  }, {});

  return `
    <div class="chapter-groups">
      ${allPoints.length ? Object.entries(grouped).map(([chapter, items]) => renderChapterGroup(chapter, items)).join("") : `<div class="empty-state"><h3>当前暂无重点内容</h3><p>管理员可以在后台补充该科目的复习资料。</p></div>`}
    </div>
  `;
}

function finalFocusQuestions(subjectId) {
  return data.questions
    .filter((question) => question.subject_id === subjectId && question.is_final_focus && question.is_public && question.status === "published")
    .sort((a, b) => a.order - b.order);
}

function reviewProgressService() {
  return window.ReviewProgressService || null;
}

function questionProgress(questionId) {
  const service = reviewProgressService();
  if (!service || !questionId) {
    return {
      status: "not_started",
      mastery: "unknown",
      isFavorite: false,
      isWrong: false,
      reviewCount: 0,
      lastReviewedAt: null,
    };
  }
  return service.getQuestionProgress(questionId);
}

function focusQuestionMatchesStatus(question, filter = focusStatusFilter) {
  const progress = questionProgress(question.id);
  if (filter === "not_started") return progress.status !== "reviewed";
  if (filter === "known") return progress.mastery === "known";
  if (filter === "unknown") return progress.status === "reviewed" && (progress.mastery === "unknown" || progress.isWrong === true);
  if (filter === "favorite") return progress.isFavorite === true;
  return true;
}

function focusEmptyText() {
  const map = {
    not_started: "暂无未开始重点",
    known: "暂无已掌握重点",
    unknown: "暂无待复习重点",
    favorite: "暂无收藏重点",
  };
  return map[focusStatusFilter] || "当前暂无重点内容";
}

function recentProgressSubjectId() {
  const service = reviewProgressService();
  const progress = service?.getProgress?.();
  const subjects = progress?.subjects || {};
  return Object.entries(subjects)
    .filter(([, value]) => value?.lastStudyAt)
    .sort((a, b) => String(b[1].lastStudyAt).localeCompare(String(a[1].lastStudyAt)))[0]?.[0] || "";
}

function openSubjectFocus(subjectId, questionId = "", shouldOpenDetail = true) {
  const subject = getSubject(subjectId);
  if (!subject) return false;
  const questions = finalFocusQuestions(subject.id);
  if (!questions.length) return false;
  currentSubjectId = subject.id;
  activeTab = "points";
  focusDrawerEditing = false;
  const visibleQuestions = questions.filter((question) => focusQuestionMatchesStatus(question));
  const fallbackQuestion = visibleQuestions[0] || questions[0];
  focusDrawerId = shouldOpenDetail
    ? questionId && questions.some((question) => question.id === questionId)
      ? questionId
      : fallbackQuestion.id
    : "";
  if (focusDrawerId) reviewProgressService()?.setCurrentQuestion(currentSubjectId, focusDrawerId);
  session.currentSubjectId = currentSubjectId;
  session.lastAiAnswer = "";
  saveSession();
  recordSubjectVisit(currentSubjectId);
  renderSubject();
  showView("subjectView");
  return true;
}

function continueStudy() {
  const service = reviewProgressService();
  const sessionSubjectId = session.currentSubjectId && getSubject(session.currentSubjectId) ? session.currentSubjectId : "";
  const subjectId = sessionSubjectId || recentProgressSubjectId();
  if (subjectId) {
    const currentQuestionId = service?.getCurrentQuestion?.(subjectId);
    if (openSubjectFocus(subjectId, currentQuestionId)) return true;
  }
  const fallbackSubject = nextExamSubject();
  if (fallbackSubject && openSubjectFocus(fallbackSubject.id)) return true;
  toast("当前暂无可复习内容");
  return false;
}

function renderFinalFocus(subject) {
  const questions = focusVisibleQuestions();
  const filters = [
    ["all", "全部"],
    ["not_started", "未开始"],
    ["known", "已掌握"],
    ["unknown", "还不熟"],
    ["favorite", "已收藏"],
  ];
  return `
    <section class="focus-status-filter horizontal-scroll" aria-label="重点状态筛选">
      ${filters.map(([value, label]) => `<button class="filter-chip ${focusStatusFilter === value ? "active" : ""}" data-action="focus-status-filter" data-value="${value}">${label}</button>`).join("")}
    </section>
    <div class="focus-question-list">
      ${questions.length ? questions.map(renderFocusQuestionCard).join("") : `<div class="empty-state"><h3>${focusEmptyText()}</h3><p>可以切换筛选，或继续复习其他科目。</p></div>`}
    </div>
    ${focusDrawerId ? renderFocusDrawer(focusDrawerId, focusDrawerEditing) : ""}
  `;
}

function renderFocusQuestionCard(question) {
  const missingSource = question.source_status !== "已有书本来源";
  const progress = questionProgress(question.id);
  const statusLabel = progress.status === "not_started"
    ? "未开始"
    : progress.mastery === "known"
      ? "已掌握"
      : progress.mastery === "unknown" || progress.isWrong
        ? "还不熟"
        : "已复习";
  const statusClass = progress.mastery === "known"
    ? "mastered"
    : progress.mastery === "unknown" || progress.isWrong
      ? "unfamiliar"
      : "";
  return `
    <article class="focus-question-card ${missingSource ? "needs-source" : ""}">
      <button class="focus-card-main" data-action="open-focus-detail" data-id="${question.id}" type="button">
        <span class="focus-order">${question.order}</span>
        <span class="focus-card-copy">
          <strong>${escapeHTML(question.title)}</strong>
          <span class="pill-row">
            <span class="pill">${escapeHTML(question.question_type)}</span>
            <span class="source-status ${missingSource ? "missing" : "ready"}">${escapeHTML(question.source_status)}</span>
            <span class="mastery-status ${statusClass}">${statusLabel}</span>
            ${question.memory_tip ? `<span class="pill memory-ready">有速记</span>` : ""}
            ${progress.isFavorite ? `<span class="pill">已收藏</span>` : ""}
          </span>
        </span>
      </button>
    </article>
  `;
}

function renderFocusDrawer(questionId, editing) {
  const question = data.questions.find((item) => item.id === questionId && item.is_final_focus);
  if (!question) return "";
  const visibleQuestions = focusVisibleQuestions();
  const currentIndex = visibleQuestions.findIndex((item) => item.id === question.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < visibleQuestions.length - 1;
  const progressText = currentIndex >= 0
    ? `期末重点 ${currentIndex + 1} / ${visibleQuestions.length}`
    : `期末重点 · 题号 ${question.order}`;
  const subject = getSubject(question.subject_id);
  const usesMemoryTip =
    question.subject_id === "s-management" ||
    question.subject_id === "s-marketing" ||
    subject?.name === "工程项目管理" ||
    subject?.name === "工程安全与环境保护";
  const memoryTipText = question.memory_tip || "暂无速记，建议结合答案关键词自己整理口诀。";
  const missingSource = question.source_status !== "已有书本来源";
  const progress = questionProgress(question.id);
  const statusLabel = progress.status === "not_started"
    ? "未开始"
    : progress.mastery === "known"
      ? "已掌握"
      : progress.mastery === "unknown" || progress.isWrong
        ? "还不熟"
        : "已复习";
  const statusClass = progress.mastery === "known"
    ? "mastered"
    : progress.mastery === "unknown" || progress.isWrong
      ? "unfamiliar"
      : "";
  return `
    <div class="drawer-backdrop focus-backdrop focus-page-backdrop">
      <main class="question-drawer focus-drawer focus-detail-page" data-focus-detail-drawer>
        <div class="drawer-head focus-drawer-head">
          <button class="focus-close-icon" data-action="close-focus-drawer" aria-label="返回重点列表">← 返回</button>
          <div><p class="eyebrow">${progressText} · 题号 ${question.order}</p><h2>${editing ? "编辑重点题目" : escapeHTML(question.title)}</h2></div>
        </div>
        ${editing ? `
          <form class="admin-form drawer-form" data-form="focus-question-edit" data-question-id="${question.id}">
            <label>题目序号<input name="order" type="number" min="1" value="${question.order}" /></label>
            <label>题型<select name="question_type">${QUESTION_TYPES.map((type) => `<option value="${type}" ${question.question_type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label>
            <label class="wide">题目<textarea name="title" required>${escapeHTML(question.title)}</textarea></label>
            <label class="wide">答案（允许留空）<textarea name="answer" placeholder="只录入书本或图片中的可靠答案">${escapeHTML(question.correct_answer)}</textarea></label>
            <label class="wide">书本来源<input name="source" value="${escapeHTML(question.source)}" /></label>
            <label class="wide">速记<textarea name="memory_tip" placeholder="用于学生端快速记忆的口诀或理解提示">${escapeHTML(question.memory_tip || "")}</textarea></label>
            <label>来源状态<select name="source_status">${["已有书本来源", "缺书本来源", "待补拍"].map((status) => `<option value="${status}" ${question.source_status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
            <label>掌握状态<select name="mastery_status">${["未开始", "复习中", "已掌握"].map((status) => `<option value="${status}" ${question.mastery_status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
            <label class="wide">标签<input name="tags" value="${escapeHTML(question.tags.join("、"))}" placeholder="用顿号或逗号分隔" /></label>
            <label class="wide">备注<textarea name="note">${escapeHTML(question.note)}</textarea></label>
            <p class="wide focus-edit-warning">系统不会自动生成答案。没有完整书本来源时，请保持答案为空。</p>
            <button class="primary-button" type="submit">保存修改</button>
          </form>
        ` : `
          <div class="focus-detail-body">
            <div class="focus-detail-meta">
              <span class="pill">${escapeHTML(question.question_type)}</span>
              <span class="source-status ${missingSource ? "missing" : "ready"}">${escapeHTML(question.source_status)}</span>
              <span class="mastery-status ${statusClass}">${statusLabel}</span>
              ${progress.isFavorite ? `<span class="pill">已收藏</span>` : ""}
            </div>
            ${missingSource ? `<div class="source-warning"><strong>该题缺少书本来源，暂不作答</strong><span>请补充书本图片或可靠页码后，再手动录入答案。</span></div>` : ""}
            <section><h3>答案</h3>${question.correct_answer ? `<p>${escapeHTML(question.correct_answer)}</p>` : `<p class="empty-answer">答案待补充，不可根据常识自动生成</p>`}</section>
            ${usesMemoryTip ? `
              <section class="memory-tip-section">
                <div class="memory-tip-card">
                  <h3 class="memory-tip-title">速记</h3>
                  <p class="memory-tip-content">${escapeHTML(memoryTipText)}</p>
                </div>
              </section>
            ` : `<section><h3>书本来源</h3><p>${escapeHTML(question.source || "缺书本来源")}</p></section>`}
            <section class="focus-action-panel">
              <h3>学习状态</h3>
              <div class="focus-action-buttons">
                <button class="focus-action-button ${progress.mastery === "known" ? "active known" : ""}" data-action="focus-mark-known" data-id="${question.id}">我会了</button>
                <button class="focus-action-button ${progress.mastery === "unknown" || progress.isWrong ? "active unknown" : ""}" data-action="focus-mark-unknown" data-id="${question.id}">还不熟</button>
                <button class="focus-action-button ${progress.isFavorite ? "active favorite" : ""}" data-action="focus-toggle-favorite" data-id="${question.id}">${progress.isFavorite ? "已收藏" : "收藏"}</button>
              </div>
            </section>
            <button class="primary-button" data-action="edit-focus-question" data-id="${question.id}">手动编辑</button>
            <nav class="focus-detail-footer" aria-label="重点切换">
              <button class="small-button" data-action="focus-detail-prev" ${hasPrevious ? "" : "disabled"}>← 上一条</button>
              <span>${currentIndex >= 0 ? `${currentIndex + 1} / ${visibleQuestions.length}` : `题号 ${question.order}`}</span>
              <button class="small-button" data-action="focus-detail-next" ${hasNext ? "" : "disabled"}>下一条 →</button>
            </nav>
          </div>
        `}
      </main>
    </div>
  `;
}

function renderChapterGroup(chapter, points) {
  const isCollapsed = collapsedChapters.has(chapter);
  return `
    <section class="chapter-group">
      <button class="chapter-head" data-action="toggle-chapter" data-chapter="${escapeHTML(chapter)}" type="button">
        <span>${escapeHTML(chapter)}</span>
        <strong>${points.length} 条重点</strong>
        <em>${isCollapsed ? "展开" : "收起"}</em>
      </button>
      ${isCollapsed ? "" : `<div class="chapter-list">${points.map(renderPointCard).join("")}</div>`}
    </section>
  `;
}

function pageRangeText(point) {
  return point.page_range || "页码待补充";
}

function aiMetaText(point) {
  return point.ai_enabled === false ? "未接入 AI" : "已接入 AI";
}

function renderPointCard(point) {
  const comments = data.comments.filter((comment) => comment.key_point_id === point.id && !comment.is_deleted);
  const isOpen = expandedDetails.has(point.id);
  const commentsOpen = expandedComments.has(point.id);
  const selfTestOpen = expandedSelfTests.has(point.id);
  const testCount = subjectSelfTestQuestions(point.subject_id, point.id).length;
  return `
    <article class="point-card">
      <header>
        <div>
          <p class="point-meta ${levelClass(point.importance)}">${escapeHTML(point.chapter)} · ${importanceLabel(point.importance)}重要度 · ${aiMetaText(point)}</p>
          <h3><span>${escapeHTML(point.sequence || "")}.</span> ${escapeHTML(point.title)}</h3>
        </div>
      </header>
      <p class="point-submeta">${escapeHTML(pageRangeText(point))} · 更新 ${escapeHTML(point.updated_at.slice(5))}</p>
      <div class="quick-row">
        <button class="small-button compact-action" data-action="toggle-details" data-id="${point.id}">${isOpen ? "收起" : "展开"}</button>
        <button class="small-button compact-action" data-action="toggle-self-test" data-id="${point.id}">自测 ${testCount}</button>
        <button class="small-button compact-action" data-action="toggle-comments" data-id="${point.id}">讨论 ${comments.length}</button>
      </div>
      ${isOpen ? `
        <div class="detail-body">
          <p>${escapeHTML(point.content)}</p>
          <div class="pill-row">
            <span class="pill">页码：${escapeHTML(pageRangeText(point))}</span>
            <span class="pill">来源：${escapeHTML(point.source)}</span>
            <span class="pill">编辑时间：${escapeHTML(point.updated_at)}</span>
          </div>
          <div class="quick-row">
            ${["解释这个重点", "这个重点可能怎么考", "帮我生成简答题", "帮我整理背诵版"].map((text) => `
              <button class="small-button" data-action="quick-ai" data-question="${escapeHTML(`${text}：${point.title}`)}">${text}</button>
            `).join("")}
          </div>
        </div>
      ` : ""}
      ${selfTestOpen ? renderSelfTest(point) : ""}
      ${commentsOpen ? renderComments(point) : ""}
    </article>
  `;
}

function renderSelfTest(point) {
  const questions = subjectSelfTestQuestions(point.subject_id, point.id);
  if (!questions.length) {
    return `
      <section class="detail-body self-test-box">
        <h4>自测</h4>
        <p class="muted">这个重点暂时没有自测题。可以让管理员在题目库中勾选“是否用于自测”，或先让 AI 临时生成练习。</p>
        <button class="small-button" data-action="quick-ai" data-question="${escapeHTML(`围绕这个重点生成 3 道自测题：${point.title}`)}">让 AI 出题</button>
      </section>
    `;
  }
  const question = questions[0];
  const feedback = selfTestFeedback[question.id];
  return `
    <section class="detail-body self-test-box">
      <div class="self-test-head">
        <h4>自测</h4>
        <span class="pill">${escapeHTML(question.question_type)}</span>
      </div>
      <p class="self-test-question">${escapeHTML(question.question_content)}</p>
      ${question.options.length ? `
        <div class="choice-grid">
          ${question.options.map((option) => `
            <button class="small-button" data-action="answer-choice" data-question-id="${question.id}" data-answer="${escapeHTML(option)}">${escapeHTML(option)}</button>
          `).join("")}
        </div>
      ` : `
        <form class="comment-form" data-form="self-test" data-question-id="${question.id}">
          <textarea name="answer" placeholder="写下你的答案，AI 会按参考答案给出建议"></textarea>
          <button class="primary-button" type="submit">提交自测</button>
        </form>
      `}
      ${feedback ? renderSelfTestFeedback(feedback, question) : ""}
      <div class="quick-row">
        <button class="small-button" data-action="reset-self-test" data-question-id="${question.id}">再测一次</button>
        <button class="small-button" data-action="quick-ai" data-question="${escapeHTML(`解释这道题：${question.question_content}`)}">让 AI 解释</button>
      </div>
    </section>
  `;
}

function renderSelfTestFeedback(feedback, question) {
  return `
    <div class="self-test-feedback ${feedback.correct ? "good" : "review"}">
      <strong>${escapeHTML(feedback.title)}</strong>
      <p>${escapeHTML(feedback.summary)}</p>
      <div class="pill-row">
        <span class="pill">评分：${escapeHTML(feedback.score)}</span>
        <span class="pill">答到：${escapeHTML(feedback.hit)}</span>
        <span class="pill">建议：${escapeHTML(feedback.suggestion)}</span>
      </div>
      <details>
        <summary>查看答案</summary>
        <p>${escapeHTML(question.correct_answer || "暂无参考答案")}</p>
      </details>
    </div>
  `;
}

function gradeSelfTest(question, answer) {
  const normalizedAnswer = String(answer || "").trim();
  const correct = String(question.correct_answer || "").trim();
  const isChoice = question.options.length > 0;
  const isCorrect = isChoice
    ? normalizedAnswer.includes(correct) || correct.includes(normalizedAnswer)
    : correct && normalizedAnswer && correct.split(/[，。；;、\s]+/).filter((word) => word.length >= 2).some((word) => normalizedAnswer.includes(word));
  return {
    correct: isCorrect,
    title: isCorrect ? "回答不错" : "还可以再补充",
    score: isCorrect ? "85-100" : "60-80",
    hit: isCorrect ? "核心答案已覆盖" : "已写出部分内容",
    suggestion: isChoice ? "对照解析复盘选项" : "补充关键词和完整表述",
    summary: isCorrect
      ? "你的回答和参考答案比较接近，可以继续看解析加深理解。"
      : "你的回答还不够完整，建议对照参考答案，把遗漏的关键词补上。",
  };
}

function renderPractice(subject) {
  const allQuestions = subjectPracticeQuestions(subject.id);
  const chapters = [...new Set(allQuestions.map((question) => question.chapter).filter(Boolean))];
  const points = subjectPoints(subject.id);
  let questions = allQuestions.filter((question) => {
    const latest = latestAnswerFor(question.id);
    return (
      (practiceChapterFilter === "all" || question.chapter === practiceChapterFilter) &&
      (practicePointFilter === "all" || question.key_point_ids.includes(practicePointFilter)) &&
      (practiceStatusFilter === "all" || (practiceStatusFilter === "done" ? latest : !latest))
    );
  });
  if (practiceFocusId) questions = questions.filter((question) => question.id === practiceFocusId);
  return `
    <section class="filter-panel">
      <div class="practice-filters">
        <label>章节<select data-practice-filter="chapter"><option value="all">全部章节</option>${chapters.map((chapter) => `<option value="${escapeHTML(chapter)}" ${practiceChapterFilter === chapter ? "selected" : ""}>${escapeHTML(chapter)}</option>`).join("")}</select></label>
        <label>知识点<select data-practice-filter="point"><option value="all">全部知识点</option>${points.map((point) => `<option value="${point.id}" ${practicePointFilter === point.id ? "selected" : ""}>${escapeHTML(point.title)}</option>`).join("")}</select></label>
        <label>进度<select data-practice-filter="status"><option value="all">全部状态</option><option value="done" ${practiceStatusFilter === "done" ? "selected" : ""}>已做</option><option value="undone" ${practiceStatusFilter === "undone" ? "selected" : ""}>未做</option></select></label>
      </div>
      <p class="result-summary">题目来自统一题目库。当前显示 ${questions.length} 道，共 ${allQuestions.length} 道可练习题。</p>
    </section>
    <div class="practice-list">
      ${questions.length ? questions.map(renderPracticeCard).join("") : `<div class="empty-state"><h3>当前没有可练习题</h3><p>可以调整筛选条件，或请管理员在题目库中补充自测题。</p></div>`}
    </div>
  `;
}

function renderPracticeCard(question) {
  const feedback = selfTestFeedback[question.id];
  const latest = latestAnswerFor(question.id);
  return `
    <article class="question-card practice-card">
      <header>
        <div class="pill-row"><span class="pill">${escapeHTML(question.question_type)}</span><span class="pill">${latest ? "已做" : "未做"}</span></div>
        <span class="point-meta">${escapeHTML(question.chapter || "未绑定章节")}</span>
      </header>
      <h3>${escapeHTML(question.question_content)}</h3>
      ${question.options.length ? `
        <div class="choice-grid">${question.options.map((option) => `<button class="small-button" data-action="answer-practice-choice" data-question-id="${question.id}" data-answer="${escapeHTML(option)}">${escapeHTML(option)}</button>`).join("")}</div>
      ` : `
        <form class="comment-form" data-form="practice-answer" data-question-id="${question.id}">
          <textarea name="answer" placeholder="写下你的答案，提交后会立即反馈"></textarea>
          <button class="primary-button" type="submit">提交答案</button>
        </form>
      `}
      ${feedback ? renderSelfTestFeedback(feedback, question) : ""}
      <details><summary>查看解析</summary><p>${escapeHTML(question.explanation || "暂无解析")}</p></details>
      <button class="small-button" data-action="next-practice">再来一题</button>
    </article>
  `;
}

function renderWrongQuestions(subject) {
  const points = subjectPoints(subject.id);
  let records = studentWrongQuestions(subject.id).filter((record) => {
    const question = data.questions.find((item) => item.id === record.question_id);
    return question &&
      (!hideMasteredWrong || record.mastery_status !== "已掌握") &&
      (wrongPointFilter === "all" || question.key_point_ids.includes(wrongPointFilter));
  });
  records.sort((a, b) => wrongSort === "recent"
    ? b.last_wrong_at.localeCompare(a.last_wrong_at)
    : b.wrong_count - a.wrong_count);
  return `
    <section class="filter-panel">
      <div class="practice-filters">
        <label>知识点<select data-wrong-filter="point"><option value="all">全部知识点</option>${points.map((point) => `<option value="${point.id}" ${wrongPointFilter === point.id ? "selected" : ""}>${escapeHTML(point.title)}</option>`).join("")}</select></label>
        <label>排序<select data-wrong-filter="sort"><option value="count" ${wrongSort === "count" ? "selected" : ""}>错误次数</option><option value="recent" ${wrongSort === "recent" ? "selected" : ""}>最近错误</option></select></label>
        <label class="toggle-label"><input type="checkbox" data-wrong-filter="mastered" ${hideMasteredWrong ? "checked" : ""} /> 隐藏已掌握</label>
      </div>
      <p class="result-summary">只显示你的个人错题记录，其他同学无法查看。</p>
    </section>
    <div class="practice-list">
      ${records.length ? records.map((record) => renderWrongCard(record)).join("") : `<div class="empty-state"><h3>当前没有待复习错题</h3><p>完成练习后，答错的题目会自动出现在这里。</p></div>`}
    </div>
  `;
}

function renderWrongCard(record) {
  const question = data.questions.find((item) => item.id === record.question_id);
  return `
    <article class="question-card wrong-card ${record.mastery_status === "已掌握" ? "mastered" : ""}">
      <header>
        <div class="pill-row"><span class="status-badge ${record.mastery_status === "已掌握" ? "published" : "pending_review"}">${escapeHTML(record.mastery_status)}</span><span class="pill">答错 ${record.wrong_count} 次</span></div>
        <span class="point-meta">最近错误 ${escapeHTML(record.last_wrong_at)}</span>
      </header>
      <h3>${escapeHTML(question.question_content)}</h3>
      <p class="point-submeta">${escapeHTML(questionRelatedText(question) || question.chapter || "未关联知识点")}</p>
      <div class="quick-row">
        <button class="primary-button" data-action="retry-wrong" data-question-id="${question.id}">再练一次</button>
        <button class="small-button" data-action="mark-wrong-mastered" data-id="${record.id}">${record.mastery_status === "已掌握" ? "改为复习中" : "标记已掌握"}</button>
      </div>
      <details><summary>查看答案与解析</summary><p><strong>答案：</strong>${escapeHTML(question.correct_answer || "暂无参考答案")}</p><p><strong>解析：</strong>${escapeHTML(question.explanation || "暂无解析")}</p></details>
    </article>
  `;
}

function renderComments(point) {
  const roots = data.comments.filter((comment) => comment.key_point_id === point.id && !comment.parent_comment_id && !comment.is_deleted);
  return `
    <section class="detail-body comments">
      <p class="muted">请围绕当前重点进行讨论，避免无关聊天。</p>
      <form class="comment-form" data-form="comment" data-point-id="${point.id}">
        <textarea name="content" placeholder="写下你的理解、疑问或补充"></textarea>
        <button class="primary-button" type="submit">发布评论</button>
      </form>
      <div class="comment-tree">
        ${roots.length ? roots.map((comment) => renderCommentNode(comment, 1)).join("") : `<p class="muted">还没有讨论，先写第一条吧。</p>`}
      </div>
    </section>
  `;
}

function renderCommentNode(comment, depth) {
  if (comment.is_deleted) return "";
  const children = data.comments.filter((item) => item.parent_comment_id === comment.id && !item.is_deleted);
  const user = data.users.find((item) => item.id === comment.user_id);
  const canShowChildren = depth < 2;
  return `
    <article class="comment-card">
      <div class="comment-meta">
        <span>${escapeHTML(user?.nickname || "同学")} ${comment.user_role === "admin" ? `<span class="pill blue">管理员补充</span>` : ""}</span>
        <span>${escapeHTML(comment.created_at)}</span>
      </div>
      <p>${escapeHTML(comment.content)}</p>
      <button class="small-button" data-action="reply-comment" data-id="${comment.id}">回复</button>
      ${replyingTo === comment.id ? `
        <form class="comment-form" data-form="reply" data-parent-id="${comment.id}" data-point-id="${comment.key_point_id}">
          <textarea name="content" placeholder="回复这条讨论"></textarea>
          <button class="primary-button" type="submit">发布回复</button>
        </form>
      ` : ""}
      ${children.length ? `
        <div class="comment-children">
          ${canShowChildren ? children.map((child) => renderCommentNode(child, depth + 1)).join("") : `<button class="small-button" data-action="expand-deep-comments">展开更多回复</button>`}
        </div>
      ` : ""}
    </article>
  `;
}

function renderQuestions(subject) {
  const questions = subjectQuestions(subject.id);
  const visibleQuestions = questions.filter((question) =>
    (questionTypeFilter === "all" || question.question_type === questionTypeFilter) &&
    (predictionLevelFilter === "all" || question.prediction_level === predictionLevelFilter),
  );
  const byType = visibleQuestions.reduce((grouped, question) => {
    grouped[question.question_type] ||= [];
    grouped[question.question_type].push(question);
    return grouped;
  }, {});

  return `
    <section class="filter-panel">
      <div class="filter-row horizontal-scroll">
        ${["all", ...QUESTION_TYPES].map((type) => `
          <button class="filter-chip ${questionTypeFilter === type ? "active" : ""}" data-action="question-type-filter" data-value="${escapeHTML(type)}">${type === "all" ? "全部" : escapeHTML(type)}</button>
        `).join("")}
      </div>
      <div class="filter-row importance-row">
        ${[["all", "全部预测程度"], ["high", "高"], ["medium", "中"], ["low", "低"]].map(([value, label]) => `<button class="filter-chip ${predictionLevelFilter === value ? "active" : ""}" data-action="prediction-level-filter" data-value="${value}">${label}</button>`).join("")}
      </div>
      <p class="result-summary">共 ${questions.length} 道预测题，当前显示 ${visibleQuestions.length} 道。</p>
      <p class="prediction-note">预测题是管理员精选的高概率复习题，仅供参考，不代表必考。</p>
    </section>
    ${Object.keys(byType).length
      ? Object.entries(byType).map(([type, items]) => `
      <section class="panel point-card">
        <h2>${escapeHTML(type)}</h2>
        ${items.map(renderQuestionCard).join("")}
      </section>
    `).join("")
      : `<div class="panel point-card"><h3>暂无预测题</h3><p>请等待管理员补充该科目预测题。</p></div>`}
  `;
}

function renderQuestionCard(question) {
  const related = questionRelatedText(question);
  return `
    <article class="question-card">
      <header>
        <span class="pill">${escapeHTML(question.question_type)}</span>
        <span class="pill ${levelClass(question.prediction_level)}">预测程度：${probabilityLabel(question.prediction_level)}</span>
      </header>
      <h3>${escapeHTML(question.question_content)}</h3>
      ${question.options.length ? `<ol class="option-list">${question.options.map((option) => `<li>${escapeHTML(option)}</li>`).join("")}</ol>` : ""}
      <div class="pill-row">
        <span class="pill">关联知识点：${escapeHTML(related || "未关联")}</span>
        <span class="pill">来源：${escapeHTML(question.source)}</span>
      </div>
      <details>
        <summary>查看答案</summary>
        <p>${escapeHTML(question.correct_answer || "暂无参考答案")}</p>
      </details>
      <details>
        <summary>查看解析</summary>
        <p>${escapeHTML(question.explanation || "暂无解析")}</p>
      </details>
    </article>
  `;
}

function renderAiPanel(subject, suffix) {
  const docs = subjectKnowledgePoints(subject.id).length + subjectAiQuestions(subject.id).length;
  const answer = session.lastAiAnswer || "可以输入问题，或点击快捷问题开始复习。";
  const history = data.ai_qa_logs.filter((log) => log.user_id === currentStudentId() && log.subject_id === subject.id).slice(0, 3);
  return `
    <aside class="ai-panel">
      <div>
        <p class="eyebrow">AI 复习助手</p>
        <h2>当前资料库：${escapeHTML(subject.name)}</h2>
      </div>
      <div class="pill-row">
        <span class="pill blue">资料 ${docs} 条</span>
        <span class="pill green">今日剩余 ${getAiLeft()} 次</span>
      </div>
      <p class="muted">以下回答基于当前科目已上传资料生成，仅作为复习参考，不代表一定会考。</p>
      <div class="ai-entry-grid">
        <button class="small-button" data-action="quick-ai" data-question="解释当前科目的高重要度重点">解释重点</button>
        <button class="small-button" data-action="quick-ai" data-question="根据当前资料生成 3 道练习题">生成题目</button>
        <button class="small-button" data-action="fill-ai-draft" data-question="请批改并优化我的答案：">批改 / 优化答案</button>
      </div>
      <form class="comment-form" data-form="ai" data-suffix="${suffix}">
        <textarea name="question" placeholder="只会基于当前科目资料库回答">${escapeHTML(session.aiDraft || "")}</textarea>
        <button class="primary-button" type="submit">提问</button>
      </form>
      <div class="ai-answer">${escapeHTML(answer)}</div>
      ${history.length ? `<details class="ai-history"><summary>我的最近提问</summary>${history.map((log) => `<p><strong>${escapeHTML(log.question)}</strong><br>${escapeHTML(log.answer.slice(0, 100))}${log.answer.length > 100 ? "..." : ""}</p>`).join("")}</details>` : ""}
    </aside>
  `;
}

function getAiLeft() {
  const key = `${session.user?.id || "guest"}-${today()}`;
  const used = session.aiUsage[key] || 0;
  return Math.max(DAILY_LIMIT - used, 0);
}

function useAiOnce() {
  const todayKey = today();
  const key = `${session.user.id}-${todayKey}`;
  session.aiUsage[key] = (session.aiUsage[key] || 0) + 1;
  session.aiUsage[todayKey] = (session.aiUsage[todayKey] || 0) + 1;
  saveSession();
}

function answerAi(question) {
  const subject = getSubject(currentSubjectId);
  const points = subjectKnowledgePoints(currentSubjectId);
  const questions = subjectAiQuestions(currentSubjectId);
  const subjectNames = data.subjects.map((item) => item.name).filter((name) => name !== subject.name);
  const asksOtherSubject = subjectNames.some((name) => question.includes(name));

  if (asksOtherSubject) {
    return {
      text: "这个问题可能不属于当前科目。请确认是否切换到对应科目后再提问。",
      hit: false,
      cited: [],
    };
  }

  if (points.length + questions.length === 0) {
    return {
      text: "该科目资料暂未更新，请等待管理员上传。",
      hit: false,
      cited: [],
    };
  }

  if (question.includes("必考")) {
    const cited = points.filter((point) => point.importance === "high").slice(0, 2);
    const pageHint = cited.map((point) => `${point.title} ${pageRangeText(point)}`).join("；");
    return {
      text: `根据当前资料库，这部分内容重要程度较高，建议重点复习。但无法保证一定会考。\n\n请结合教材对应页码复习：${pageHint || "页码待补充"}。\n\n依据：${cited.map((point) => point.title).join("、") || subject.name}`,
      hit: cited.length > 0,
      cited: cited.map((point) => point.id),
    };
  }

  const words = question
    .replace(/[，。？！、：；,.?!]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 2);
  let matched = points.filter((point) => words.some((word) => `${point.title} ${point.content} ${point.chapter}`.includes(word)));

  if (!matched.length && /重要|背诵|简答|怎么考|解释/.test(question)) {
    matched = points.filter((point) => point.importance === "high").slice(0, 3);
  }

  const matchedQuestions = questions.filter((item) => {
    const relatedText = questionRelatedText(item);
    const haystack = `${item.question_content} ${item.correct_answer} ${item.chapter} ${relatedText}`;
    return words.some((word) => haystack.includes(word)) || item.key_point_ids.some((id) => matched.some((point) => point.id === id));
  });

  if (/怎么考|题型|考法|练习/.test(question) && matchedQuestions.length) {
    const samples = matchedQuestions.slice(0, 3).map((item, index) => `${index + 1}. ${item.question_type}：${item.question_content}`).join("\n");
    return {
      text: `根据当前科目的题目库，这个知识点常见考法包括：${[...new Set(matchedQuestions.map((item) => item.question_type))].join("、")}。\n\n可参考题目：\n${samples}\n\n这些题目都来自当前科目，不会跨科目引用。`,
      hit: true,
      cited: matched.slice(0, 3).map((point) => point.id),
      citedQuestions: matchedQuestions.slice(0, 3).map((item) => item.id),
    };
  }

  if (!matched.length) {
    return {
      text: "当前资料库中没有找到与该问题直接相关的内容，建议联系管理员补充资料。",
      hit: false,
      cited: [],
    };
  }

  const lines = matched.slice(0, 3).map((point, index) => `${index + 1}. ${point.title}：${point.content}`);
  const pages = matched
    .slice(0, 3)
    .map((point) => `${point.title} ${pageRangeText(point)}`)
    .join("；");
  const extra = question.includes("简答")
    ? "\n\n可练习成简答题：请结合课程资料说明上述知识点的含义、步骤和应用场景。"
    : question.includes("背诵")
      ? "\n\n背诵建议：先记关键词，再用自己的话补一句解释，最后准备一个案例。"
      : question.includes("怎么考")
        ? "\n\n可能题型：名词解释、简答题或案例分析题。请注意，这只是根据已有资料推测。"
        : "";

  return {
    text: `以下回答基于当前科目已上传资料生成，仅作为复习参考，不代表一定会考。\n\n${lines.join("\n")}${extra}\n\n请结合教材对应页码复习：${pages}。\n\n依据：${matched.slice(0, 3).map((point) => point.chapter + " " + point.title).join("、")}`,
    hit: true,
    cited: matched.slice(0, 3).map((point) => point.id),
    citedQuestions: matchedQuestions.slice(0, 3).map((item) => item.id),
  };
}

function renderAdminLogin() {
  $("#adminLoginView").innerHTML = `
    <section class="gate-panel">
      <p class="eyebrow">Admin</p>
      <h1>管理员登录</h1>
      <p class="lead">管理员后台独立登录。正式部署时由 Supabase Auth 验证身份。</p>
      <form id="adminLoginForm" class="gate-form">
        <label>账号<input name="account" autocomplete="username" /></label>
        <label>密码<input name="password" type="password" autocomplete="current-password" /></label>
        <p id="adminError" class="form-error"></p>
        <button class="primary-button full-button" type="submit">进入后台</button>
      </form>
      <button class="text-button" data-action="back-home">返回学生首页</button>
    </section>
  `;
}

function renderAdmin() {
  const nav = [
    ["dashboard", "后台首页"],
    ["subjects", "科目管理"],
    ["points", "重点管理"],
    ["questionBank", "题目库"],
    ["comments", "评论管理"],
    ["knowledge", "AI 资料库"],
    ["logs", "AI 调用记录"],
  ];

  $("#adminView").innerHTML = `
    <div class="admin-layout">
      <aside class="admin-nav">
        ${nav.map(([id, label]) => `<button class="${activeAdminPage === id ? "active" : ""}" data-action="admin-page" data-value="${id}">${label}</button>`).join("")}
        <button data-action="admin-logout">退出后台</button>
      </aside>
      <section class="admin-main">
        ${renderAdminPage()}
      </section>
    </div>
  `;
}

function renderAdminPage() {
  if (activeAdminPage === "subjects") return renderAdminSubjects();
  if (activeAdminPage === "points") return renderAdminPoints();
  if (activeAdminPage === "questionBank") return renderAdminQuestionBank();
  if (activeAdminPage === "comments") return renderAdminComments();
  if (activeAdminPage === "knowledge") return renderAdminKnowledge();
  if (activeAdminPage === "logs") return renderAdminLogs();
  return renderDashboard();
}

function renderDashboard() {
  const totalComments = data.comments.filter((comment) => !comment.is_deleted).length;
  const todayCalls = data.ai_qa_logs.filter((log) => log.created_at.startsWith(today())).length;
  const publishedQuestions = data.questions.filter((question) => question.status === "published").length;
  const students = data.users.filter((user) => user.role === "student");
  const activeToday = students.filter((user) => String(user.last_active_at || "").startsWith(today())).length;
  const wrongTotal = data.wrong_questions.reduce((sum, item) => sum + item.wrong_count, 0);
  const questionStats = data.questions.map((question) => {
    const answers = data.answer_records.filter((record) => record.question_id === question.id);
    const wrong = answers.filter((record) => !record.is_correct).length;
    return { question, answers: answers.length, wrong, rate: answers.length ? Math.round((wrong / answers.length) * 100) : 0 };
  }).filter((item) => item.answers).sort((a, b) => b.rate - a.rate).slice(0, 5);
  const pointStats = data.key_points.map((point) => {
    const questionIds = data.questions.filter((question) => question.key_point_ids.includes(point.id)).map((question) => question.id);
    const wrong = data.answer_records.filter((record) => questionIds.includes(record.question_id) && !record.is_correct).length;
    return { point, wrong };
  }).filter((item) => item.wrong).sort((a, b) => b.wrong - a.wrong).slice(0, 5);
  const aiFrequency = Object.entries(data.ai_qa_logs.reduce((groups, log) => {
    const key = log.question.slice(0, 30);
    groups[key] = (groups[key] || 0) + 1;
    return groups;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return `
    <section class="admin-card">
      <p class="eyebrow">数据看板</p>
      <h2>后台首页</h2>
      <div class="admin-grid">
        <div class="stat"><strong>${students.length}</strong><span>总匿名学生</span></div>
        <div class="stat"><strong>${activeToday}</strong><span>今日活跃</span></div>
        <div class="stat"><strong>${data.answer_records.length}</strong><span>总作答次数</span></div>
        <div class="stat"><strong>${wrongTotal}</strong><span>累计错题次数</span></div>
        <div class="stat"><strong>${publishedQuestions}</strong><span>已发布题目</span></div>
        <div class="stat"><strong>${todayCalls}</strong><span>今日 AI 调用</span></div>
      </div>
    </section>
    <section class="admin-card">
      <h3>各科目学习情况</h3>
      <table>
        <thead><tr><th>科目</th><th>考试时间</th><th>考场地点</th><th>资料数量</th><th>访问 / 作答</th><th>最近更新</th></tr></thead>
        <tbody>
          ${sortedSubjects().map((subject) => `
            <tr>
              <td>${escapeHTML(subject.name)}</td>
              <td>${escapeHTML(formatExamDate(subject))} ${escapeHTML(formatExamTime(subject))}</td>
              <td>${escapeHTML(formatExamLocation(subject))}</td>
              <td>${subjectKnowledgePoints(subject.id).length + subjectAiQuestions(subject.id).length}</td>
              <td>${data.subject_visits.filter((visit) => visit.subject_id === subject.id).length} 次访问 / ${data.answer_records.filter((record) => record.subject_id === subject.id).length} 次作答</td>
              <td>${escapeHTML(subject.updated_at)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
    <section class="admin-grid analytics-grid">
      <div class="admin-card"><h3>错误率最高题目</h3>${questionStats.length ? questionStats.map((item) => `<p><strong>${item.rate}%</strong> ${escapeHTML(item.question.question_content.slice(0, 42))}（${item.answers} 次）</p>`).join("") : `<p class="muted">暂无答题数据</p>`}</div>
      <div class="admin-card"><h3>常错知识点</h3>${pointStats.length ? pointStats.map((item) => `<p><strong>${item.wrong} 次</strong> ${escapeHTML(item.point.title)}</p>`).join("") : `<p class="muted">暂无错题数据</p>`}</div>
      <div class="admin-card"><h3>AI 高频问题</h3>${aiFrequency.length ? aiFrequency.map(([question, count]) => `<p><strong>${count} 次</strong> ${escapeHTML(question)}</p>`).join("") : `<p class="muted">暂无 AI 提问</p>`}</div>
      <div class="admin-card"><h3>资料缺口</h3><p>${data.ai_qa_logs.filter((log) => !log.is_knowledge_hit).length} 次提问未命中资料。</p><p class="muted">可根据未命中问题补充重点或题目库。</p></div>
    </section>
  `;
}

function subjectOptions(selectedId = "") {
  return sortedSubjects().map((subject) => `<option value="${subject.id}" ${selectedId === subject.id ? "selected" : ""}>${escapeHTML(subject.name)}</option>`).join("");
}

function renderAdminSubjects() {
  return `
    <section class="admin-card">
      <h2>科目管理</h2>
      <form class="admin-form" data-form="admin-subject">
        <label>科目名称<input name="name" required /></label>
        <label>管理员<input name="admin" value="管理员" /></label>
        <label class="wide">科目简介<textarea name="description" required></textarea></label>
        <label>考试日期<input name="exam_date" type="date" /></label>
        <label>考试时间段<input name="exam_time" placeholder="例如 08:30~10:30" /></label>
        <label>考场地点<input name="exam_location" placeholder="例如 乐知楼F204*" /></label>
        <label>开放状态<select name="is_open"><option value="true">开放</option><option value="false">暂不开放</option></select></label>
        <button class="primary-button" type="submit">新增科目</button>
      </form>
    </section>
    <section class="admin-card">${renderSubjectTable()}</section>
  `;
}

function renderSubjectTable() {
  return `
    <table>
      <thead><tr><th>科目</th><th>简介</th><th>考试日期</th><th>时间段</th><th>考场</th><th>开放</th><th>重点</th><th>预测题</th><th>操作</th></tr></thead>
      <tbody>
        ${sortedSubjects().map((subject) => `
          <tr>
            <td>${escapeHTML(subject.name)}</td>
            <td>${escapeHTML(subject.description)}</td>
            <td><input class="table-input" data-exam-field="exam_date" data-id="${subject.id}" type="date" value="${escapeHTML(subject.exam_date || "")}" /></td>
            <td><input class="table-input" data-exam-field="exam_time" data-id="${subject.id}" placeholder="考试时间待更新" value="${escapeHTML(subject.exam_time || "")}" /></td>
            <td><input class="table-input" data-exam-field="exam_location" data-id="${subject.id}" placeholder="考场待更新" value="${escapeHTML(subject.exam_location || "")}" /></td>
            <td>${subject.is_open ? "开放" : "关闭"}</td>
            <td>${subjectPoints(subject.id).length}</td>
            <td>${subjectQuestions(subject.id).length}</td>
            <td class="table-actions">
              <button class="small-button" data-action="save-exam-info" data-id="${subject.id}">保存考试信息</button>
              <button class="small-button" data-action="toggle-subject" data-id="${subject.id}">${subject.is_open ? "关闭" : "开放"}</button>
              <button class="danger-button" data-action="delete-subject" data-id="${subject.id}">删除</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderAdminPoints() {
  return `
    <section class="admin-card">
      <h2>重点管理</h2>
      <form class="admin-form" data-form="admin-point">
        <label>所属科目<select name="subject_id">${subjectOptions(currentSubjectId)}</select></label>
        <label>章节 / 主题<input name="chapter" required /></label>
        <label>序号<input name="sequence" type="number" min="1" value="1" required /></label>
        <label>页码范围<input name="page_range" placeholder="例如 P139-140" /></label>
        <label class="wide">重点标题<input name="title" required /></label>
        <label class="wide">重点说明<textarea name="content" placeholder="可不填，系统会按标题和页码生成说明"></textarea></label>
        <label>重要程度<select name="importance"><option value="high">高</option><option value="medium">中</option><option value="low">低</option></select></label>
        <label>AI 知识库<select name="ai_enabled"><option value="true">可用于 AI 知识库</option><option value="false">不进入 AI 知识库</option></select></label>
        <label>来源说明<input name="source" placeholder="例如 期末重点目录" /></label>
        <button class="primary-button" type="submit">新增重点</button>
      </form>
    </section>
    <section class="admin-card">
      <table>
        <thead><tr><th>科目</th><th>章节</th><th>序号</th><th>标题</th><th>页码</th><th>重要程度</th><th>AI 知识库</th><th>评论</th><th>操作</th></tr></thead>
        <tbody>
          ${allPointsSorted().map((point) => `
            <tr>
              <td>${escapeHTML(getSubject(point.subject_id)?.name || "")}</td>
              <td><input class="table-input" data-point-field="chapter" data-id="${point.id}" value="${escapeHTML(point.chapter)}" /></td>
              <td><input class="table-input compact" data-point-field="sequence" data-id="${point.id}" type="number" min="1" value="${escapeHTML(point.sequence || 1)}" /></td>
              <td><input class="table-input title-input" data-point-field="title" data-id="${point.id}" value="${escapeHTML(point.title)}" /></td>
              <td><input class="table-input compact" data-point-field="page_range" data-id="${point.id}" placeholder="页码待补充" value="${escapeHTML(point.page_range || "")}" /></td>
              <td>
                <select class="table-input compact" data-point-field="importance" data-id="${point.id}">
                  ${["high", "medium", "low"].map((value) => `<option value="${value}" ${point.importance === value ? "selected" : ""}>${importanceLabel(value)}</option>`).join("")}
                </select>
              </td>
              <td>
                <select class="table-input" data-point-field="ai_enabled" data-id="${point.id}">
                  <option value="true" ${point.ai_enabled !== false ? "selected" : ""}>可用于 AI</option>
                  <option value="false" ${point.ai_enabled === false ? "selected" : ""}>不进入 AI</option>
                </select>
              </td>
              <td>${data.comments.filter((comment) => comment.key_point_id === point.id && !comment.is_deleted).length}</td>
              <td class="table-actions">
                <button class="small-button" data-action="save-point-info" data-id="${point.id}">保存编辑</button>
                <button class="small-button" data-action="toggle-point-public" data-id="${point.id}">${point.is_public ? "设为隐藏" : "设为公开"}</button>
                <button class="danger-button" data-action="delete-point" data-id="${point.id}">删除</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAdminQuestionBank() {
  const questions = filteredAdminQuestions();
  return `
    <section class="admin-card question-bank-head">
      <div class="admin-title-row">
        <div>
          <p class="eyebrow">Question Bank</p>
          <h2>题目库</h2>
          <p class="muted">题目先进入题目库，再决定是否作为预测题、自测题或 AI 可引用资料。</p>
        </div>
        <div class="table-actions">
          <button class="primary-button" data-action="new-question">新增题目</button>
          <button class="small-button" data-action="bulk-publish-questions">批量发布</button>
          <button class="small-button" data-action="bulk-hide-questions">批量隐藏</button>
        </div>
      </div>
      ${renderQuestionFilters()}
    </section>

    <section class="admin-card">
      <details class="import-panel">
        <summary>批量导入题目 / AI 解析</summary>
        <form class="admin-form" data-form="admin-question-bulk">
          <label>所属科目<select name="subject_id">${subjectOptions(currentSubjectId)}</select></label>
          <label>默认来源<select name="source">${QUESTION_SOURCES.map((source) => `<option>${source}</option>`).join("")}</select></label>
          <label>默认题型<select name="question_type">${QUESTION_TYPES.map((type) => `<option>${type}</option>`).join("")}</select></label>
          <label>默认章节<input name="chapter" placeholder="可留空，AI 尝试按关键词识别" /></label>
          <label class="wide">粘贴题目文本<textarea name="bulk_text" required placeholder="支持逐行题目，或结构化格式：&#10;【题型】简答题&#10;【科目】工程造价管理&#10;【章节】第二章&#10;【知识点】工程造价的组成&#10;【题目】简述工程造价的基本构成。&#10;【答案】……&#10;【解析】……"></textarea></label>
          <button class="primary-button" type="submit">AI 解析题目</button>
        </form>
        <p class="muted">支持逐行拆题和【字段】结构化导入。所有导入题目默认“待确认”且不公开，管理员确认发布后学生才可见。</p>
      </details>
    </section>

    <section class="admin-card">
      <div class="result-summary">当前筛选显示 ${questions.length} 道题，题目库共 ${data.questions.length} 道题。</div>
      <table>
        <thead>
          <tr>
            <th>题目内容摘要</th><th>科目</th><th>章节</th><th>题型</th><th>关联知识点</th><th>预测</th><th>自测</th><th>AI 知识库</th><th>状态</th><th>更新时间</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${questions.length ? questions.map(renderQuestionRow).join("") : `<tr><td colspan="11">暂无符合条件的题目</td></tr>`}
        </tbody>
      </table>
    </section>
    ${questionDrawerId ? renderQuestionDrawer(questionDrawerId) : ""}
  `;
}

function renderQuestionFilters() {
  const chapters = [...new Set(data.questions.map((question) => question.chapter).filter(Boolean))];
  return `
    <div class="question-filters">
      <label>科目<select data-admin-question-filter="subject_id"><option value="all">全部科目</option>${subjectOptions(adminQuestionFilters.subject_id)}</select></label>
      <label>题目范围<select data-admin-question-filter="is_final_focus"><option value="all" ${adminQuestionFilters.is_final_focus === "all" ? "selected" : ""}>全部题目</option><option value="true" ${adminQuestionFilters.is_final_focus === "true" ? "selected" : ""}>Word 导入期末重点</option><option value="false" ${adminQuestionFilters.is_final_focus === "false" ? "selected" : ""}>其他题目</option></select></label>
      <label>章节<select data-admin-question-filter="chapter"><option value="all">全部章节</option>${chapters.map((chapter) => `<option value="${escapeHTML(chapter)}" ${adminQuestionFilters.chapter === chapter ? "selected" : ""}>${escapeHTML(chapter)}</option>`).join("")}</select></label>
      <label>题型<select data-admin-question-filter="question_type"><option value="all">全部题型</option>${QUESTION_TYPES.map((type) => `<option value="${type}" ${adminQuestionFilters.question_type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label>
      <label>知识点<select data-admin-question-filter="key_point_id"><option value="all">全部重点</option>${allPointsSorted().map((point) => `<option value="${point.id}" ${adminQuestionFilters.key_point_id === point.id ? "selected" : ""}>${escapeHTML(point.title)}</option>`).join("")}</select></label>
      <label>来源<select data-admin-question-filter="source"><option value="all">全部来源</option>${QUESTION_SOURCES.map((source) => `<option value="${source}" ${adminQuestionFilters.source === source ? "selected" : ""}>${source}</option>`).join("")}</select></label>
      <label>预测题<select data-admin-question-filter="is_prediction">${booleanFilterOptions(adminQuestionFilters.is_prediction)}</select></label>
      <label>自测题<select data-admin-question-filter="is_self_test">${booleanFilterOptions(adminQuestionFilters.is_self_test)}</select></label>
      <label>AI 知识库<select data-admin-question-filter="is_ai_knowledge">${booleanFilterOptions(adminQuestionFilters.is_ai_knowledge)}</select></label>
      <label>状态<select data-admin-question-filter="status"><option value="all">全部状态</option>${QUESTION_STATUSES.map((status) => `<option value="${status}" ${adminQuestionFilters.status === status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}</select></label>
      <label class="wide">关键词搜索<input data-admin-question-filter="keyword" value="${escapeHTML(adminQuestionFilters.keyword)}" placeholder="搜索题目、答案、解析" /></label>
    </div>
  `;
}

function booleanFilterOptions(value) {
  return `
    <option value="all" ${value === "all" ? "selected" : ""}>全部</option>
    <option value="true" ${value === "true" ? "selected" : ""}>是</option>
    <option value="false" ${value === "false" ? "selected" : ""}>否</option>
  `;
}

function filteredAdminQuestions() {
  return data.questions.filter((question) => {
    const keyword = adminQuestionFilters.keyword.trim().toLowerCase();
    const haystack = `${question.question_content} ${question.correct_answer} ${question.explanation}`.toLowerCase();
    return (
      (adminQuestionFilters.subject_id === "all" || question.subject_id === adminQuestionFilters.subject_id) &&
      matchesBooleanFilter(question.is_final_focus, adminQuestionFilters.is_final_focus) &&
      (adminQuestionFilters.chapter === "all" || question.chapter === adminQuestionFilters.chapter) &&
      (adminQuestionFilters.question_type === "all" || question.question_type === adminQuestionFilters.question_type) &&
      (adminQuestionFilters.key_point_id === "all" || question.key_point_ids.includes(adminQuestionFilters.key_point_id)) &&
      (adminQuestionFilters.source === "all" || question.source === adminQuestionFilters.source) &&
      matchesBooleanFilter(question.is_prediction, adminQuestionFilters.is_prediction) &&
      matchesBooleanFilter(question.is_self_test, adminQuestionFilters.is_self_test) &&
      matchesBooleanFilter(question.is_ai_knowledge, adminQuestionFilters.is_ai_knowledge) &&
      (adminQuestionFilters.status === "all" || question.status === adminQuestionFilters.status) &&
      (!keyword || haystack.includes(keyword))
    );
  }).sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

function matchesBooleanFilter(value, filter) {
  return filter === "all" || String(value) === filter;
}

function renderQuestionRow(question) {
  const needsSource = question.is_final_focus && question.source_status !== "已有书本来源";
  return `
    <tr>
      <td>${escapeHTML(question.question_content.slice(0, 46))}${question.question_content.length > 46 ? "..." : ""}${needsSource ? `<br><span class="source-status missing">待补充</span>` : ""}</td>
      <td>${escapeHTML(getSubject(question.subject_id)?.name || "")}</td>
      <td>${escapeHTML(question.chapter || "未绑定")}</td>
      <td>${escapeHTML(question.question_type)}</td>
      <td>${escapeHTML(questionRelatedText(question) || "未关联")}</td>
      <td>${question.is_prediction ? "是" : "否"}</td>
      <td>${question.is_self_test ? "是" : "否"}</td>
      <td>${question.is_ai_knowledge ? "是" : "否"}</td>
      <td><span class="status-badge ${question.status}">${statusLabel(question.status)}</span></td>
      <td>${escapeHTML(question.updated_at)}</td>
      <td class="table-actions">
        <button class="small-button" data-action="edit-question" data-id="${question.id}">编辑</button>
        <button class="small-button" data-action="publish-question" data-id="${question.id}">确认发布</button>
        <button class="small-button" data-action="hide-question" data-id="${question.id}">隐藏</button>
        <button class="danger-button" data-action="archive-question" data-id="${question.id}">归档</button>
      </td>
    </tr>
  `;
}

function renderQuestionDrawer(questionId) {
  const isNew = questionId === "new";
  const question = isNew ? emptyQuestionDraft() : data.questions.find((item) => item.id === questionId);
  if (!question) return "";
  const points = data.key_points.filter((point) => point.subject_id === question.subject_id);
  return `
    <div class="drawer-backdrop">
      <aside class="question-drawer">
        <div class="drawer-head">
          <div>
            <p class="eyebrow">${isNew ? "New Question" : "Edit Question"}</p>
            <h2>${isNew ? "新增题目" : "编辑题目"}</h2>
          </div>
          <button class="small-button" data-action="close-question-drawer">关闭</button>
        </div>
        <form class="admin-form drawer-form" data-form="admin-question-library" data-question-id="${escapeHTML(question.id)}">
          <label>所属科目<select name="subject_id" data-drawer-subject>${subjectOptions(question.subject_id)}</select></label>
          <label>所属章节<input name="chapter" value="${escapeHTML(question.chapter)}" placeholder="例如 第一章" /></label>
          <label>题型<select name="question_type">${QUESTION_TYPES.map((type) => `<option value="${type}" ${question.question_type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label>
          <label>来源<input name="source" value="${escapeHTML(question.source)}" placeholder="例如 教材第78页" /></label>
          <label>来源状态<select name="source_status">${["已有书本来源", "缺书本来源", "待补拍"].map((status) => `<option value="${status}" ${question.source_status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
          <label>难度<select name="difficulty">${["easy", "medium", "hard"].map((value) => `<option value="${value}" ${question.difficulty === value ? "selected" : ""}>${difficultyLabel(value)}</option>`).join("")}</select></label>
          <label>重要程度<select name="importance">${["high", "medium", "low"].map((value) => `<option value="${value}" ${question.importance === value ? "selected" : ""}>${importanceLabel(value)}</option>`).join("")}</select></label>
          <label>预测程度<select name="prediction_level">${["high", "medium", "low"].map((value) => `<option value="${value}" ${question.prediction_level === value ? "selected" : ""}>${probabilityLabel(value)}</option>`).join("")}</select></label>
          <label>状态<select name="status">${QUESTION_STATUSES.map((status) => `<option value="${status}" ${question.status === status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}</select></label>
          <label class="wide">关联知识点<select name="key_point_ids" multiple size="6">${points.map((point) => `<option value="${point.id}" ${question.key_point_ids.includes(point.id) ? "selected" : ""}>${escapeHTML(point.chapter)} · ${escapeHTML(point.title)}</option>`).join("")}</select></label>
          <label class="wide">知识点标签<input name="tags" value="${escapeHTML(question.tags.join("、"))}" placeholder="用顿号或逗号分隔，可用于没有知识点记录的题目" /></label>
          <label class="wide">题目内容<textarea name="question_content" required>${escapeHTML(question.question_content)}</textarea></label>
          <label class="wide">选择题选项<textarea name="options" placeholder="一行一个选项，非选择题可留空">${escapeHTML(question.options.join("\n"))}</textarea></label>
          <label class="wide">参考答案<textarea name="correct_answer">${escapeHTML(question.correct_answer)}</textarea></label>
          <label class="wide">答案解析<textarea name="explanation">${escapeHTML(question.explanation)}</textarea></label>
          <label class="wide">速记<textarea name="memory_tip" placeholder="可选，用于学生端记忆卡展示">${escapeHTML(question.memory_tip || "")}</textarea></label>
          <label>是否预测题<select name="is_prediction">${yesNoOptions(question.is_prediction)}</select></label>
          <label>是否用于自测<select name="is_self_test">${yesNoOptions(question.is_self_test)}</select></label>
          <label>是否加入 AI 知识库<select name="is_ai_knowledge">${yesNoOptions(question.is_ai_knowledge)}</select></label>
          <label>是否公开<select name="is_public">${yesNoOptions(question.is_public)}</select></label>
          <button class="primary-button" type="submit">${isNew ? "保存题目" : "保存修改"}</button>
        </form>
      </aside>
    </div>
  `;
}

function emptyQuestionDraft() {
  return {
    id: "new",
    subject_id: currentSubjectId,
    chapter: "",
    key_point_ids: [],
    question_type: "简答题",
    question_content: "",
    options: [],
    correct_answer: "",
    explanation: "",
    source: "管理员录入",
    source_status: "已有书本来源",
    tags: [],
    memory_tip: "",
    difficulty: "medium",
    importance: "medium",
    prediction_level: "medium",
    is_prediction: false,
    is_self_test: true,
    is_ai_knowledge: true,
    is_public: false,
    status: "draft",
    created_by: "u-admin",
    created_at: today(),
    updated_at: today(),
  };
}

function yesNoOptions(value) {
  return `
    <option value="true" ${value ? "selected" : ""}>是</option>
    <option value="false" ${!value ? "selected" : ""}>否</option>
  `;
}

function questionFromForm(form, existing = emptyQuestionDraft()) {
  const subjectId = String(form.get("subject_id") || currentSubjectId);
  return normalizeQuestion({
    ...existing,
    subject_id: subjectId,
    chapter: String(form.get("chapter") || "").trim(),
    key_point_ids: form.getAll("key_point_ids"),
    question_type: String(form.get("question_type") || "简答题"),
    question_content: String(form.get("question_content") || "").trim(),
    options: parseOptions(form.get("options")),
    correct_answer: String(form.get("correct_answer") || "").trim(),
    explanation: String(form.get("explanation") || "").trim(),
    source: String(form.get("source") || "管理员录入"),
    source_status: String(form.get("source_status") || existing.source_status || "已有书本来源"),
    tags: String(form.get("tags") || "").split(/[、,，]/).map((tag) => tag.trim()).filter(Boolean),
    memory_tip: String(form.get("memory_tip") || "").trim(),
    difficulty: String(form.get("difficulty") || "medium"),
    importance: String(form.get("importance") || "medium"),
    prediction_level: String(form.get("prediction_level") || "medium"),
    is_prediction: form.get("is_prediction") === "true",
    is_self_test: form.get("is_self_test") === "true",
    is_ai_knowledge: form.get("is_ai_knowledge") === "true",
    is_public: form.get("is_public") === "true",
    status: String(form.get("status") || "draft"),
    updated_at: today(),
  });
}

function parseBulkQuestions(form) {
  const subjectId = String(form.get("subject_id") || currentSubjectId);
  const source = String(form.get("source") || "AI 生成");
  const fallbackType = String(form.get("question_type") || "简答题");
  const fallbackChapter = String(form.get("chapter") || "").trim();
  const rawText = String(form.get("bulk_text") || "").trim();
  if (rawText.includes("【题目】")) {
    return rawText.split(/(?=【题型】)/).map((block) => block.trim()).filter(Boolean).map((block) => {
      const field = (name) => block.match(new RegExp(`【${name}】([^\\n]*)`))?.[1]?.trim() || "";
      const subject = data.subjects.find((item) => item.name === field("科目"));
      const resolvedSubjectId = subject?.id || subjectId;
      const pointNames = field("知识点").split(/[、,，]/).map((value) => value.trim()).filter(Boolean);
      const pointIds = data.key_points.filter((point) => point.subject_id === resolvedSubjectId && pointNames.some((name) => point.title.includes(name) || name.includes(point.title))).map((point) => point.id);
      const level = { 高: "high", 中: "medium", 低: "low" }[field("预测程度")] || "medium";
      return normalizeQuestion({
        id: uid("q"), subject_id: resolvedSubjectId, chapter: field("章节") || fallbackChapter,
        key_point_ids: pointIds, question_type: field("题型") || fallbackType,
        question_content: field("题目"), options: parseOptions(field("选项")),
        correct_answer: field("答案"), explanation: field("解析") || "待管理员补充解析。",
        source, difficulty: "medium", importance: "medium", prediction_level: level,
        is_prediction: field("是否预测") === "是", is_self_test: field("是否自测") !== "否",
        is_ai_knowledge: field("是否AI引用") !== "否", is_public: false, status: "pending_review",
        created_by: "u-admin", created_at: today(), updated_at: today(),
      });
    }).filter((question) => question.question_content);
  }
  const lines = rawText
    .split(/\n+/)
    .map((line) => line.replace(/^\s*\d+[.、]\s*/, "").trim())
    .filter(Boolean);
  return lines.map((line) => {
    const matchedPoint = subjectKnowledgePoints(subjectId).find((point) => line.includes(point.title) || point.title.includes(line.slice(0, 8)));
    const type = guessQuestionType(line, fallbackType);
    return normalizeQuestion({
      id: uid("q"),
      subject_id: subjectId,
      chapter: fallbackChapter || matchedPoint?.chapter || "",
      key_point_ids: matchedPoint ? [matchedPoint.id] : [],
      question_type: type,
      question_content: line,
      options: [],
      correct_answer: "",
      explanation: matchedPoint ? `可结合知识点“${matchedPoint.title}”作答。` : "待管理员补充解析。",
      source,
      difficulty: "medium",
      importance: "medium",
      prediction_level: "medium",
      is_prediction: true,
      is_self_test: true,
      is_ai_knowledge: true,
      is_public: false,
      status: "pending_review",
      created_by: "u-admin",
      created_at: today(),
      updated_at: today(),
    });
  });
}

function guessQuestionType(text, fallbackType) {
  if (/判断|是否正确|对不对/.test(text)) return "判断题";
  if (/填空|____|（）/.test(text)) return "填空题";
  if (/解释|什么是|概念|内涵/.test(text)) return "名词解释";
  if (/计算|费用|利息|公式/.test(text)) return "计算题";
  if (/案例|分析/.test(text)) return "案例分析题";
  if (/论述|谈谈/.test(text)) return "论述题";
  return fallbackType;
}

function renderAdminComments() {
  return `
    <section class="admin-card">
      <h2>评论管理</h2>
      <table>
        <thead><tr><th>科目</th><th>重点</th><th>发布人</th><th>内容</th><th>时间</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          ${data.comments.map((comment) => {
            const point = data.key_points.find((item) => item.id === comment.key_point_id);
            const user = data.users.find((item) => item.id === comment.user_id);
            return `
              <tr>
                <td>${escapeHTML(getSubject(comment.subject_id)?.name || "")}</td>
                <td>${escapeHTML(point?.title || "")}</td>
                <td>${escapeHTML(user?.nickname || "")}</td>
                <td>${escapeHTML(comment.content)}</td>
                <td>${escapeHTML(comment.created_at)}</td>
                <td>${comment.is_deleted ? "已删除" : "显示中"}</td>
                <td><button class="danger-button" data-action="delete-comment" data-id="${comment.id}" ${comment.is_deleted ? "disabled" : ""}>删除及回复</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAdminKnowledge() {
  return `
    <section class="admin-card">
      <h2>AI 资料库管理</h2>
      <p class="muted">每个科目的公开重点，以及题目库中“是否加入 AI 知识库 = 是、状态 = 已发布”的题目，会进入当前科目的模拟资料库。AI 回答不会跨科目使用资料。</p>
      <table>
        <thead><tr><th>科目</th><th>重点资料</th><th>题目资料</th><th>资料状态</th></tr></thead>
        <tbody>
          ${data.subjects.map((subject) => {
            const count = subjectKnowledgePoints(subject.id).length + subjectAiQuestions(subject.id).length;
            return `<tr><td>${escapeHTML(subject.name)}</td><td>${subjectKnowledgePoints(subject.id).length}</td><td>${subjectAiQuestions(subject.id).length}</td><td>${count ? "可回答" : "资料为空"}</td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAdminLogs() {
  return `
    <section class="admin-card">
      <h2>AI 调用记录</h2>
      <table>
        <thead><tr><th>匿名身份</th><th>科目</th><th>问题</th><th>是否命中</th><th>引用资料</th><th>时间</th></tr></thead>
        <tbody>
          ${data.ai_qa_logs.length ? data.ai_qa_logs.map((log) => {
            const user = data.users.find((item) => item.id === log.user_id);
            const cited = log.cited_key_point_ids.map((id) => data.key_points.find((point) => point.id === id)?.title).filter(Boolean).join("、");
            return `
              <tr>
                <td>${escapeHTML(user ? `匿名-${user.id.slice(-6)}` : "匿名")}</td>
                <td>${escapeHTML(getSubject(log.subject_id)?.name || "")}</td>
                <td>${escapeHTML(log.question)}</td>
                <td>${log.is_knowledge_hit ? "命中" : "未命中"}</td>
                <td>${escapeHTML(cited || "无")}</td>
                <td>${escapeHTML(log.created_at)}</td>
              </tr>
            `;
          }).join("") : `<tr><td colspan="6">暂无 AI 调用记录</td></tr>`}
        </tbody>
      </table>
    </section>
  `;
}

document.addEventListener("submit", async (event) => {
  const target = event.target;
  if (target.id === "anonymousEntryForm") {
    event.preventDefault();
    await startAnonymousReview();
    return;
  }

  if (target.id === "recoveryForm") {
    event.preventDefault();
    const now = Date.now();
    session.recoveryAttempts = (session.recoveryAttempts || []).filter((time) => now - time < RECOVERY_WINDOW_MS);
    if (session.recoveryAttempts.length >= RECOVERY_MAX_ATTEMPTS) {
      $("#recoveryError").textContent = "尝试次数过多，请 15 分钟后再试";
      return;
    }
    session.recoveryAttempts.push(now);
    const code = $("#recoveryCodeInput").value.trim().toUpperCase();
    if (code.length < 8) {
      $("#recoveryError").textContent = "请输入完整的进度恢复码";
      saveSession();
      return;
    }
    const codeHash = await hashText(code);
    const user = data.users.find((item) => item.role === "student" && item.recovery_code_hash === codeHash);
    if (!user) {
      $("#recoveryError").textContent = "未找到对应进度，请检查恢复码";
      saveSession();
      return;
    }
    session.user = user;
    session.admin = false;
    session.recoveryAttempts = [];
    touchStudent();
    saveData();
    saveSession();
    render();
    toast("学习进度已恢复");
    return;
  }

  if (target.id === "adminLoginForm") {
    event.preventDefault();
    const form = new FormData(target);
    const passwordHash = await hashText(form.get("password") || "");
    if (form.get("account") === "admin" && passwordHash === ADMIN_DEMO_PASSWORD_HASH) {
      session.admin = true;
      saveSession();
      renderAdmin();
      showView("adminView");
      toast("已进入管理员后台");
    } else {
      $("#adminError").textContent = "账号或密码错误";
    }
    return;
  }

  const formType = target.dataset.form;
  if (!formType) return;
  event.preventDefault();
  const form = new FormData(target);

  if (formType === "ai") {
    const question = String(form.get("question") || "").trim();
    if (!question) return toast("请输入问题");
    if (getAiLeft() <= 0) return toast("今日 AI 提问次数已用完，请明天再试");
    const result = answerAi(question);
    useAiOnce();
    session.lastAiAnswer = result.text;
    session.aiDraft = "";
    data.ai_qa_logs.unshift({
      id: uid("log"),
      user_id: session.user.id,
      subject_id: currentSubjectId,
      question,
      answer: result.text,
      cited_key_point_ids: result.cited,
      cited_question_ids: result.citedQuestions || [],
      is_knowledge_hit: result.hit,
      token_usage: Math.max(120, result.text.length),
      created_at: nowText(),
    });
    saveData();
    saveSession();
    renderSubject();
    return;
  }

  if (formType === "self-test") {
    const question = data.questions.find((item) => item.id === target.dataset.questionId);
    if (!question) return toast("题目不存在");
    const answer = String(form.get("answer") || "").trim();
    if (!answer) return toast("请先写下你的答案");
    const feedback = gradeSelfTest(question, answer);
    selfTestFeedback[question.id] = feedback;
    recordAnswer(question, answer, feedback);
    renderSubject();
    return;
  }

  if (formType === "practice-answer") {
    const question = data.questions.find((item) => item.id === target.dataset.questionId);
    if (!question) return toast("题目不存在");
    const answer = String(form.get("answer") || "").trim();
    if (!answer) return toast("请先写下你的答案");
    const feedback = gradeSelfTest(question, answer);
    selfTestFeedback[question.id] = feedback;
    recordAnswer(question, answer, feedback);
    renderSubject();
    return;
  }

  if (formType === "comment" || formType === "reply") {
    const content = String(form.get("content") || "").trim();
    if (!content) return toast("评论内容不能为空");
    const pointId = target.dataset.pointId;
    const point = data.key_points.find((item) => item.id === pointId);
    data.comments.push({
      id: uid("c"),
      subject_id: point.subject_id,
      key_point_id: pointId,
      parent_comment_id: formType === "reply" ? target.dataset.parentId : null,
      content,
      user_id: session.user.id,
      user_role: session.admin ? "admin" : "student",
      is_deleted: false,
      created_at: nowText(),
      updated_at: nowText(),
    });
    replyingTo = "";
    expandedComments.add(pointId);
    saveData();
    renderSubject();
    return;
  }

  if (formType === "admin-subject") {
    data.subjects.push({
      id: uid("s"),
      name: String(form.get("name")).trim(),
      description: String(form.get("description")).trim(),
      exam_date: String(form.get("exam_date") || "").trim(),
      exam_time: String(form.get("exam_time") || "").trim(),
      exam_location: String(form.get("exam_location") || "").trim(),
      admin_id: "u-admin",
      is_open: form.get("is_open") === "true",
      created_at: today(),
      updated_at: today(),
    });
    saveData();
    renderAdmin();
    toast("科目已新增");
    return;
  }

  if (formType === "admin-point") {
    const title = String(form.get("title")).trim();
    const pageRange = String(form.get("page_range") || "").trim();
    const content = String(form.get("content") || "").trim() || `期末重点目录：${title}。请结合教材对应页码复习：${pageRange || "页码待补充"}。`;
    data.key_points.push({
      id: uid("kp"),
      subject_id: form.get("subject_id"),
      chapter: String(form.get("chapter")).trim(),
      sequence: Number(form.get("sequence") || 1),
      title,
      content,
      page_range: pageRange,
      importance: form.get("importance"),
      ai_enabled: form.get("ai_enabled") === "true",
      source: String(form.get("source") || "").trim() || "期末重点目录",
      is_public: true,
      editor_id: "u-admin",
      sort_order: data.key_points.length + 1,
      created_at: today(),
      updated_at: today(),
    });
    saveData();
    renderAdmin();
    toast("重点已新增");
    return;
  }

  if (formType === "focus-question-edit") {
    const question = data.questions.find((item) => item.id === target.dataset.questionId && item.is_final_focus);
    if (!question) return toast("重点题目不存在");
    question.order = Number(form.get("order") || question.order);
    question.title = String(form.get("title") || "").trim();
    question.question_content = question.title;
    question.question_type = String(form.get("question_type") || "简答题");
    question.correct_answer = String(form.get("answer") || "").trim();
    question.source = String(form.get("source") || "").trim();
    question.memory_tip = String(form.get("memory_tip") || "").trim();
    question.source_status = String(form.get("source_status") || "待补拍");
    question.mastery_status = String(form.get("mastery_status") || "未开始");
    question.tags = String(form.get("tags") || "").split(/[、,，]/).map((tag) => tag.trim()).filter(Boolean);
    question.note = String(form.get("note") || "").trim();
    question.updated_at = today();
    focusDrawerEditing = false;
    saveData();
    renderSubject();
    renderAdmin();
    toast("重点题目已保存");
    return;
  }

  if (formType === "admin-question-library") {
    const existing = data.questions.find((question) => question.id === target.dataset.questionId);
    const question = questionFromForm(form, existing || { ...emptyQuestionDraft(), id: uid("q"), created_at: today() });
    if (existing) {
      Object.assign(existing, question);
    } else {
      data.questions.unshift(question);
    }
    questionDrawerId = "";
    saveData();
    renderAdmin();
    renderSubject();
    toast("题目已保存");
    return;
  }

  if (formType === "admin-question-bulk") {
    const questions = parseBulkQuestions(form);
    if (!questions.length) return toast("没有识别到题目");
    data.questions.unshift(...questions);
    questionDrawerId = "";
    saveData();
    renderAdmin();
    toast(`AI 已解析 ${questions.length} 道题，默认待确认`);
    return;
  }

});

document.addEventListener("input", (event) => {
  if (event.target.id === "pointSearch") {
    session.pointSearch = event.target.value;
    saveSession();
    renderSubject();
  }
  const adminQuestionFilter = event.target.dataset.adminQuestionFilter;
  if (adminQuestionFilter) {
    adminQuestionFilters[adminQuestionFilter] = event.target.value;
    renderAdmin();
  }
});

document.addEventListener("change", (event) => {
  const adminQuestionFilter = event.target.dataset.adminQuestionFilter;
  if (adminQuestionFilter) {
    adminQuestionFilters[adminQuestionFilter] = event.target.value;
    renderAdmin();
  }
  const practiceFilter = event.target.dataset.practiceFilter;
  if (practiceFilter === "chapter") practiceChapterFilter = event.target.value;
  if (practiceFilter === "point") practicePointFilter = event.target.value;
  if (practiceFilter === "status") practiceStatusFilter = event.target.value;
  if (practiceFilter) {
    practiceFocusId = "";
    renderSubject();
  }
  const wrongFilter = event.target.dataset.wrongFilter;
  if (wrongFilter === "point") wrongPointFilter = event.target.value;
  if (wrongFilter === "sort") wrongSort = event.target.value;
  if (wrongFilter === "mastered") hideMasteredWrong = event.target.checked;
  if (wrongFilter) renderSubject();
  const focusFilter = event.target.dataset.focusFilter;
  if (focusFilter === "type") focusTypeFilter = event.target.value;
  if (focusFilter === "source") focusSourceFilter = event.target.value;
  if (focusFilter === "mastery") focusMasteryFilter = event.target.value;
  if (focusFilter) renderSubject();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;

  if (button.id === "openAdminLogin" || button.id === "goAdminFromHome") {
    if (!session.user) {
      session.user = {
        id: "guest-admin-viewer",
        nickname: "访客",
        role: "guest",
        status: "active",
        created_at: today(),
        updated_at: today(),
      };
      saveSession();
      showApp();
    }
    renderAdminLogin();
    showView("adminLoginView");
    return;
  }

  if (button.id === "logoutStudent") {
    session = { user: null, admin: false, aiUsage: session.aiUsage || {}, recoveryAttempts: [] };
    saveSession();
    render();
    return;
  }

  if (button.id === "homeLogo") {
    if (session.user?.role === "guest") {
      session = { user: null, admin: false, aiUsage: session.aiUsage || {}, recoveryAttempts: [] };
      saveSession();
      render();
      return;
    }
    session.admin = false;
    saveSession();
    renderHome();
    showView("homeView");
    return;
  }

  if (!action) return;

  if (action === "start-anonymous-review") {
    event.preventDefault();
    startAnonymousReview();
    return;
  }

  if (action === "start-review" || action === "start-today-review") {
    resetFocusState();
    continueStudy();
  }

  if (action === "home-open-important" || action === "home-open-practice") {
    resetFocusState();
    focusStatusFilter = "not_started";
    const subject = nextExamSubject();
    if (!subject || !openSubjectFocus(subject.id, "", false)) toast("当前暂无可复习内容");
  }

  if (action === "home-open-wrong") {
    resetFocusState();
    focusStatusFilter = "unknown";
    const subject = nextExamSubject();
    if (!subject || !openSubjectFocus(subject.id, "", false)) toast("当前暂无可复习内容");
  }

  if (action === "home-open-last-progress") {
    resetFocusState();
    continueStudy();
  }

  if (action === "enter-subject") {
    currentSubjectId = button.dataset.id;
    activeTab = "points";
    resetFocusState();
    importanceFilter = "all";
    chapterFilter = "all";
    session.lastAiAnswer = "";
    session.currentSubjectId = currentSubjectId;
    focusDrawerId = "";
    saveSession();
    recordSubjectVisit(currentSubjectId);
    renderSubject();
    showView("subjectView");
  }

  if (action === "focus-status-filter") {
    focusStatusFilter = button.dataset.value || "all";
    focusDrawerId = "";
    focusDrawerEditing = false;
    renderSubject();
  }

  if (action === "back-home") {
    if (session.user?.role === "guest") {
      session = { user: null, admin: false, aiUsage: session.aiUsage || {}, recoveryAttempts: [] };
      saveSession();
      render();
      return;
    }
    session.admin = false;
    saveSession();
    renderHome();
    showView("homeView");
  }

  if (action === "set-tab") {
    activeTab = button.dataset.value === "ai" ? "ai" : "points";
    practiceFocusId = "";
    renderSubject();
  }

  if (action === "quick-master-focus") {
    const question = data.questions.find((item) => item.id === button.dataset.id && item.is_final_focus);
    if (!question) return;
    question.mastery_status = question.mastery_status === "已掌握" ? "复习中" : "已掌握";
    question.updated_at = today();
    saveData();
    renderSubject();
  }

  if (action === "open-focus-detail") {
    const questionId = button.dataset.id;
    focusListScrollY = window.scrollY;
    focusDrawerId = questionId;
    focusDrawerEditing = false;
    reviewProgressService()?.setCurrentQuestion(currentSubjectId, questionId);
    renderSubject();
  }

  if (action === "focus-detail-prev" || action === "focus-detail-next") {
    moveFocusDetail(action === "focus-detail-next" ? 1 : -1);
  }

  if (action === "focus-mark-known") {
    const questionId = button.dataset.id;
    if (questionId) reviewProgressService()?.markKnown(questionId, currentSubjectId);
    renderSubject();
  }

  if (action === "focus-mark-unknown") {
    const questionId = button.dataset.id;
    if (questionId) reviewProgressService()?.markUnknown(questionId, currentSubjectId);
    renderSubject();
  }

  if (action === "focus-toggle-favorite") {
    const questionId = button.dataset.id;
    if (questionId) reviewProgressService()?.toggleFavorite(questionId);
    renderSubject();
  }

  if (action === "edit-focus-question") {
    focusDrawerId = button.dataset.id;
    focusDrawerEditing = true;
    renderSubject();
  }

  if (action === "close-focus-drawer") {
    focusDrawerId = "";
    focusDrawerEditing = false;
    renderSubject();
    requestAnimationFrame(() => window.scrollTo({ top: focusListScrollY, behavior: "auto" }));
  }

  if (action === "question-type-filter") {
    questionTypeFilter = button.dataset.value;
    renderSubject();
  }

  if (action === "prediction-level-filter") {
    predictionLevelFilter = button.dataset.value;
    renderSubject();
  }

  if (action === "practice-mode") {
    practiceMode = button.dataset.value;
    const available = subjectPracticeQuestions(currentSubjectId);
    practiceFocusId = practiceMode === "random" && available.length
      ? available[Math.floor(Math.random() * available.length)].id
      : "";
    renderSubject();
  }

  if (action === "importance-filter") {
    importanceFilter = button.dataset.value;
    renderSubject();
  }

  if (action === "chapter-filter") {
    chapterFilter = button.dataset.value;
    renderSubject();
  }

  if (action === "clear-search") {
    session.pointSearch = "";
    saveSession();
    renderSubject();
  }

  if (action === "toggle-chapter") {
    const chapter = button.dataset.chapter;
    collapsedChapters.has(chapter) ? collapsedChapters.delete(chapter) : collapsedChapters.add(chapter);
    renderSubject();
  }

  if (action === "toggle-details") {
    expandedDetails.has(button.dataset.id) ? expandedDetails.delete(button.dataset.id) : expandedDetails.add(button.dataset.id);
    renderSubject();
  }

  if (action === "toggle-self-test") {
    expandedSelfTests.has(button.dataset.id) ? expandedSelfTests.delete(button.dataset.id) : expandedSelfTests.add(button.dataset.id);
    renderSubject();
  }

  if (action === "answer-choice") {
    const question = data.questions.find((item) => item.id === button.dataset.questionId);
    if (!question) return;
    const feedback = gradeSelfTest(question, button.dataset.answer);
    selfTestFeedback[question.id] = feedback;
    recordAnswer(question, button.dataset.answer, feedback);
    renderSubject();
  }

  if (action === "answer-practice-choice") {
    const question = data.questions.find((item) => item.id === button.dataset.questionId);
    if (!question) return;
    const feedback = gradeSelfTest(question, button.dataset.answer);
    selfTestFeedback[question.id] = feedback;
    recordAnswer(question, button.dataset.answer, feedback);
    renderSubject();
  }

  if (action === "next-practice") {
    practiceMode = "random";
    const available = subjectPracticeQuestions(currentSubjectId).filter((question) => question.id !== practiceFocusId);
    practiceFocusId = available.length ? available[Math.floor(Math.random() * available.length)].id : practiceFocusId;
    renderSubject();
  }

  if (action === "retry-wrong") {
    practiceFocusId = button.dataset.questionId;
    practiceMode = "all";
    activeTab = "practice";
    renderSubject();
  }

  if (action === "mark-wrong-mastered") {
    const record = data.wrong_questions.find((item) => item.id === button.dataset.id && item.student_id === currentStudentId());
    if (!record) return;
    record.mastery_status = record.mastery_status === "已掌握" ? "复习中" : "已掌握";
    saveData();
    renderSubject();
    renderHome();
  }

  if (action === "reset-self-test") {
    delete selfTestFeedback[button.dataset.questionId];
    renderSubject();
  }

  if (action === "toggle-comments") {
    expandedComments.has(button.dataset.id) ? expandedComments.delete(button.dataset.id) : expandedComments.add(button.dataset.id);
    renderSubject();
  }

  if (action === "reply-comment") {
    replyingTo = replyingTo === button.dataset.id ? "" : button.dataset.id;
    renderSubject();
  }

  if (action === "quick-ai") {
    activeTab = "ai";
    const question = button.dataset.question;
    if (getAiLeft() <= 0) {
      toast("今日 AI 提问次数已用完，请明天再试");
      return;
    }
    const result = answerAi(question);
    useAiOnce();
    session.lastAiAnswer = result.text;
    data.ai_qa_logs.unshift({
      id: uid("log"),
      user_id: session.user.id,
      subject_id: currentSubjectId,
      question,
      answer: result.text,
      cited_key_point_ids: result.cited,
      cited_question_ids: result.citedQuestions || [],
      is_knowledge_hit: result.hit,
      token_usage: Math.max(120, result.text.length),
      created_at: nowText(),
    });
    saveData();
    saveSession();
    renderSubject();
  }

  if (action === "fill-ai-draft") {
    session.aiDraft = button.dataset.question;
    saveSession();
    renderSubject();
  }

  if (action === "dismiss-recovery-code") {
    delete session.pendingRecoveryCode;
    saveSession();
    renderHome();
  }

  if (action === "admin-page") {
    activeAdminPage = button.dataset.value;
    questionDrawerId = "";
    renderAdmin();
  }

  if (action === "admin-logout") {
    if (session.user?.role === "guest") {
      session = { user: null, admin: false, aiUsage: session.aiUsage || {}, recoveryAttempts: [] };
      saveSession();
      render();
      return;
    }
    session.admin = false;
    saveSession();
    renderHome();
    showView("homeView");
  }

  if (action === "toggle-subject") {
    const subject = getSubject(button.dataset.id);
    subject.is_open = !subject.is_open;
    subject.updated_at = today();
    saveData();
    renderAdmin();
  }

  if (action === "save-exam-info") {
    const subject = getSubject(button.dataset.id);
    const dateInput = document.querySelector(`[data-exam-field="exam_date"][data-id="${button.dataset.id}"]`);
    const timeInput = document.querySelector(`[data-exam-field="exam_time"][data-id="${button.dataset.id}"]`);
    const locationInput = document.querySelector(`[data-exam-field="exam_location"][data-id="${button.dataset.id}"]`);
    subject.exam_date = dateInput?.value.trim() || "";
    subject.exam_time = timeInput?.value.trim() || "";
    subject.exam_location = locationInput?.value.trim() || "";
    subject.updated_at = today();
    saveData();
    renderAdmin();
    renderHome();
    renderSubject();
    toast("考试信息已保存");
  }

  if (action === "delete-subject") {
    if (!window.confirm("删除科目会同时删除关联重点、题目和评论，确定继续吗？")) return;
    const subjectId = button.dataset.id;
    logOperation("delete", "subject", subjectId, { name: getSubject(subjectId)?.name || "" });
    data.subjects = data.subjects.filter((subject) => subject.id !== subjectId);
    data.key_points = data.key_points.filter((point) => point.subject_id !== subjectId);
    data.questions = data.questions.filter((question) => question.subject_id !== subjectId);
    data.comments = data.comments.filter((comment) => comment.subject_id !== subjectId);
    currentSubjectId = data.subjects[0]?.id || "";
    saveData();
    renderAdmin();
    toast("科目及关联资料已删除");
  }

  if (action === "toggle-point-public") {
    const point = data.key_points.find((item) => item.id === button.dataset.id);
    point.is_public = !point.is_public;
    point.updated_at = today();
    saveData();
    renderAdmin();
  }

  if (action === "save-point-info") {
    const point = data.key_points.find((item) => item.id === button.dataset.id);
    const fieldValue = (field) => document.querySelector(`[data-point-field="${field}"][data-id="${button.dataset.id}"]`)?.value.trim() || "";
    point.chapter = fieldValue("chapter");
    point.sequence = Number(fieldValue("sequence") || 1);
    point.title = fieldValue("title");
    point.page_range = fieldValue("page_range");
    point.importance = fieldValue("importance") || "high";
    point.ai_enabled = fieldValue("ai_enabled") !== "false";
    point.content = `期末重点目录：${point.title}。请结合教材对应页码复习：${point.page_range || "页码待补充"}。`;
    point.source = point.source || "期末重点目录";
    point.updated_at = today();
    saveData();
    renderAdmin();
    renderHome();
    renderSubject();
    toast("重点已保存");
  }

  if (action === "delete-point") {
    if (!window.confirm("确定删除这个重点及其关联评论吗？")) return;
    const pointId = button.dataset.id;
    logOperation("delete", "key_point", pointId);
    data.key_points = data.key_points.filter((point) => point.id !== pointId);
    data.comments = data.comments.filter((comment) => comment.key_point_id !== pointId);
    saveData();
    renderAdmin();
    toast("重点已删除");
  }

  if (action === "new-question") {
    questionDrawerId = "new";
    renderAdmin();
  }

  if (action === "edit-question") {
    questionDrawerId = button.dataset.id;
    renderAdmin();
  }

  if (action === "close-question-drawer") {
    questionDrawerId = "";
    renderAdmin();
  }

  if (action === "publish-question") {
    const question = data.questions.find((item) => item.id === button.dataset.id);
    question.status = "published";
    question.is_public = true;
    if (question.is_final_focus) {
      question.is_prediction = true;
      question.is_self_test = true;
      question.is_ai_knowledge = true;
    }
    question.updated_at = today();
    logOperation("publish", "question", question.id);
    saveData();
    renderAdmin();
    renderSubject();
    toast("题目已确认发布");
  }

  if (action === "hide-question") {
    const question = data.questions.find((item) => item.id === button.dataset.id);
    question.status = "hidden";
    question.is_public = false;
    question.updated_at = today();
    logOperation("hide", "question", question.id);
    saveData();
    renderAdmin();
    renderSubject();
    toast("题目已隐藏");
  }

  if (action === "archive-question") {
    if (!window.confirm("确定归档这道题吗？归档后学生不可见。")) return;
    const question = data.questions.find((item) => item.id === button.dataset.id);
    question.status = "archived";
    question.is_public = false;
    question.updated_at = today();
    logOperation("archive", "question", question.id);
    saveData();
    renderAdmin();
    renderSubject();
    toast("题目已归档");
  }

  if (action === "bulk-publish-questions") {
    filteredAdminQuestions().forEach((question) => {
      question.status = "published";
      question.is_public = true;
      question.updated_at = today();
    });
    saveData();
    renderAdmin();
    renderSubject();
    toast("当前筛选题目已批量发布");
  }

  if (action === "bulk-hide-questions") {
    filteredAdminQuestions().forEach((question) => {
      question.status = "hidden";
      question.is_public = false;
      question.updated_at = today();
    });
    saveData();
    renderAdmin();
    renderSubject();
    toast("当前筛选题目已批量隐藏");
  }

  if (action === "delete-comment") {
    deleteCommentTree(button.dataset.id);
    saveData();
    renderAdmin();
    toast("评论及其回复已删除");
  }

});

function resetFocusState() {
  focusView = "all";
  focusStatusFilter = "all";
  focusTypeFilter = "all";
  focusSourceFilter = "all";
  focusMasteryFilter = "all";
  focusAdvancedOpen = false;
  focusDisplayMode = "list";
  focusReviewIndex = 0;
  focusDrawerId = "";
  focusDrawerEditing = false;
}

function focusVisibleQuestions() {
  const subject = getSubject(currentSubjectId);
  return subject ? finalFocusQuestions(subject.id).filter((question) => focusQuestionMatchesStatus(question)) : [];
}

function moveFocusReview(delta) {
  if (focusDisplayMode !== "review") return;
  const questions = focusVisibleQuestions();
  if (!questions.length) return;
  focusReviewIndex = Math.max(0, Math.min(questions.length - 1, focusReviewIndex + delta));
  renderSubject();
  requestAnimationFrame(() => {
    document.querySelector(`[data-focus-review-card="${focusReviewIndex}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  });
}

function moveFocusDetail(delta) {
  if (!focusDrawerId || focusDrawerEditing) return;
  const questions = focusVisibleQuestions();
  const currentIndex = questions.findIndex((question) => question.id === focusDrawerId);
  if (currentIndex < 0) return;
  const nextIndex = currentIndex + delta;
  if (nextIndex < 0 || nextIndex >= questions.length) return;
  focusDrawerId = questions[nextIndex].id;
  reviewProgressService()?.setCurrentQuestion(currentSubjectId, focusDrawerId);
  renderSubject();
  requestAnimationFrame(() => {
    document.querySelector("[data-focus-detail-drawer]")?.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("keydown", (event) => {
  if (activeTab !== "points" || !finalFocusQuestions(currentSubjectId).length) return;
  const tagName = event.target.tagName?.toLowerCase();
  if (["input", "textarea", "select"].includes(tagName) || event.target.isContentEditable) return;
  if (focusDrawerId && !focusDrawerEditing) {
    if (event.key === "ArrowRight") moveFocusDetail(1);
    if (event.key === "ArrowLeft") moveFocusDetail(-1);
    return;
  }
  if (focusDisplayMode !== "review") return;
  if (event.key === "ArrowRight") moveFocusReview(1);
  if (event.key === "ArrowLeft") moveFocusReview(-1);
});

document.addEventListener("touchstart", (event) => {
  if (!focusDrawerId || focusDrawerEditing || !event.target.closest("[data-focus-detail-drawer]")) return;
  const touch = event.changedTouches[0];
  focusDetailTouchStartX = touch.clientX;
  focusDetailTouchStartY = touch.clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (!focusDrawerId || focusDrawerEditing || !event.target.closest("[data-focus-detail-drawer]")) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - focusDetailTouchStartX;
  const deltaY = touch.clientY - focusDetailTouchStartY;
  if (Math.abs(deltaX) < 55 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
  moveFocusDetail(deltaX < 0 ? 1 : -1);
}, { passive: true });

function deleteCommentTree(commentId) {
  data.comments.forEach((comment) => {
    if (comment.id === commentId) {
      comment.is_deleted = true;
      comment.updated_at = nowText();
    }
    if (comment.parent_comment_id === commentId) {
      deleteCommentTree(comment.id);
    }
  });
}

render();
