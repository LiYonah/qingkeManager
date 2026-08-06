package com.qingke.manager.config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 登录拦截器
 *
 * 每个请求到达 Controller 之前，先经过这里检查。
 * 就像一个门禁——没带 token（没登录）的人不能进去。
 *
 * 执行流程：
 *   请求 → LoginInterceptor.preHandle() → 有 token？→ Controller
 *                                         → 无 token？→ 返回 401
 *
 * HandlerInterceptor vs Filter：
 *   - Filter 是 Servlet 层面的（更底层）
 *   - Interceptor 是 Spring 层面的（可以注入 Bean，方便获取 Controller 信息）
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        // 1. 从请求头取 token（格式：Bearer xxxxx）
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendError(response, 401, "未登录，请先调用登录接口获取 token");
            return false;
        }

        // 2. 解析 token
        String token = authHeader.substring(7); // 去掉 "Bearer " 前缀
        Claims claims = JwtUtil.parse(token);
        if (claims == null) {
            sendError(response, 401, "token 无效或已过期，请重新登录");
            return false;
        }

        // 3. 把用户信息存入 request，Controller 可以通过 request.getAttribute() 获取
        request.setAttribute("userId", claims.get("userId"));
        request.setAttribute("username", claims.getSubject());
        request.setAttribute("role", claims.get("role"));

        return true; // 放行
    }

    private void sendError(HttpServletResponse response, int code, String msg) throws Exception {
        response.setStatus(code);
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"code\":" + code + ",\"message\":\"" + msg + "\",\"data\":null}");
    }
}
