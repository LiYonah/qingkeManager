package com.qingke.manager.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC 配置类
 *
 * 主要作用：注册拦截器，指定哪些路径需要登录、哪些路径放行。
 *
 * 拦截规则：
 *   /api/login               → 放行（登录接口本身不需要登录）
 *   /api/register            → 放行（注册接口）
 *   /doc.html                → 放行（API 文档）
 *   /v3/api-docs/**          → 放行（API 文档数据）
 *   /api/**                  → 拦截（其他所有 API 都需要登录）
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/**")           // 拦截所有 API
                .excludePathPatterns(                 // 排除以下路径：
                        "/api/login",                 //   登录
                        "/api/register",              //   注册
                        "/error",                     //   错误页面
                        "/swagger-ui/**",             //   Swagger UI
                        "/v3/api-docs/**"             //   OpenAPI JSON
                );
    }
}
