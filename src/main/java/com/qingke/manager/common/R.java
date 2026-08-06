package com.qingke.manager.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 统一返回结果类
 *
 * 所有 Controller 接口都用 R 包装返回数据，让前端统一处理。
 *
 * 格式示例：
 * 成功 → { "code": 200, "message": "操作成功", "data": { ... } }
 * 失败 → { "code": 500, "message": "服务器异常", "data": null }
 *
 * 为什么不用 String 或直接返回对象？
 * 统一格式的好处：
 *   1. 前端只需判断 code === 200 就知道是否成功
 *   2. 错误信息统一放 message 里，前端直接展示
 *   3. 真实数据统一放 data 里，类型固定，前端好解析
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class R<T> {

    /** 状态码：200 成功，其他表示失败 */
    private int code;

    /** 提示信息：成功时 = "操作成功"，失败时 = 具体错误原因 */
    private String message;

    /** 返回数据：可以是单个对象、列表、null */
    private T data;

    // ==================== 快捷静态工厂方法 ====================

    /** 成功（无数据） */
    public static <T> R<T> ok() {
        return new R<>(200, "操作成功", null);
    }

    /** 成功（带数据） */
    public static <T> R<T> ok(T data) {
        return new R<>(200, "操作成功", data);
    }

    /** 成功（自定义消息 + 数据） */
    public static <T> R<T> ok(String message, T data) {
        return new R<>(200, message, data);
    }

    /** 失败 */
    public static <T> R<T> fail(int code, String message) {
        return new R<>(code, message, null);
    }

    /** 失败（默认 500） */
    public static <T> R<T> fail(String message) {
        return new R<>(500, message, null);
    }
}
