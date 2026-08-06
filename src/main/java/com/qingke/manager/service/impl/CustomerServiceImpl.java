package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.Customer;
import com.qingke.manager.mapper.CustomerMapper;
import com.qingke.manager.service.CustomerService;
import org.springframework.stereotype.Service;

/**
 * 客户服务实现类
 *
 * 继承 ServiceImpl<Mapper, Entity> 后：
 *   - MyBatis-Plus 自动把 Mapper 和 Service 对接好
 *   - 所有 IService 定义的方法都自动实现
 *
 * @Service 注解告诉 Spring："这是一个 Service 层 Bean，需要时自动注入"
 */
@Service
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements CustomerService {
    // 基础 CRUD 全部自动实现
    // 后续复杂业务方法在这里编写
}
