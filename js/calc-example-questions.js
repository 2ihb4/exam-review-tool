(function () {
  "use strict";

  window.CALC_EXAMPLE_QUESTIONS = [
    {
      id: "calc-project-network-node-6-5",
      methodId: "network-node-time-parameter",
      subject: "工程项目管理",
      subjectId: "project-management",
      order: 21,
      title: "实例 6-5：网络计划节点时间参数计算",
      question_type: "计算题",
      is_calculation: true,
      is_final_focus: true,
      calculation_type: "network_node_time",
      problem_text: "已知某工程项目网络计划如图 6-40 所示，试用节点计算法在图上计算其节点和工作的时间参数。",
      questionText: "已知某工程项目网络计划如图 6-40 所示，试用节点计算法在图上计算其节点和工作的时间参数。",
      formula: "ETj = max(ETi + Dij)；LTi = min(LTj - Dij)；Tc = ETn。",
      formulaHtml: "ET<sub>j</sub> = max(ET<sub>i</sub> + D<sub>ij</sub>)<br>LT<sub>i</sub> = min(LT<sub>j</sub> - D<sub>ij</sub>)<br>T<sub>c</sub> = ET<sub>n</sub>",
      images: [
        "/assets/calc/questions/calc-6-5-question.png"
      ],
      source_images: [
        "/assets/calc/questions/calc-6-5-question.png"
      ],
      answer_images: [
        "/assets/calc/answers/calc-6-5-answer.png"
      ],
      works: [
        { name: "A", from: 1, to: 2, duration: 2 },
        { name: "B", from: 1, to: 3, duration: 4 },
        { name: "C", from: 2, to: 6, duration: 10 },
        { name: "D", from: 4, to: 5, duration: 4 },
        { name: "E", from: 3, to: 7, duration: 6 },
        { name: "G", from: 6, to: 8, duration: 3 },
        { name: "H", from: 7, to: 8, duration: 4 },
        { name: "I", from: 8, to: 9, duration: 2 }
      ],
      virtual_works: [
        { from: 2, to: 4, duration: 0 },
        { from: 3, to: 4, duration: 0 },
        { from: 5, to: 6, duration: 0 },
        { from: 5, to: 7, duration: 0 }
      ],
      standard_steps: [
        "起点节点 1 的最早时间 ET1 = 0。",
        "顺箭线方向计算最早时间，多个紧前工作取最大值。",
        "节点最早时间结果：1 为 0，2 为 2，3 为 4，4 为 4，5 为 8，6 为 12，7 为 10，8 为 15，9 为 17。",
        "终点节点 9 的最早时间为 17，所以计算工期 Tc = 17。",
        "若题目未规定计划工期，则计划工期 Tp = Tc = 17。",
        "从终点节点逆箭线方向计算最迟时间，多个紧后工作取最小值。",
        "节点最迟时间结果：1 为 0，2 为 2，3 为 5，4 为 7，5 为 11，6 为 12，7 为 11，8 为 15，9 为 17。",
        "关键线路为 1 → 2 → 6 → 8 → 9，对应关键工作 A、C、G、I。"
      ],
      standard_answer: "本题采用节点计算法。最早时间顺推取最大值，最迟时间逆推取最小值。计算工期为 17，关键线路为 1 → 2 → 6 → 8 → 9，关键工作为 A、C、G、I。",
      solution_idea: "先算节点最早时间，再算计算工期和计划工期，最后逆推节点最迟时间，并判断关键线路。",
      common_mistakes: [
        "最早时间应取最大值，不是最小值。",
        "最迟时间应取最小值，不是最大值。",
        "虚工作持续时间为 0，但逻辑关系不能忽略。",
        "关键线路不能只看节点，还要看关键工作是否连续。"
      ],
      tags: ["计算题", "网络计划", "节点计算法", "关键线路"]
    },
    {
      id: "calc-project-network-draw-6-1",
      methodId: "aoa-network-drawing",
      subject: "工程项目管理",
      subjectId: "project-management",
      order: 22,
      title: "实例 6-1：根据逻辑关系表绘制双代号网络图",
      question_type: "计算题",
      is_calculation: true,
      is_final_focus: true,
      calculation_type: "network_diagram_drawing",
      problem_text: "根据给出的各工作逻辑关系表，绘制双代号网络图。",
      questionText: "根据给出的各工作逻辑关系表，绘制双代号网络图。",
      formula: "根据紧前工作和紧后工作关系，从左到右绘制双代号网络图；必要时通过节点合并表达逻辑关系。",
      images: [
        "/assets/calc/questions/calc-6-1-question.png"
      ],
      source_images: [
        "/assets/calc/questions/calc-6-1-question.png"
      ],
      answer_images: [
        "/assets/calc/answers/calc-6-1-answer.png"
      ],
      relations: [
        { work: "A", predecessors: [], successors: ["B", "C", "G"] },
        { work: "B", predecessors: ["A"], successors: ["D", "E"] },
        { work: "C", predecessors: ["A"], successors: ["H"] },
        { work: "D", predecessors: ["B"], successors: ["H"] },
        { work: "E", predecessors: ["B"], successors: ["F", "I"] },
        { work: "F", predecessors: ["E"], successors: ["J"] },
        { work: "G", predecessors: ["A"], successors: ["J"] },
        { work: "H", predecessors: ["D", "C"], successors: ["J"] },
        { work: "I", predecessors: ["E"], successors: ["K"] },
        { work: "J", predecessors: ["F", "G", "H"], successors: ["K"] },
        { work: "K", predecessors: ["I", "J"], successors: [] }
      ],
      standard_steps: [
        "先找没有紧前工作的起始工作，本题 A 为起始工作。",
        "A 后续工作为 B、C、G，所以从 A 后分出三条逻辑路径。",
        "B 后续工作为 D、E。",
        "C 和 D 都是 H 的紧前工作，所以 H 必须在 C 和 D 之后。",
        "E 后续工作为 F、I。",
        "F、G、H 都是 J 的紧前工作，所以 J 必须在 F、G、H 之后。",
        "I 和 J 都是 K 的紧前工作，所以 K 为最后收尾工作。",
        "最终绘制的双代号网络图应与标准答案图一致。"
      ],
      standard_answer: "本题应根据紧前、紧后关系逐层绘制。A 为起始工作，K 为最终工作。关键是正确表达 H 同时受 C、D 约束，J 同时受 F、G、H 约束，K 同时受 I、J 约束。",
      solution_idea: "双代号网络图绘制题不要只看一行紧前工作，要同时核对紧后工作，防止漏掉汇合关系。",
      common_mistakes: [
        "只看紧前工作，忽略紧后工作。",
        "多个工作汇合到同一后续工作时画错。",
        "箭线方向画反。",
        "出现多个终点但没有合并。",
        "漏画某些逻辑关系。"
      ],
      tags: ["计算题", "双代号网络图", "逻辑关系", "进度管理"]
    },
    {
      id: "calc-project-cost-factor-7-1",
      methodId: "chain-substitution-cost-factor",
      subject: "工程项目管理",
      subjectId: "project-management",
      order: 23,
      title: "实例 7-1：商品混凝土目标成本与实际成本因素分析",
      question_type: "计算题",
      is_calculation: true,
      is_final_focus: true,
      calculation_type: "chain_substitution_cost",
      problem_text: "商品混凝土目标成本为 395200 元，实际成本为 421668 元，比目标成本增加 26468 元。目标产量 500m³，实际产量 530m³；目标单价 760 元，实际单价 780 元；目标损耗率 4%，实际损耗率 2%。试分析产量、单价、损耗率变化对成本差额的影响。",
      questionText: "商品混凝土目标成本为 395200 元，实际成本为 421668 元，比目标成本增加 26468 元。目标产量 500m³，实际产量 530m³；目标单价 760 元，实际单价 780 元；目标损耗率 4%，实际损耗率 2%。试分析产量、单价、损耗率变化对成本差额的影响。",
      formula: "成本 = 产量 × 单价 ×（1 + 损耗率）",
      images: [
        "/assets/calc/questions/calc-7-1-question.png"
      ],
      source_images: [
        "/assets/calc/questions/calc-7-1-question.png",
        "/assets/calc/answers/calc-7-1-answer-2.png"
      ],
      answer_images: [
        "/assets/calc/answers/calc-7-1-answer-1.png",
        "/assets/calc/answers/calc-7-1-answer-2.png"
      ],
      known_conditions: [
        "目标成本 395200 元",
        "实际成本 421668 元",
        "目标产量 500m³，实际产量 530m³",
        "目标单价 760 元，实际单价 780 元",
        "目标损耗率 4%，实际损耗率 2%"
      ],
      standard_steps: [
        "目标成本 = 500 × 760 × 1.04 = 395200 元。",
        "第一次替代产量因素：530 × 760 × 1.04 = 418912 元。",
        "产量影响 = 418912 - 395200 = 23712 元。",
        "第二次替代单价因素：530 × 780 × 1.04 = 429936 元。",
        "单价影响 = 429936 - 418912 = 11024 元。",
        "第三次替代损耗率因素：530 × 780 × 1.02 = 421668 元。",
        "损耗率影响 = 421668 - 429936 = -8268 元。",
        "各因素影响程度之和 = 23712 + 11024 - 8268 = 26468 元，正好等于实际成本与目标成本的总差额。"
      ],
      standard_answer: "产量增加 30m³，使成本增加 23712 元；单价提高 20 元，使成本增加 11024 元；损耗率下降 2%，使成本减少 8268 元。三个因素合计影响 26468 元。",
      solution_idea: "本题使用连环替代法。先以目标成本为基准，再按照产量、单价、损耗率的顺序逐项替换。每替换一个因素，就用新结果减去上一步结果，差额归属于该因素。",
      common_mistakes: [
        "损耗率 4% 要写成 1.04，2% 要写成 1.02。",
        "每次只能替换一个因素，不能一次替换多个因素。",
        "替代顺序要保持一致。",
        "负数表示该因素使成本减少。",
        "最后要用三个因素影响额之和校验总差额。"
      ],
      tags: ["计算题", "成本管理", "连环替代法", "因素分析"]
    }
  ];
})();
