package com.qingke.manager.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("service_category")
public class ServiceCategory {

    @TableId(type = IdType.AUTO)
    @JsonProperty(access = Access.READ_ONLY)
    private Long id;

    @NotBlank(message = "服务分类名称不能为空")
    private String name;

    @Size(max = 200, message = "描述最多200个字")
    private String description;

    @NotNull(message = "价格不能为空")
    @DecimalMin(value = "0.01", message = "价格必须大于0")
    private BigDecimal price;

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
