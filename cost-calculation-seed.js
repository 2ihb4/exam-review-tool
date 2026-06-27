// Auto-generated from user-provided Word review docs.
// Source: 工程造价管理_计算题文档.docx
// Import summary: 计算题 12 道；重点 4 道；不完整 5 道。

window.CostImportReport = { ...(window.CostImportReport || {}), calculation: {
  "key": "calculation",
  "source": "工程造价管理_计算题文档.docx",
  "note": "计算题 12 道；重点 4 道；不完整 5 道。",
  "calculationCount": 12,
  "keyCalculationCount": 4,
  "choiceCount": 90,
  "termCount": 30,
  "shortAnswerCount": 21,
  "incomplete": {
    "calculation": [
      "cost-calc-006",
      "cost-calc-007",
      "cost-calc-010",
      "cost-calc-011",
      "cost-calc-012"
    ],
    "choice": [],
    "term": [],
    "shortAnswer": []
  }
} };

window.CostCalculationSeed = [
  {
    "id": "cost-calc-001",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 1,
    "title": "国产设备原价与设备购置费计算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": true,
    "calculation_type": "国产设备原价与设备购置费计算",
    "formula": "设备购置费 = 设备原价 + 设备运杂费\n国产标准设备原价：一般按设备制造厂交货价、订货合同价或询价确定。\n非标准设备原价 = {[(材料费 + 加工费 + 辅助材料费)×(1 + 专用工具费率)×(1 + 废品损失费率) + 外购配套件费]×(1 + 包装费率) - 外购配套件费}×(1 + 利润率) + 销项税额 + 非标准设备设计费 + 外购配套件费\n材料费 = 材料净重×(1 + 加工损耗系数)×每吨材料综合价\n加工费 = 设备总质量×设备每吨加工费\n销项税额 = 销售额×增值税率",
    "problem_text": "例题：某工厂采购一台国产非标准设备，材料费20万元，加工费2万元，辅助材料费0.4万元，专用工具费率1.5%，废品损失费率10%，外购配套件费5万元，包装费率1%，利润率7%，增值税率17%，非标准设备设计费2万元，求设备原价。",
    "standard_steps": [
      "计算：专用工具费=(20+2+0.4)×1.5%=0.336万元；废品损失费=(20+2+0.4+0.336)×10%=2.274万元；包装费=(20+2+0.4+0.336+2.274+5)×1%=0.3万元。",
      "利润=(20+2+0.4+0.336+2.274+0.3)×7%=1.772万元；销项税额=(20+2+0.4+0.336+2.274+5+0.3+1.772)×17%=5.454万元。"
    ],
    "standard_answer": "答案：国产非标准设备原价=20+2+0.4+0.336+2.274+0.3+1.772+5.454+2+5=39.536万元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题",
      "重点"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-002",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 2,
    "title": "进口设备抵岸价计算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": true,
    "calculation_type": "进口设备抵岸价计算",
    "formula": "进口设备抵岸价 = 货价 + 国际运费 + 运输保险费 + 银行财务费 + 外贸手续费 + 关税 + 增值税 + 消费税 + 海关监管手续费 + 车辆购置税\n货价 = 离岸价(FOB)×人民币外汇汇率\n到岸价(CIF) = 离岸价(FOB) + 国际运费 + 运输保险费\n国际运费 = 原币货价(FOB)×运费率；或：国际运费 = 运量×单位运价\n运输保险费 = [原币货价(FOB)+国外运费]÷(1-保险费率)×保险费率\n银行财务费 = 离岸价(FOB)×人民币外汇汇率×银行财务费率\n外贸手续费 = 到岸价(CIF)×人民币外汇汇率×外贸手续费率\n关税 = 到岸价(CIF)×人民币外汇汇率×进口关税税率\n消费税 = [到岸价(CIF)×人民币外汇汇率 + 关税]÷(1-消费税率)×消费税率\n进口环节增值税 = (关税完税价格 + 关税 + 消费税)×增值税率\n其中：关税完税价格 = 到岸价(CIF)×人民币外汇汇率",
    "problem_text": "例题1：某进口设备人民币货价50万元，国际运费率10%，运输保险费率3%，进口关税税率20%，求应付关税。\n例题2：某进口设备到岸价100万元，银行财务费0.5万元，外贸手续费率1.5%，关税税率20%，增值税率17%，无消费税，求进口设备抵岸价。\n例题3：某项目进口设备FOB为100万美元，国外运费5万美元，运输保险费1万美元，关税税率20%，增值税率17%，无消费税，汇率1美元=8.14元，求增值税。",
    "standard_steps": [
      "计算：运输保险费=(50+50×10%)÷(1-3%)×3%=1.7万元。",
      "计算：外贸手续费=100×1.5%=1.5万元；关税=100×20%=20万元；增值税=(100+20)×17%=20.4万元。"
    ],
    "standard_answer": "答案：关税=(50+50×10%+1.7)×20%=11.34万元。\n答案：进口设备抵岸价=100+0.5+1.5+20+20.4=142.4万元。\n答案：进口环节增值税=(100+5+1)×(1+20%)×17%×8.14=176.02万元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题",
      "重点"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-003",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 3,
    "title": "预备费计算：基本预备费与价差预备费",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": true,
    "calculation_type": "预备费计算：基本预备费与价差预备费",
    "formula": "预备费 = 基本预备费 + 价差预备费\n基本预备费 = (工程费用 + 工程建设其他费用)×基本预备费率\n价差预备费：PF = Σ[ It×((1+f)^m×(1+f)^0.5×(1+f)^(t-1)-1) ]，t=1,2,...,n\n式中：PF为价差预备费；It为第t年的静态投资计划额；f为年均投资价格上涨率；m为建设前期年限；n为建设期。",
    "problem_text": "例题：某建设项目，工程费用与工程建设其他费用合计2000万元，建设期2年，每年完成投资计划50%，基本预备费率5%，年均投资价格上涨率10%，求建设期价差预备费。",
    "standard_steps": [
      "计算：静态投资=2000×(1+5%)=2100万元；建设期每年投资=1050万元。",
      "第一年价差预备费=1050×[(1+10%)^0.5-1]=51.25万元。",
      "第二年价差预备费=1050×[(1+10%)^1.5-1]=161.37万元。"
    ],
    "standard_answer": "答案：价差预备费=51.25+161.37=212.62万元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题",
      "重点"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-004",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 4,
    "title": "建设期贷款利息计算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "建设期贷款利息计算",
    "formula": "各年建设期利息：qj = (Pj-1 + Aj/2)×i\n建设期贷款利息总额 = Σqj\n式中：qj为建设期第j年应计利息；Pj-1为建设期第(j-1)年末贷款累计本金与利息之和；Aj为第j年贷款金额；i为贷款年利率。",
    "problem_text": "例题：某新建项目建设期3年，分3年均衡贷款，第一年300万元，第二年650万元，第三年350万元，年利率12%，建设期内利息只计息不支付，求建设期贷款利息。",
    "standard_steps": [
      "计算：q1=(300/2)×12%=18万元。",
      "q2=(300+18+650/2)×12%=77.16万元。",
      "q3=(318+650+77.16+350/2)×12%=146.42万元。"
    ],
    "standard_answer": "答案：建设期贷款利息=18+77.16+146.42=241.58万元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-005",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 5,
    "title": "建设投资静态投资估算：单位生产能力估算法",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "建设投资静态投资估算：单位生产能力估算法",
    "formula": "C2 = (C1/Q1)×Q2×f\n式中：C1为已建类似项目静态投资额；C2为拟建项目静态投资额；Q1为已建类似项目生产能力；Q2为拟建项目生产能力；f为综合调整系数。",
    "problem_text": "例题1：某地2005年拟建一座工厂，年生产某种产品50万吨。已知2002年在另一地区已建类似工厂，年生产同类产品30万吨，投资5.43亿元，综合调整系数为1.5，求拟建项目投资额。\n例题2：某地拟建150套客房的宾馆，已知同地类似300套客房宾馆总造价1225万美元，求拟建宾馆估算值。",
    "standard_steps": [
      "计算：每套客房造价=1225÷300=4.08万美元/套。"
    ],
    "standard_answer": "答案：C2=(5.43/30)×50×1.5=13.58亿元。\n答案：拟建宾馆造价=4.08×150=612万美元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-006",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 6,
    "title": "建设投资静态投资估算：生产能力指数法、系数估算法",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "建设投资静态投资估算：生产能力指数法、系数估算法",
    "formula": "生产能力指数法：C2 = C1×(Q2/Q1)^n×f\n式中：n为生产能力指数；其他符号含义同单位生产能力估算法。\n系数估算法：C = E×(1 + f1P1 + f2P2 + ... + fnPn) + I\n式中：E为拟建项目设备费；P1、P2...为各专业工程费用占设备费的比例；f1、f2...为调整系数；I为拟建项目其他费用。",
    "problem_text": "本资料对应页面主要列出计算公式，未显示完整例题；复习时重点掌握“先找已建项目，再按生产能力比例和调整系数修正”的步骤。",
    "standard_steps": [],
    "standard_answer": "本资料对应页面主要列出计算公式，未显示完整例题；复习时重点掌握“先找已建项目，再按生产能力比例和调整系数修正”的步骤。",
    "solution_idea": "本资料对应页面主要列出计算公式，未显示完整例题；复习时重点掌握“先找已建项目，再按生产能力比例和调整系数修正”的步骤。",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": true
  },
  {
    "id": "cost-calc-007",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 7,
    "title": "流动资金分项详细估算法",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "流动资金分项详细估算法",
    "formula": "流动资金 = 流动资产 - 流动负债\n流动资产 = 应收账款 + 预付账款 + 存货 + 现金\n流动负债 = 应付账款 + 预收账款\n流动资金本年增加额 = 本年流动资金 - 上年流动资金\n周转次数 = 360 ÷ 最低周转天数\n应收账款 = 年经营成本 ÷ 应收账款周转次数\n预付账款 = 外购商品或服务年费用金额 ÷ 预付账款周转次数\n存货 = 外购原材料 + 外购燃料 + 其他材料 + 在产品 + 产成品\n现金需要量 = (年工资及福利费 + 年其他费用) ÷ 现金周转次数\n应付账款 = 外购原材料、燃料动力及其他材料年费用 ÷ 应付账款周转次数\n预收账款 = 预收的营业收入年金额 ÷ 预收账款周转次数",
    "problem_text": "本资料对应页面主要列出分项详细估算公式，未显示完整例题；做题时按“流动资产四项-流动负债两项-本年增加额”的顺序列式。",
    "standard_steps": [],
    "standard_answer": "本资料对应页面主要列出分项详细估算公式，未显示完整例题；做题时按“流动资产四项-流动负债两项-本年增加额”的顺序列式。",
    "solution_idea": "本资料对应页面主要列出分项详细估算公式，未显示完整例题；做题时按“流动资产四项-流动负债两项-本年增加额”的顺序列式。",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": true
  },
  {
    "id": "cost-calc-008",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 8,
    "title": "静态投资效益评价：差额投资回收期法、计算费用法",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "静态投资效益评价：差额投资回收期法、计算费用法",
    "formula": "差额投资回收期：ΔPt = (K2 - K1) ÷ (C1 - C2)，其中K2>K1、C1>C2。\n若 ΔPt ≤ Pc，则投资大的方案优；若 ΔPt > Pc，则投资小的方案优。\n产量不同时：ΔPt = (K2/Q2 - K1/Q1) ÷ (C1/Q1 - C2/Q2)。\n总计算费用法：TC = K + Pc×C，TC最小的方案最优。\n年计算费用法：AC = C + Rc×K，AC最小的方案最优。\n式中：K为总投资；C为年经营成本；Pc为基准投资回收期；Rc为基准投资效果系数。",
    "problem_text": "例题1：甲方案总投资2000万元、年经营成本500万元、年产量1200件；乙方案总投资1200万元、年经营成本420万元、年产量900件，基准投资回收期6年，试选方案。\n例题2：三个方案年经营成本分别为750、650、650万元，总投资分别为2500、3550、4350万元，基准投资效果系数10%。",
    "standard_steps": [
      "计算：甲单位投资=2000/1200=1.67万元/件，乙单位投资=1200/900=1.33万元/件；甲单位成本=500/1200=0.42万元/件，乙单位成本=420/900=0.47万元/件。",
      "ΔPt=(1.67-1.33)/(0.47-0.42)=6.8年。答案：6.8>6，应选单位产量投资较小的乙方案。",
      "计算：AC1=750+0.1×2500=1000万元；AC2=650+0.1×3550=1005万元；AC3=650+0.1×4350=1085万元。"
    ],
    "standard_answer": "答案：AC1最小，方案一最优。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-009",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 9,
    "title": "工程量清单 / 建筑清单中工程量偏差引起的合同价款调整",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": true,
    "calculation_type": "工程量清单 / 建筑清单中工程量偏差引起的合同价款调整",
    "formula": "调整前提：清单项目工程量偏差超过15%时，可按合同约定调整综合单价。\n当 Q1 > 1.15Q0 时：S = 1.15Q0P0 + (Q1 - 1.15Q0)P1\n当 Q1 < 0.85Q0 时：S = Q1P1\n若 P0 < P2×(1-L)×(1-15%)，则 P1 = P2×(1-L)×(1-15%)。\n若 P0 > P2×(1+15%)，则 P1 = P2×(1+15%)。\n式中：S为调整后的分部分项工程费结算价；Q1为最终完成工程量；Q0为招标工程量清单列出的工程量；P0为承包人填报综合单价；P1为重新调整后的综合单价；P2为招标控制价相应综合单价；L为报价浮动率。",
    "problem_text": "例题1：招标工程量清单数量1520m³，施工中调整为1216m³，减少20%。招标控制价综合单价350元，投标报价综合单价287元，报价浮动率6%，判断综合单价是否调整并求结算价。\n例题2：招标工程量清单数量1520m³，施工中调整为1824m³，增加20%。招标控制价综合单价350元，投标报价综合单价406元，求调整后结算价。",
    "standard_steps": [
      "计算：P2×(1-L)×(1-15%)=350×(1-6%)×(1-15%)=279.65元；因287元>279.65元，综合单价不调整。",
      "计算：P2×(1+15%)=350×(1+15%)=402.50元；因406元>402.50元，综合单价调整为402.50元。"
    ],
    "standard_answer": "答案：结算价=1216×287=348992元。\n答案：结算价=1.15×1520×406+(1824-1.15×1520)×402.50=740278元。",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题",
      "重点"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": false
  },
  {
    "id": "cost-calc-010",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 10,
    "title": "工程预付款、起扣点与扣回计算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "工程预付款、起扣点与扣回计算",
    "formula": "工程预付款 = 合同价款总额×预付款比例\n累计工作量法起扣点：T = P - M/N\n式中：T为起扣点；P为承包工程价款总额；M为工程预付款数额；N为主要材料及构件所占比重。\n合同约定法：按合同约定的“累计完成工程款达到某比例后”开始扣回，按约定月份或比例平均扣回。",
    "problem_text": "例题1：某工程计划完成年度建筑安装工程工作量700万元，工程预付款额度20%，材料比例60%，8月累计完成500万元，9月完成90万元，求起扣点及应扣预付款。\n例题2：合同工程量5300m³，单价180元/m³，预付款为合同总价20%，累计工程款超过合同总价30%后的下月起扣，3个月平均扣回。",
    "standard_steps": [
      "计算：工程预付款=700×20%=140万元；起扣点T=700-140/60%=466.7万元。",
      "8月应扣=(500-466.7)×60%=19.98万元；9月应扣=90×60%=54万元。",
      "计算：合同价款=5300×180=95.4万元；工程预付款=95.4×20%=19.08万元；起扣控制额=95.4×30%=28.62万元；每月扣回=19.08/3=6.36万元。"
    ],
    "standard_answer": "",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": true
  },
  {
    "id": "cost-calc-011",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 11,
    "title": "工程进度款与工程价款结算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "工程进度款与工程价款结算",
    "formula": "本期工程进度款 = 本期已完工程量×综合单价\n本期应签证工程款 = 本期工程进度款×(1-质量保证金扣留比例)\n本期应签发付款证书金额 = 本期应签证工程款 - 本期应扣预付款 - 甲供材款 - 其他应扣款\n若本期应签发付款证书金额低于合同约定最低支付限额，一般本期不签发付款证书，顺延至下期累计。\n竣工结算应付款 = 竣工结算价×(1-质量保证金扣留比例) - 累计已支付工程款 - 应扣未扣款项",
    "problem_text": "例题：某建筑安装工程合同总价920万元，其中主材100万元由发包人供应，预付款为合同价20%，工程款按月进度扣留5%质量保证金，最低付款限额60万元。",
    "standard_steps": [
      "已知第1个月土方实际完成3600m³，清单工程量3000m³，综合单价80元/m³，超过15%部分调价系数0.9。",
      "计算：15%以内进度款=3000×(1+15%)×80=27.6万元；超过部分进度款=(3600-3450)×80×0.9=1.08万元；第1个月土方进度款=28.68万元。",
      "预付款=920×20%=184万元；预付款起扣点=(920-184/62.5%)=625.6万元。",
      "示例答案：第1个月应签证金额=28.68×(1-5%)=27.246万元，因低于60万元，当月不签发付款证书。该例后续各月按“进度款-质保金-预付款扣回-甲供材扣回”的逻辑计算。"
    ],
    "standard_answer": "",
    "solution_idea": "",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": true
  },
  {
    "id": "cost-calc-012",
    "subject": "工程造价管理",
    "subjectId": "cost-management",
    "subject_id": "s-hr",
    "module": "calculation",
    "order": 12,
    "title": "投资偏差与进度偏差计算",
    "question_type": "计算题",
    "is_calculation": true,
    "is_final_focus": true,
    "is_key": false,
    "calculation_type": "投资偏差与进度偏差计算",
    "formula": "拟完工程计划投资 = 拟完工程量×计划单价\n已完工程实际投资 = 已完工程量×实际单价\n已完工程计划投资 = 已完工程量×计划单价\n投资偏差 = 已完工程实际投资 - 已完工程计划投资\n投资偏差 = 已完工程量×(实际单价 - 计划单价)\n进度偏差 = 已完工程实际时间 - 已完工程计划时间\n进度偏差 = 拟完工程计划投资 - 已完工程计划投资\n进度偏差 = (拟完工程量 - 已完工程量)×计划单价",
    "problem_text": "本资料对应页面主要列出公式，未显示完整例题；考试中通常先列“三个投资额”，再分别代入投资偏差与进度偏差公式。",
    "standard_steps": [],
    "standard_answer": "本资料对应页面主要列出公式，未显示完整例题；考试中通常先列“三个投资额”，再分别代入投资偏差与进度偏差公式。",
    "solution_idea": "本资料对应页面主要列出公式，未显示完整例题；考试中通常先列“三个投资额”，再分别代入投资偏差与进度偏差公式。",
    "common_mistakes": [],
    "memory_tip": "",
    "tags": [
      "工程造价",
      "计算题"
    ],
    "source": "工程造价管理_计算题文档.docx",
    "source_status": "已有书本来源",
    "incomplete": true
  }
];
