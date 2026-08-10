package com.qingke.manager.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * SPA 前端路由转发过滤器
 *
 * Vue Router 使用 HTML5 History 模式，当用户直接访问或刷新
 * /login、/employees、/orders 等前端路由时，服务器找不到对应静态资源会返回 404/500。
 * 本过滤器将这类请求转发到 index.html，由前端路由接管渲染。
 *
 * 规则（仅处理 GET）：
 *   - /api/**、/swagger/**、/v3/**、/error 等后端接口/文档路径 → 不处理
 *   - 路径中包含扩展名（如 /assets/xxx.js、/favicon.svg）→ 不处理（真实静态资源）
 *   - 其余无扩展名的路径（前端路由）→ 转发到 /index.html
 */
@Component
public class SpaForwardFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        boolean isGet = "GET".equalsIgnoreCase(request.getMethod());
        boolean isApi = path.startsWith("/api");
        boolean isDoc = path.startsWith("/swagger") || path.startsWith("/v3") || path.startsWith("/doc");
        boolean isError = path.startsWith("/error");
        boolean isStaticFile = path.contains("."); // 含扩展名视为静态资源

        if (isGet && !isApi && !isDoc && !isError && !isStaticFile && !"/".equals(path)) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}