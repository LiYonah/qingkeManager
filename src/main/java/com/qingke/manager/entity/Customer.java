package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 客户实体类 — 对应数据库 customer 表
 */
@Data
@TableName("customer")
public class Customer {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)  // 只返回给前端，不接收前端传值
    private Long id;

    private String name;

    private String phone;

    private String email;

    private String company;

    private String address;

    private String remark;

    @TableLogic
    @JsonProperty(access = Access.READ_ONLY)  // 逻辑删除由系统管理，前端不传
    private Integer isDeleted;

    @TableField(fill = FieldFill.INSERT)
    @JsonProperty(access = Access.READ_ONLY)  // 创建时间由数据库生成
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JsonProperty(access = Access.READ_ONLY)  // 更新时间由数据库生成
    private LocalDateTime updateTime;
}
