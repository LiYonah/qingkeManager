package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单实体 — 业务核心
 *
 * 关联关系：
 *   customer_id → 客户表的 id（谁下单）
 *   service_category_id → 服务分类表的 id（下什么服务）
 *   employee_id → 员工表的 id（派给谁做，可为空）
 *
 * 面试要点：amount 是冗余存储。
 *   为什么不在查询时 JOIN 服务分类表拿价格？
 *   因为服务价格会变——今天的"保洁服务"2000元，下个月涨价到2500元。
 *   如果订单不存金额，以后查历史订单时价格就不对了。
 *   所以：下单时把当时的金额冗余存一份，保证历史准确性。
 */
@Data
@TableName("order_info")
public class OrderInfo {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;

    @JsonProperty(access = Access.READ_ONLY)
    private String orderNo;          // 订单编号（自动生成）

    @NotNull(message = "客户ID不能为空")
    private Long customerId;         // 关联客户

    @NotNull(message = "服务分类ID不能为空")
    private Long serviceCategoryId;  // 关联服务分类

    private Long employeeId;         // 关联员工（可为空，派单时再填）

    @NotNull(message = "订单金额不能为空")
    private BigDecimal amount;       // 订单金额（冗余存储）

    private Integer status;          // 0待处理 1进行中 2已完成 3已取消

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
