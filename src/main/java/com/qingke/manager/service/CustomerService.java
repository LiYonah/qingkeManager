package com.qingke.manager.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qingke.manager.entity.Customer;

/**
 * 客户服务接口
 *
 * 继承 IService<Customer> 后自动拥有和 BaseMapper 配套的内置方法：
 *   save(customer) / saveBatch(list)          → 新增（单条/批量）
 *   removeById(id) / removeBatchByIds(ids)    → 删除
 *   updateById(customer) / updateBatchById(list) → 更新
 *   getById(id) / listByIds(ids)              → 按ID查询
 *   list() / list(wrapper)                    → 列表查询
 *   page(page, wrapper)                       → 分页查询
 *
 * 需要自定义复杂业务逻辑时，在本接口中声明方法，在 impl 中实现。
 */
public interface CustomerService extends IService<Customer> {
    // 基础 CRUD 全部继承自 IService
    // 后续复杂业务方法在这里声明
}
