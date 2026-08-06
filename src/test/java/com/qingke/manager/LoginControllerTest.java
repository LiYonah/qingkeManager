package com.qingke.manager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qingke.manager.entity.SysUser;
import com.qingke.manager.service.impl.SysUserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * 登录接口集成测试（MockMvc）
 *
 * 用 MockMvc 模拟 HTTP 请求，测试完整登录流程。
 * 面试亮点：不启动浏览器就能测完整 HTTP 链路。
 */
@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SysUserServiceImpl sysUserService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void login_shouldReturnToken() throws Exception {
        // 先注册一个用户
        SysUser user = new SysUser();
        user.setUsername("mocklogin");
        user.setPassword("test123");
        sysUserService.register(user);

        // 登录
        String body = objectMapper.writeValueAsString(Map.of("username", "mocklogin", "password", "test123"));

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.token").exists())
                .andExpect(jsonPath("$.data.token").isString())
                .andExpect(jsonPath("$.data.user.username").value("mocklogin"));
    }

    @Test
    void login_shouldReturn401WithWrongPassword() throws Exception {
        SysUser user = new SysUser();
        user.setUsername("wrongpwd");
        user.setPassword("right");
        sysUserService.register(user);

        String body = objectMapper.writeValueAsString(Map.of("username", "wrongpwd", "password", "wrong"));

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(401))
                .andExpect(jsonPath("$.message").value("用户名或密码错误"));
    }

    @Test
    void register_shouldCreateUser() throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "username", "newreg",
                "password", "pass123",
                "realName", "新用户"
        ));

        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.username").value("newreg"));
    }

    @Test
    void register_shouldFailWithDuplicateUsername() throws Exception {
        SysUser user = new SysUser();
        user.setUsername("dupreg");
        user.setPassword("pass1");
        sysUserService.register(user);

        String body = objectMapper.writeValueAsString(Map.of("username", "dupreg", "password", "pass2"));

        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(400))
                .andExpect(jsonPath("$.message").value("用户名已存在"));
    }
}
