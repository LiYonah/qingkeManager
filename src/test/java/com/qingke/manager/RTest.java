package com.qingke.manager;

import com.qingke.manager.common.R;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * R 类单元测试
 *
 * 最简单的测试——不依赖 Spring，纯 Java 对象验证。
 * 面试时说"我写了测试"，这部分能体现测试基本功。
 */
class RTest {

    @Test
    void ok_shouldReturnSuccess() {
        R<String> result = R.ok("hello");
        assertEquals(200, result.getCode());
        assertEquals("操作成功", result.getMessage());
        assertEquals("hello", result.getData());
    }

    @Test
    void ok_shouldReturnNullDataWhenNoArg() {
        R<Void> result = R.ok();
        assertEquals(200, result.getCode());
        assertNull(result.getData());
    }

    @Test
    void fail_shouldReturnErrorWithMessage() {
        R<Void> result = R.fail(404, "资源不存在");
        assertEquals(404, result.getCode());
        assertEquals("资源不存在", result.getMessage());
        assertNull(result.getData());
    }

    @Test
    void fail_defaultCode_shouldBe500() {
        R<Void> result = R.fail("服务器异常");
        assertEquals(500, result.getCode());
    }
}
