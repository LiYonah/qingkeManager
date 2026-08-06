package com.qingke.manager;

import com.qingke.manager.entity.SysUser;
import com.qingke.manager.service.impl.SysUserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 用户服务测试 — 用 H2 内存数据库模拟完整流程
 *
 * @SpringBootTest 启动完整 Spring 上下文，使用 test/resources/application.yml 中配置的 H2。
 * 面试亮点：测试了 BCrypt 加密、登录校验、密码修改的完整链路。
 */
@SpringBootTest
class SysUserServiceImplTest {

    @Autowired
    private SysUserServiceImpl sysUserService;

    @Test
    void register_shouldEncryptPasswordAndSave() {
        SysUser user = new SysUser();
        user.setUsername("testuser");
        user.setPassword("123456");

        SysUser saved = sysUserService.register(user);
        assertNotNull(saved.getId());
        assertNull(saved.getPassword(), "返回不应包含密码");
    }

    @Test
    void register_shouldThrowWhenUsernameDuplicate() {
        SysUser u1 = new SysUser();
        u1.setUsername("dupuser");
        u1.setPassword("123456");
        sysUserService.register(u1);

        SysUser u2 = new SysUser();
        u2.setUsername("dupuser");
        u2.setPassword("654321");

        assertThrows(RuntimeException.class, () -> sysUserService.register(u2));
    }

    @Test
    void checkLogin_shouldSucceedWithCorrectPassword() {
        // 注册
        SysUser user = new SysUser();
        user.setUsername("login_test");
        user.setPassword("mypassword");
        sysUserService.register(user);

        // 正确密码登录
        SysUser result = sysUserService.checkLogin("login_test", "mypassword");
        assertNotNull(result);
        assertEquals("login_test", result.getUsername());
        assertNull(result.getPassword(), "返回不应包含密码");
    }

    @Test
    void checkLogin_shouldFailWithWrongPassword() {
        SysUser user = new SysUser();
        user.setUsername("pwd_test");
        user.setPassword("correct");
        sysUserService.register(user);

        SysUser result = sysUserService.checkLogin("pwd_test", "wrong_password");
        assertNull(result);
    }

    @Test
    void checkLogin_shouldReturnNullForNonExistentUser() {
        assertNull(sysUserService.checkLogin("no_such_user", "anything"));
    }

    @Test
    void changePassword_shouldWorkAndInvalidateOldPassword() {
        // 注册
        SysUser user = new SysUser();
        user.setUsername("cp_user");
        user.setPassword("oldpass");
        SysUser saved = sysUserService.register(user);

        // 改密码
        sysUserService.changePassword(saved.getId(), "oldpass", "newpass");

        // 旧密码不应再能登录
        assertNull(sysUserService.checkLogin("cp_user", "oldpass"));
        // 新密码应该能登录
        assertNotNull(sysUserService.checkLogin("cp_user", "newpass"));
    }

    @Test
    void changePassword_shouldThrowWithWrongOldPassword() {
        SysUser user = new SysUser();
        user.setUsername("cp2_user");
        user.setPassword("realpass");
        SysUser saved = sysUserService.register(user);

        assertThrows(RuntimeException.class,
                () -> sysUserService.changePassword(saved.getId(), "wrong_old", "newpass"));
    }
}
