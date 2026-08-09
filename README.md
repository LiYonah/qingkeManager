# 轻客管家 — 企业办公服务综合管理系统

企业办公服务综合管理系统，包含客户管理、员工管理、服务分类、订单管理、操作日志与登录认证等模块。

## 技术栈

| 层 | 技术 |
|---|---|
| 后端 | Spring Boot 3.4.5 · Java 21 · MyBatis-Plus 3.5.9 · MySQL 8.0 |
| 认证 | JWT（jjwt 0.12.6）+ BCrypt（spring-security-crypto） |
| 前端 | Vue 3 · Vite 8 · Pinia · Vue Router · Axios |
| 其他 | EasyExcel 导出 · Hutool · SpringDoc/Swagger |

## 目录结构

```
轻客管家/
├── src/                      # Spring Boot 后端源码
│   ├── main/java/com/qingke/manager/
│   │   ├── controller/       # 接口层（登录、客户、员工、订单、服务分类）
│   │   ├── service/          # 业务层
│   │   ├── mapper/           # MyBatis-Plus Mapper
│   │   ├── entity/           # 实体（6 张表）
│   │   ├── config/           # 配置（JWT、拦截器、CORS、MyBatis-Plus、OpenAPI）
│   │   ├── aop/              # 操作日志切面
│   │   └── common/           # 统一返回 R、全局异常
│   └── main/resources/
│       ├── application.yml   # 应用配置（数据库连接支持环境变量覆盖）
│       └── static/           # 内置单页版页面（Vite 前端构建后由镜像覆盖）
├── qingke-web/               # Vue 3 前端源码
├── sql/init.sql              # 生产环境初始化脚本（建表 + 默认管理员）
├── Dockerfile                # 多阶段构建（前端 + 后端 + 运行镜像，JDK 21）
├── docker-compose.yml        # 一键部署（MySQL + 应用）
└── pom.xml                   # Maven 配置
```

## 快速开始

### 方式一：Docker 一键部署（推荐）

```bash
# 启动（首次会自动执行 sql/init.sql 建表并创建 admin 账号）
docker compose up -d --build

# 访问
#   前端页面：  http://localhost:8080
#   Swagger：   http://localhost:8080/swagger-ui.html

# 查看日志
docker compose logs -f app

# 停止
docker compose down
```

> 修改默认数据库密码（生产环境强烈建议）：
> 创建 `.env` 文件，写入 `MYSQL_ROOT_PASSWORD=你的新密码`，再执行 `docker compose up -d --build`。

### 方式二：本地开发

前置条件：JDK 21、Maven 3.9+、Node.js 20+、MySQL 8.0。

1. 初始化数据库（任选其一）
   - 新建数据库 `qingke_manager`（utf8mb4），然后执行：`mysql -uroot -p < sql/init.sql`
   - 或手动执行 `sql/init.sql` 中的建表语句

2. 启动后端（IDEA 直接运行 `QingkeManagerApplication`，或命令行）
   ```bash
   mvn spring-boot:run
   # 默认数据库连接：127.0.0.1:3306/qingke_manager，root / Lzx040305
   # 可通过环境变量覆盖：DB_HOST / DB_PORT / DB_NAME / DB_USERNAME / DB_PASSWORD
   ```

3. 启动前端
   ```bash
   cd qingke-web
   npm install
   npm run dev        # http://localhost:3000，/api 代理到后端 8080
   ```

## 默认账号

| 账号 | 密码 | 角色 |
|---|---|---|
| admin | 123456 | ADMIN |

> 首次登录后请尽快在「修改密码」中更换默认密码。

## 环境变量说明

| 环境变量 | 默认值 | 说明 |
|---|---|---|
| `DB_HOST` | `127.0.0.1` | 数据库地址（Docker 内由 compose 注入 mysql） |
| `DB_PORT` | `3306` | 数据库端口 |
| `DB_NAME` | `qingke_manager` | 数据库名 |
| `DB_USERNAME` | `root` | 数据库用户名 |
| `DB_PASSWORD` | `Lzx040305` | 数据库密码（生产环境务必覆盖） |
| `SPRING_DATASOURCE_PASSWORD` | — | Docker 部署时由 compose 注入，优先级最高 |

## 其他

- 前端生产构建：`cd qingke-web && npm run build`（产物在 `qingke-web/dist/`，Docker 构建时会自动打入镜像）
- 单元测试：`mvn test`（H2 内存库，不依赖真实 MySQL）
- PPT 生成脚本：`create-ppt.js` / `create-summary-ppt.js`（依赖 `npm install` 安装 pptxgenjs）