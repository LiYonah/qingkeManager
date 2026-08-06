package com.qingke.manager.controller;

import com.qingke.manager.common.R;
import com.qingke.manager.config.JwtUtil;
import com.qingke.manager.entity.SysUser;
import com.qingke.manager.service.impl.SysUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 登录控制器
 *
 * 登录流程：
 *   1. 前端发 POST /api/login（用户名 + 密码）
 *   2. 后端查数据库，BCrypt 校验密码
 *   3. 成功 → 生成 JWT 返回
 *   4. 前端存 token，以后每次请求都带在 Authorization 头里
 *
 * JWT 比 Session 好在哪？
 *   - 服务器不存状态，集群环境无需共享 Session
 *   - token 自包含用户信息，解析即可获得用户身份
 */
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private SysUserServiceImpl sysUserService;

    /**
     * 登录
     *
     * 请求体：{"username": "admin", "password": "123456"}
     * 返回：  {"code": 200, "data": {"token": "xxx.yyy.zzz", "user": {...}}}
     */
    @PostMapping("/login")
    public R<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return R.fail(400, "用户名和密码不能为空");
        }

        SysUser user = sysUserService.checkLogin(username, password);
        if (user == null) {
            return R.fail(401, "用户名或密码错误");
        }

        // 生成 token
        String token = JwtUtil.generate(user.getId(), user.getUsername(), user.getRole());

        Map<String, Object> data = Map.of(
                "token", token,
                "user", user
        );
        return R.ok("登录成功", data);
    }

    /**
     * 注册
     */
    @PostMapping("/register")
    public R<SysUser> register(@RequestBody SysUser user) {
        try {
            SysUser saved = sysUserService.register(user);
            return R.ok("注册成功", saved);
        } catch (RuntimeException e) {
            return R.fail(400, e.getMessage());
        }
    }

    /**
     * 获取当前登录用户信息（需要带 token 才能调）
     */
    @GetMapping("/me")
    public R<Map<String, Object>> me(jakarta.servlet.http.HttpServletRequest request) {
        Map<String, Object> info = Map.of(
                "userId", request.getAttribute("userId"),
                "username", request.getAttribute("username"),
                "role", request.getAttribute("role")
        );
        return R.ok(info);
    }

    /**
     * 修改密码（需要登录）
     *
     * 请求体：{"oldPassword": "123456", "newPassword": "654321"}
     */
    @PutMapping("/me/password")
    public R<String> changePassword(@RequestBody Map<String, String> body,
                                  jakarta.servlet.http.HttpServletRequest request) {
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            return R.fail(400, "旧密码和新密码不能为空");
        }
        if (newPassword.length() < 6) {
            return R.fail(400, "新密码至少6位");
        }

        Long userId = ((Number) request.getAttribute("userId")).longValue();
        try {
            sysUserService.changePassword(userId, oldPassword, newPassword);
            return R.ok("密码修改成功");
        } catch (RuntimeException e) {
            return R.fail(400, e.getMessage());
        }
    }
}
