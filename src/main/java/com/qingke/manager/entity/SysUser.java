package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统用户实体
 *
 * 密码使用 BCrypt 加密存储，不可逆。
 * 即使数据库被拖库，攻击者也无法反推出明文密码。
 */
@Data
@TableName("sys_user")
public class SysUser {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;

    private String username;    // 登录用户名
    private String password;    // BCrypt 加密后的密码
    private String realName;    // 真实姓名
    private String role;        // 角色：ADMIN / USER
    private Integer status;     // 1-启用  0-禁用

    @TableField(fill = FieldFill.INSERT)
    @JsonProperty(access = Access.READ_ONLY)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JsonProperty(access = Access.READ_ONLY)
    private LocalDateTime updateTime;
}
