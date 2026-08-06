package com.qingke.manager;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 轻客管家 — 企业办公服务综合管理系统
 * <p>
 * 启动入口：运行本类的 main 方法即可启动整个 SpringBoot 应用。
 *
 * @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
 * @MapperScan 告诉 MyBatis-Plus 去哪里扫描 Mapper 接口
 */
@SpringBootApplication
@MapperScan("com.qingke.manager.mapper")
public class QingkeManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(QingkeManagerApplication.class, args);
        System.out.println("====================================");
        System.out.println("  轻客管家启动成功！🚀");
        System.out.println("  访问地址: http://localhost:8080");
        System.out.println("====================================");
    }
}
