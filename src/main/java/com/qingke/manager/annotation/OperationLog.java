package com.qingke.manager.annotation;

import java.lang.annotation.*;

/**
 * 操作日志注解 — 标记哪些方法需要自动记录日志
 *
 * 使用示例：
 *   @OperationLog(module = "员工管理", action = "新增员工")
 *   public R<Employee> add(...) { ... }
 *
 * 加了这个注解的方法，执行时会被 AOP 切面拦截，自动记录操作日志。
 */
@Target(ElementType.METHOD)          // 只能用在方法上
@Retention(RetentionPolicy.RUNTIME)  // 运行时保留，AOP 才能在运行时读取
@Documented                          // 生成文档时包含这个注解
public @interface OperationLog {
    String module();   // 操作模块
    String action();   // 操作描述
}
