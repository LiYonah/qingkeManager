package com.qingke.manager;

import com.qingke.manager.config.JwtUtil;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JWT 工具类测试
 *
 * 测试三个核心方法：生成 token → 解析验证 → 获取用户名。
 * 面试亮点：能讲清楚 JWT 的三段结构和工作原理。
 */
class JwtUtilTest {

    @Test
    void generate_shouldProduceValidToken() {
        String token = JwtUtil.generate(1L, "admin", "ADMIN");
        assertNotNull(token);
        assertTrue(token.split("\\.").length == 3, "JWT 应该有三个段");
    }

    @Test
    void parse_shouldExtractCorrectClaims() {
        String token = JwtUtil.generate(42L, "testuser", "USER");

        Claims claims = JwtUtil.parse(token);
        assertNotNull(claims);
        assertEquals("testuser", claims.getSubject());
        assertEquals("USER", claims.get("role"));
    }

    @Test
    void parse_shouldReturnNullForInvalidToken() {
        Claims claims = JwtUtil.parse("invalid.token.here");
        assertNull(claims);
    }

    @Test
    void parse_shouldReturnNullForEmptyToken() {
        assertNull(JwtUtil.parse(""));
        assertNull(JwtUtil.parse(null));
    }

    @Test
    void getUsername_shouldReturnCorrectValue() {
        String token = JwtUtil.generate(1L, "zhangsan", "USER");
        assertEquals("zhangsan", JwtUtil.getUsername(token));
    }
}
