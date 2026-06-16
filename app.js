const STORAGE_KEY = "zjq-project-cockpit-v1";
const SYNC_FORMAT = "zjq-project-cockpit-sync";
const SYNC_VERSION = 2;
const FILE_DB_NAME = "zjq-project-cockpit-files";
const CLOUD_STORAGE_KEY = "zjq-project-cockpit-cloud-v1";

const STAGES = [
  {
    code: "G0",
    name: "需求与机会",
    objective: "把客户、市场和法规输入转成可评审的产品需求基线。",
    checks: ["应用场景、客户特殊要求和目标市场明确", "性能、尺寸、外观、重量、成本、交期及法规要求明确", "样品、图纸、接口、包装和验收方式已归档", "未确认事项有责任人与截止日期"],
    outputs: ["客户需求与特殊要求清单", "产品需求规格书 PRD/SOR", "法规与合规清单", "需求澄清问题清单", "初步商业与技术可行性"]
  },
  {
    code: "G1",
    name: "可行性与立项",
    objective: "确认产品可做、值得做，并建立跨部门项目基线。",
    checks: ["产品、材料、工艺、质量、供应链和产能完成可行性评审", "项目范围、目标、里程碑、预算和资源明确", "产品安全、特殊特性和重大风险初步识别", "客户接口、变更权限和阶段批准人明确"],
    outputs: ["合同/订单与制造可行性评审", "项目章程与立项批准", "APQP/项目开发计划", "RACI与沟通计划", "初始风险清单", "初始特殊特性清单"]
  },
  {
    code: "G2",
    name: "产品方案设计",
    objective: "确定产品功能、结构、接口、材料方向、验证计划和目标成本。",
    checks: ["产品概念、结构、尺寸和接口已完成评审", "材料方向与关键性能要求明确", "设计风险、产品安全和特殊特性已识别", "验证项目、样件数量、成本和时间计划明确"],
    outputs: ["产品方案与设计评审记录", "图纸/3D/技术规范与BOM", "材料选型与性能目标", "设计风险分析/DFMEA", "特殊特性清单", "DVP&R产品验证计划", "目标成本与供应链方案"]
  },
  {
    code: "G3",
    name: "材料与工艺开发",
    objective: "通过材料试验和工艺实验形成可制作产品样件的稳定方案。",
    checks: ["材料牌号、供应商、批次、配方或铺层可追溯", "设备、模具、温度、压力、时间等关键参数已记录", "材料性能和工艺边界已完成验证", "失败试验、异常原因、改进措施和再验证均已保留"],
    outputs: ["材料开发与选材记录", "材料性能测试报告", "工艺实验方案与DOE记录", "样件制作与参数追溯记录", "过程流程图初版", "PFMEA初版", "工艺窗口与关键参数", "实验问题与闭环清单"]
  },
  {
    code: "G4",
    name: "样件与设计验证",
    objective: "用产品样件确认设计、材料和工艺组合满足客户需求。",
    checks: ["样件与图纸、BOM、材料和工艺状态一致", "试验覆盖尺寸、外观、功能、性能、耐久和安全", "失效完成原因分析、措施和再验证", "设计变更受控并同步风险分析和验证计划"],
    outputs: ["正式样件与送样记录", "设计验证报告/DVP&R", "尺寸、外观与性能报告", "材料与结构验证报告", "失效分析/8D与问题关闭清单", "客户反馈与需求变更记录", "设计冻结与更新版图纸BOM"]
  },
  {
    code: "G5",
    name: "试产与过程验证",
    objective: "使用接近量产的条件验证产品一致性、制造过程、质量控制和产能。",
    checks: ["试产使用计划的人员、设备、材料、方法和测量系统", "工装模具检具、SOP和检验方法满足使用要求", "产品性能、良率、节拍、产能和过程能力达到目标", "未关闭问题具有临时控制、责任人和关闭日期"],
    outputs: ["试产计划与试产报告", "正式过程流程图与PFMEA", "量产控制计划", "工艺规范/SOP与检验标准", "全尺寸与性能验证报告", "MSA与过程能力报告", "包装物流与追溯方案", "PPAP/客户批准资料（汽车适用）", "量产准备评审记录"]
  },
  {
    code: "G6",
    name: "量产移交与爬坡",
    objective: "把产品和过程正式移交生产，并在早期量产阶段稳定质量、交付和成本。",
    checks: ["受控文件、配置基线和变更状态一致", "生产、质量、采购、物流和售后完成移交与培训", "量产遏制、加严检验和问题升级机制已启动", "客户批准、放行条件和未关闭风险已确认"],
    outputs: ["量产发布/SOP批准", "生产件批准与客户放行", "量产移交清单", "受控BOM/图纸/工艺/控制计划", "培训与岗位资格记录", "爬坡与安全投产计划", "应急计划", "早期生产问题与改进记录"]
  },
  {
    code: "G7",
    name: "绩效确认与归档",
    objective: "确认项目目标达成，关闭遗留事项并沉淀可复用的组织知识。",
    checks: ["质量、交付、成本、产能和客户满意度达到项目目标", "项目变更、偏差、风险和问题已关闭或正式移交", "产品与过程配置、记录保存和追溯完整", "经验已反馈到FMEA、标准、模板和后续项目"],
    outputs: ["项目结项与目标达成报告", "量产绩效与客户反馈", "问题关闭与风险移交清单", "经验教训与最佳实践", "FMEA/控制计划反向更新记录", "完整产品与过程档案", "变更与配置状态报告"]
  }
];

const STAGE_GUIDES = {
  G0: {
    why: "避免客户一句话直接变成内部试验，先把产品边界、验收标准和未知事项固定下来。",
    how: "整理邮件、图纸、样品和沟通记录；逐项确认性能、尺寸、外观、重量、价格、交期、法规和测试方法。",
    done: "研发和工艺能够据此开展方案，所有未确认问题都有责任人和计划日期。"
  },
  G1: {
    why: "防止项目在价值、资源、时间和技术风险都不清楚时直接投入。",
    how: "组织产品、材料、工艺、质量、采购和生产进行可行性评审，确定范围、里程碑、职责、预算和主要风险。",
    done: "项目负责人确认值得开展，目标、资源、计划、责任和风险基线已经建立。"
  },
  G2: {
    why: "把产品想法转成可以制造、验证和报价的具体方案。",
    how: "确定产品结构、尺寸接口、材料方向、BOM、图纸、验证计划、目标成本及关键供应方案，并进行设计风险评审。",
    done: "产品方案可用于材料和工艺实验，关键性能、风险、样件和验证计划清楚。"
  },
  G3: {
    why: "确认材料和制造方法可以组合成稳定、可追溯的样件制作方案。",
    how: "记录材料牌号和批次，开展配方、铺层或工艺参数试验；保留成功与失败数据，形成工艺窗口和问题闭环。",
    done: "至少一套材料与工艺方案达到样件验证门槛，关键参数、边界和风险有证据支持。"
  },
  G4: {
    why: "确认做出来的产品样件，而不只是材料试片，真正满足客户和产品需求。",
    how: "按冻结状态制作样件，执行尺寸、外观、功能、性能、耐久和安全验证；对失效进行分析、改善和复测。",
    done: "样件达到要求，或未达项已形成客户认可的修改范围、责任人和下一轮计划。"
  },
  G5: {
    why: "验证产品不只是偶尔能做出来，而是能够在接近量产条件下稳定制造和检验。",
    how: "使用计划量产的人机料法环测进行试产，验证良率、节拍、产能、过程能力、检验方法、包装和追溯。",
    done: "产品和过程达到量产目标；未关闭问题具有有效控制措施，不会造成不可接受的量产风险。"
  },
  G6: {
    why: "把项目成果完整交给日常生产，避免开发完成后文件、参数和责任断层。",
    how: "冻结并发布受控文件，完成生产与质量培训、量产批准、早期遏制、爬坡计划和跨部门交接。",
    done: "生产部门正式接收，产品能按受控要求生产，早期量产问题有明确监控和升级机制。"
  },
  G7: {
    why: "确认项目目标真正达成，并把经验变成下一项目可直接使用的组织资产。",
    how: "核对质量、交付、成本、客户反馈和遗留问题，整理完整档案，更新FMEA、控制计划、标准和模板。",
    done: "项目事项关闭或正式移交，资料完整可追溯，经验已进入公司流程和后续项目。"
  }
};

const STAGE_TEMPLATE_NOTES = {
  G0: {
    focus: "把客户输入翻译成可评审需求，优先补齐边界、验收方法和未确认事项。",
    sections: ["客户与应用场景", "产品结构/尺寸/重量/成本目标", "性能与测试方法", "法规/外观/包装/交付要求", "未确认问题清单", "风险与下一步"]
  },
  G1: {
    focus: "证明项目值得做、能做，并明确谁负责、什么时候交付、带什么风险推进。",
    sections: ["项目目标与范围", "跨部门可行性结论", "资源与里程碑", "成本/产能/供应链假设", "初始风险", "立项结论"]
  },
  G2: {
    focus: "把产品想法变成可制造、可验证、可报价的方案。",
    sections: ["产品方案概述", "结构/BOM/材料方向", "关键性能与特殊特性", "设计风险", "验证计划", "目标成本与备选方案"]
  },
  G3: {
    focus: "记录材料、工艺参数和实验结果，形成可重复制作样件的窗口。",
    sections: ["材料来源与批次", "实验目的", "设备/模具/关键参数", "实验结果", "异常与失效分析", "工艺窗口与下一轮验证"]
  },
  G4: {
    focus: "用产品样件证明方案满足需求，并把失效和客户反馈闭环。",
    sections: ["样件状态", "验证项目与样件数量", "测试结果", "失效/偏差分析", "客户反馈", "设计冻结建议"]
  },
  G5: {
    focus: "用接近量产条件验证一致性、良率、节拍、过程能力和控制计划。",
    sections: ["试产条件", "过程流程与控制点", "检验/测量系统", "良率节拍产能", "问题清单", "量产准备结论"]
  },
  G6: {
    focus: "把文件、参数、培训、控制计划和早期量产问题正式移交生产。",
    sections: ["受控文件清单", "生产/质量/采购移交", "培训记录", "早期遏制计划", "未关闭风险", "量产放行结论"]
  },
  G7: {
    focus: "确认项目目标达成，关闭遗留事项，并把经验回写到规则库。",
    sections: ["目标达成情况", "质量/交付/成本表现", "客户反馈", "遗留问题", "经验教训", "规则库更新"]
  }
};

const projectProfiles = {
  "NPD25024": {
    summary: "再生碳纤维锁鞋鞋底开发，当前聚焦静压力失效原因、结构改进及复测闭环。",
    readiness: 61
  },
  "NPD25047": {
    summary: "匹克球拍面板开发，当前验证单片成型后的重量、厚度、表面和批次一致性。",
    readiness: 67
  },
  "NPD25048": {
    summary: "迪卡侬板式网球拍项目，当前等待代工样件并准备客户确认与必要的样件重制。",
    readiness: 55
  },
  "NPD26003-A": {
    summary: "轻量化折叠坡道开发。主流程处于需求澄清，结构、材料、成本与连接方案同步论证。",
    readiness: 58
  },
  "NPD26011-A": {
    summary: "工具机曲柄材料与工艺开发，当前等待正式图纸并准备疲劳性能验证方案。",
    readiness: 29
  }
};

const seedData = {
  processModelVersion: 8,
  projects: [
    { id: "NPD25024", name: "再生碳纤维锁鞋鞋底", projectType: "npd", standardProfile: "general", stage: "G4 样件与设计验证", stageCode: "G4", stageNote: "失效分析与复测", progress: 61, status: "attention", deadline: "6月30日", next: "确认静压力失效原因并安排复测" },
    { id: "NPD25047", name: "匹克球拍面板", projectType: "npd", standardProfile: "general", stage: "G4 样件与设计验证", stageCode: "G4", stageNote: "单片成型验证", progress: 67, status: "attention", deadline: "6月20日", next: "验证重量、厚度和表面一致性" },
    { id: "NPD25048", name: "迪卡侬板式网球拍", projectType: "npd", standardProfile: "general", stage: "G5 试产与过程验证", stageCode: "G5", stageNote: "等待客户样件", progress: 55, status: "waiting", deadline: "7月30日", next: "确认代工样件发货并准备重制" },
    { id: "NPD26003-A", name: "CF坡道", projectType: "npd", standardProfile: "general", stage: "G0 需求与机会", stageCode: "G0", stageNote: "需求澄清，G2/G3并行", progress: 45, status: "attention", deadline: "6月30日", next: "确认粘结标准、完整3D及轮迹加强区域" },
    { id: "NPD26011-A", name: "工具机曲柄", projectType: "npd", standardProfile: "general", stage: "G2 产品方案设计", stageCode: "G2", stageNote: "图纸与验证规划", progress: 29, status: "waiting", deadline: "待确认", next: "取得正式图纸并明确疲劳验证方法" }
  ],
  schemes: [
    { id: "SC-01", projectId: "NPD26003-A", name: "CFRP / XPS / CFRP + 铝框", status: "已完成初评", summary: "作为当前基准方案，加铝框后的CAE挠度结果满足目标。", readiness: "72%", next: "验证粘结强度" },
    { id: "SC-02", projectId: "NPD26003-A", name: "CF/PP-UD + rCF/PP 面层", status: "论证中", summary: "面层替代方向可行性较大，需结合完整铝框结构重新评估。", readiness: "48%", next: "取得3D结构" },
    { id: "SC-03", projectId: "NPD26003-A", name: "KPS + rCF 替代连接材料", status: "提前规划", summary: "用于扩大减重空间，当前先进行材料与连接方式的概念论证。", readiness: "25%", next: "整理性能边界" }
  ],
  tasks: [
    { id: 1, projectId: "NPD26003-A", title: "确认销售报价状态", meta: "销售 · CF坡道", date: "本周", done: false },
    { id: 2, projectId: "NPD26003-A", title: "确定面层与XPS粘结强度标准", meta: "研发 / 测试", date: "6月20日", done: false },
    { id: 3, projectId: "NPD26003-A", title: "确认HRC供货范围与整件测试责任", meta: "客户 / 项目负责人", date: "待回复", done: false },
    { id: 4, projectId: "NPD26003-A", title: "完成加铝框方案CAE初评", meta: "CAE", date: "已完成", done: true },
    { id: 5, projectId: "NPD25024", title: "确认静压力失效原因并制定复测条件", meta: "研发 · 锁鞋鞋底", date: "本周", done: false },
    { id: 6, projectId: "NPD25047", title: "完成单片重量与厚度数据整理", meta: "工艺 · 匹克球拍", date: "6月20日", done: false },
    { id: 7, projectId: "NPD25048", title: "跟进代工样件发货", meta: "供应商 · 板式网球拍", date: "待回复", done: false },
    { id: 8, projectId: "NPD26011-A", title: "取得正式图纸与载荷边界", meta: "客户 · 工具机曲柄", date: "待回复", done: false }
  ],
  inbox: [
    { id: 101, type: "photo", title: "坡道结构参考图", note: "客户方案中的铝框和折叠结构参考", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G0", time: "今天 14:20", status: "pending", src: "assets/ramp-product.png" },
    { id: 102, type: "photo", title: "CAE结果截图", note: "加铝框后各方案挠度结果对比", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G2", time: "今天 14:24", status: "pending", src: "assets/ramp-cae.png" },
    { id: 103, type: "document", title: "CF坡道初步评估报告.pdf", note: "待提取结论与下一步", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G2", time: "今天 14:28", status: "pending", extension: "PDF" }
  ],
  timeline: [
    { id: "TL-1", projectId: "NPD26003-A", date: "6月14日", title: "建立项目驾驶舱模拟记录", text: "导入CF坡道需求、方案、风险与现有评估结论。" },
    { id: "TL-2", projectId: "NPD26003-A", date: "6月11日", title: "完成CAE及厂内成本评估", text: "加铝框后方案满足挠度要求，进入报价和粘结验证准备。" },
    { id: "TL-3", projectId: "NPD26003-A", date: "5月", title: "客户计划与坡道厂家确认细节", text: "铝框结合形式、供货范围和测试责任仍需持续跟进。" },
    { id: "TL-4", projectId: "NPD26003-A", date: "4月30日", title: "完成初步评估报告", text: "面板单体未达到要求；CF/PP-UD + rCF/PP面层方向可继续。" }
  ],
  stageRecords: {},
  stagePredictions: [
    {
      id: "PR-CF-20260616-01",
      projectId: "NPD26003-A",
      stageCode: "G0",
      question: "当前最可能拖慢项目的卡点是什么？",
      prediction: "粘结强度标准、完整铝框3D和轮迹局部加强范围若不能冻结，CAE与报价会反复调整。",
      confidence: "medium",
      dueDate: "",
      lockedAt: "2026-06-16",
      outcome: "",
      accuracy: "",
      retro: "",
      ruleCandidate: "",
      reviewedAt: ""
    }
  ],
  decisionRules: [
    {
      id: "RULE-CF-20260616-01",
      category: "需求冻结",
      title: "结构轻量化项目先冻结测试边界",
      rule: "客户目标包含重量、强度和成本时，必须先确认载荷、粘结、连接结构和供货边界，再推进完整报价。",
      sourceProjectId: "NPD26003-A",
      sourceStageCode: "G0",
      strength: "待验证",
      updatedAt: "2026-06-16"
    }
  ],
  reviewResults: { processes: 0, issues: 0, actions: 0, weekly: 0, output: "" }
};

let state = loadState();
let cloudSettings = loadCloudSettings();
let cloudSyncTimer = null;
let cloudPushTimer = null;
let applyingCloudState = false;
let cachedEncryptionKey = null;
let cachedEncryptionKeyId = "";
let deferredInstallPrompt = null;
let currentView = "dashboard";
let selectedProjectId = state.projects[0]?.id || "NPD26003-A";
let selectedStageCode = state.projects[0]?.stageCode || "G0";
let projectFilter = "all";
let inboxFilter = "pending";
let workFilter = "all";
let reviewIndex = 0;
let reviewItems = [];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeState(saved) {
  const base = clone(seedData);
  const needsStageMigration = saved && Number(saved.processModelVersion || 0) < 4;
  const needsRampJuneMigration = !saved || Number(saved.processModelVersion || 0) < 7;
  const needsPredictionMigration = !saved || Number(saved.processModelVersion || 0) < 8;
  const merged = saved ? { ...base, ...saved } : base;
  merged.projects = (merged.projects || base.projects).map(project => {
    let stageCode = project.stageCode || String(project.stage || "G0").split(" ")[0];
    if (needsStageMigration) {
      if (stageCode === "G2" && String(project.stage).includes("材料开发") && project.id !== "NPD26011-A") stageCode = "G3";
      if (stageCode === "G3" && String(project.stage).includes("工艺验证")) stageCode = "G4";
      if (stageCode === "G3" && String(project.stage).includes("样件与设计验证")) stageCode = "G4";
      if (stageCode === "G4" && String(project.stage).includes("客户确认")) stageCode = "G5";
      if (stageCode === "G4" && String(project.stage).includes("过程开发与确认")) stageCode = "G5";
    }
    const stage = STAGES.find(item => item.code === stageCode);
    return {
      ...project,
      stageCode,
      stage: `${stageCode} ${stage?.name || "未定义"}`,
      standardProfile: project.standardProfile || "general",
      projectType: project.projectType || "npd",
      summary: project.summary || projectProfiles[project.id]?.summary || `${project.name}项目开发与转量产管控。`,
      readiness: project.readiness || projectProfiles[project.id]?.readiness || project.progress || 0
    };
  });
  merged.schemes = (merged.schemes || []).map(item => ({ ...item, projectId: item.projectId || "NPD26003-A" }));
  merged.tasks = (merged.tasks || []).map(item => ({
    ...item,
    projectId: item.projectId || "NPD26003-A",
    owner: item.owner || String(item.meta || "").split("·")[0].trim() || "张家桤",
    priority: item.priority || "medium",
    status: item.done ? "done" : item.status || (String(item.date).includes("待回复") ? "waiting" : "open"),
    dueDate: item.dueDate || "",
    acceptance: item.acceptance || ""
  }));
  merged.inbox = (merged.inbox || []).map(item => ({ ...item, stageCode: item.stageCode || "G0" }));
  merged.timeline = (merged.timeline || []).map((item, index) => ({
    ...item,
    id: item.id || `TL-${index}-${item.date}`,
    projectId: item.projectId || "NPD26003-A"
  }));
  merged.stageRecords = merged.stageRecords || {};
  merged.stagePredictions = (merged.stagePredictions || []).map(item => ({
    id: item.id || `PR-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    projectId: item.projectId || "NPD26003-A",
    stageCode: item.stageCode || "G0",
    question: item.question || "本阶段最可能出现什么偏差？",
    prediction: item.prediction || "",
    confidence: item.confidence || "medium",
    dueDate: item.dueDate || "",
    lockedAt: item.lockedAt || "",
    outcome: item.outcome || "",
    accuracy: item.accuracy || "",
    retro: item.retro || "",
    ruleCandidate: item.ruleCandidate || "",
    reviewedAt: item.reviewedAt || ""
  }));
  merged.decisionRules = (merged.decisionRules || []).map(item => ({
    id: item.id || `RULE-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    category: item.category || "项目判断",
    title: item.title || "未命名规则",
    rule: item.rule || "",
    sourceProjectId: item.sourceProjectId || "",
    sourceStageCode: item.sourceStageCode || "",
    strength: item.strength || "待验证",
    updatedAt: item.updatedAt || ""
  }));
  merged.reviewResults = { ...base.reviewResults, ...(merged.reviewResults || {}) };
  if (needsRampJuneMigration) {
    const ramp = merged.projects.find(project => project.id === "NPD26003-A");
    if (ramp) {
      ramp.stageNote = "需求澄清，G2/G3并行";
      ramp.progress = Math.max(ramp.progress || 0, 45);
      ramp.readiness = Math.max(ramp.readiness || 0, 68);
      ramp.next = "确认粘结标准、完整3D及轮迹加强区域";
      ramp.updatedAt = new Date().toISOString();
    }
    const newTasks = [
      { id: "CF-20260615-01", projectId: "NPD26003-A", title: "向客户确认面层与XPS粘结强度标准和测试方法", owner: "张家桤", priority: "high", status: "waiting", dueDate: "", date: "待回复", acceptance: "取得可执行的剪切、剥离及环境测试判定标准", meta: "客户确认 · CF坡道", done: false },
      { id: "CF-20260615-02", projectId: "NPD26003-A", title: "取得完整铝框及连接结构3D数据", owner: "张家桤", priority: "high", status: "waiting", dueDate: "", date: "待回复", acceptance: "收到可用于完整结构CAE的三维模型", meta: "客户输入 · CF坡道", done: false },
      { id: "CF-20260615-03", projectId: "NPD26003-A", title: "核对XPS材料卡异常参数并冻结CAE版本", owner: "张家桤", priority: "high", status: "open", dueDate: "", date: "本周", acceptance: "确认密度、模量和强度来源，形成受控材料卡", meta: "材料数据 · CF坡道", done: false },
      { id: "CF-20260615-04", projectId: "NPD26003-A", title: "完成20mm推荐方案完整结构与局部载荷复核", owner: "CAE", priority: "high", status: "open", dueDate: "", date: "待安排", acceptance: "输出含铝框、连接和轮迹区域的CAE结论", meta: "G2 产品方案 · CF坡道", done: false },
      { id: "CF-20260615-05", projectId: "NPD26003-A", title: "明确报价中客户来料、管理费、税和运输边界", owner: "项目负责人", priority: "medium", status: "open", dueDate: "", date: "待安排", acceptance: "形成可对外使用的三方案报价边界表", meta: "成本评估 · CF坡道", done: false }
    ];
    merged.tasks = [...newTasks.filter(item => !(merged.tasks || []).some(existing => String(existing.id) === String(item.id))), ...(merged.tasks || [])];
    const newInbox = [
      { id: "INBOX-CF-PPT-20260603", type: "document", title: "CF坡道-26.06.03.pptx", note: "32mm、22mm夹芯结构CAE评估", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G2", time: "6月3日", status: "organized", extension: "PPTX" },
      { id: "INBOX-CF-PPT-20260609", type: "document", title: "CF坡道-26.0609.pptx", note: "加铝框结论、工艺、局部加强和报价", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G2", time: "6月9日", status: "organized", extension: "PPTX" },
      { id: "INBOX-CF-XLSX-COST-20260615", type: "document", title: "坡道成本核算.xlsx", note: "热固、热塑和GF方案成本评估", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G1", time: "6月15日", status: "organized", extension: "XLSX" },
      { id: "INBOX-CF-XLSX-MATERIAL-20260615", type: "document", title: "坡道材料data2527.xlsx", note: "CAE材料卡，XPS部分参数待核对", projectId: "NPD26003-A", projectName: "CF坡道", stageCode: "G3", time: "6月15日", status: "organized", extension: "XLSX" }
    ];
    merged.inbox = [...newInbox.filter(item => !(merged.inbox || []).some(existing => String(existing.id) === String(item.id))), ...(merged.inbox || [])];
    const juneTimeline = { id: "CF-TL-20260615", projectId: "NPD26003-A", date: "6月15日", title: "完成6月资料统一评估与归档", text: "确认20mm方案可推进，形成成本结论，并识别粘结、3D、轮迹区域及材料卡四类关键风险。" };
    if (!(merged.timeline || []).some(item => String(item.id) === juneTimeline.id)) merged.timeline = [juneTimeline, ...(merged.timeline || [])];
  }
  if (needsPredictionMigration) {
    merged.stagePredictions = [
      ...seedData.stagePredictions.filter(item => !merged.stagePredictions.some(existing => String(existing.id) === String(item.id))),
      ...merged.stagePredictions
    ];
    merged.decisionRules = [
      ...seedData.decisionRules.filter(item => !merged.decisionRules.some(existing => String(existing.id) === String(item.id))),
      ...merged.decisionRules
    ];
  }
  merged.processModelVersion = 8;
  return merged;
}

function loadState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
  } catch {
    return normalizeState(null);
  }
}

function saveState() {
  state.lastModified = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!applyingCloudState) scheduleCloudPush();
}

function loadCloudSettings() {
  try {
    return {
      url: "",
      key: "",
      syncId: "",
      password: "",
      enabled: false,
      ...JSON.parse(localStorage.getItem(CLOUD_STORAGE_KEY) || "{}")
    };
  } catch {
    return { url: "", key: "", syncId: "", password: "", enabled: false };
  }
}

function saveCloudSettings(settings) {
  cloudSettings = {
    url: String(settings.url || "").trim().replace(/\/+$/, ""),
    key: String(settings.key || "").trim(),
    syncId: String(settings.syncId || "").trim(),
    password: String(settings.password || ""),
    enabled: Boolean(settings.enabled)
  };
  cachedEncryptionKey = null;
  cachedEncryptionKeyId = "";
  localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(cloudSettings));
  updateSetupBanner();
  restartCloudSync();
}

function cloudReady() {
  return Boolean(cloudSettings.enabled && cloudSettings.url && cloudSettings.key && cloudSettings.syncId && cloudSettings.password);
}

function setSyncState(label, mode = "local") {
  const element = document.querySelector("#syncState");
  if (!element) return;
  element.className = `sync-state ${mode}`;
  element.innerHTML = `<span></span>${escapeHtml(label)}`;
}

function cloudHeaders(extra = {}) {
  return {
    apikey: cloudSettings.key,
    Authorization: `Bearer ${cloudSettings.key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function getEncryptionKey() {
  const cacheId = `${cloudSettings.syncId}:${cloudSettings.password}`;
  if (cachedEncryptionKey && cachedEncryptionKeyId === cacheId) return cachedEncryptionKey;
  const encoder = new TextEncoder();
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(cloudSettings.password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  cachedEncryptionKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(`project-cockpit:${cloudSettings.syncId}`),
      iterations: 150000,
      hash: "SHA-256"
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  cachedEncryptionKeyId = cacheId;
  return cachedEncryptionKey;
}

async function encryptCloudPayload(value) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(value));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await getEncryptionKey(), encoded);
  return {
    encrypted: true,
    version: 1,
    algorithm: "AES-GCM",
    iv: bytesToBase64(iv),
    data: bytesToBase64(new Uint8Array(encrypted))
  };
}

async function decryptCloudPayload(payload) {
  if (!payload?.encrypted) return payload;
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(payload.iv) },
    await getEncryptionKey(),
    base64ToBytes(payload.data)
  );
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function pullCloudState({ quiet = false } = {}) {
  if (!cloudReady()) return false;
  if (!quiet) setSyncState("正在读取云端…", "syncing");
  const url = `${cloudSettings.url}/rest/v1/cockpit_state?sync_id=eq.${encodeURIComponent(cloudSettings.syncId)}&select=payload,updated_at&limit=1`;
  const response = await fetch(url, { headers: cloudHeaders() });
  if (!response.ok) throw new Error(`cloud-pull-${response.status}`);
  const rows = await response.json();
  if (!rows.length) {
    await pushCloudState({ quiet });
    return true;
  }
  const incoming = await decryptCloudPayload(rows[0].payload);
  if (incoming?.lastModified && String(incoming.lastModified) > String(state.lastModified || "")) {
    applyingCloudState = true;
    try {
      mergeSyncData(incoming);
    } finally {
      applyingCloudState = false;
    }
    renderAll();
    if (currentView === "projects") renderProjectDetail();
  }
  setSyncState(`云端已同步 · ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`, "cloud");
  return true;
}

async function pushCloudState({ quiet = false } = {}) {
  if (!cloudReady()) return false;
  if (!quiet) setSyncState("正在上传云端…", "syncing");
  const url = `${cloudSettings.url}/rest/v1/cockpit_state?on_conflict=sync_id`;
  const encryptedPayload = await encryptCloudPayload(state);
  const response = await fetch(url, {
    method: "POST",
    headers: cloudHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify({
      sync_id: cloudSettings.syncId,
      payload: encryptedPayload,
      updated_at: state.lastModified || new Date().toISOString()
    })
  });
  if (!response.ok) throw new Error(`cloud-push-${response.status}`);
  setSyncState(`云端已同步 · ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`, "cloud");
  return true;
}

function scheduleCloudPush() {
  if (!cloudReady()) return;
  clearTimeout(cloudPushTimer);
  cloudPushTimer = setTimeout(() => {
    pushCloudState({ quiet: true }).catch(() => setSyncState("云同步失败，稍后重试", "error"));
  }, 1200);
}

async function syncCloudNow() {
  if (!cloudReady()) {
    showToast("请填写云端网址、Anon key、同步码和同步密码，并启用同步");
    return;
  }
  try {
    await pullCloudState();
    await pushCloudState();
    showToast("云同步测试成功");
  } catch (error) {
    setSyncState("云同步连接失败", "error");
    showToast(error?.name === "OperationError" ? "解密失败，请检查两端同步密码是否一致" : "连接失败，请检查Supabase设置和数据表");
  }
}

function restartCloudSync() {
  clearInterval(cloudSyncTimer);
  if (!cloudReady()) {
    setSyncState("数据已保存在本机");
    return;
  }
  pullCloudState().catch(() => setSyncState("云同步连接失败", "error"));
  cloudSyncTimer = setInterval(() => {
    pullCloudState({ quiet: true }).catch(() => setSyncState("云同步失败，稍后重试", "error"));
  }, 15000);
}

function openCloudModal() {
  const form = document.querySelector("#cloudForm");
  form.elements.url.value = cloudSettings.url;
  form.elements.key.value = cloudSettings.key;
  form.elements.syncId.value = cloudSettings.syncId;
  form.elements.password.value = cloudSettings.password;
  form.elements.enabled.checked = cloudSettings.enabled;
  document.querySelector("#cloudModal").hidden = false;
}

function closeCloudModal() {
  document.querySelector("#cloudModal").hidden = true;
}

function updateSetupBanner() {
  const banner = document.querySelector("#setupBanner");
  if (banner) banner.hidden = cloudReady();
}

async function installApp() {
  if (!deferredInstallPrompt) {
    showToast("请使用浏览器菜单中的“添加到主屏幕”或“安装应用”");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.querySelector("#installButton").hidden = true;
}

function openFileDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveStoredFile(id, file) {
  const db = await openFileDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction("files", "readwrite");
    transaction.objectStore("files").put({
      id,
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      blob: file,
      updatedAt: new Date().toISOString()
    });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function getStoredFile(id) {
  const db = await openFileDb();
  const result = await new Promise((resolve, reject) => {
    const request = db.transaction("files", "readonly").objectStore("files").get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return result;
}

async function getAllStoredFiles() {
  const db = await openFileDb();
  const result = await new Promise((resolve, reject) => {
    const request = db.transaction("files", "readonly").objectStore("files").getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return result;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const [header, content] = dataUrl.split(",", 2);
  const mime = header.match(/^data:([^;]+)/)?.[1] || "application/octet-stream";
  const bytes = atob(content);
  const array = new Uint8Array(bytes.length);
  for (let index = 0; index < bytes.length; index += 1) array[index] = bytes.charCodeAt(index);
  return new Blob([array], { type: mime });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function statusLabel(status) {
  return { attention: "需关注", waiting: "等待中", normal: "正常推进" }[status] || status;
}

function stageName(code) {
  return STAGES.find(stage => stage.code === code)?.name || "未定义";
}

function standardProfileLabel(profile) {
  return {
    general: "消费品 NPD",
    automotive: "汽车 IATF/APQP",
    aerospace: "航空 AS9100/APQP"
  }[profile] || "通用产品开发";
}

function profileOutputs(profile, stageCode) {
  if (profile !== "automotive") return [];
  return {
    G0: ["客户特殊要求 CSR 识别表"],
    G1: ["跨功能小组可行性承诺", "APQP状态报告"],
    G2: ["AIAG-VDA DFMEA", "设计特殊特性与可制造性评审"],
    G3: ["材料/性能规范批准", "样件控制计划"],
    G4: ["设计验证结果与工程批准"],
    G5: ["AIAG-VDA PFMEA", "试生产控制计划", "MSA/SPC与初始过程能力", "PPAP提交包与PSW"],
    G6: ["量产控制计划", "安全投产/加严遏制记录"],
    G7: ["客户绩效与经验反馈至FMEA/控制计划"]
  }[stageCode] || [];
}

function stageRecord(projectId, stageCode) {
  const key = `${projectId}:${stageCode}`;
  if (!state.stageRecords[key]) {
    state.stageRecords[key] = {
      completedChecks: [],
      completedOutputs: [],
      decision: "pending",
      owner: "张家桤",
      risk: "",
      riskOwner: "张家桤",
      closeDate: "",
      targetDate: "",
      approvedAt: ""
    };
  }
  return state.stageRecords[key];
}

function confidenceLabel(value) {
  return { low: "低信心", medium: "中信心", high: "高信心" }[value] || "中信心";
}

function outputTemplateFields(outputName, stageCode) {
  const name = String(outputName);
  if (name.includes("FMEA")) return ["功能/过程步骤", "潜在失效模式", "失效影响", "严重度S", "失效原因", "发生度O", "现有控制", "探测度D", "RPN/AP", "改善措施", "责任人/日期"];
  if (name.includes("风险")) return ["风险描述", "触发条件", "影响范围", "当前等级", "临时控制", "永久措施", "责任人", "关闭日期", "状态"];
  if (name.includes("验证") || name.includes("测试") || name.includes("DVP")) return ["验证目的", "样件/材料状态", "测试标准", "测试条件", "判定标准", "结果记录", "异常说明", "结论与下一步"];
  if (name.includes("成本") || name.includes("报价")) return ["方案范围", "材料成本", "工艺/人工", "模具/治具", "管理费/损耗", "物流/税费", "报价假设", "风险项"];
  if (name.includes("需求") || name.includes("规格")) return ["客户原始输入", "转化后的工程要求", "目标值", "测试/验收方式", "责任人", "状态", "待澄清问题"];
  if (name.includes("BOM") || name.includes("图纸") || name.includes("规范")) return ["版本号", "适用产品", "结构/材料说明", "关键尺寸", "关键性能", "变更记录", "未冻结项"];
  if (name.includes("试产") || name.includes("量产")) return ["试产范围", "人机料法环测", "关键参数", "产出数量", "良率/节拍", "问题清单", "放行结论"];
  if (name.includes("控制计划") || name.includes("SOP") || name.includes("检验")) return ["过程步骤", "产品/过程特性", "控制方法", "检验频率", "反应计划", "记录表单", "责任岗位"];
  return STAGE_TEMPLATE_NOTES[stageCode]?.sections || ["背景", "输入", "分析", "结论", "下一步"];
}

function templateFileName(project, stageCode, outputName) {
  return `${project.id}_${stageCode}_${String(outputName).replace(/[\\/:*?"<>|\\s]+/g, "_")}_模板.md`;
}

function buildOutputTemplate(project, stageCode, outputName) {
  const stage = STAGES.find(item => item.code === stageCode);
  const note = STAGE_TEMPLATE_NOTES[stageCode];
  const fields = outputTemplateFields(outputName, stageCode);
  return `# ${project.id} ${project.name} - ${stageCode} ${stageName(stageCode)} - ${outputName}

## 使用说明

- 本模板用于补齐阶段输出文件，不要求一次写完。
- 不清楚的信息先写“待确认”，并在“未确认问题”中写责任人和日期。
- 与客户邮件、照片、PPT、Excel相关的证据，在项目驾驶舱资料收件箱中关联到本阶段。

## 阶段目标

${stage?.objective || ""}

## 本阶段填写重点

${note?.focus || "补齐输入、过程、结论和下一步。"}

## 基本信息

| 项目 | 内容 |
|---|---|
| 项目编号 | ${project.id} |
| 项目名称 | ${project.name} |
| 阶段 | ${stageCode} ${stageName(stageCode)} |
| 文件名称 | ${outputName} |
| 负责人 | 张家桤 |
| 日期 | ${new Date().toLocaleDateString("zh-CN")} |
| 版本 | V0.1 |

## 正文模板

${fields.map(field => `### ${field}\n\n- \n`).join("\n")}

## 未确认问题

| 问题 | 影响 | 责任人 | 计划日期 | 状态 |
|---|---|---|---|---|
|  |  |  |  | 待确认 |

## 结论

- 当前判断：
- 是否允许带风险进入下一步：
- 下一步：
`;
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadStageTemplate(outputIndex) {
  const project = currentProject();
  const stage = STAGES.find(item => item.code === selectedStageCode) || STAGES[0];
  const outputs = [...stage.outputs, ...profileOutputs(project.standardProfile, stage.code)];
  const outputName = outputs[Number(outputIndex)];
  if (!outputName) return;
  downloadTextFile(templateFileName(project, stage.code, outputName), buildOutputTemplate(project, stage.code, outputName));
  showToast("阶段文件模板已下载");
}

function accuracyLabel(value) {
  return { hit: "命中", partial: "部分命中", miss: "未命中" }[value] || "待复盘";
}

function currentProject() {
  return state.projects.find(project => project.id === selectedProjectId) || state.projects[0];
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateHeaderDate() {
  if (currentView === "dashboard") {
    const parts = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    }).formatToParts(new Date());
    const value = type => parts.find(part => part.type === type)?.value || "";
    document.querySelector("#pageEyebrow").textContent = `${value("year")}年${value("month")}月${value("day")}日 · ${value("weekday")}`;
  }
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach(element => element.classList.remove("active"));
  document.querySelector(`#${view}View`)?.classList.add("active");
  document.querySelectorAll(".nav-item").forEach(element => element.classList.toggle("active", element.dataset.view === view));
  const project = currentProject();
  const titles = {
    dashboard: ["项目总览", "全部项目与下一步行动"],
    work: ["行动中心", "逾期、等待、风险与阶段缺口"],
    projects: ["项目详情", `${project.id} · ${project.name}`],
    inbox: ["资料收件箱", "照片与文件保存在本机"],
    review: ["每日复盘", "有评审结论才算完成"]
  };
  document.querySelector("#pageTitle").textContent = titles[view][0];
  document.querySelector("#pageEyebrow").textContent = titles[view][1];
  updateHeaderDate();
  document.querySelector(".sidebar").classList.remove("open");
  if (view === "projects") renderProjectDetail();
  if (view === "work") renderWorkCenter();
  if (view === "review") startReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProject(projectId, stageCode) {
  const project = state.projects.find(item => item.id === projectId);
  if (!project) return;
  selectedProjectId = project.id;
  selectedStageCode = stageCode || project.stageCode;
  switchView("projects");
}

function addScheme() {
  const project = currentProject();
  const name = window.prompt("请输入技术方案名称");
  if (!name?.trim()) return;
  const summary = window.prompt("请输入方案说明或当前判断") || "待补充方案说明";
  state.schemes.push({
    id: `SC-${Date.now()}`,
    projectId: project.id,
    name: name.trim(),
    status: "提前规划",
    summary: summary.trim(),
    readiness: "10%",
    next: "补充验证计划"
  });
  saveState();
  renderProjectDetail();
  showToast("技术方案已加入当前项目");
}

function applyProjectFilter(filter) {
  projectFilter = filter;
  document.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("active", button.dataset.filter === filter));
  renderProjects();
  document.querySelector(".project-list-block")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function taskDueKey(task) {
  if (task.dueDate) return task.dueDate;
  const match = String(task.date || "").match(/(\d{1,2})月(\d{1,2})日/);
  if (!match) return "";
  return `${new Date().getFullYear()}-${String(match[1]).padStart(2, "0")}-${String(match[2]).padStart(2, "0")}`;
}

function taskBucket(task) {
  if (task.done || task.status === "done") return "done";
  if (task.status === "waiting" || String(task.date).includes("待回复")) return "waiting";
  const due = taskDueKey(task);
  const today = localDateKey();
  if (due && due < today) return "overdue";
  if (due === today) return "today";
  if (String(task.date).includes("本周")) return "week";
  if (due) {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    if (due <= localDateKey(end)) return "week";
  }
  return "later";
}

function taskPriorityLabel(priority) {
  return { high: "高", medium: "中", low: "低" }[priority] || "中";
}

function taskDateLabel(task) {
  if (task.status === "waiting") return "等待外部";
  if (task.dueDate) return task.dueDate;
  return task.date || "待安排";
}

function taskBucketRank(task) {
  return { overdue: 0, today: 1, week: 2, waiting: 3, later: 4, done: 5 }[taskBucket(task)] ?? 5;
}

function currentStageGap(project) {
  const stage = STAGES.find(item => item.code === project.stageCode) || STAGES[0];
  const record = stageRecord(project.id, project.stageCode);
  const outputs = [...stage.outputs, ...profileOutputs(project.standardProfile, project.stageCode)];
  return {
    checks: Math.max(0, stage.checks.length - record.completedChecks.length),
    outputs: Math.max(0, outputs.length - record.completedOutputs.length),
    total: Math.max(0, stage.checks.length - record.completedChecks.length) + Math.max(0, outputs.length - record.completedOutputs.length)
  };
}

function renderWorkCenter() {
  const openTasks = state.tasks.filter(task => !task.done && task.status !== "done");
  const counts = ["overdue", "today", "week", "waiting"].reduce((result, bucket) => {
    result[bucket] = openTasks.filter(task => taskBucket(task) === bucket).length;
    return result;
  }, {});
  document.querySelector("#overdueActionCount").textContent = counts.overdue;
  document.querySelector("#todayActionCount").textContent = counts.today;
  document.querySelector("#weekActionCount").textContent = counts.week;
  document.querySelector("#waitingActionCount").textContent = counts.waiting;
  document.querySelector("#navActionCount").textContent = counts.overdue + counts.today + counts.week;

  const rank = { overdue: 0, today: 1, week: 2, waiting: 3, later: 4, done: 5 };
  const priorityRank = { high: 0, medium: 1, low: 2 };
  const filtered = openTasks
    .filter(task => workFilter === "all" || taskBucket(task) === workFilter)
    .sort((a, b) => rank[taskBucket(a)] - rank[taskBucket(b)] || priorityRank[a.priority] - priorityRank[b.priority]);
  document.querySelector("#workActionList").innerHTML = filtered.length ? filtered.map(task => {
    const project = state.projects.find(item => item.id === task.projectId);
    const bucket = taskBucket(task);
    return `
      <article class="work-action ${bucket}">
        <button class="task-check" data-task-id="${task.id}" aria-label="标记完成"></button>
        <button class="work-action-main" data-open-project="${task.projectId}">
          <span class="work-tags"><i class="priority ${task.priority}">${taskPriorityLabel(task.priority)}优先</i><i>${project?.stageCode || "G0"}</i></span>
          <strong>${escapeHtml(task.title)}</strong>
          <small>${escapeHtml(project?.name || task.projectId)} · 负责人 ${escapeHtml(task.owner)}</small>
          ${task.acceptance ? `<p>完成标准：${escapeHtml(task.acceptance)}</p>` : ""}
        </button>
        <span class="work-due ${bucket}">${escapeHtml(taskDateLabel(task))}</span>
      </article>
    `;
  }).join("") : `<div class="empty-state">这个分组目前没有待处理行动。</div>`;

  const risks = Object.entries(state.stageRecords).flatMap(([key, record]) => {
    if (record.decision !== "conditional" || !record.risk) return [];
    const [projectId, stageCode] = key.split(":");
    const project = state.projects.find(item => item.id === projectId);
    return [{ projectId, stageCode, project, ...record }];
  });
  document.querySelector("#riskRegister").innerHTML = risks.length ? risks.map(risk => `
    <button class="risk-row" data-open-project="${risk.projectId}" data-open-stage="${risk.stageCode}">
      <span><strong>${escapeHtml(risk.risk)}</strong><small>${escapeHtml(risk.project?.name || risk.projectId)} · ${risk.stageCode}</small></span>
      <i>${escapeHtml(risk.closeDate || "未定日期")}</i>
    </button>
  `).join("") : `<div class="empty-state compact">暂无带风险放行事项。</div>`;

  const gaps = state.projects.map(project => ({ project, gap: currentStageGap(project) })).sort((a, b) => b.gap.total - a.gap.total);
  document.querySelector("#stageGapList").innerHTML = gaps.map(({ project, gap }) => `
    <button class="gap-row" data-open-project="${project.id}" data-open-stage="${project.stageCode}">
      <span><strong>${escapeHtml(project.name)}</strong><small>${project.stageCode} ${stageName(project.stageCode)}</small></span>
      <i>${gap.checks}项检查<br>${gap.outputs}份输出</i>
    </button>
  `).join("");
}

function openActionModal(projectId = selectedProjectId) {
  document.querySelector("#actionProject").value = projectId || state.projects[0]?.id;
  document.querySelector("#actionModal").hidden = false;
}

function closeActionModal() {
  document.querySelector("#actionModal").hidden = true;
  document.querySelector("#actionForm").reset();
  document.querySelector("#actionForm [name=owner]").value = "张家桤";
}

function openProjectModal() {
  const form = document.querySelector("#projectForm");
  form.reset();
  form.elements.owner.value = "张家桤";
  form.elements.standardProfile.value = "general";
  form.elements.stageCode.value = "G0";
  document.querySelector("#projectModal").hidden = false;
}

function closeProjectModal() {
  document.querySelector("#projectModal").hidden = true;
}

function formatDeadline(value) {
  if (!value) return "待确认";
  const [, month, day] = value.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function createProject(form) {
  const data = new FormData(form);
  const id = String(data.get("id")).trim().toUpperCase();
  const name = String(data.get("name")).trim();
  const stageCode = String(data.get("stageCode") || "G0");
  const stage = STAGES.find(item => item.code === stageCode) || STAGES[0];
  const nextAction = String(data.get("nextAction")).trim();
  const owner = String(data.get("owner")).trim();
  const dueDate = String(data.get("deadline") || "");
  if (state.projects.some(project => project.id.toUpperCase() === id)) {
    showToast("项目编号已存在，请更换编号");
    return;
  }

  state.projects.unshift({
    id,
    name,
    customer: String(data.get("customer") || "").trim(),
    owner,
    projectType: "npd",
    standardProfile: String(data.get("standardProfile") || "general"),
    stageCode,
    stage: `${stageCode} ${stage.name}`,
    stageNote: "新项目待建立基线",
    progress: Math.round((STAGES.findIndex(item => item.code === stageCode) / (STAGES.length - 1)) * 100),
    status: "attention",
    deadline: formatDeadline(dueDate),
    deadlineDate: dueDate,
    next: nextAction,
    summary: String(data.get("summary")).trim(),
    readiness: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  state.tasks.unshift({
    id: Date.now(),
    projectId: id,
    title: nextAction,
    owner,
    priority: "high",
    status: "open",
    dueDate,
    date: dueDate || "待安排",
    acceptance: stageCode === "G0" ? "形成需求清单、待确认问题及下一步计划" : "按当前阶段完成约定输出",
    meta: `${owner} · ${name}`,
    done: false
  });
  stageRecord(id, stageCode).owner = owner;
  state.timeline.unshift({
    id: `TL-${Date.now()}`,
    projectId: id,
    date: new Date().toLocaleDateString("zh-CN"),
    title: "项目创建",
    text: `项目由${owner}建立，起始阶段为${stageCode} ${stage.name}。`
  });
  saveState();
  closeProjectModal();
  selectedProjectId = id;
  selectedStageCode = stageCode;
  renderAll();
  switchView("projects");
  showToast("项目已创建，并生成第一项行动");
}

function saveAction(form) {
  const data = new FormData(form);
  const project = state.projects.find(item => item.id === data.get("projectId"));
  const dueDate = String(data.get("dueDate") || "");
  state.tasks.unshift({
    id: Date.now(),
    projectId: String(data.get("projectId")),
    title: String(data.get("title")).trim(),
    owner: String(data.get("owner")).trim(),
    priority: String(data.get("priority")),
    status: String(data.get("status")),
    dueDate,
    date: dueDate || (data.get("status") === "waiting" ? "待回复" : "待安排"),
    acceptance: String(data.get("acceptance") || "").trim(),
    meta: `${String(data.get("owner")).trim()} · ${project?.name || ""}`,
    done: false
  });
  if (project) {
    project.next = String(data.get("title")).trim();
    project.updatedAt = new Date().toISOString();
  }
  saveState();
  closeActionModal();
  renderAll();
  switchView("work");
  showToast("行动已加入执行队列");
}

function renderProjects() {
  const list = state.projects.filter(project => projectFilter === "all" || project.status === projectFilter);
  document.querySelector("#projectTable").innerHTML = `
    <div class="project-table-header"><span>项目</span><span>当前阶段</span><span>完成度</span><span>状态</span><span></span></div>
    ${list.map(project => `
      <article class="project-row" data-open-project="${project.id}" tabindex="0">
        <div class="project-name"><strong>${escapeHtml(project.name)}</strong><span>${project.id} · 节点 ${escapeHtml(project.deadline)}</span></div>
        <div class="stage-label">${escapeHtml(project.stage)}<span>${escapeHtml(project.stageNote)}</span></div>
        <div class="progress-cell"><div class="progress-track"><span style="width:${project.progress}%"></span></div><div class="progress-value">${project.progress}%</div></div>
        <div><span class="status-pill ${project.status}">${statusLabel(project.status)}</span></div>
        <div class="row-arrow">›</div>
      </article>
    `).join("")}
  `;
}

function renderDashboard() {
  renderProjects();
  const attention = state.projects.filter(project => project.status === "attention").length;
  const waiting = state.projects.filter(project => project.status === "waiting").length;
  const priorityTask = state.tasks
    .filter(task => !task.done && task.status !== "done")
    .sort((a, b) => taskBucketRank(a) - taskBucketRank(b))[0];
  if (priorityTask) {
    const focusProject = state.projects.find(project => project.id === priorityTask.projectId);
    document.querySelector(".focus-strip strong").textContent = priorityTask.title;
    document.querySelector(".focus-strip [data-open-project]").dataset.openProject = priorityTask.projectId;
    document.querySelector(".focus-strip [data-open-project]").textContent = `查看${focusProject?.name || "项目"} →`;
  }
  document.querySelector("#activeProjectCount").textContent = state.projects.length;
  document.querySelector("#attentionProjectCount").textContent = attention;
  document.querySelector("#waitingProjectCount").textContent = waiting;
  document.querySelector("#nextActions").innerHTML = state.tasks
    .filter(task => !task.done && task.status !== "done")
    .sort((a, b) => taskBucketRank(a) - taskBucketRank(b))
    .slice(0, 5)
    .map((task, index) => `
      <button class="action-item" data-open-project="${task.projectId}">
        <span class="action-rank">${index + 1}</span>
        <span><strong>${escapeHtml(task.title)}</strong><small>${task.projectId} · ${escapeHtml(taskDateLabel(task))}</small></span>
      </button>
    `).join("");

  const pulseGroups = [
    ["逾期", "overdue", "danger"],
    ["今天", "today", "warning"],
    ["本周", "week", "accent"],
    ["等待", "waiting", "blue"]
  ];
  const openTasks = state.tasks.filter(task => !task.done && task.status !== "done");
  const pulseMax = Math.max(1, ...pulseGroups.map(([, bucket]) => openTasks.filter(task => taskBucket(task) === bucket).length));
  document.querySelector("#weeklyPulse").innerHTML = pulseGroups.map(([label, bucket, tone]) => {
    const count = openTasks.filter(task => taskBucket(task) === bucket).length;
    return `<button class="pulse-row" data-work-jump="${bucket}">
      <span>${label}</span><i><b class="${tone}" style="width:${Math.max(count ? 12 : 0, (count / pulseMax) * 100)}%"></b></i><strong>${count}</strong>
    </button>`;
  }).join("");

  const healthGroups = [
    ["正常", "normal", "success"],
    ["需关注", "attention", "danger"],
    ["等待", "waiting", "warning"]
  ];
  document.querySelector("#healthSummary").innerHTML = healthGroups.map(([label, status, tone]) => {
    const count = state.projects.filter(project => project.status === status).length;
    return `<button data-health-filter="${status}"><i class="${tone}"></i><span>${label}</span><strong>${count}</strong></button>`;
  }).join("");

  const recent = state.timeline.slice(0, 3);
  document.querySelector("#recentUpdates").innerHTML = recent.length ? recent.map(item => {
    const project = state.projects.find(projectItem => projectItem.id === item.projectId);
    return `<button data-open-project="${item.projectId}">
      <i></i><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(project?.name || item.projectId)} · ${escapeHtml(item.date)}</small></span>
    </button>`;
  }).join("") : `<div class="empty-state compact">暂无项目动态。</div>`;

  const dashboardGaps = state.projects
    .map(project => ({ project, gap: currentStageGap(project) }))
    .sort((a, b) => b.gap.total - a.gap.total)
    .slice(0, 4);
  document.querySelector("#dashboardStageGaps").innerHTML = dashboardGaps.map(({ project, gap }) => `
    <button class="dashboard-gap" data-open-project="${project.id}" data-open-stage="${project.stageCode}">
      <span><strong>${escapeHtml(project.name)}</strong><small>${project.stageCode} ${stageName(project.stageCode)}</small></span>
      <i>${gap.total}<small>项缺口</small></i>
    </button>
  `).join("");

  const groups = [
    ["需求/立项", ["G0", "G1"]],
    ["产品/过程设计", ["G2"]],
    ["材料/工艺开发", ["G3"]],
    ["样件验证", ["G4"]],
    ["试产/量产", ["G5", "G6", "G7"]]
  ];
  document.querySelector("#stageDistribution").innerHTML = groups.map(([label, codes]) => {
    const projects = state.projects.filter(project => codes.includes(project.stageCode));
    return `<button class="distribution-row" data-stage-project="${projects[0]?.id || ""}" ${projects.length ? "" : "disabled"}>
      <span>${label}</span><span class="distribution-bar"><span style="width:${Math.min(100, projects.length * 42)}%"></span></span><strong>${projects.length}</strong>
    </button>`;
  }).join("");
  renderWorkCenter();
  updateCounts();
}

function renderProjectDetail() {
  const project = currentProject();
  if (!project) return;
  const currentIndex = Math.max(0, STAGES.findIndex(stage => stage.code === project.stageCode));
  document.querySelector("#detailProjectId").textContent = project.id;
  document.querySelector("#detailProjectName").textContent = project.name;
  document.querySelector("#detailProjectSummary").textContent = project.summary;
  document.querySelector("#detailProjectStatus").textContent = statusLabel(project.status);
  document.querySelector(".health-dot").className = `health-dot ${project.status}`;
  document.querySelector("#detailStandardSelect").value = project.standardProfile;
  document.querySelector("#detailMainStage").textContent = `${project.stageCode} ${stageName(project.stageCode)}`;
  document.querySelector("#technicalReadiness").textContent = `${project.readiness}%`;
  document.querySelector("#detailDeadline").textContent = project.deadline;
  document.querySelector("#latestUpdate").textContent = project.updatedAt ? new Date(project.updatedAt).toLocaleDateString("zh-CN") : "今天";

  document.querySelector("#stageMap").innerHTML = STAGES.map((stage, index) => {
    const className = index === currentIndex ? "current" : index < currentIndex ? "completed" : "";
    const files = state.inbox.filter(item => item.projectId === project.id && item.stageCode === stage.code).length;
    const record = stageRecord(project.id, stage.code);
    const decision = record.decision === "conditional" ? "风险放行" : record.decision === "approved" ? "已批准" : index === currentIndex ? "当前阶段" : index < currentIndex ? "历史阶段" : "未开始";
    return `<button class="stage-node ${className} ${selectedStageCode === stage.code ? "selected" : ""}" data-stage="${stage.code}">
      <small>${stage.code}</small><strong>${stage.name}</strong><span>${decision} · ${files}份资料</span>
    </button>`;
  }).join("");
  renderStageDetail();
  renderPredictionBoard(project);

  const schemes = state.schemes.filter(scheme => scheme.projectId === project.id);
  document.querySelector("#schemeList").innerHTML = schemes.length ? schemes.map(scheme => `
    <article class="scheme-card">
      <div class="scheme-top"><h3>${escapeHtml(scheme.name)}</h3><span class="status-pill ${scheme.status === "已完成初评" ? "normal" : "waiting"}">${escapeHtml(scheme.status)}</span></div>
      <p>${escapeHtml(scheme.summary)}</p>
      <div class="scheme-meta"><div><span>准备度</span><strong>${scheme.readiness}</strong></div><div><span>下一步</span><strong>${escapeHtml(scheme.next)}</strong></div></div>
    </article>
  `).join("") : `<div class="empty-state">当前项目尚未建立并行技术方案。</div>`;

  const tasks = state.tasks.filter(task => task.projectId === project.id);
  document.querySelector("#taskList").innerHTML = tasks.length ? tasks.map(task => `
    <article class="task-item">
      <button class="task-check ${task.done ? "done" : ""}" data-task-id="${task.id}" aria-label="${task.done ? "标记未完成" : "标记完成"}">${task.done ? "✓" : ""}</button>
      <div><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(task.meta)}</small></div>
      <span class="task-date">${escapeHtml(task.date)}</span>
    </article>
  `).join("") : `<div class="empty-state">当前项目暂无行动项。</div>`;

  renderRuleLibrary(project);

  const evidence = state.inbox.filter(item => item.projectId === project.id);
  document.querySelector("#evidenceGrid").innerHTML = evidence.length ? evidence.map(item => `
    <article class="evidence-card ${item.fileId || item.src ? "interactive" : ""}" data-open-file="${item.id}">
      ${item.type === "photo" && item.src ? `<img src="${item.src}" alt="${escapeHtml(item.title)}">` : `<div class="evidence-file">${escapeHtml(item.extension || "FILE")}</div>`}
      <div class="evidence-card-body"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note || "暂无说明")}</p><small>${escapeHtml(item.time)} · ${item.stageCode} ${stageName(item.stageCode)}</small></div>
    </article>
  `).join("") : `<div class="empty-state">当前项目暂无照片或文件。</div>`;

  const timeline = state.timeline.filter(item => item.projectId === project.id);
  document.querySelector("#timeline").innerHTML = timeline.length ? timeline.map(item => `
    <div class="timeline-item"><div class="timeline-date">${escapeHtml(item.date)}</div><div class="timeline-marker"></div><div class="timeline-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></div></div>
  `).join("") : `<div class="empty-state">当前项目暂无时间线记录。</div>`;
}

function renderPredictionBoard(project) {
  const predictions = state.stagePredictions
    .filter(item => item.projectId === project.id)
    .sort((a, b) => String(b.lockedAt || "").localeCompare(String(a.lockedAt || "")));
  document.querySelector("#predictionBoard").innerHTML = predictions.length ? predictions.map(item => {
    const locked = Boolean(item.lockedAt);
    const reviewed = Boolean(item.outcome);
    return `
      <article class="prediction-card ${reviewed ? item.accuracy : locked ? "locked" : "draft"}">
        <div class="prediction-top">
          <span>${escapeHtml(item.stageCode)} ${stageName(item.stageCode)}</span>
          <i>${reviewed ? accuracyLabel(item.accuracy) : locked ? "已锁定" : "草稿"}</i>
        </div>
        <strong>${escapeHtml(item.question)}</strong>
        <p>${escapeHtml(item.prediction)}</p>
        <div class="prediction-meta">
          <span>${confidenceLabel(item.confidence)}</span>
          <span>${item.dueDate ? `复盘节点 ${escapeHtml(item.dueDate)}` : "未设复盘节点"}</span>
          <span>${item.lockedAt ? `锁定 ${escapeHtml(item.lockedAt)}` : "尚未锁定"}</span>
        </div>
        ${reviewed ? `<div class="prediction-retro"><b>实际结果</b>${escapeHtml(item.outcome)}<br><b>复盘</b>${escapeHtml(item.retro || "未补充")}</div>` : ""}
        <div class="prediction-actions">
          ${locked ? `<button class="secondary-button" data-review-prediction="${item.id}">${reviewed ? "补充复盘" : "填写复盘"}</button>` : `<button class="primary-button" data-lock-prediction="${item.id}">锁定预测</button>`}
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">当前项目还没有阶段预测。建议在推进前先写下风险和节点判断。</div>`;
}

function renderRuleLibrary(project) {
  const rules = state.decisionRules
    .filter(rule => !rule.sourceProjectId || rule.sourceProjectId === project.id)
    .slice(0, 8);
  document.querySelector("#ruleLibrary").innerHTML = rules.length ? rules.map(rule => `
    <article class="rule-card">
      <div class="rule-top"><span>${escapeHtml(rule.category)}</span><i>${escapeHtml(rule.strength)}</i></div>
      <strong>${escapeHtml(rule.title)}</strong>
      <p>${escapeHtml(rule.rule)}</p>
      <small>${rule.sourceProjectId ? `${escapeHtml(rule.sourceProjectId)} · ${escapeHtml(rule.sourceStageCode || "项目级")}` : "通用规则"}${rule.updatedAt ? ` · ${escapeHtml(rule.updatedAt)}` : ""}</small>
    </article>
  `).join("") : `<div class="empty-state">暂无判断规则。可以从阶段复盘里沉淀第一条。</div>`;
}

function addPrediction() {
  const project = currentProject();
  const stageCode = window.prompt("预测归属阶段，例如 G0-G7", selectedStageCode || project.stageCode);
  if (!STAGES.some(stage => stage.code === stageCode)) {
    showToast("阶段编号无效");
    return;
  }
  const question = window.prompt("这次要预测的问题是什么？", "本阶段最可能卡住项目的因素是什么？");
  if (!question?.trim()) return;
  const prediction = window.prompt("先写下你的判断。后续锁定后就不再修改。");
  if (!prediction?.trim()) return;
  const confidence = window.prompt("信心等级：low / medium / high", "medium") || "medium";
  const dueDate = window.prompt("计划什么时候复盘？可留空，例如 2026-06-21", "");
  state.stagePredictions.unshift({
    id: `PR-${Date.now()}`,
    projectId: project.id,
    stageCode,
    question: question.trim(),
    prediction: prediction.trim(),
    confidence: ["low", "medium", "high"].includes(confidence) ? confidence : "medium",
    dueDate: dueDate.trim(),
    lockedAt: "",
    outcome: "",
    accuracy: "",
    retro: "",
    ruleCandidate: "",
    reviewedAt: ""
  });
  saveState();
  renderProjectDetail();
  showToast("阶段预测已建立，请在执行前锁定");
}

function lockPrediction(id) {
  const prediction = state.stagePredictions.find(item => String(item.id) === String(id));
  if (!prediction || prediction.lockedAt) return;
  prediction.lockedAt = new Date().toLocaleDateString("zh-CN");
  state.timeline.unshift({
    id: `TL-${Date.now()}`,
    projectId: prediction.projectId,
    date: prediction.lockedAt,
    title: `锁定阶段预测：${prediction.stageCode}`,
    text: `${prediction.question} ${prediction.prediction}`
  });
  saveState();
  renderProjectDetail();
  showToast("预测已锁定，后续只追加复盘");
}

function reviewPrediction(id) {
  const prediction = state.stagePredictions.find(item => String(item.id) === String(id));
  if (!prediction?.lockedAt) {
    showToast("请先锁定预测");
    return;
  }
  const outcome = window.prompt("实际发生了什么？", prediction.outcome || "");
  if (!outcome?.trim()) return;
  const accuracy = window.prompt("判断准确度：hit / partial / miss", prediction.accuracy || "partial") || "partial";
  const retro = window.prompt("复盘：为什么判断对或错？下一次要注意什么？", prediction.retro || "");
  const ruleCandidate = window.prompt("是否沉淀成一条判断规则？可留空", prediction.ruleCandidate || "");
  prediction.outcome = outcome.trim();
  prediction.accuracy = ["hit", "partial", "miss"].includes(accuracy) ? accuracy : "partial";
  prediction.retro = retro.trim();
  prediction.ruleCandidate = ruleCandidate.trim();
  prediction.reviewedAt = new Date().toLocaleDateString("zh-CN");
  if (ruleCandidate?.trim()) {
    state.decisionRules.unshift({
      id: `RULE-${Date.now()}`,
      category: `${prediction.stageCode} ${stageName(prediction.stageCode)}`,
      title: prediction.question,
      rule: ruleCandidate.trim(),
      sourceProjectId: prediction.projectId,
      sourceStageCode: prediction.stageCode,
      strength: prediction.accuracy === "hit" ? "已验证" : "待验证",
      updatedAt: prediction.reviewedAt
    });
  }
  state.timeline.unshift({
    id: `TL-${Date.now()}`,
    projectId: prediction.projectId,
    date: prediction.reviewedAt,
    title: `复盘阶段预测：${accuracyLabel(prediction.accuracy)}`,
    text: `${prediction.question} 实际：${prediction.outcome}`
  });
  saveState();
  renderProjectDetail();
  showToast("预测复盘已保存");
}

function addRule() {
  const project = currentProject();
  const category = window.prompt("规则分类", "项目判断");
  if (!category?.trim()) return;
  const title = window.prompt("规则标题");
  if (!title?.trim()) return;
  const rule = window.prompt("规则内容：以后遇到类似项目时应该怎么判断？");
  if (!rule?.trim()) return;
  state.decisionRules.unshift({
    id: `RULE-${Date.now()}`,
    category: category.trim(),
    title: title.trim(),
    rule: rule.trim(),
    sourceProjectId: project.id,
    sourceStageCode: selectedStageCode,
    strength: "待验证",
    updatedAt: new Date().toLocaleDateString("zh-CN")
  });
  saveState();
  renderProjectDetail();
  showToast("判断规则已加入当前项目");
}

function renderStageDetail() {
  const project = currentProject();
  const stage = STAGES.find(item => item.code === selectedStageCode) || STAGES[0];
  const guide = STAGE_GUIDES[stage.code];
  const files = state.inbox.filter(item => item.projectId === project.id && item.stageCode === stage.code);
  const record = stageRecord(project.id, stage.code);
  const applicableOutputs = [...stage.outputs, ...profileOutputs(project.standardProfile, stage.code)];
  const doneCount = record.completedChecks.length + record.completedOutputs.length;
  const totalCount = stage.checks.length + applicableOutputs.length;
  const completion = Math.round((doneCount / totalCount) * 100);
  const isCurrent = project.stageCode === stage.code;
  document.querySelector("#stageDetailPanel").innerHTML = `
    <div class="stage-detail-head">
      <div><p class="eyebrow">阶段工作区 · 完整度 ${completion}%</p><h3>${stage.code} ${stage.name}</h3></div>
      <button class="small-button" data-capture-type="file" data-capture-project="${project.id}" data-capture-stage="${stage.code}">＋ 导入阶段文件</button>
    </div>
    <p class="stage-objective">${escapeHtml(stage.objective)}</p>
    <div class="stage-guide">
      <div><strong>为什么要做</strong><p>${escapeHtml(guide.why)}</p></div>
      <div><strong>具体怎么做</strong><p>${escapeHtml(guide.how)}</p></div>
      <div><strong>什么算完成</strong><p>${escapeHtml(guide.done)}</p></div>
    </div>
    <div class="stage-detail-grid">
      <div><strong>阶段门必做检查</strong>${stage.checks.map((check, index) => `<button class="gate-check ${record.completedChecks.includes(index) ? "done" : ""}" data-gate-check="${index}"><i>${record.completedChecks.includes(index) ? "✓" : ""}</i><span>${escapeHtml(check)}</span></button>`).join("")}</div>
      <div><strong>受控输出文件</strong>${applicableOutputs.map((output, index) => `
        <div class="output-row ${record.completedOutputs.includes(index) ? "done" : ""}">
          <button class="output-item" data-output-check="${index}"><span>${escapeHtml(output)}</span><small>${record.completedOutputs.includes(index) ? "已具备" : "待建立"}</small></button>
          <button class="template-button" data-template-output="${index}">模板</button>
        </div>
      `).join("")}</div>
      <div><strong>当前已有资料</strong>${files.length ? files.map(file => `<button class="stage-file" data-open-file="${file.id}"><span>${escapeHtml(file.title)}</span><small>${escapeHtml(file.extension || file.type.toUpperCase())}</small></button>`).join("") : `<span class="empty-copy">尚未导入本阶段资料</span>`}</div>
    </div>
    <div class="template-pack">
      <div><strong>本阶段模板包</strong><span>${escapeHtml(STAGE_TEMPLATE_NOTES[stage.code]?.focus || "按输出文件逐项补齐。")}</span></div>
      <div class="template-list">
        ${applicableOutputs.map((output, index) => `<button data-template-output="${index}">${escapeHtml(output)}</button>`).join("")}
      </div>
    </div>
    <div class="gate-decision">
      <div class="gate-status">
        <span>阶段结论</span>
        <strong>${record.decision === "approved" ? "正常通过" : record.decision === "conditional" ? "带风险通过" : "尚未评审"}</strong>
        <small>负责人：${escapeHtml(record.owner)}${record.approvedAt ? ` · ${escapeHtml(record.approvedAt)}` : ""}</small>
      </div>
      ${isCurrent ? `
        <label>阶段负责人<input id="gateOwner" value="${escapeHtml(record.owner)}"></label>
        <label>下一阶段目标日期<input id="gateTargetDate" type="date" value="${escapeHtml(record.targetDate)}"></label>
        <label>未关闭风险 / 放行说明<textarea id="gateRisk" rows="2" placeholder="正常通过可留空；带风险通过必须填写">${escapeHtml(record.risk)}</textarea></label>
        <div class="gate-fields">
          <label>风险责任人<input id="gateRiskOwner" value="${escapeHtml(record.riskOwner)}"></label>
          <label>计划关闭日期<input id="gateCloseDate" type="date" value="${escapeHtml(record.closeDate)}"></label>
        </div>
        <div class="gate-actions">
          <button class="secondary-button" data-gate-decision="conditional">带风险通过</button>
          <button class="primary-button" data-gate-decision="approved">完整通过</button>
        </div>
      ` : `<div class="gate-history">只有当前阶段可以进行放行评审；历史和后续阶段仍可补充检查及文件。</div>`}
    </div>
  `;
}

function toggleStageItem(kind, index) {
  const project = currentProject();
  const record = stageRecord(project.id, selectedStageCode);
  const key = kind === "check" ? "completedChecks" : "completedOutputs";
  const value = Number(index);
  record[key] = record[key].includes(value) ? record[key].filter(item => item !== value) : [...record[key], value];
  saveState();
  renderProjectDetail();
}

function approveCurrentStage(decision) {
  const project = currentProject();
  const stage = STAGES.find(item => item.code === selectedStageCode);
  const record = stageRecord(project.id, selectedStageCode);
  const owner = document.querySelector("#gateOwner")?.value.trim();
  const risk = document.querySelector("#gateRisk")?.value.trim();
  const riskOwner = document.querySelector("#gateRiskOwner")?.value.trim();
  const closeDate = document.querySelector("#gateCloseDate")?.value;
  const targetDate = document.querySelector("#gateTargetDate")?.value;
  const applicableOutputs = [...stage.outputs, ...profileOutputs(project.standardProfile, stage.code)];

  if (!owner) {
    showToast("请填写阶段负责人");
    return;
  }
  if (!targetDate) {
    showToast("请设置下一阶段目标日期");
    return;
  }
  if (decision === "approved" && (record.completedChecks.length < stage.checks.length || record.completedOutputs.length < applicableOutputs.length)) {
    showToast("完整通过前，请确认全部检查项和输出文件");
    return;
  }
  if (decision === "conditional" && (!risk || !riskOwner || !closeDate)) {
    showToast("带风险通过必须填写风险、责任人和关闭日期");
    return;
  }

  record.decision = decision;
  record.owner = owner;
  record.risk = risk;
  record.riskOwner = riskOwner;
  record.closeDate = closeDate;
  record.targetDate = targetDate;
  record.approvedAt = new Date().toLocaleDateString("zh-CN");

  if (decision === "conditional") {
    state.tasks.unshift({
      id: Date.now(),
      projectId: project.id,
      title: `关闭阶段风险：${risk}`,
      meta: `${selectedStageCode} ${stage.name} · ${riskOwner}`,
      owner: riskOwner,
      priority: "high",
      status: "open",
      dueDate: closeDate,
      acceptance: "风险措施完成并在阶段记录中关闭",
      date: closeDate,
      done: false
    });
  }

  const stageIndex = STAGES.findIndex(item => item.code === selectedStageCode);
  const nextStage = STAGES[stageIndex + 1];
  if (nextStage) {
    project.stageCode = nextStage.code;
    project.stage = `${nextStage.code} ${nextStage.name}`;
    project.stageNote = decision === "conditional" ? "上一阶段风险放行" : "阶段门已批准";
    project.progress = Math.max(project.progress, Math.round(((stageIndex + 1) / (STAGES.length - 1)) * 100));
    project.deadline = targetDate;
    selectedStageCode = nextStage.code;
  }
  project.updatedAt = new Date().toISOString();
  state.timeline.unshift({
    id: `TL-${Date.now()}`,
    projectId: project.id,
    date: new Date().toLocaleDateString("zh-CN"),
    title: `${stage.code} ${stage.name}${decision === "conditional" ? "带风险通过" : "评审通过"}`,
    text: decision === "conditional" ? `负责人：${owner}。风险：${risk}；由${riskOwner}在${closeDate}前关闭。` : `阶段检查及输出已确认，由${owner}批准进入下一阶段。`
  });
  saveState();
  renderDashboard();
  renderProjectDetail();
  showToast(nextStage ? `已进入 ${nextStage.code} ${nextStage.name}` : "项目阶段已全部完成");
}

function renderInbox() {
  const list = state.inbox.filter(item => inboxFilter === "all" || item.status === inboxFilter);
  document.querySelector("#inboxList").innerHTML = list.length ? list.map(item => `
    <article class="inbox-item interactive" data-open-file="${item.id}">
      ${item.type === "photo" && item.src ? `<img class="inbox-thumb" src="${item.src}" alt="">` : `<div class="file-thumb">${escapeHtml(item.extension || "NOTE")}</div>`}
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note || "等待复盘补充说明")} · ${escapeHtml(item.time)}</p></div>
      <div class="inbox-project">${escapeHtml(item.projectName)}<span>${item.stageCode} ${stageName(item.stageCode)}</span></div>
      <span class="status-pill ${item.status === "pending" ? "waiting" : "normal"}">${item.status === "pending" ? "待评审" : "已归档"}</span>
    </article>
  `).join("") : `<div class="empty-state section-block">当前没有符合条件的资料</div>`;
  updateCounts();
}

function updateCounts() {
  const pending = state.inbox.filter(item => item.status === "pending").length;
  document.querySelector("#navInboxCount").textContent = pending;
  document.querySelector("#metricInboxCount").textContent = pending;
  document.querySelector("#inboxSummary").textContent = `${pending}项待评审`;
}

function startReview() {
  reviewItems = state.inbox.filter(item => item.status === "pending");
  reviewIndex = 0;
  if (!reviewItems.length) renderReviewComplete();
  else renderReviewCard();
}

function renderReviewCard() {
  const item = reviewItems[reviewIndex];
  if (!item) return renderReviewComplete();
  const projectSchemes = state.schemes.filter(scheme => scheme.projectId === item.projectId);
  document.querySelector("#reviewProgressBar").style.width = `${(reviewIndex / reviewItems.length) * 100}%`;
  document.querySelector("#reviewCard").innerHTML = `
    <p class="eyebrow">第 ${reviewIndex + 1} 项，共 ${reviewItems.length} 项</p>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.note || "尚未填写说明")} · ${escapeHtml(item.time)}</p>
    <form id="reviewItemForm">
      <label>归属项目
        <select name="projectId">${state.projects.map(project => `<option value="${project.id}" ${project.id === item.projectId ? "selected" : ""}>${project.id} ${escapeHtml(project.name)}</option>`).join("")}</select>
      </label>
      <label>归属阶段
        <select name="stageCode">${STAGES.map(stage => `<option value="${stage.code}" ${stage.code === item.stageCode ? "selected" : ""}>${stage.code} ${stage.name}</option>`).join("")}</select>
      </label>
      <label>评审判断
        <select name="decision" required>
          <option value="">请选择评审结果</option>
          <option value="有效，可继续推进">有效，可继续推进</option>
          <option value="需要补充验证">需要补充验证</option>
          <option value="登记为问题或风险">登记为问题或风险</option>
          <option value="仅归档参考">仅归档参考</option>
        </select>
      </label>
      <label>评审意见
        <textarea name="conclusion" rows="3" placeholder="填写判断依据、结果或待确认内容"></textarea>
      </label>
      <label class="review-file">
        <span>或添加评审附件</span>
        <input type="file" name="reviewFile" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
      </label>
      <label>形成的下一步
        <input name="nextAction" placeholder="例如：安排粘结强度测试">
      </label>
      <label>关联技术方案
        <select name="scheme"><option value="">不关联方案</option>${projectSchemes.map(scheme => `<option>${escapeHtml(scheme.name)}</option>`).join("")}</select>
      </label>
      <label class="check-row"><input type="checkbox" name="weekly" checked> 加入本周周报素材</label>
      <div class="review-requirement">必须选择评审判断，并填写评审意见或添加评审附件，才能完成本项。</div>
      <div class="review-actions">
        <button type="button" class="secondary-button" id="skipReviewItem">暂不评审</button>
        <button type="submit" class="primary-button">确认完成本项</button>
      </div>
    </form>
  `;
}

async function completeReviewItem(form) {
  const item = reviewItems[reviewIndex];
  const data = new FormData(form);
  const decision = data.get("decision");
  const conclusion = data.get("conclusion")?.trim();
  const reviewFile = form.elements.reviewFile.files?.[0];
  if (!decision || (!conclusion && !reviewFile)) {
    showToast("请先选择评审判断，并填写意见或添加评审附件");
    return;
  }

  const project = state.projects.find(projectItem => projectItem.id === data.get("projectId"));
  const stageCode = data.get("stageCode");
  item.status = "organized";
  item.projectId = project.id;
  item.projectName = project.name;
  item.stageCode = stageCode;
  item.decision = decision;
  item.conclusion = conclusion || `评审依据见附件：${reviewFile.name}`;
  item.scheme = data.get("scheme");
  item.reviewedAt = new Date().toISOString();

  if (reviewFile) {
    const fileId = `review-${Date.now()}`;
    await saveStoredFile(fileId, reviewFile);
    state.inbox.unshift({
      id: Date.now() + 1,
      fileId,
      type: reviewFile.type.startsWith("image/") ? "photo" : "document",
      title: reviewFile.name,
      note: `评审附件：${item.title}`,
      projectId: project.id,
      projectName: project.name,
      stageCode,
      time: "刚刚",
      status: "organized",
      extension: reviewFile.name.split(".").pop()?.toUpperCase() || "FILE",
      size: reviewFile.size
    });
  }

  state.reviewResults.processes += 1;
  if (decision.includes("问题") || decision.includes("补充")) state.reviewResults.issues += 1;
  if (data.get("weekly")) state.reviewResults.weekly += 1;
  const nextAction = data.get("nextAction")?.trim();
  if (nextAction) {
    state.tasks.unshift({
      id: Date.now(),
      projectId: project.id,
      title: nextAction,
      meta: `${project.id} · 每日复盘`,
      owner: "张家桤",
      priority: "medium",
      status: "open",
      dueDate: "",
      acceptance: "",
      date: "待安排",
      done: false
    });
    state.reviewResults.actions += 1;
  }
  state.timeline.unshift({
    id: `TL-${Date.now()}`,
    projectId: project.id,
    date: new Date().toLocaleDateString("zh-CN"),
    title: `评审归档：${item.title}`,
    text: `${decision}。${item.conclusion}`
  });
  project.updatedAt = new Date().toISOString();
  saveState();
  updateCounts();
  reviewIndex += 1;
  updateReviewStats();
  if (reviewIndex >= reviewItems.length) renderReviewComplete();
  else renderReviewCard();
}

function updateReviewStats() {
  const results = state.reviewResults;
  document.querySelector("#reviewProcessCount").textContent = results.processes;
  document.querySelector("#reviewIssueCount").textContent = results.issues;
  document.querySelector("#reviewActionCount").textContent = results.actions;
  document.querySelector("#reviewWeeklyCount").textContent = results.weekly;
}

function renderReviewComplete() {
  document.querySelector("#reviewProgressBar").style.width = "100%";
  const results = state.reviewResults;
  const remaining = state.inbox.filter(item => item.status === "pending").length;
  const completed = remaining === 0;
  const output = completed
    ? `今日评审已完成：归档${results.processes}项，识别${results.issues}项问题，形成${results.actions}项下一步，${results.weekly}项加入周报。`
    : `今日复盘尚未完成，仍有${remaining}项资料没有评审结论。`;
  results.output = output;
  document.querySelector("#reviewOutput").textContent = output;
  document.querySelector("#reviewCard").innerHTML = `
    <div class="review-finish ${completed ? "complete" : "incomplete"}">
      <div class="review-finish-mark">${completed ? "✓" : "!"}</div>
      <h3>${completed ? "今日复盘已完成" : "今日复盘尚未完成"}</h3>
      <p>${escapeHtml(output)}</p>
      <button class="primary-button" id="${completed ? "finishReviewButton" : "restartReviewButton"}">${completed ? "返回项目总览" : "继续评审剩余资料"}</button>
    </div>
  `;
  saveState();
  updateReviewStats();
  renderInbox();
  renderProjectDetail();
}

function openCaptureModal(type = "photo", projectId = selectedProjectId, stageCode = selectedStageCode) {
  const form = document.querySelector("#captureForm");
  form.reset();
  form.elements.type.value = type === "file" ? "document" : type;
  form.elements.projectId.value = projectId || state.projects[0].id;
  updateCaptureStages(stageCode);
  form.elements.reviewLater.checked = true;
  document.querySelector("#captureModal").hidden = false;
}

function updateCaptureStages(selectedCode) {
  const select = document.querySelector("#captureStage");
  select.innerHTML = STAGES.map(stage => `<option value="${stage.code}">${stage.code} ${stage.name}</option>`).join("");
  select.value = selectedCode || currentProject()?.stageCode || "G0";
}

function closeCaptureModal() {
  document.querySelector("#captureModal").hidden = true;
}

function fileToThumbnail(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 480;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.58));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleCapture(form) {
  const data = new FormData(form);
  const project = state.projects.find(projectItem => projectItem.id === data.get("projectId")) || state.projects[0];
  const files = [...form.elements.files.files];
  const note = data.get("note")?.trim();
  const type = data.get("type");
  if (!files.length && !note) {
    showToast("请填写文字说明或选择文件");
    return;
  }
  const entries = files.length ? files : [null];
  for (let index = 0; index < entries.length; index += 1) {
    const file = entries[index];
    const id = Date.now() + index;
    const isPhoto = file?.type?.startsWith("image/");
    const fileId = file ? `file-${id}` : "";
    if (file) await saveStoredFile(fileId, file);
    state.inbox.unshift({
      id,
      fileId,
      type: isPhoto ? "photo" : type,
      title: file?.name || note || "现场快速记录",
      note: note || "",
      projectId: project.id,
      projectName: project.name,
      stageCode: data.get("stageCode") || project.stageCode,
      time: "刚刚",
      status: data.get("reviewLater") ? "pending" : "organized",
      src: isPhoto ? await fileToThumbnail(file) : "",
      extension: file?.name?.split(".").pop()?.toUpperCase() || (type === "note" ? "NOTE" : "FILE"),
      size: file?.size || 0,
      mime: file?.type || ""
    });
  }
  project.updatedAt = new Date().toISOString();
  saveState();
  renderDashboard();
  renderInbox();
  if (currentView === "projects") renderProjectDetail();
  closeCaptureModal();
  showToast(`${entries.length}项资料已保存到本机`);
}

async function openInboxFile(itemId) {
  const item = state.inbox.find(entry => String(entry.id) === String(itemId));
  if (!item) return;
  if (item.fileId) {
    try {
      const stored = await getStoredFile(item.fileId);
      if (!stored) throw new Error("not-found");
      const url = URL.createObjectURL(stored.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = stored.name;
      link.target = "_blank";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      showToast(`正在打开：${stored.name}`);
      return;
    } catch {
      showToast("本机文件内容未找到，可能只同步了资料索引");
      return;
    }
  }
  if (item.src) {
    const link = document.createElement("a");
    link.href = item.src;
    link.target = "_blank";
    link.click();
  } else {
    showToast("该记录目前只有文字和文件索引");
  }
}

async function createSyncPackage() {
  const storedFiles = await getAllStoredFiles();
  const attachments = [];
  for (const file of storedFiles) {
    attachments.push({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      updatedAt: file.updatedAt,
      dataUrl: await blobToDataUrl(file.blob)
    });
  }
  return {
    format: SYNC_FORMAT,
    version: SYNC_VERSION,
    exportedAt: new Date().toISOString(),
    source: /Android/i.test(navigator.userAgent) ? "android" : "mac-web",
    note: "完整项目同步包，包含项目数据、文件索引和原始附件。",
    data: state,
    attachments
  };
}

async function exportData() {
  showToast("正在整理项目数据和附件，请稍候");
  const content = JSON.stringify(await createSyncPackage());
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const filename = `项目驾驶舱同步包-${stamp}.zjqsync`;
  if (window.AndroidBridge?.exportSyncPackage) {
    window.AndroidBridge.exportSyncPackage(content, filename);
    return;
  }
  const blob = new Blob([content], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("同步包已导出");
}

function mergeById(localItems = [], incomingItems = []) {
  const merged = new Map();
  localItems.forEach(item => merged.set(String(item.id), item));
  incomingItems.forEach(item => {
    const key = String(item.id);
    const local = merged.get(key);
    merged.set(key, local ? { ...local, ...item } : item);
  });
  return [...merged.values()];
}

function mergeSyncData(incoming) {
  const merged = { ...state, ...incoming };
  for (const key of ["projects", "schemes", "tasks", "inbox", "timeline", "stagePredictions", "decisionRules"]) {
    merged[key] = mergeById(state[key], incoming[key]);
  }
  merged.reviewResults = {
    processes: Math.max(state.reviewResults?.processes || 0, incoming.reviewResults?.processes || 0),
    issues: Math.max(state.reviewResults?.issues || 0, incoming.reviewResults?.issues || 0),
    actions: Math.max(state.reviewResults?.actions || 0, incoming.reviewResults?.actions || 0),
    weekly: Math.max(state.reviewResults?.weekly || 0, incoming.reviewResults?.weekly || 0),
    output: incoming.reviewResults?.output || state.reviewResults?.output || ""
  };
  state = normalizeState(merged);
  saveState();
}

async function restoreAttachments(attachments = []) {
  for (const attachment of attachments) {
    if (!attachment.id || !attachment.dataUrl) continue;
    await saveStoredFile(attachment.id, new File(
      [dataUrlToBlob(attachment.dataUrl)],
      attachment.name || `${attachment.id}.bin`,
      { type: attachment.type || "application/octet-stream" }
    ));
  }
}

async function importSyncText(text) {
  const payload = JSON.parse(text);
  if (payload.format !== SYNC_FORMAT || !payload.data) throw new Error("invalid-sync-package");
  await restoreAttachments(payload.attachments);
  mergeSyncData(payload.data);
  selectedProjectId = state.projects[0]?.id;
  renderAll();
  showToast(`项目数据已合并，恢复${payload.attachments?.length || 0}个附件`);
}

async function importSyncPackage(file) {
  await importSyncText(await file.text());
}

window.receiveNativeSyncPackage = async text => {
  try {
    await importSyncText(text);
  } catch {
    showToast("同步包无法识别");
  }
};
window.nativeSyncExported = () => showToast("同步包已保存，可通过QQ或数据线传输");
window.nativeSyncCancelled = () => showToast("已取消文件操作");

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  document.querySelector("#menuButton").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
  document.querySelector("#captureButton").addEventListener("click", () => openCaptureModal());
  document.querySelector("#addActionButton").addEventListener("click", () => openActionModal());
  document.querySelector("#cloudSyncButton").addEventListener("click", openCloudModal);
  document.querySelector("#setupCloudButton").addEventListener("click", openCloudModal);
  document.querySelector("#installButton").addEventListener("click", installApp);
  document.querySelector("#quickReviewButton").addEventListener("click", () => switchView("review"));
  document.querySelector("#exportButton").addEventListener("click", exportData);
  document.querySelector("#importButton").addEventListener("click", () => {
    if (window.AndroidBridge?.importSyncPackage) window.AndroidBridge.importSyncPackage();
    else document.querySelector("#importFileInput").click();
  });
  document.querySelector("#importFileInput").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await importSyncPackage(file);
    } catch {
      showToast("同步包无法识别");
    }
    event.target.value = "";
  });
  document.querySelector("#captureProject").addEventListener("change", event => {
    const project = state.projects.find(item => item.id === event.target.value);
    updateCaptureStages(project?.stageCode);
  });
  document.querySelector("#detailStandardSelect").addEventListener("change", event => {
    const project = currentProject();
    project.standardProfile = event.target.value;
    saveState();
    renderProjectDetail();
    showToast(`已切换为${standardProfileLabel(project.standardProfile)}体系`);
  });
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeCaptureModal));
  document.querySelectorAll("[data-close-action-modal]").forEach(button => button.addEventListener("click", closeActionModal));
  document.querySelectorAll("[data-close-project-modal]").forEach(button => button.addEventListener("click", closeProjectModal));
  document.querySelectorAll("[data-close-cloud-modal]").forEach(button => button.addEventListener("click", closeCloudModal));
  document.querySelector("#captureModal").addEventListener("click", event => {
    if (event.target.id === "captureModal") closeCaptureModal();
  });
  document.querySelector("#actionModal").addEventListener("click", event => {
    if (event.target.id === "actionModal") closeActionModal();
  });
  document.querySelector("#projectModal").addEventListener("click", event => {
    if (event.target.id === "projectModal") closeProjectModal();
  });
  document.querySelector("#cloudModal").addEventListener("click", event => {
    if (event.target.id === "cloudModal") closeCloudModal();
  });
  document.querySelector("#generateSyncId").addEventListener("click", () => {
    document.querySelector("#cloudForm [name=syncId]").value = crypto.randomUUID().replaceAll("-", "");
  });
  document.querySelector("#syncNowButton").addEventListener("click", async () => {
    const form = document.querySelector("#cloudForm");
    saveCloudSettings({
      url: form.elements.url.value,
      key: form.elements.key.value,
      syncId: form.elements.syncId.value,
      password: form.elements.password.value,
      enabled: true
    });
    form.elements.enabled.checked = true;
    await syncCloudNow();
  });
  document.querySelector("#captureForm").addEventListener("submit", async event => {
    event.preventDefault();
    try {
      await handleCapture(event.currentTarget);
    } catch {
      showToast("资料保存失败，请重新选择文件");
    }
  });
  document.querySelector("#actionForm").addEventListener("submit", event => {
    event.preventDefault();
    saveAction(event.currentTarget);
  });
  document.querySelector("#projectForm").addEventListener("submit", event => {
    event.preventDefault();
    createProject(event.currentTarget);
  });
  document.querySelector("#cloudForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    saveCloudSettings({
      url: form.elements.url.value,
      key: form.elements.key.value,
      syncId: form.elements.syncId.value,
      password: form.elements.password.value,
      enabled: form.elements.enabled.checked
    });
    closeCloudModal();
    showToast(cloudReady() ? "云同步已启用" : "云同步设置已保存");
  });

  document.addEventListener("click", async event => {
    const openProjectButton = event.target.closest("[data-open-project]");
    if (openProjectButton) openProject(openProjectButton.dataset.openProject, openProjectButton.dataset.openStage);

    const metric = event.target.closest("[data-dashboard-target]");
    if (metric) {
      const target = metric.dataset.dashboardTarget;
      if (target === "inbox") switchView("inbox");
      else applyProjectFilter(target);
    }

    const viewLink = event.target.closest("[data-view-link]");
    if (viewLink) switchView(viewLink.dataset.viewLink);

    const workJump = event.target.closest("[data-work-jump]");
    if (workJump) {
      workFilter = workJump.dataset.workJump;
      switchView("work");
    }

    const healthFilter = event.target.closest("[data-health-filter]");
    if (healthFilter) applyProjectFilter(healthFilter.dataset.healthFilter);

    const stageProject = event.target.closest("[data-stage-project]");
    if (stageProject?.dataset.stageProject) openProject(stageProject.dataset.stageProject);

    const capture = event.target.closest("[data-capture-type]");
    if (capture) openCaptureModal(capture.dataset.captureType, capture.dataset.captureProject, capture.dataset.captureStage);

    if (event.target.closest("[data-create-project]")) openProjectModal();

    const filter = event.target.closest("[data-filter]");
    if (filter) applyProjectFilter(filter.dataset.filter);

    const inboxButton = event.target.closest("[data-inbox-filter]");
    if (inboxButton) {
      inboxFilter = inboxButton.dataset.inboxFilter;
      inboxButton.parentElement.querySelectorAll("button").forEach(button => button.classList.toggle("active", button === inboxButton));
      renderInbox();
    }

    const taskButton = event.target.closest("[data-task-id]");
    if (taskButton) {
      const task = state.tasks.find(item => String(item.id) === taskButton.dataset.taskId);
      task.done = !task.done;
      task.status = task.done ? "done" : "open";
      saveState();
      renderProjectDetail();
      renderDashboard();
      if (currentView === "work") renderWorkCenter();
    }

    const workFilterButton = event.target.closest("[data-work-filter]");
    if (workFilterButton) {
      workFilter = workFilterButton.dataset.workFilter;
      document.querySelectorAll(".segmented [data-work-filter]").forEach(button => button.classList.toggle("active", button.dataset.workFilter === workFilter));
      renderWorkCenter();
    }

    const stageButton = event.target.closest("[data-stage]");
    if (stageButton) {
      selectedStageCode = stageButton.dataset.stage;
      renderProjectDetail();
      document.querySelector("#stageDetailPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    const gateCheck = event.target.closest("[data-gate-check]");
    if (gateCheck) toggleStageItem("check", gateCheck.dataset.gateCheck);

    const outputCheck = event.target.closest("[data-output-check]");
    if (outputCheck) toggleStageItem("output", outputCheck.dataset.outputCheck);

    const templateButton = event.target.closest("[data-template-output]");
    if (templateButton) downloadStageTemplate(templateButton.dataset.templateOutput);

    const gateDecision = event.target.closest("[data-gate-decision]");
    if (gateDecision) approveCurrentStage(gateDecision.dataset.gateDecision);

    const fileButton = event.target.closest("[data-open-file]");
    if (fileButton) await openInboxFile(fileButton.dataset.openFile);

    if (event.target.id === "backToProjects") switchView("dashboard");
    if (event.target.id === "addSchemeButton") addScheme();
    if (event.target.id === "addPredictionButton") addPrediction();
    if (event.target.id === "addRuleButton") addRule();
    const lockPredictionButton = event.target.closest("[data-lock-prediction]");
    if (lockPredictionButton) lockPrediction(lockPredictionButton.dataset.lockPrediction);
    const reviewPredictionButton = event.target.closest("[data-review-prediction]");
    if (reviewPredictionButton) reviewPrediction(reviewPredictionButton.dataset.reviewPrediction);
    if (event.target.id === "finishReviewButton") switchView("dashboard");
    if (event.target.id === "restartReviewButton") startReview();
    if (event.target.id === "skipReviewItem") {
      reviewIndex += 1;
      if (reviewIndex >= reviewItems.length) renderReviewComplete();
      else renderReviewCard();
    }
  });

  document.addEventListener("submit", async event => {
    if (event.target.id === "reviewItemForm") {
      event.preventDefault();
      try {
        await completeReviewItem(event.target);
      } catch {
        showToast("评审保存失败，请重试");
      }
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCaptureModal();
      closeActionModal();
      closeProjectModal();
      closeCloudModal();
    }
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-open-project], [data-dashboard-target]")) event.target.click();
  });
}

function renderAll() {
  document.querySelector("#captureProject").innerHTML = state.projects.map(project => `<option value="${project.id}">${project.id} ${escapeHtml(project.name)}</option>`).join("");
  document.querySelector("#actionProject").innerHTML = state.projects.map(project => `<option value="${project.id}">${project.id} ${escapeHtml(project.name)}</option>`).join("");
  document.querySelector("#newProjectStage").innerHTML = STAGES.map(stage => `<option value="${stage.code}">${stage.code} ${stage.name}</option>`).join("");
  updateCaptureStages();
  renderDashboard();
  renderProjectDetail();
  renderInbox();
  updateReviewStats();
}

function initialize() {
  renderAll();
  bindEvents();
  updateHeaderDate();
  updateSetupBanner();
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    document.querySelector("#installButton").hidden = false;
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    document.querySelector("#installButton").hidden = true;
    showToast("项目驾驶舱已安装");
  });
  restartCloudSync();
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

initialize();
