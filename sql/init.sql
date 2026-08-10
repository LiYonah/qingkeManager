-- ============================================================
-- 轻客管家 — 生产环境初始化脚本（MySQL 8.0）
-- 说明：docker compose 首次启动时会自动执行本脚本
--       若使用本地 MySQL，请手动执行：mysql -uroot -p < sql/init.sql
-- ============================================================

-- 强制连接字符集为 utf8mb4，避免中文被按 latin1 错误存储
SET NAMES utf8mb4;

-- ---------- 1. 系统用户表 ----------
CREATE TABLE IF NOT EXISTS sys_user (
    id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(50)  NOT NULL UNIQUE COMMENT '登录用户名',
    password    VARCHAR(200) NOT NULL COMMENT 'BCrypt 加密后的密码',
    real_name   VARCHAR(50)  COMMENT '真实姓名',
    role        VARCHAR(20)  NOT NULL DEFAULT 'USER' COMMENT '角色：ADMIN / USER',
    status      TINYINT      NOT NULL DEFAULT 1 COMMENT '1-启用 0-禁用',
    create_time DATETIME     COMMENT '创建时间',
    update_time DATETIME     COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户表';

-- ---------- 2. 客户表 ----------
CREATE TABLE IF NOT EXISTS customer (
    id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL COMMENT '客户名称',
    phone       VARCHAR(20)  COMMENT '联系电话',
    email       VARCHAR(100) COMMENT '邮箱',
    company     VARCHAR(100) COMMENT '所属公司',
    address     VARCHAR(255) COMMENT '地址',
    remark      VARCHAR(500) COMMENT '备注',
    is_deleted  TINYINT      NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删 1-已删',
    create_time DATETIME     COMMENT '创建时间',
    update_time DATETIME     COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户表';

-- ---------- 3. 员工表 ----------
CREATE TABLE IF NOT EXISTS employee (
    id          BIGINT        PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50)   NOT NULL COMMENT '员工姓名',
    phone       VARCHAR(20)   COMMENT '联系电话',
    email       VARCHAR(100)  COMMENT '邮箱',
    department  VARCHAR(50)   COMMENT '所属部门',
    position    VARCHAR(50)   COMMENT '职位',
    salary      DECIMAL(10,2) COMMENT '月薪',
    hire_date   DATE          COMMENT '入职日期',
    status      TINYINT       NOT NULL DEFAULT 1 COMMENT '1-在职 0-离职',
    remark      VARCHAR(500)  COMMENT '备注',
    is_deleted  TINYINT       NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删 1-已删',
    create_time DATETIME      COMMENT '创建时间',
    update_time DATETIME      COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工表';

-- ---------- 4. 服务分类表 ----------
CREATE TABLE IF NOT EXISTS service_category (
    id          BIGINT        PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)  NOT NULL COMMENT '分类名称',
    description VARCHAR(500)  COMMENT '分类描述',
    price       DECIMAL(10,2) COMMENT '基础价格',
    is_deleted  TINYINT       NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删 1-已删',
    create_time DATETIME      COMMENT '创建时间',
    update_time DATETIME      COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='服务分类表';

-- ---------- 5. 订单表 ----------
CREATE TABLE IF NOT EXISTS order_info (
    id                 BIGINT        PRIMARY KEY AUTO_INCREMENT,
    order_no           VARCHAR(32)   NOT NULL UNIQUE COMMENT '订单编号',
    customer_id        BIGINT        NOT NULL COMMENT '关联客户 ID',
    service_category_id BIGINT       NOT NULL COMMENT '关联服务分类 ID',
    employee_id        BIGINT        COMMENT '关联员工 ID（派单后填写）',
    amount             DECIMAL(10,2) COMMENT '订单金额',
    status             TINYINT       NOT NULL DEFAULT 0 COMMENT '0待处理 1进行中 2已完成 3已取消',
    remark             VARCHAR(500)  COMMENT '备注',
    is_deleted         TINYINT       NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删 1-已删',
    create_time        DATETIME      COMMENT '创建时间',
    update_time        DATETIME      COMMENT '更新时间',
    KEY idx_customer (customer_id),
    KEY idx_service_category (service_category_id),
    KEY idx_employee (employee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- ---------- 6. 操作日志表 ----------
CREATE TABLE IF NOT EXISTS operation_log (
    id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
    module      VARCHAR(50)  COMMENT '操作模块',
    action      VARCHAR(100) COMMENT '操作描述',
    method      VARCHAR(255) COMMENT '方法全名',
    params      TEXT         COMMENT '请求参数 JSON',
    result      TEXT         COMMENT '返回结果 JSON',
    cost_time   BIGINT       COMMENT '耗时（毫秒）',
    create_time DATETIME     COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- ---------- 默认管理员账号 ----------
-- 账号：admin  密码：123456（密码为 BCrypt 哈希，登录后请尽快修改）
INSERT INTO sys_user (username, password, real_name, role, status, create_time, update_time)
VALUES ('admin', '$2a$10$KmXQw8oBm35Xe6dxme0rB.dk.WLS4IG6GTa1ouZTjMAm2yzgj1DJq', '系统管理员', 'ADMIN', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE username = username;