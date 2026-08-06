package com.qingke.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qingke.manager.entity.Customer;
import org.apache.ibatis.annotations.Mapper;

/**
 * 客户 Mapper — 数据访问层
 *
 * 为什么只要定义一个空接口就够了？
 * 因为继承了 BaseMapper<Customer>，MyBatis-Plus 会在运行时自动生成实现类，
 * 提供以下内置方法（无需自己写 SQL）：
 *
 *   insert(customer)           → 插入一条客户记录
 *   deleteById(id)             → 按 ID 删除（逻辑删除时自动变为 update）
 *   updateById(customer)       → 按 ID 更新
 *   selectById(id)             → 按 ID 查询单条
 *   selectList(wrapper)        → 条件查询列表
 *   selectPage(page, wrapper)  → 分页条件查询
 *
 * 相当于你什么都没写，就已经有了完整的 CRUD 能力。
 */
@Mapper
public interface CustomerMapper extends BaseMapper<Customer> {
    // 基础 CRUD 全部继承自 BaseMapper
    // 如果有特殊查询需求，可以在这里添加自定义方法
}
