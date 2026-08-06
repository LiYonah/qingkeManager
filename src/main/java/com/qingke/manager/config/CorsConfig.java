package com.qingke.manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 跨域配置
 *
 * 什么是跨域？当浏览器访问的网页（如 http://localhost:3000）
 * 和 API 地址（http://localhost:8080）的协议、域名、端口任一不同时，
 * 浏览器会阻止请求——这就是"同源策略"。
 *
 * 此配置允许前端（Vue/React 等）跨域调用后端 API。
 * 生产环境应限制 allowedOrigins 为具体域名。
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");     // 允许所有来源（开发环境）
        config.addAllowedMethod("*");            // 允许所有 HTTP 方法
        config.addAllowedHeader("*");            // 允许所有请求头
        config.setAllowCredentials(true);        // 允许携带 cookie

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
