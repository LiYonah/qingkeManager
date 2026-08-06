package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 员工实体类 — 对应数据库 employee 表
 *
 * 新知识点：用到了 BigDecimal（精确的金额类型）和 LocalDate（纯日期）。
 * 永远不要用 float/double 表示金额，会有精度问题。
 */
@Data
@TableName("employee")
public class Employee {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;

    @NotBlank(message = "姓名不能为空")
    private String name;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @Email(message = "邮箱格式不正确")
    private String email;

    @NotBlank(message = "部门不能为空")
    private String department;          // 所属部门

    @NotBlank(message = "职位不能为空")
    private String position;            // 职位

    @NotNull(message = "月薪不能为空")
    @DecimalMin(value = "0.01", message = "月薪必须大于0")
    private BigDecimal salary;          // 月薪（BigDecimal = 精确金额）

    private LocalDate hireDate;         // 入职日期（只含日期，不含时间）

    @Min(value = 0, message = "状态只能为0或1")
    @Max(value = 1, message = "状态只能为0或1")
    private Integer status;             // 1-在职，0-离职

    @Size(max = 200, message = "备注最多200个字")
    private String remark;

    @TableLogic
    @JsonProperty(access = Access.READ_ONLY)
    private Integer isDeleted;

    @TableField(fill = FieldFill.INSERT)
    @JsonProperty(access = Access.READ_ONLY)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JsonProperty(access = Access.READ_ONLY)
    private LocalDateTime updateTime;
}
