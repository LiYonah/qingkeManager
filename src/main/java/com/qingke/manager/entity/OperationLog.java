package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("operation_log")
public class OperationLog {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;

    private String module;       // 操作模块（如 "员工管理"）
    private String action;       // 操作描述（如 "新增员工"）
    private String method;       // 方法全名（com.qingke...add）
    private String params;       // 请求参数 JSON
    private String result;       // 返回结果 JSON（截取前 500 字）
    private Long costTime;       // 耗时（毫秒）

    @JsonProperty(access = Access.READ_ONLY)
    private LocalDateTime createTime;
}
