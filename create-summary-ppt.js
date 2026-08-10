const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "李勇超";
pres.title = "轻客管家项目总结汇报";

// ===== 色板 (Midnight Executive) =====
const C = {
  navy:     "1E2761",
  darkBlue: "0F172A",
  ice:      "CADCFC",
  white:    "FFFFFF",
  lightBg:  "F4F5F7",
  text:     "1A1D23",
  muted:    "6B7280",
  accent:   "2563EB",
  green:    "10B981",
  orange:   "F59E0B",
  purple:   "8B5CF6",
  red:      "EF4444",
};
const FONT = "Microsoft YaHei";
const MONO = "Consolas";

// ===== 辅助函数 =====
const mkShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.1 });
const slideNum = (s, n) => s.addText(String(n), { x: 9.2, y: 5.2, w: 0.6, h: 0.3, fontSize: 9, color: C.muted, align: "right" });

function addNotes(slide, text) {
  slide.addNotes(text);
}

// ====== 第1页：封面 ======
let s1 = pres.addSlide();
s1.background = { color: C.navy };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
s1.addText("轻客管家", { x: 0.8, y: 1.2, w: 8.4, h: 1.0, fontSize: 48, fontFace: FONT, color: C.white, bold: true });
s1.addText("企业办公服务综合管理系统", { x: 0.8, y: 2.2, w: 8.4, h: 0.6, fontSize: 20, fontFace: FONT, color: C.ice });
s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.1, w: 1.5, h: 0.04, fill: { color: C.accent } });
s1.addText("项目总结汇报", { x: 0.8, y: 3.4, w: 8.4, h: 0.5, fontSize: 16, fontFace: FONT, color: C.ice });
s1.addText([
  { text: "开发人员：李勇超", options: { breakLine: true } },
  { text: "2026年8月", options: {} }
], { x: 0.8, y: 4.3, w: 4, h: 0.8, fontSize: 13, fontFace: FONT, color: C.muted });
addNotes(s1, "封面：这是项目的门面，面试时第一印象很重要。轻客管家这个名字体现了'轻量、客制化、管家式服务'的定位。");

// ====== 第2页：项目概述 ======
let s2 = pres.addSlide();
s2.background = { color: C.white };
s2.addText("项目概述", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s2.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });
// 三列卡片
const cards = [
  { icon: "🎯", title: "做什么", desc: "面向中小企业的\n办公服务管理平台" },
  { icon: "🔧", title: "解决什么", desc: "客户、员工、服务分类、\n订单一站式管理" },
  { icon: "💡", title: "核心理念", desc: "让中小企业用得起、\n用得好的管理工具" }
];
cards.forEach((c, i) => {
  const x = 0.7 + i * 3.0;
  s2.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.7, h: 3.2, fill: { color: C.lightBg }, shadow: mkShadow() });
  s2.addText(c.icon, { x, y: 1.5, w: 2.7, h: 0.7, fontSize: 32, align: "center" });
  s2.addText(c.title, { x, y: 2.2, w: 2.7, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, align: "center" });
  s2.addText(c.desc, { x: x + 0.2, y: 2.8, w: 2.3, h: 1.2, fontSize: 13, fontFace: FONT, color: C.muted, align: "center", lineSpacingMultiple: 1.5 });
});
slideNum(s2, 2);
addNotes(s2, "项目概述：面试时先说清楚'做什么 → 解决什么问题 → 给谁用'这三个核心问题。面向中小企业是一个真实的市场定位，不是凭空捏造的需求。");

// ====== 第3页：技术选型 ======
let s3 = pres.addSlide();
s3.background = { color: C.white };
s3.addText("技术选型", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s3.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const techs = [
  { cat: "后端框架", items: "SpringBoot 3.4.5 + MyBatis-Plus 3.5.9" },
  { cat: "数据库",   items: "MySQL 8.0 + H2（测试）" },
  { cat: "安全认证", items: "JWT + BCrypt + HandlerInterceptor" },
  { cat: "API文档",  items: "SpringDoc OpenAPI + Swagger UI" },
  { cat: "工具库",   items: "Lombok + Hutool + EasyExcel 4.0.3" },
  { cat: "前端",     items: "内嵌HTML + Vue 3（Vite + Pinia + Axios）" },
  { cat: "测试",     items: "JUnit 5 + Mockito + H2 内存数据库" },
  { cat: "部署",     items: "Docker + Docker Compose" },
];
techs.forEach((t, i) => {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const x = 0.7 + col * 4.5;
  const y = 1.3 + row * 0.55;
  s3.addText([
    { text: t.cat + "  ", options: { bold: true, color: C.navy, fontSize: 14 } },
    { text: t.items, options: { color: C.muted, fontSize: 13 } }
  ], { x, y, w: 4.2, h: 0.45, fontFace: FONT, valign: "middle" });
  s3.addShape(pres.shapes.RECTANGLE, { x, y: y + 0.42, w: 3.8, h: 0.01, fill: { color: "E8EAED" } });
});
slideNum(s3, 3);
addNotes(s3, "技术选型：面试官常问'为什么选这个技术'。SpringBoot 3.4 是最新稳定版，MyBatis-Plus 比 JPA 更灵活适合国内开发习惯。JWT 无状态适合集群部署。EasyExcel 比 POI 省内存。每个选型都有理由。");

// ====== 第4页：系统架构 ======
let s4 = pres.addSlide();
s4.background = { color: C.white };
s4.addText("系统架构", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s4.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

// 三层架构水平图
const layers = [
  { name: "Controller 控制层", desc: "@RestController\n接收 HTTP 请求\n参数校验 @Valid\n返回 JSON", color: C.accent },
  { name: "Service 业务层", desc: "@Service\n处理业务逻辑\n调用 Mapper\n事务管理", color: "3B82F6" },
  { name: "Mapper 数据层", desc: "MyBatis-Plus\nBaseMapper CRUD\n分页 + 条件筛选\n逻辑删除", color: "60A5FA" },
  { name: "Database 数据库", desc: "MySQL 8.0\n5 张业务表\nH2 内存测试", color: "93C5FD" },
];
layers.forEach((l, i) => {
  const x = 0.6 + i * 2.4;
  s4.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.1, h: 2.6, fill: { color: l.color }, shadow: mkShadow() });
  s4.addText(l.name, { x, y: 1.4, w: 2.1, h: 0.5, fontSize: 14, fontFace: FONT, color: C.white, bold: true, align: "center" });
  s4.addText(l.desc, { x: x + 0.15, y: 2.0, w: 1.8, h: 1.7, fontSize: 12, fontFace: FONT, color: C.white, align: "center", lineSpacingMultiple: 1.4 });
  if (i < 3) {
    s4.addText("→", { x: x + 2.05, y: 2.2, w: 0.4, h: 0.5, fontSize: 24, color: C.muted, align: "center", fontFace: FONT });
  }
});
// 关键设计说明
s4.addText("关键设计：统一返回格式 R<T>  ·  全局异常处理 @RestControllerAdvice  ·  拦截器链（JWT 鉴权）  ·  AOP 操作日志", {
  x: 0.7, y: 4.2, w: 8.6, h: 0.5, fontSize: 12, fontFace: FONT, color: C.muted
});
slideNum(s4, 4);
addNotes(s4, "系统架构：三层架构是Java后端最经典的设计模式。Controller只负责接待请求，Service处理业务，Mapper操作数据库。每层职责清晰，方便维护和扩展。R类统一返回格式让前端处理响应更简单。");

// ====== 第5页：数据库设计 ======
let s5 = pres.addSlide();
s5.background = { color: C.white };
s5.addText("数据库设计", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s5.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const tables = [
  ["表名", "字段数", "说明", "关键设计"],
  ["customer", "9", "客户信息", "@TableLogic 逻辑删除"],
  ["employee", "12", "员工信息", "BigDecimal 存薪资\nLocalDate 存入职日期"],
  ["service_category", "7", "服务分类", "价格用 BigDecimal"],
  ["order_info", "9", "订单信息", "冗余存储金额\n关联三张表"],
  ["sys_user", "8", "系统用户", "BCrypt 加密密码\n角色字段"],
  ["operation_log", "7", "操作日志", "AOP 自动写入"],
];
s5.addTable(tables, {
  x: 0.5, y: 1.2, w: 9.0, colW: [1.6, 1.0, 1.5, 2.8],
  fontFace: FONT, fontSize: 12,
  border: { pt: 0.5, color: "E8EAED" },
  rowH: [0.45, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
  fill: { color: C.white },
  color: C.text,
});
// 表头样式
tables[0].forEach((_, ci) => {
  s5.addText(tables[0][ci], { x: 0.5 + [0,1.6,2.6,4.1][ci], y: 1.2, w: [1.6,1.0,1.5,2.8][ci], h: 0.45, fontSize: 12, fontFace: FONT, color: C.white, bold: true, fill: { color: C.navy }, align: "center", valign: "middle" });
});

// 表关系
s5.addText("表关系：order_info.customer_id → customer.id  ·  order_info.service_category_id → service_category.id  ·  order_info.employee_id → employee.id", {
  x: 0.7, y: 4.4, w: 8.6, h: 0.4, fontSize: 11, fontFace: FONT, color: C.muted
});
slideNum(s5, 5);
addNotes(s5, "数据库设计：5张表支撑4个业务模块。订单表冗余存储金额是刻意为之——服务价格会变动，但历史订单金额不能变。BigDecimal存储金额避免浮点数精度问题。@TableLogic逻辑删除让数据可恢复。");

// ====== 第6页：核心业务模块 ======
let s6 = pres.addSlide();
s6.background = { color: C.white };
s6.addText("核心业务模块", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s6.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const modules = [
  { name: "客户管理", icon: "🏢", apis: "5个接口", detail: "增 / 删 / 改 / 查单个\n分页 + 关键词搜索", color: C.green },
  { name: "员工管理", icon: "👥", apis: "6个接口", detail: "增 / 删 / 改 / 查单个\n分页 + 部门/状态/关键词筛选\n部门列表下拉", color: C.accent },
  { name: "服务分类", icon: "🛠️", apis: "5个接口", detail: "增 / 删 / 改 / 查单个\n分页 + 关键词搜索", color: C.orange },
  { name: "订单管理", icon: "📋", apis: "6个接口", detail: "增 / 删 / 改 / 查单个\n分页 + 状态筛选\nEasyExcel 导出", color: C.purple },
];
modules.forEach((m, i) => {
  const x = 0.5 + i * 2.35;
  s6.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.15, h: 3.2, fill: { color: C.white }, shadow: mkShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.15, h: 0.06, fill: { color: m.color } });
  s6.addText(m.icon, { x, y: 1.5, w: 2.15, h: 0.6, fontSize: 28, align: "center" });
  s6.addText(m.name, { x, y: 2.1, w: 2.15, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, align: "center" });
  s6.addText(m.apis, { x, y: 2.5, w: 2.15, h: 0.35, fontSize: 22, fontFace: FONT, color: m.color, bold: true, align: "center" });
  s6.addText(m.detail, { x: x + 0.2, y: 3.0, w: 1.75, h: 1.3, fontSize: 11, fontFace: FONT, color: C.muted, align: "center", lineSpacingMultiple: 1.6 });
});
s6.addText("共 22 个 RESTful API 接口  ·  全部支持分页查询  ·  统一返回 R<T> 格式", {
  x: 0.7, y: 4.8, w: 8.6, h: 0.4, fontSize: 12, fontFace: FONT, color: C.muted, align: "center"
});
slideNum(s6, 6);
addNotes(s6, "核心业务模块：4个模块共22个接口。员工管理最多6个接口因为支持多条件组合筛选。订单管理有Excel导出功能。所有接口风格统一：GET查/POST增/PUT改/DELETE删。面试时点开Swagger页面展示更直观。");

// ====== 第7页：登录与安全 ======
let s7 = pres.addSlide();
s7.background = { color: C.white };
s7.addText("登录与安全", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s7.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

// JWT 流程
const flowItems = ["POST /login\n用户名+密码", "BCrypt 校验\n密码匹配？", "生成 JWT Token\n三段签名", "前端存储 Token\nlocalStorage", "后续请求\nHeader: Bearer xxx", "拦截器解析\n提取用户信息", "放行 / 拒绝"];
s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 9.0, h: 2.0, fill: { color: C.lightBg }, shadow: mkShadow() });
flowItems.forEach((item, i) => {
  const x = 0.6 + i * 1.3;
  s7.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 1.6, w: 0.6, h: 0.6, fill: { color: C.navy } });
  s7.addText(String(i + 1), { x: x + 0.35, y: 1.6, w: 0.6, h: 0.6, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", fontFace: FONT });
  s7.addText(item, { x, y: 2.35, w: 1.3, h: 0.8, fontSize: 10, fontFace: FONT, color: C.text, align: "center", lineSpacingMultiple: 1.3 });
  if (i < 6) s7.addText("→", { x: x + 1.0, y: 1.7, w: 0.3, h: 0.4, fontSize: 18, color: C.muted, align: "center" });
});

// 安全特性
const secFeatures = [
  ["BCrypt 加密", "同密码不同密文（随机盐）\n不可逆，被拖库也无法反推"],
  ["首次强制改密", "登录后弹出密码修改框\n改过之后不再弹窗"],
  ["拦截器鉴权", "未登录访问 API → 401\ntoken 过期 → 自动拦截"],
];
secFeatures.forEach((sf, i) => {
  const x = 0.7 + i * 3.1;
  s7.addShape(pres.shapes.RECTANGLE, { x, y: 3.6, w: 2.8, h: 1.5, fill: { color: C.white }, shadow: mkShadow() });
  s7.addShape(pres.shapes.RECTANGLE, { x, y: 3.6, w: 0.06, h: 1.5, fill: { color: C.accent } });
  s7.addText(sf[0], { x: x + 0.2, y: 3.7, w: 2.4, h: 0.4, fontSize: 14, fontFace: FONT, color: C.navy, bold: true });
  s7.addText(sf[1], { x: x + 0.2, y: 4.1, w: 2.4, h: 0.8, fontSize: 11, fontFace: FONT, color: C.muted, lineSpacingMultiple: 1.4 });
});
slideNum(s7, 7);
addNotes(s7, "登录与安全：JWT流程是面试高频考点。BCrypt的'同样密码每次加密结果不同'是因为随机盐——这是它比MD5安全的核心原因。拦截器是Spring HandlerInterceptor，不是Filter——面试官可能追问区别。");

// ====== 第8页：亮点功能 ======
let s8 = pres.addSlide();
s8.background = { color: C.white };
s8.addText("亮点功能", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s8.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const highlights = [
  { title: "AOP 操作日志", desc: "自定义 @OperationLog 注解，@Around 环绕通知自动记录\n操作方法、参数、返回结果、执行耗时\nfinally 块保证即使异常也会记录", tag: "零侵入" },
  { title: "参数校验", desc: "@Valid + @NotBlank / @NotNull / @Min / @Email\n非法数据自动拦截，返回中文错误提示\n示例：name为空 → 'name: 姓名不能为空'", tag: "规范" },
  { title: "全局异常处理", desc: "@RestControllerAdvice 统一拦截所有异常\nMethodArgumentNotValidException → 400\nException → 500 兜底", tag: "健壮" },
  { title: "逻辑删除", desc: "@TableLogic 注解，DELETE 自动转 UPDATE\nis_deleted=1 标记删除，数据不丢失\n查询自动过滤已删除数据 WHERE is_deleted=0", tag: "安全" },
];
highlights.forEach((h, i) => {
  const row = Math.floor(i / 2);
  const col = i % 2;
  const x = 0.5 + col * 4.7;
  const y = 1.3 + row * 1.9;
  s8.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.3, h: 1.65, fill: { color: C.white }, shadow: mkShadow() });
  s8.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.65, fill: { color: C.accent } });
  s8.addText(h.title, { x: x + 0.3, y: y + 0.1, w: 3.0, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
  s8.addText(h.tag, { x: x + 3.4, y: y + 0.1, w: 0.8, h: 0.3, fontSize: 10, fontFace: FONT, color: C.accent, fill: { color: "EFF6FF" }, align: "center", valign: "middle" });
  s8.addText(h.desc, { x: x + 0.3, y: y + 0.6, w: 3.7, h: 0.9, fontSize: 11, fontFace: FONT, color: C.muted, lineSpacingMultiple: 1.5 });
});
slideNum(s8, 8);
addNotes(s8, "亮点功能：这4个功能是面试中最能体现技术深度的。AOP操作日志展示了'零侵入'的设计理念——Controller不用写任何日志代码。参数校验的'中文错误提示'体现了用户体验意识。全局异常处理展示了防御性编程思维。逻辑删除展示了数据安全意识。");

// ====== 第9页：前端展示 ======
let s9 = pres.addSlide();
s9.background = { color: C.white };
s9.addText("前端展示", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s9.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

// 方案1
s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 4.3, h: 3.5, fill: { color: C.lightBg }, shadow: mkShadow() });
s9.addText("方案一：内嵌 HTML 仪表盘", { x: 0.8, y: 1.4, w: 3.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.navy, bold: true });
s9.addText([
  { text: "SpringBoot 静态资源，直接访问 localhost:8080", options: { breakLine: true, fontSize: 11 } },
  { text: "440 行单文件 (HTML+CSS+JS，零依赖)", options: { breakLine: true, fontSize: 11 } },
  { text: "登录页 + 仪表盘（侧边栏+统计卡片+表格）", options: { breakLine: true, fontSize: 11 } },
  { text: "通过无障碍审计 14/20 分", options: { breakLine: true, fontSize: 11 } },
  { text: "Tab 键导航、:focus-visible 焦点环", options: { fontSize: 11 } },
], { x: 0.8, y: 2.0, w: 3.8, h: 2.3, fontFace: FONT, color: C.muted, lineSpacingMultiple: 1.8, bullet: true });

// 方案2
s9.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.3, h: 3.5, fill: { color: C.lightBg }, shadow: mkShadow() });
s9.addText("方案二：Vue 3 独立前端", { x: 5.5, y: 1.4, w: 3.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.navy, bold: true });
s9.addText([
  { text: "Vite 构建 + Vue Router 路由守卫", options: { breakLine: true, fontSize: 11 } },
  { text: "Pinia 状态管理 + Axios 拦截器", options: { breakLine: true, fontSize: 11 } },
  { text: "5 个页面，4 个模块完整 CRUD", options: { breakLine: true, fontSize: 11 } },
  { text: "FormModal 弹窗表单（新增/编辑）", options: { breakLine: true, fontSize: 11 } },
  { text: "Vite proxy → localhost:8080", options: { fontSize: 11 } },
], { x: 5.5, y: 2.0, w: 3.8, h: 2.3, fontFace: FONT, color: C.muted, lineSpacingMultiple: 1.8, bullet: true });

s9.addText("两种方案：内嵌 HTML 用于快速演示，Vue 独立项目体现前后端分离的工程化能力。面试时两个都可以打开给面试官看。", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.3, fontSize: 11, fontFace: FONT, color: C.muted
});
slideNum(s9, 9);
addNotes(s9, "前端展示：两种前端方案各有价值。内嵌HTML展示了'用最简单的方式快速交付'的能力。Vue独立项目展示了'正经企业级前端'的能力——路由、状态管理、组件化一个不少。面试时可以说'我既会快速出Demo也会正经做独立前端'。");

// ====== 第10页：测试与质量 ======
let s10 = pres.addSlide();
s10.background = { color: C.white };
s10.addText("测试与质量", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

// 数字统计
const stats = [{ n:"20", l:"测试用例" }, { n:"4", l:"测试类" }, { n:"100%", l:"通过率" }, { n:"H2", l:"测试数据库" }];
stats.forEach((st, i) => {
  const x = 0.7 + i * 2.3;
  s10.addText(st.n, { x, y: 1.3, w: 2.0, h: 0.8, fontSize: 42, fontFace: FONT, color: C.accent, bold: true, align: "center" });
  s10.addText(st.l, { x, y: 2.0, w: 2.0, h: 0.3, fontSize: 13, fontFace: FONT, color: C.muted, align: "center" });
});

// 测试用例表格
const testTable = [
  ["测试类", "覆盖内容", "用例数", "类型"],
  ["RTest", "统一返回格式：ok/fail/空数据/默认错误码", "4", "纯单元"],
  ["JwtUtilTest", "JWT生成/解析/无效token/空值/用户名提取", "5", "纯单元"],
  ["SysUserServiceImplTest", "注册加密/重复/登录/改密码/旧密码失效", "7", "集成(H2)"],
  ["LoginControllerTest", "MockMvc模拟登录/注册/错误密码/重复注册", "4", "接口集成"],
];
s10.addTable(testTable, {
  x: 0.5, y: 2.7, w: 9.0, colW: [1.8, 3.6, 1.2, 1.2],
  fontFace: FONT, fontSize: 11, color: C.text,
  border: { pt: 0.5, color: "E8EAED" },
  rowH: [0.4, 0.42, 0.42, 0.42, 0.42],
});
// 表头高亮
testTable[0].forEach((_, ci) => {
  s10.addText(testTable[0][ci], { x: 0.5 + [0,1.8,5.4,6.6][ci], y: 2.7, w: [1.8,3.6,1.2,1.2][ci], h: 0.4, fontSize: 11, fontFace: FONT, color: C.white, bold: true, fill: { color: C.navy }, align: "center", valign: "middle" });
});
slideNum(s10, 10);
addNotes(s10, "测试与质量：20个测试用例覆盖了工具类、Service层、Controller层。H2内存数据库让测试不依赖真实MySQL——CI/CD里也能跑。MockMvc模拟HTTP请求不用启动浏览器。面试官问'写测试了吗'，直接亮出这个表格。");

// ====== 第11页：踩坑与解决 ======
let s11 = pres.addSlide();
s11.background = { color: C.white };
s11.addText("踩坑与解决", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s11.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const pitfalls = [
  { problem: "JDK 25 → JDK 21 LTS 降级", solution: "JDK 25 导致 Mockito 崩溃、SpringDoc 无法加载 Swagger UI、EasyExcel 编译报错。降级到 JDK 21 LTS 后全部解决。JDK 21 是企业生产环境标准版本。" },
  { problem: "MP 3.5.9 分页 total=0", solution: "PaginationInnerInterceptor 在 3.5.9 被拆分到 mybatis-plus-jsqlparser 独立模块。引入该依赖 + 手动 new PaginationInnerInterceptor(DbType.MYSQL) 解决。" },
  { problem: "MySQL utf8mb4 编码不兼容", solution: "JDK 25 的 String.lookupCharset() 不识别 MySQL 的 utf8mb4 编码。将 JDBC URL 中 characterEncoding=utf8mb4 改为 UTF-8 解决。" },
  { problem: "Knife4j 无法使用", solution: "尝试了 4.4.0/4.5.0 两个版本仍有兼容问题，最终使用 SpringDoc OpenAPI + Swagger UI 替代，功能完整。" },
];
pitfalls.forEach((p, i) => {
  const y = 1.3 + i * 1.05;
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.9, fill: { color: C.white }, shadow: mkShadow() });
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 0.9, fill: { color: C.red } });
  s11.addText("问题 " + (i+1), { x: 0.75, y: y + 0.05, w: 1.0, h: 0.3, fontSize: 11, fontFace: FONT, color: C.red, bold: true });
  s11.addText(p.problem, { x: 0.75, y: y + 0.3, w: 8.5, h: 0.3, fontSize: 11, fontFace: FONT, color: C.text, bold: true });
  s11.addText("→ " + p.solution, { x: 0.75, y: y + 0.55, w: 8.5, h: 0.3, fontSize: 10, fontFace: FONT, color: C.muted });
});
slideNum(s11, 11);
addNotes(s11, "踩坑与解决：面试官喜欢问'遇到过什么困难'——这就是准备好的素材。JDK 25的问题是真实踩过的版本兼容坑，MP分页问题是深入框架源码才能发现的。这个页面证明你有独立解决问题的能力。");

// ====== 第12页：项目成果 ======
let s12 = pres.addSlide();
s12.background = { color: C.white };
s12.addText("项目成果", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s12.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

const bigNums = [
  { n: "26", l: "Java 文件", sub: "7 个包层级" },
  { n: "5", l: "数据库表", sub: "3 个业务关联" },
  { n: "22", l: "API 接口", sub: "RESTful 规范" },
  { n: "20", l: "测试用例", sub: "100% 通过" },
  { n: "3000+", l: "代码行数", sub: "Java + Vue + HTML" },
];
bigNums.forEach((bn, i) => {
  const x = 0.3 + i * 1.9;
  s12.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 1.7, h: 2.2, fill: { color: C.navy }, shadow: mkShadow() });
  s12.addText(bn.n, { x, y: 1.4, w: 1.7, h: 0.8, fontSize: 32, fontFace: FONT, color: C.white, bold: true, align: "center" });
  s12.addText(bn.l, { x, y: 2.2, w: 1.7, h: 0.3, fontSize: 13, fontFace: FONT, color: C.ice, align: "center" });
  s12.addText(bn.sub, { x, y: 3.0, w: 1.7, h: 0.3, fontSize: 10, fontFace: FONT, color: C.muted, align: "center" });
});

// 文件分布
s12.addText("文件分布", { x: 0.7, y: 3.8, w: 3, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
s12.addText([
  { text: "entity 6 / mapper 6 / service 12 / controller 5", options: { breakLine: true } },
  { text: "config 7 / common 2 / annotation 1 / aop 1", options: { breakLine: true } },
  { text: "Vue 前端: 12 个文件 (组件+页面+API+路由+Store)", options: { breakLine: true } },
  { text: "部署: Dockerfile + docker-compose.yml", options: {} },
], { x: 0.7, y: 4.2, w: 4.5, h: 1.2, fontSize: 11, fontFace: FONT, color: C.muted, lineSpacingMultiple: 1.6, bullet: true });

s12.addText("Gitee", { x: 6, y: 3.8, w: 3, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
s12.addText("https://gitee.com/yamjin/minibus-butler", { x: 6, y: 4.3, w: 3.5, h: 0.4, fontSize: 12, fontFace: MONO, color: C.accent });
slideNum(s12, 12);
addNotes(s12, "项目成果：数字是最好的证明。26个Java文件、22个API接口、20个测试用例——这些具体数字比'我做了很多工作'有说服力得多。Gitee地址可以让面试官直接打开看代码。");

// ====== 第13页：技术成长与展望 ======
let s13 = pres.addSlide();
s13.background = { color: C.white };
s13.addText("技术成长与展望", { x: 0.7, y: 0.3, w: 8, h: 0.7, fontSize: 32, fontFace: FONT, color: C.navy, bold: true });
s13.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 1.2, h: 0.04, fill: { color: C.accent } });

// 左：掌握技能
s13.addText("已掌握的技能", { x: 0.7, y: 1.3, w: 4, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true });
s13.addText([
  { text: "SpringBoot 3.x 全栈开发", options: { bullet: true, breakLine: true } },
  { text: "三层架构设计与 RESTful API 设计", options: { bullet: true, breakLine: true } },
  { text: "JWT 认证流程 + BCrypt 加密", options: { bullet: true, breakLine: true } },
  { text: "AOP 切面编程（自定义注解+环绕通知）", options: { bullet: true, breakLine: true } },
  { text: "MyBatis-Plus 高级用法（分页/逻辑删除/自动填充）", options: { bullet: true, breakLine: true } },
  { text: "Vue 3 组件化开发 + 状态管理 + 路由", options: { bullet: true, breakLine: true } },
  { text: "JUnit 5 + Mockito + H2 单元测试", options: { bullet: true, breakLine: true } },
  { text: "Docker 容器化部署", options: { bullet: true } },
], { x: 0.7, y: 1.9, w: 4.3, h: 3.2, fontSize: 12, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.8 });

// 右：后续方向
s13.addText("后续优化方向", { x: 5.5, y: 1.3, w: 4, h: 0.5, fontSize: 18, fontFace: FONT, color: C.navy, bold: true });
s13.addText([
  { text: "Redis 缓存：热数据缓存，提升查询性能", options: { bullet: true, breakLine: true } },
  { text: "RBAC 权限：基于角色控制按钮级权限", options: { bullet: true, breakLine: true } },
  { text: "CI/CD：GitHub Actions 自动化测试+部署", options: { bullet: true, breakLine: true } },
  { text: "Knife4j：解决兼容问题后替换 Swagger UI", options: { bullet: true, breakLine: true } },
  { text: "OAuth2.0：第三方登录（微信/企业微信）", options: { bullet: true, breakLine: true } },
  { text: "微服务：Spring Cloud 拆分模块", options: { bullet: true, breakLine: true } },
  { text: "监控：Prometheus + Grafana", options: { bullet: true } },
], { x: 5.5, y: 1.9, w: 4.3, h: 3.2, fontSize: 12, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.8, bullet: true });
slideNum(s13, 13);
addNotes(s13, "技术成长与展望：'已掌握'部分展示当前能力，'后续方向'展示学习意识。面试官喜欢看到候选人有成长规划。提到的方向都是真实企业需求——不是为了凑字数随便写的。");

// ====== 第14页：感谢 ======
let s14 = pres.addSlide();
s14.background = { color: C.navy };
s14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
s14.addText("感谢聆听", { x: 0.8, y: 1.5, w: 8.4, h: 1.0, fontSize: 48, fontFace: FONT, color: C.white, bold: true, align: "center" });
s14.addShape(pres.shapes.RECTANGLE, { x: 4.2, y: 2.6, w: 1.6, h: 0.04, fill: { color: C.accent } });
s14.addText("轻客管家 — 从 0 到 1 的独立开发实践", { x: 0.8, y: 2.9, w: 8.4, h: 0.5, fontSize: 16, fontFace: FONT, color: C.ice, align: "center" });
s14.addText("https://gitee.com/yamjin/minibus-butler", { x: 0.8, y: 3.8, w: 8.4, h: 0.5, fontSize: 14, fontFace: MONO, color: C.muted, align: "center" });
s14.addText("李勇超  ·  2026年8月", { x: 0.8, y: 4.5, w: 8.4, h: 0.4, fontSize: 13, fontFace: FONT, color: C.muted, align: "center" });
addNotes(s14, "感谢页：面试结束时展示。放上Gitee地址方便面试官回顾。沉稳收尾，留下专业印象。");

// ====== 输出 ======
const outPath = "C:\\Users\\李勇超\\Desktop\\轻客管家\\项目总结汇报.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("PPT 生成成功: " + outPath);
}).catch(err => {
  console.error("生成失败: ", err);
});
