package com.qingke.manager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SpringDoc OpenAPI 配置
 *
 * 启动后访问：http://localhost:8080/swagger-ui/index.html
 * 即可看到所有接口的在线文档，支持在线调试。
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("轻客管家 API 文档")
                        .description("企业办公服务综合管理系统")
                        .version("1.0.0")
                        .contact(new Contact().name("轻客管家开发团队")));
    }
}
