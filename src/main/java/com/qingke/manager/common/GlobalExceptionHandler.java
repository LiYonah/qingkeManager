package com.qingke.manager.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

/**
 * 全局异常处理器
 *
 * 通俗理解：它是整个项目的"纠错员"。
 * 任何一个 Controller 抛出异常，都会先被这里拦截，
 * 然后把技术性的报错信息翻译成人能看懂的话，返回给前端。
 *
 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody
 * 作用：拦截所有 Controller 抛出的异常，返回 JSON 格式的错误信息。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 1. 处理参数校验失败的异常
     *
     * 场景：前端传来的 JSON 不符合校验规则时触发。
     * 比如：name 为空、salary 为负数、email 格式不对。
     *
     * Spring 检测到校验失败时会抛出 MethodArgumentNotValidException，
     * 这个方法专门拦截它。
     *
     * @param ex 异常对象，里面包含所有校验失败的字段和原因
     * @return R 统一格式的错误响应
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // HTTP 400
    public R<Void> handleValidation(MethodArgumentNotValidException ex) {
        // 从异常中提取所有校验失败信息，拼成一句话
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return R.fail(400, message);
    }

    /**
     * 2. 处理请求体无法解析的异常
     *
     * 场景：前端没传 Content-Type: application/json，
     * 或者 JSON 格式写错了（多了一个逗号、少了引号等）。
     *
     * 你之前遇到的 "Required request body is missing" 就是被这个拦截的。
     * 但之前没有这个处理器，所以返回的是 Spring 默认的错误页面。
     * 有了它，就会返回我们自己的统一格式。
     */
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public R<Void> handleMessageNotReadable(org.springframework.http.converter.HttpMessageNotReadableException ex) {
        return R.fail(400, "请求体格式错误：请检查 JSON 语法是否正确，以及 Content-Type 是否为 application/json");
    }

    /**
     * 3. 兜底：处理所有上面没拦截到的异常
     *
     * 场景：运行时出现的未预期错误（空指针、数据库连接失败等）。
     * 有它在，即使系统崩了，前端也能收到一个 JSON 格式的错误，
     * 而不是一个丑陋的 500 错误页面。
     *
     * 实际项目中，这里应该打印日志方便排查问题。
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)  // HTTP 500
    public R<Void> handleOther(Exception ex) {
        // 开发阶段把真实错误信息返回，方便调试
        // 上线后应该改成模糊提示，避免暴露内部信息
        return R.fail(500, "服务器内部错误: " + ex.getMessage());
    }
}
