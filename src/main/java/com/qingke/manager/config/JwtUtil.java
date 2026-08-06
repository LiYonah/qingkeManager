package com.qingke.manager.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 工具类
 *
 * JWT 结构（三段 Base64 编码，用 . 分隔）：
 *   Header.Payload.Signature
 *   - Header:  声明算法（HS256）
 *   - Payload:  用户数据（username, role, 过期时间）
 *   - Signature: 用密钥对前两段签名，防止篡改
 *
 * 工作流程：
 *   登录成功 → 生成 token 返回给前端
 *   后续请求 → 前端在 Header 里带 token → 后端验证签名 → 解析用户信息
 *
 * 为什么不用 Session？JWT 无状态，服务器不存用户信息，方便集群部署。
 */
public class JwtUtil {

    // 密钥（生产环境应放在配置文件里，不能硬编码）
    private static final String SECRET = "QingkeManagerSecretKey2026ForJwtSigningVeryLong";

    // token 有效期：24 小时
    private static final long EXPIRE = 24 * 60 * 60 * 1000;

    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /**
     * 生成 JWT
     *
     * @param userId   用户 ID
     * @param username 用户名
     * @param role     角色（ADMIN/USER）
     * @return JWT 字符串
     */
    public static String generate(Long userId, String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRE))
                .signWith(KEY)
                .compact();
    }

    /**
     * 解析并验证 JWT
     *
     * @param token JWT 字符串
     * @return Claims（载荷数据），解析失败返回 null
     */
    public static Claims parse(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null; // token 过期、签名不匹配、格式错误等
        }
    }

    /**
     * 从 token 中获取用户名
     */
    public static String getUsername(String token) {
        Claims claims = parse(token);
        return claims != null ? claims.getSubject() : null;
    }
}
