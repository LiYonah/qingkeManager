package com.qingke.manager.aop;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.qingke.manager.annotation.OperationLog;
import com.qingke.manager.service.OperationLogService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class OperationLogAspect {

    @Autowired
    private OperationLogService logService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());  // 支持 LocalDateTime 序列化

    @Around("@annotation(logAnnotation)")
    public Object around(ProceedingJoinPoint joinPoint, OperationLog logAnnotation) throws Throwable {
        long start = System.currentTimeMillis();

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getDeclaringTypeName() + "." + signature.getName();
        String params = safeToJson(joinPoint.getArgs());

        Object result = null;
        try {
            result = joinPoint.proceed();
            return result;
        } finally {
            try {
                long costTime = System.currentTimeMillis() - start;

                com.qingke.manager.entity.OperationLog log = new com.qingke.manager.entity.OperationLog();
                log.setModule(logAnnotation.module());
                log.setAction(logAnnotation.action());
                log.setMethod(methodName);
                log.setParams(truncate(params, 1000));
                log.setResult(truncate(safeToJson(result), 500));
                log.setCostTime(costTime);
                log.setCreateTime(LocalDateTime.now());

                logService.save(log);
            } catch (Exception e) {
                // 日志记录失败不影响业务
                e.printStackTrace();
            }
        }
    }

    private String safeToJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "序列化失败: " + e.getMessage();
        }
    }

    private String truncate(String str, int maxLen) {
        if (str == null) return null;
        if (str.length() <= maxLen) return str;
        return str.substring(0, maxLen) + "...";
    }
}
