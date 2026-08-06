const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ========== Icon Helpers ==========
function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  // Dynamic import for react-icons
  const { FaServer, FaLayerGroup, FaDatabase, FaSearch, FaShieldAlt, FaCode, FaExclamationTriangle, FaCheckCircle, FaStar, FaRoad, FaQuestionCircle, FaCogs, FaLightbulb, FaArrowRight } = require("react-icons/fa");

  // Pre-render icons
  const icons = {};
  const iconDefs = [
    ["server", FaServer, "FFFFFF"],
    ["layer", FaLayerGroup, "FFFFFF"],
    ["db", FaDatabase, "FFFFFF"],
    ["search", FaSearch, "FFFFFF"],
    ["shield", FaShieldAlt, "FFFFFF"],
    ["code", FaCode, "FFFFFF"],
    ["warn", FaExclamationTriangle, "FFFFFF"],
    ["check", FaCheckCircle, "FFFFFF"],
    ["star", FaStar, "FFFFFF"],
    ["road", FaRoad, "FFFFFF"],
    ["question", FaQuestionCircle, "FFFFFF"],
    ["cogs", FaCogs, "FFFFFF"],
    ["bulb", FaLightbulb, "FFFFFF"],
    ["arrow", FaArrowRight, "FFFFFF"],
  ];
  for (const [name, component, color] of iconDefs) {
    icons[name] = await iconToBase64Png(component, "#" + color);
  }

  // Also generate colored icons for light slides
  const darkIcons = {};
  const darkIconDefs = [
    ["server_d", FaServer, "1E3A5F"],
    ["layer_d", FaLayerGroup, "1E3A5F"],
    ["db_d", FaDatabase, "1E3A5F"],
    ["search_d", FaSearch, "1E3A5F"],
    ["shield_d", FaShieldAlt, "1E3A5F"],
    ["code_d", FaCode, "1E3A5F"],
    ["star_d", FaStar, "1E3A5F"],
    ["check_d", FaCheckCircle, "1E3A5F"],
    ["bulb_d", FaLightbulb, "1E3A5F"],
    ["question_d", FaQuestionCircle, "1E3A5F"],
    ["arrow_d", FaArrowRight, "1E3A5F"],
  ];
  for (const [name, component, color] of darkIconDefs) {
    darkIcons[name] = await iconToBase64Png(component, "#" + color);
  }

  // Color Palette
  const C = {
    navy: "1E3A5F",
    navyDark: "0F2440",
    sky: "0EA5E9",
    skyLight: "38BDF8",
    green: "10B981",
    greenLight: "34D399",
    white: "FFFFFF",
    lightBg: "F8FAFC",
    cardBg: "FFFFFF",
    textDark: "1E293B",
    textMuted: "64748B",
    textLight: "F1F5F9",
    border: "E2E8F0",
    accentLine: "0EA5E9",
  };

  // ========== PRESENTATION ==========
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "轻客管家技术团队";
  pres.title = "轻客管家 — 技术总结";

  // ========== Slide 1: 封面 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.navy };
    // Top decorative line
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    // Main title
    slide.addText("轻客管家", { x: 1, y: 1.2, w: 8, h: 1.0, fontSize: 48, fontFace: "Arial", color: C.white, bold: true, align: "center" });
    // Subtitle
    slide.addText("企业办公服务综合管理系统 — 技术总结", { x: 1, y: 2.2, w: 8, h: 0.6, fontSize: 20, fontFace: "Arial", color: C.skyLight, align: "center" });
    // Divider
    slide.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.0, w: 3, h: 0.03, fill: { color: C.sky } });
    // Tech stack
    slide.addText("SpringBoot 3.4  +  MyBatis-Plus 3.5  +  MySQL 8.0  +  JDK 25", { x: 1, y: 3.3, w: 8, h: 0.5, fontSize: 14, fontFace: "Consolas", color: C.textLight, align: "center" });
    // Bottom tag
    slide.addText("掌握三层架构 · 独立完成企业级 CRUD · 具备工程化开发能力", { x: 1, y: 4.8, w: 8, h: 0.4, fontSize: 12, fontFace: "Arial", color: C.textMuted, align: "center", italic: true });
    // Bottom line
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.sky } });

    slide.addNotes("这是封面页。面试开场：'面试官你好，我做的是一个企业办公服务管理系统，叫轻客管家。后端用了SpringBoot+MyBatis-Plus+MySQL这套经典技术栈，JDK用的是最新的25版本。我独立负责了客户管理、员工管理两个核心模块。'\n\n技术栈选择理由：SpringBoot是Java后端最主流框架；MyBatis-Plus比原生MyBatis代码量少80%；MySQL是企业标配数据库。");
  }

  // ========== Slide 2: 项目一句话介绍 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    // Top bar
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    // Title
    slide.addText("项目概览", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    // Underline
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Left card - 核心功能
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.green } });
    slide.addText("核心功能", { x: 0.8, y: 1.8, w: 3.7, h: 0.5, fontSize: 18, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText([
      { text: "客户管理 — CRUD + 多条件筛选", options: { bullet: true, breakLine: true } },
      { text: "员工管理 — CRUD + 部门/状态筛选", options: { bullet: true, breakLine: true } },
      { text: "逻辑删除 — 数据不真删，标记安全回收", options: { bullet: true, breakLine: true } },
      { text: "统一返回 — R类包装，前后端解耦", options: { bullet: true, breakLine: true } },
      { text: "分页查询 — 大数据量高效加载", options: { bullet: true, breakLine: true } },
      { text: "数据校验 — 防止脏数据入库", options: { bullet: true } },
    ], { x: 0.8, y: 2.4, w: 3.7, h: 2.4, fontSize: 13, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 8 });

    // Right card - 技术栈
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.sky } });
    slide.addText("技术栈", { x: 5.5, y: 1.8, w: 3.7, h: 0.5, fontSize: 18, fontFace: "Arial", color: C.navy, bold: true });

    const techData = [
      ["层级", "技术", "版本"],
      ["框架", "SpringBoot", "3.4.5"],
      ["ORM", "MyBatis-Plus", "3.5.9"],
      ["数据库", "MySQL", "8.0.45"],
      ["JDK", "Temurin", "25 LTS"],
      ["工具", "Lombok/Hutool", "—"],
      ["构建", "Maven", "IDEA内置"],
    ];
    slide.addTable(techData, {
      x: 5.5, y: 2.5, w: 3.7,
      colW: [1.0, 1.5, 1.2],
      border: { pt: 0.5, color: C.border },
      fontFace: "Arial", fontSize: 11,
      color: C.textDark,
      autoPage: false,
    });

    slide.addNotes("这一页给面试官一个全局印象。左边是做了什么功能，右边是用了什么技术。\n\n核心要点：\n- 项目是典型的单体后端应用，用三层架构组织代码\n- 技术栈选择都是企业主流，没有冷门技术\n- JDK 25是最新LTS版本，体现你对新技术的关注");
  }

  // ========== Slide 3: 三层架构图解 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("三层架构 — 项目的骨架", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Top: Browser
    slide.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.4, w: 3, h: 0.55, fill: { color: C.textMuted }, rectRadius: 0.05 });
    slide.addText("浏览器 / Postman / 前端", { x: 3.5, y: 1.4, w: 3, h: 0.55, fontSize: 14, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle" });
    // Arrow down
    slide.addText("▼  HTTP 请求  ▼", { x: 3.5, y: 1.98, w: 3, h: 0.35, fontSize: 10, fontFace: "Arial", color: C.textMuted, align: "center" });

    // Controller layer
    slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 2.35, w: 7, h: 0.65, fill: { color: "EFF6FF" }, line: { color: C.sky, width: 2 } });
    slide.addImage({ data: darkIcons["server_d"], x: 1.7, y: 2.42, w: 0.38, h: 0.38 });
    slide.addText("Controller 层（表现层）", { x: 2.2, y: 2.35, w: 2.5, h: 0.35, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText("职责：接收HTTP请求 → 调Service → 返回JSON。注解：@RestController", { x: 2.2, y: 2.68, w: 6, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted });
    // Arrow
    slide.addText("▼  调用  ▼", { x: 1.5, y: 3.02, w: 7, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted, align: "center" });

    // Service layer
    slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 3.32, w: 7, h: 0.65, fill: { color: "F0FDF4" }, line: { color: C.green, width: 2 } });
    slide.addImage({ data: darkIcons["cogs"], x: 1.7, y: 3.39, w: 0.38, h: 0.38 });
    slide.addText("Service 层（业务逻辑层）", { x: 2.2, y: 3.32, w: 2.5, h: 0.35, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText("职责：业务校验 + 数据转换 + 事务管理。注解：@Service", { x: 2.2, y: 3.65, w: 6, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted });
    // Arrow
    slide.addText("▼  调用  ▼", { x: 1.5, y: 3.99, w: 7, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted, align: "center" });

    // Mapper layer
    slide.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 4.29, w: 7, h: 0.65, fill: { color: "FFF7ED" }, line: { color: "F97316", width: 2 } });
    slide.addImage({ data: darkIcons["db_d"], x: 1.7, y: 4.36, w: 0.38, h: 0.38 });
    slide.addText("Mapper 层（数据访问层）", { x: 2.2, y: 4.29, w: 2.5, h: 0.35, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText("职责：执行SQL，操作数据库。注解：@Mapper，继承 BaseMapper", { x: 2.2, y: 4.62, w: 6, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted });
    // Arrow
    slide.addText("▼  JDBC  ▼", { x: 1.5, y: 4.96, w: 7, h: 0.3, fontSize: 10, fontFace: "Arial", color: C.textMuted, align: "center" });

    // Database
    slide.addShape(pres.shapes.RECTANGLE, { x: 3, y: 5.25, w: 4, h: 0.35, fill: { color: C.navy }, rectRadius: 0.05 });
    slide.addText("MySQL 数据库", { x: 3, y: 5.25, w: 4, h: 0.35, fontSize: 14, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle" });

    slide.addNotes("这是面试时最重要的图解！三层架构是SpringBoot项目的标准组织方式。\n\n面试必讲：\n1. Controller是'前台接待员'：只管接收请求和返回结果，不写业务逻辑\n2. Service是'业务大脑'：所有核心逻辑在这里，比如判断用户名是否重复\n3. Mapper是'数据库双手'：只负责执行SQL，不掺杂业务判断\n\n红线：Controller绝不直接调Mapper！跨层调用是代码坏味道。\n追问准备：为什么不能跨层？→ 破坏了单一职责，Controller里混入SQL会让代码难以维护和测试。");
  }

  // ========== Slide 4: 为什么分层 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("为什么分层？— 三大理由", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Three columns
    const reasons = [
      { title: "单一职责", sub: "Single Responsibility", desc: "每层只做自己的事。改Service不影响Controller，改Mapper不影响Service。代码解耦，各司其职。", icon: darkIcons["layer_d"] },
      { title: "方便测试", sub: "Easy Testing", desc: "可以单独测试Service层逻辑，用Mock模拟Mapper，不用启动整个Web服务器。单元测试跑得快。", icon: darkIcons["check_d"] },
      { title: "方便替换", sub: "Easy Replacement", desc: "想从MyBatis-Plus换成JPA？只改Mapper层即可，Service和Controller原封不动，零风险切换。", icon: darkIcons["arrow_d"] },
    ];

    reasons.forEach((r, i) => {
      const x = 0.5 + i * 3.15;
      slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.85, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
      slide.addImage({ data: r.icon, x: x + 1.07, y: 1.7, w: 0.7, h: 0.7 });
      slide.addText(r.title, { x, y: 2.55, w: 2.85, h: 0.4, fontSize: 20, fontFace: "Arial", color: C.navy, bold: true, align: "center" });
      slide.addText(r.sub, { x, y: 2.95, w: 2.85, h: 0.3, fontSize: 11, fontFace: "Arial", color: C.textMuted, align: "center", italic: true });
      slide.addShape(pres.shapes.RECTANGLE, { x: x + 1.0, y: 3.35, w: 0.85, h: 0.03, fill: { color: C.sky } });
      slide.addText(r.desc, { x: x + 0.2, y: 3.55, w: 2.45, h: 1.2, fontSize: 12, fontFace: "Arial", color: C.textDark, align: "center", valign: "top" });
    });

    slide.addNotes("这一页讲分层的'为什么'。面试官如果追问'分层有什么好处'，就讲这三点。\n\n重点记忆：\n1. 单一职责 = 每层干好自己的事，别管别人的\n2. 方便测试 = Service可以脱离Web容器单独测\n3. 方便替换 = 换ORM框架只改Mapper，其他层不用动\n\n反例：如果不分层，Controller里直接写SQL → 代码耦合严重 → 改一处崩一片");
  }

  // ========== Slide 5: 一条请求的旅程(上) ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("一条请求的完整旅程（上）— 步骤 1~5", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 28, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.05, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Request display
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 9, h: 0.55, fill: { color: C.navyDark }, rectRadius: 0.05 });
    slide.addText('POST /api/customers    Body: {"name":"张三","phone":"13800138000","company":"阿里巴巴"}', { x: 0.5, y: 1.3, w: 9, h: 0.55, fontSize: 12, fontFace: "Consolas", color: C.greenLight, align: "center", valign: "middle" });

    const steps1 = [
      { num: "1", title: "Tomcat接收请求", desc: "内嵌Tomcat监听8080端口，收到HTTP POST请求，封装为HttpServletRequest对象" },
      { num: "2", title: "DispatcherServlet路由", desc: "SpringMVC核心调度器根据URL /api/customers 找到CustomerController.add()方法" },
      { num: "3", title: "Jackson反序列化", desc: "把JSON字符串 {\"name\":\"张三\"...} 自动转换为Java对象 Customer.java 的实例，字段一一对应" },
      { num: "4", title: "Controller调Service", desc: "执行 customerService.save(customer)。Controller只负责'转发'，不处理业务" },
      { num: "5", title: "MP自动生成SQL", desc: "MyBatis-Plus分析Customer对象 → 生成 INSERT INTO customer (name,phone,...) VALUES (?,?,...)" },
    ];

    steps1.forEach((s, i) => {
      const y = 2.1 + i * 0.65;
      // Number circle
      slide.addShape(pres.shapes.OVAL, { x: 0.6, y: y + 0.05, w: 0.4, h: 0.4, fill: { color: C.navy } });
      slide.addText(s.num, { x: 0.6, y: y + 0.05, w: 0.4, h: 0.4, fontSize: 14, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle" });
      // Content
      slide.addText(s.title, { x: 1.2, y: y, w: 8, h: 0.28, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true });
      slide.addText(s.desc, { x: 1.2, y: y + 0.28, w: 8, h: 0.28, fontSize: 11, fontFace: "Arial", color: C.textMuted });
    });

    slide.addNotes("这里是面试高光时刻！把这10步讲清楚，面试官会觉得你真正理解了SpringBoot的运作机制。\n\n步骤详解：\n1. Tomcat是内嵌在SpringBoot里的Web服务器，不需要单独安装\n2. DispatcherServlet是SpringMVC的'中央调度员'，所有请求都经过它\n3. Jackson反序列化 = JSON字符串 → Java对象。这一步如果失败会返回400 Bad Request\n4. Controller不写业务代码，只是'传话筒'\n5. MyBatis-Plus通过反射分析Entity的注解（@TableName、@TableField），自动拼接SQL");
  }

  // ========== Slide 6: 一条请求的旅程(下) ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("一条请求的完整旅程（下）— 步骤 6~10", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 28, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.05, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // SQL display
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 9, h: 0.55, fill: { color: C.navyDark }, rectRadius: 0.05 });
    slide.addText("INSERT INTO customer (name, phone, company, create_time, update_time) VALUES ('张三', '13800138000', '阿里巴巴', NOW(), NOW())", { x: 0.5, y: 1.3, w: 9, h: 0.55, fontSize: 11, fontFace: "Consolas", color: C.greenLight, align: "center", valign: "middle" });

    const steps2 = [
      { num: "6", title: "自动填充时间", desc: "MetaObjectHandler 自动给 createTime 和 updateTime 赋值为 LocalDateTime.now()" },
      { num: "7", title: "MyBatis执行SQL", desc: "通过JDBC连接MySQL（端口3306），执行INSERT语句，数据写入磁盘" },
      { num: "8", title: "主键回填", desc: "MySQL返回自增ID（如id=1），MyBatis-Plus自动把id值填回Customer对象的id字段" },
      { num: "9", title: "R.ok()包装结果", desc: "Controller调用 R.ok(customer) 包装：{code:200, message:'操作成功', data:{id:1, name:'张三'...}}" },
      { num: "10", title: "Jackson序列化返回", desc: "把R对象序列化为JSON字符串 → HTTP Response → 前端收到 {\"code\":200, \"message\":\"操作成功\", \"data\":{...}}" },
    ];

    steps2.forEach((s, i) => {
      const y = 2.1 + i * 0.65;
      slide.addShape(pres.shapes.OVAL, { x: 0.6, y: y + 0.05, w: 0.4, h: 0.4, fill: { color: C.green } });
      slide.addText(s.num, { x: 0.6, y: y + 0.05, w: 0.4, h: 0.4, fontSize: 14, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle" });
      slide.addText(s.title, { x: 1.2, y: y, w: 8, h: 0.28, fontSize: 14, fontFace: "Arial", color: C.navy, bold: true });
      slide.addText(s.desc, { x: 1.2, y: y + 0.28, w: 8, h: 0.28, fontSize: 11, fontFace: "Arial", color: C.textMuted });
    });

    slide.addNotes("下半部分，重点是自动填充和主键回填。\n\n关键点：\n- 自动填充：createTime和updateTime不需要手动设置，MetaObjectHandler在SQL执行前自动赋值\n- 主键回填：INSERT执行后，MySQL返回自增ID，MP自动填回entity对象。这就是为什么新增后customer.getId()能拿到值\n- 序列化：Jackson是双向的——请求时JSON→对象（反序列化），响应时对象→JSON（序列化）\n\n追问：如果不用R包装会怎样？→ 成功和失败的格式不一样，前端要写两套解析代码，维护成本高");
  }

  // ========== Slide 7: Jackson + R类 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("Jackson + R 类 — 数据格式的桥梁", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Left: Jackson
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.sky } });
    slide.addText("Jackson — JSON ⇄ Java 双向转换", { x: 0.8, y: 1.8, w: 3.7, h: 0.4, fontSize: 16, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText([
      { text: "反序列化：请求 JSON → Java对象", options: { bullet: true, breakLine: true, bold: true } },
      { text: "@RequestBody 触发，前端发来的JSON自动转为Entity", options: { breakLine: true, indentLevel: 1 } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "序列化：Java对象 → 响应 JSON", options: { bullet: true, breakLine: true, bold: true } },
      { text: "@ResponseBody 触发（@RestController自动包含），返回给前端", options: { breakLine: true, indentLevel: 1 } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "安全控制", options: { bullet: true, breakLine: true, bold: true } },
      { text: "@JsonProperty(access=READ_ONLY)：只返回不接收，防前端恶意传id/createTime", options: { breakLine: true, indentLevel: 1 } },
    ], { x: 0.8, y: 2.3, w: 3.7, h: 2.5, fontSize: 11, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 2 });

    // Right: R class
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.green } });
    slide.addText("R 类 — 统一返回格式", { x: 5.5, y: 1.8, w: 3.7, h: 0.4, fontSize: 16, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText([
      { text: "成功响应：", options: { breakLine: true, bold: true } },
      { text: '{"code":200,"message":"操作成功","data":{...}}', options: { breakLine: true, fontFace: "Consolas" } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "失败响应：", options: { breakLine: true, bold: true } },
      { text: '{"code":404,"message":"客户不存在","data":null}', options: { breakLine: true, fontFace: "Consolas" } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "泛型设计：", options: { breakLine: true, bold: true } },
      { text: "R<Customer> → data是客户对象", options: { breakLine: true } },
      { text: "R<Void> → data是null（删除操作）", options: { breakLine: true } },
      { text: "R<List<Employee>> → data是员工列表", options: { breakLine: true } },
    ], { x: 5.5, y: 2.3, w: 3.7, h: 2.5, fontSize: 10, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 2 });

    slide.addNotes("Jackson和R类是面试中容易被问到的基础知识点。\n\nJackson：\n- Jackson是SpringBoot默认的JSON库，不需要额外配置\n- @JsonProperty(access=READ_ONLY)防止前端传id、createTime等不该传的字段\n  - 比如：如果前端传了{\"id\":999}，READ_ONLY会让Jackson忽略这个字段，防止越权修改\n\nR类：\n- 统一返回格式是前后端分离项目的基础设施\n- R<T> 泛型让data字段类型安全，不同的接口返回不同类型，编译时就能检查\n- 静态工厂方法 R.ok() / R.fail() 让代码更简洁\n\n面试时强调：如果没有统一格式，前后端对接会是一场噩梦");
  }

  // ========== Slide 8: MyBatis-Plus vs 原生MyBatis ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("MyBatis-Plus — 为什么少写80%代码", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Comparison table
    const headerRow = [
      { text: "对比项", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
      { text: "原生 MyBatis", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
      { text: "MyBatis-Plus", options: { bold: true, color: C.white, fill: { color: C.navy }, align: "center" } },
    ];

    const dataRows = [
      ["简单CRUD", "需要手写SQL + XML映射", { text: "继承BaseMapper，零SQL", options: { color: C.green, bold: true } }],
      ["分页查询", "手写LIMIT子句，每张表都要写", { text: "Page对象 + 分页插件自动拼LIMIT", options: { color: C.green, bold: true } }],
      ["逻辑删除", "手写更新语句  UPDATE ... SET is_deleted=1", { text: "@TableLogic注解自动改写SQL", options: { color: C.green, bold: true } }],
      ["主键策略", "手动赋值或写SQL", { text: "@TableId(type=AUTO)自动回填", options: { color: C.green, bold: true } }],
      ["条件查询", "if-else拼动态SQL", { text: "QueryWrapper链式调用，代码清晰10倍", options: { color: C.green, bold: true } }],
    ];

    const tableData = [headerRow, ...dataRows];

    slide.addTable(tableData, {
      x: 0.8, y: 1.5, w: 8.4,
      colW: [1.8, 3.2, 3.4],
      border: { pt: 0.5, color: C.border },
      fontFace: "Arial", fontSize: 12,
      color: C.textDark,
      rowH: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      autoPage: false,
    });

    // Bottom highlight
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.5, w: 8.4, h: 0.7, fill: { color: "EFF6FF" }, rectRadius: 0.04 });
    slide.addText("核心原理：动态代理 — MP在运行时动态生成Mapper接口的实现类，拦截方法调用，自动生成并执行SQL", { x: 1.0, y: 4.55, w: 8, h: 0.6, fontSize: 12, fontFace: "Arial", color: C.navy, valign: "middle" });

    slide.addNotes("这个对比表在面试时非常有说服力。\n\n核心原理：\nMyBatis-Plus通过Java动态代理，在运行时生成Mapper接口的实现类。当我们调用baseMapper.insert(entity)时：\n1. 代理对象拦截调用\n2. 反射解析entity的@TableName和@TableField注解\n3. 自动拼接INSERT INTO table_name (columns) VALUES (values)\n4. 执行SQL并处理结果\n\n这就是为什么我们写一个空接口就能完成CRUD——所有代码都是MP在运行时生成的。\n\n追问：动态代理是什么？→ JDK内置机制，在运行时创建接口的实现类，AOP拦截器也是基于它实现的。");
  }

  // ========== Slide 9: 核心注解速查 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("四大核心注解 — 面试必问", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    const annotations = [
      { name: "@TableName", code: '@TableName("customer")', what: "绑定表名", how: "告诉MP：'Customer类对应customer表'。类名和表名不一致时用" },
      { name: "@TableId", code: "@TableId(type = AUTO)", what: "主键自增", how: "INSERT后MySQL返回自增ID，MP自动填回entity.id字段" },
      { name: "@TableLogic", code: "@TableLogic", what: "逻辑删除", how: "标注后，delete操作自动改写为UPDATE is_deleted=1，查询自动加WHERE is_deleted=0" },
      { name: "@TableField", code: "@TableField(fill=INSERT)", what: "自动填充", how: "配合MetaObjectHandler，INSERT时自动给createTime/updateTime赋值当前时间" },
    ];

    annotations.forEach((a, i) => {
      const y = 1.5 + i * 1.0;
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.85, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 6, offset: 1, color: "000000", opacity: 0.06 } });
      // Left accent
      const colors = [C.sky, C.green, "F59E0B", "8B5CF6"];
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.85, fill: { color: colors[i] } });
      // Anno name
      slide.addText(a.name, { x: 0.8, y: y + 0.05, w: 2.0, h: 0.35, fontSize: 16, fontFace: "Consolas", color: colors[i], bold: true });
      // Code
      slide.addText(a.code, { x: 2.8, y: y + 0.05, w: 3.5, h: 0.35, fontSize: 12, fontFace: "Consolas", color: C.textMuted });
      // What
      slide.addText(a.what, { x: 0.8, y: y + 0.42, w: 2.0, h: 0.35, fontSize: 13, fontFace: "Arial", color: C.navy, bold: true });
      // How
      slide.addText(a.how, { x: 2.8, y: y + 0.42, w: 6.4, h: 0.35, fontSize: 11, fontFace: "Arial", color: C.textMuted });
    });

    slide.addNotes("这4个注解是MyBatis-Plus的核心，面试时能讲清楚注解名、作用、原理就很加分。\n\n@TableName：类名转下划线后如果和表名不一致时需要显式指定。比如Java类叫CustomerEntity但表名叫customer\n\n@TableId：如果不指定，MP会用雪花算法生成UUID风格的长整型id。指定AUTO就用数据库自增\n\n@TableLogic：这是企业级特性。标注后所有的delete和select操作都会自动处理is_deleted字段，对开发者透明\n\n@TableField(fill=INSERT)：需要配合MetaObjectHandler使用。处理器实现insertFill和updateFill方法，在SQL执行前自动填充值");
  }

  // ========== Slide 10: 逻辑删除原理 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("逻辑删除 — 数据不真删的企业级实践", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 28, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.05, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Why
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.4, w: 9, h: 0.65, fill: { color: "FEF3C7" }, rectRadius: 0.04 });
    slide.addText("为什么需要？  →  企业的数据是核心资产，物理删除无法恢复。逻辑删除 = '软删除'，保留了数据，给误删留了后悔药。", { x: 0.8, y: 1.45, w: 8.4, h: 0.55, fontSize: 12, fontFace: "Arial", color: C.textDark, valign: "middle" });

    // Before/After
    // Before
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.3, w: 4.3, h: 2.3, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 6, offset: 1, color: "000000", opacity: 0.06 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.3, w: 4.3, h: 0.06, fill: { color: "EF4444" } });
    slide.addText("你写的代码", { x: 0.8, y: 2.5, w: 3.7, h: 0.35, fontSize: 14, fontFace: "Arial", color: "EF4444", bold: true });
    slide.addText('customerService.removeById(1);', { x: 0.8, y: 2.95, w: 3.7, h: 0.35, fontSize: 13, fontFace: "Consolas", color: C.textDark });
    slide.addText("↓  MP拦截  ↓", { x: 0.8, y: 3.35, w: 3.7, h: 0.3, fontSize: 11, fontFace: "Arial", color: C.textMuted, align: "center" });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.7, w: 3.7, h: 0.65, fill: { color: "FEF2F2" } });
    slide.addText([
      { text: "实际执行的SQL：", options: { breakLine: true, bold: true, fontSize: 10 } },
      { text: "UPDATE customer", options: { breakLine: true, fontSize: 10, fontFace: "Consolas" } },
      { text: "SET is_deleted = 1", options: { breakLine: true, fontSize: 10, fontFace: "Consolas" } },
      { text: "WHERE id = 1 AND is_deleted = 0", options: { fontSize: 10, fontFace: "Consolas" } },
    ], { x: 0.9, y: 3.72, w: 3.5, h: 0.6, fontSize: 10, fontFace: "Arial", color: "991B1B", paraSpaceAfter: 0 });

    // After - query
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.3, w: 4.3, h: 2.3, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 6, offset: 1, color: "000000", opacity: 0.06 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.3, w: 4.3, h: 0.06, fill: { color: C.green } });
    slide.addText("查询自动过滤", { x: 5.5, y: 2.5, w: 3.7, h: 0.35, fontSize: 14, fontFace: "Arial", color: C.green, bold: true });
    slide.addText('customerService.list();', { x: 5.5, y: 2.95, w: 3.7, h: 0.35, fontSize: 13, fontFace: "Consolas", color: C.textDark });
    slide.addText("↓  MP自动加条件  ↓", { x: 5.5, y: 3.35, w: 3.7, h: 0.3, fontSize: 11, fontFace: "Arial", color: C.textMuted, align: "center" });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 3.7, w: 3.7, h: 0.65, fill: { color: "F0FDF4" } });
    slide.addText([
      { text: "实际执行的SQL：", options: { breakLine: true, bold: true, fontSize: 10 } },
      { text: "SELECT * FROM customer", options: { breakLine: true, fontSize: 10, fontFace: "Consolas" } },
      { text: "WHERE is_deleted = 0", options: { fontSize: 10, fontFace: "Consolas" } },
    ], { x: 5.6, y: 3.72, w: 3.5, h: 0.6, fontSize: 10, fontFace: "Arial", color: "065F46", paraSpaceAfter: 0 });

    slide.addNotes("逻辑删除是企业级项目的标配。面试时一定要强调'企业几乎不真删数据'这句话。\n\n原理：@TableLogic标注字段后，MyBatis-Plus自动做了两件事：\n1. 删除操作拦截：removeById() → UPDATE SET is_deleted=1\n2. 查询操作拦截：所有SELECT自动加 WHERE is_deleted=0\n\n这意味着：\n- 前端调用删除接口，看起来数据'消失'了\n- 后端数据库里数据还在，is_deleted=1\n- 想要恢复数据，只需要把is_deleted改回0\n\n追问：如果有些场景需要查全部数据（包括已删除的）怎么办？→ 用自定义SQL或mapper.xml，绕过MP的自动过滤。");
  }

  // ========== Slide 11: 数据库设计规范 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("数据库设计 — 规范比技术更重要", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    // Left: standard fields
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.navy } });
    slide.addText("每张表的必备字段", { x: 0.8, y: 1.8, w: 3.7, h: 0.4, fontSize: 16, fontFace: "Arial", color: C.navy, bold: true });

    const fields = [
      { col: "id", type: "BIGINT AUTO_INCREMENT", why: "自增主键，B+树索引友好，不用UUID" },
      { col: "is_deleted", type: "TINYINT DEFAULT 0", why: "逻辑删除标记，数据安全底线" },
      { col: "create_time", type: "DATETIME DEFAULT NOW()", why: "创建时间自动维护，便于审计" },
      { col: "update_time", type: "DATETIME ON UPDATE", why: "更新时间自动更新，追踪数据变更" },
    ];

    fields.forEach((f, i) => {
      const y = 2.3 + i * 0.65;
      slide.addText(f.col, { x: 0.8, y, w: 1.5, h: 0.3, fontSize: 12, fontFace: "Consolas", color: C.sky, bold: true });
      slide.addText(f.type, { x: 0.8, y: y + 0.25, w: 3.5, h: 0.25, fontSize: 9, fontFace: "Consolas", color: C.textMuted });
      slide.addText(f.why, { x: 2.3, y: y + 0.05, w: 2.3, h: 0.5, fontSize: 10, fontFace: "Arial", color: C.textDark, valign: "middle" });
    });

    // Right: index strategy
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 3.5, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 0.06, fill: { color: C.green } });
    slide.addText("索引策略", { x: 5.5, y: 1.8, w: 3.7, h: 0.4, fontSize: 16, fontFace: "Arial", color: C.navy, bold: true });
    slide.addText([
      { text: "需要加索引的字段：", options: { breakLine: true, bold: true, fontSize: 13 } },
      { text: "WHERE条件中出现的列", options: { bullet: true, breakLine: true } },
      { text: "JOIN关联的外键列", options: { bullet: true, breakLine: true } },
      { text: "ORDER BY排序的列", options: { bullet: true, breakLine: true } },
      { text: "例：name、phone、department", options: { breakLine: true, indentLevel: 1, color: C.sky } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "不需要加索引的字段：", options: { breakLine: true, bold: true, fontSize: 13 } },
      { text: "长文本字段（address、remark）", options: { bullet: true, breakLine: true } },
      { text: "取值范围很少的字段（status）", options: { bullet: true, breakLine: true } },
      { text: "频繁更新的字段", options: { bullet: true, breakLine: true } },
    ], { x: 5.5, y: 2.3, w: 3.7, h: 2.5, fontSize: 11, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 4 });

    slide.addNotes("数据库设计最能体现工程化思维。\n\n必备字段：\n- id用自增不用UUID → InnoDB的主键索引是聚簇索引（B+树），自增ID保证顺序写入，减少页分裂\n- is_deleted逻辑删除 → 已经在上页讲过了\n- create_time + update_time → 数据审计的基础，出了问题能溯源\n\n索引策略：\n- 给WHERE条件列加索引 = 加速查询（B+树查找 O(log n) vs 全表扫描 O(n)）\n- 不给长文本加索引 = 索引太大反而拖慢写操作\n- 不给低区分度字段加索引 = 比如gender只有男女，加了也没啥用\n\n面试金句：'索引不是越多越好——每个索引都会拖慢INSERT/UPDATE/DELETE，因为索引也要同步更新'");
  }

  // ========== Slide 12: JDK 25踩坑 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("踩坑经验 — JDK 25 兼容问题排查", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 28, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.05, w: 1.5, h: 0.04, fill: { color: C.sky } });
    slide.addText("JDK 25 发布于2026年7月，是最新LTS版本。项目中遇到两个兼容问题，都成功排查并解决。", { x: 0.8, y: 1.4, w: 8.4, h: 0.4, fontSize: 12, fontFace: "Arial", color: C.textMuted, italic: true });

    // Pit 1
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.0, w: 4.3, h: 2.8, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.0, w: 4.3, h: 0.06, fill: { color: "EF4444" } });
    slide.addText("坑 ① PaginationInnerInterceptor 不存在", { x: 0.8, y: 2.2, w: 3.7, h: 0.35, fontSize: 14, fontFace: "Arial", color: "EF4444", bold: true });
    slide.addText([
      { text: "现象：编译报错，找不到类", options: { breakLine: true, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "排查：jar tf 命令查看jar包类列表", options: { breakLine: true } },
      { text: "  → 确认3.5.9已移除该类", options: { breakLine: true, indentLevel: 1 } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "解决：发现 MP 3.5.9 由", options: { breakLine: true } },
      { text: "  MybatisPlusInnerInterceptor", options: { breakLine: true, indentLevel: 1 } },
      { text: "  AutoConfiguration 自动配置分页", options: { indentLevel: 1 } },
    ], { x: 0.8, y: 2.65, w: 3.7, h: 2.0, fontSize: 11, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 2 });

    // Pit 2
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.0, w: 4.3, h: 2.8, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 8, offset: 2, color: "000000", opacity: 0.08 } });
    slide.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.0, w: 4.3, h: 0.06, fill: { color: "F59E0B" } });
    slide.addText("坑 ② utf8mb4 →  UnsupportedEncodingException", { x: 5.5, y: 2.2, w: 3.7, h: 0.35, fontSize: 14, fontFace: "Arial", color: "F59E0B", bold: true });
    slide.addText([
      { text: "现象：Failed to obtain JDBC Connection", options: { breakLine: true, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "排查：看完整堆栈最底层 →", options: { breakLine: true } },
      { text: "  UnsupportedEncodingException:", options: { breakLine: true, indentLevel: 1 } },
      { text: '  utf8mb4（JDK 25不识别该编码名）', options: { breakLine: true, indentLevel: 1 } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "解决：characterEncoding=utf8mb4", options: { breakLine: true } },
      { text: '  → characterEncoding=UTF-8', options: { indentLevel: 1 } },
    ], { x: 5.5, y: 2.65, w: 3.7, h: 2.0, fontSize: 11, fontFace: "Arial", color: C.textDark, paraSpaceAfter: 2 });

    // Bottom: 排查方法论
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.0, w: 9, h: 0.5, fill: { color: C.navyDark }, rectRadius: 0.04 });
    slide.addText("排查方法论：看异常堆栈的最底层 Caused by → 读源码/查jar包类列表 → 改配置验证 → 总结沉淀", { x: 0.8, y: 5.0, w: 8.4, h: 0.5, fontSize: 12, fontFace: "Arial", color: C.skyLight, align: "center", valign: "middle" });

    slide.addNotes("踩坑经验最能体现'独立解决问题'的能力，面试时一定要主动讲。\n\n坑1的排查路径很经典：\n1. 看idea报错信息 → 定位到哪个jar包\n2. 用 jar tf 命令列出jar包中的类 → 确认类是否存在\n3. 发现新版本改了API → 查官方文档或源码 → 找到替代方案\n\n坑2的排查路径：\n1. 看完整异常堆栈（不要只看最外层异常）\n2. 定位到root cause（最底层的Caused by）\n3. String.lookupCharset是JDK内部方法 → 说明是JDK 25改了charset注册逻辑\n4. utf8mb4是MySQL特定命名 → 改为Java标准命名UTF-8\n\n方法论总结：异常堆栈从下往上看！最底层的Caused by才是问题根源。");
  }

  // ========== Slide 13: 面试常见追问 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("面试常见追问 — 5个高频问题", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    const qa = [
      { q: "Q1: SpringBoot 自动配置原理？", a: "@EnableAutoConfiguration 读取 META-INF/spring.factories，自动加载starter提供的配置类。比如引入 mybatis-plus starter 后，自动配置 SqlSessionFactory、MapperScanner 等。" },
      { q: "Q2: @Autowired 和 @Resource 的区别？", a: "@Autowired 是Spring的，默认按类型注入；@Resource 是JDK标准的，默认按名字注入。日常开发 @Autowired 更常用。" },
      { q: "Q3: POST 和 PUT 有什么区别？", a: "POST用于新增（非幂等），PUT用于全量更新（幂等）。幂等就是：同样的请求执行1次和执行100次，结果一样。这对分布式重试很重要。" },
      { q: "Q4: 项目中事务怎么用？", a: "单条CRUD操作默认就是一个事务。多个操作需要原子性时，用 @Transactional 注解。比如创建订单+扣库存必须在同一事务中，要么全成功要么全回滚。" },
      { q: "Q5: 怎么防止 SQL 注入？", a: "MyBatis-Plus使用参数化查询（PreparedStatement），用户输入通过 ? 占位符传入，不会拼到SQL字符串里。QueryWrapper 的 eq/like 方法底层都是参数化的。" },
    ];

    qa.forEach((item, i) => {
      const y = 1.5 + i * 0.78;
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.68, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 6, offset: 1, color: "000000", opacity: 0.05 } });
      // Q number
      slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.68, fill: { color: C.navy } });
      slide.addText(item.q, { x: 0.8, y: y + 0.02, w: 8.4, h: 0.3, fontSize: 13, fontFace: "Arial", color: C.navy, bold: true });
      slide.addText(item.a, { x: 0.8, y: y + 0.32, w: 8.4, h: 0.32, fontSize: 10, fontFace: "Arial", color: C.textMuted });
    });

    slide.addNotes("这5个问题是面试中最高频的基础题。每个都要能自然回答。\n\nQ1 自动配置：SpringBoot最核心的特性就是'约定优于配置'——你引入starter，它就帮你配好一切。背后是spring.factories文件中的自动配置类列表。\n\nQ2 注入区别：日常都用@Autowired就行。但要知道@Resource也可以，而且在按名字匹配时更方便。\n\nQ3 POST/PUT：RESTful规范是加分项。强调'幂等'这个概念——PUT和DELETE是幂等的，POST不是。\n\nQ4 事务：@Transactional可以放在Service类上（所有方法生效）或方法上（单个方法生效）。传播行为默认REQUIRED——如果当前有事务就加入，没有就新建。\n\nQ5 SQL注入：PreparedStatement是防御SQL注入的银弹。但要注意：如果你用${}（字符串替换）而不是#{}（参数占位），MP也保护不了你。#{}永远比${}安全。");
  }

  // ========== Slide 14: 分层代码实例 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.lightBg };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });
    slide.addText("代码实战 — 四层代码一览", { x: 0.8, y: 0.4, w: 9, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.navy, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.1, w: 1.5, h: 0.04, fill: { color: C.sky } });

    const layers = [
      { name: "Entity", file: "Employee.java", color: C.sky, code: "@Data\n@TableName(\"employee\")\npublic class Employee {\n    @TableId(type = AUTO)\n    private Long id;\n    private String name;\n    ...\n}" },
      { name: "Mapper", file: "EmployeeMapper.java", color: C.green, code: "@Mapper\npublic interface EmployeeMapper\n    extends BaseMapper<Employee> {\n    // 空接口，CRUD全部继承\n}" },
      { name: "Service", file: "EmployeeServiceImpl.java", color: "F59E0B", code: "@Service\npublic class EmployeeServiceImpl\n    extends ServiceImpl<EmployeeMapper, Employee>\n    implements EmployeeService {\n    // 复杂业务在这里写\n}" },
      { name: "Controller", file: "EmployeeController.java", color: "8B5CF6", code: "@RestController\n@RequestMapping(\"/api/employees\")\npublic class EmployeeController {\n    @PostMapping\n    public R<Employee> add(@RequestBody Employee e) {\n        service.save(e);\n        return R.ok(e);\n    }\n}" },
    ];

    layers.forEach((l, i) => {
      const x = 0.35 + i * 2.4;
      slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.15, h: 3.7, fill: { color: C.cardBg }, shadow: { type: "outer", blur: 6, offset: 1, color: "000000", opacity: 0.06 } });
      slide.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.15, h: 0.06, fill: { color: l.color } });
      slide.addText(l.name, { x, y: 1.7, w: 2.15, h: 0.3, fontSize: 15, fontFace: "Arial", color: l.color, bold: true, align: "center" });
      slide.addText(l.file, { x, y: 2.0, w: 2.15, h: 0.25, fontSize: 10, fontFace: "Consolas", color: C.textMuted, align: "center" });
      slide.addShape(pres.shapes.RECTANGLE, { x: x + 0.3, y: 2.35, w: 1.55, h: 0.02, fill: { color: l.color } });
      slide.addText(l.code, { x: x + 0.1, y: 2.5, w: 1.95, h: 2.5, fontSize: 9, fontFace: "Consolas", color: C.textDark });
    });

    // Flow arrow
    slide.addText("Entity  ←  Mapper  ←  Service  ←  Controller  ←  前端请求", { x: 0.8, y: 5.2, w: 8.4, h: 0.35, fontSize: 12, fontFace: "Arial", color: C.navy, bold: true, align: "center" });

    slide.addNotes("这一页直观展示四层代码的结构和每一层的核心写法。\n\nEntity：纯数据载体，用Lombok的@Data省去getter/setter\nMapper：空接口继承BaseMapper，MP自动生成实现\nService：继承ServiceImpl获得通用CRUD实现，有复杂业务再自己写\nController：@RestController + @RequestMapping 定义REST接口\n\n关键规律：每往下一层，都是extends/继承一个父类或接口，自动获得上一层的能力。这就是继承的好处——复用而不重写。\n\n面试时可以指着这一页说：'这就是我写的四层代码结构，每一层职责单一，通过继承获得通用能力。'");
  }

  // ========== Slide 15: 项目亮点总结 ==========
  {
    const slide = pres.addSlide();
    slide.background = { color: C.navy };
    // Top line
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.sky } });

    slide.addText("项目亮点 & 后续规划", { x: 1, y: 0.5, w: 8, h: 0.7, fontSize: 32, fontFace: "Arial", color: C.white, bold: true, align: "center" });
    slide.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.2, w: 3, h: 0.03, fill: { color: C.sky } });

    // Six highlights in grid
    const highlights = [
      { icon: icons["layer"], title: "规范三层架构", desc: "Controller/Service/Mapper 各司其职，SOLID原则" },
      { icon: icons["shield"], title: "逻辑删除设计", desc: "数据不真删，is_deleted标记保护数据安全" },
      { icon: icons["code"], title: "统一返回格式", desc: "R<T>泛型 + Jackson双转换，前后端解耦" },
      { icon: icons["search"], title: "多条件动态筛选", desc: "QueryWrapper链式调用，灵活组合条件" },
      { icon: icons["warn"], title: "JDK 25前沿版本", desc: "踩坑两个兼容问题，体现排查能力" },
      { icon: icons["check"], title: "工程化规范", desc: "统一命名、注释、公共字段，团队协作友好" },
    ];

    highlights.forEach((h, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.8 + col * 3.0;
      const y = 1.6 + row * 1.55;

      slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.6, h: 1.3, fill: { color: "FFFFFF", transparency: 8 } });
      slide.addImage({ data: h.icon, x: x + 0.15, y: y + 0.2, w: 0.35, h: 0.35 });
      slide.addText(h.title, { x: x + 0.6, y: y + 0.15, w: 1.8, h: 0.35, fontSize: 13, fontFace: "Arial", color: C.skyLight, bold: true });
      slide.addText(h.desc, { x: x + 0.15, y: y + 0.7, w: 2.3, h: 0.5, fontSize: 10, fontFace: "Arial", color: C.textLight });
    });

    // Future plans
    slide.addText("后续规划", { x: 1, y: 4.8, w: 8, h: 0.35, fontSize: 16, fontFace: "Arial", color: C.skyLight, bold: true, align: "center" });
    slide.addText("全局异常处理  →  AOP操作日志  →  JWT认证授权  →  Redis缓存  →  Docker部署", { x: 1, y: 5.15, w: 8, h: 0.3, fontSize: 11, fontFace: "Arial", color: C.textMuted, align: "center" });

    // Bottom line
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.sky } });

    slide.addNotes("最后一页是面试的收尾部分，要自信自信再自信。\n\n讲完项目亮点后：\n1. 强调'后续规划'——说明你有持续改进的意识\n2. 提到的技术（AOP、JWT、Redis）暗示你已经在学习这些方向\n3. 最后留一个开放性问题：'面试官对哪部分想深入了解吗？'\n\n面试最重要的不是项目多复杂，而是你能否清晰地表达：\n- 你做了什么\n- 为什么这么做\n- 怎么做的\n- 遇到了什么问题，怎么解决的\n\n这份PPT就是围绕这四点组织的。每个问题都经得起追问，每句话都有技术细节支撑。");
  }

  // ========== Write File ==========
  const fileName = "C:\\Users\\李勇超\\Desktop\\轻客管家\\轻客管家-技术总结.pptx";
  await pres.writeFile({ fileName });
  console.log("PPT generated successfully: " + fileName);
}

main().catch(console.error);
