CREATE TABLE IF NOT EXISTS sys_user (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    password    VARCHAR(200) NOT NULL,
    real_name   VARCHAR(50),
    role        VARCHAR(20)  DEFAULT 'USER',
    status      TINYINT      DEFAULT 1,
    create_time DATETIME,
    update_time DATETIME
);
