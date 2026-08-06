package com.qingke.manager.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.qingke.manager.common.R;
import com.qingke.manager.entity.Customer;
import com.qingke.manager.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 客户控制器 — 对外暴露 REST API
 *
 * 注解速查：
 * @RestController  = @Controller + @ResponseBody（返回值自动转为 JSON）
 * @RequestMapping   → 统一前缀，所有接口都在 /api/customers 下面
 * @GetMapping       → 处理 GET 请求（查询）
 * @PostMapping      → 处理 POST 请求（新增）
 * @PutMapping       → 处理 PUT 请求（修改）
 * @DeleteMapping    → 处理 DELETE 请求（删除）
 * @PathVariable     → 从 URL 路径中取参数，如 /api/customers/{id} 中的 id
 * @RequestParam     → 从 URL 问号后面取参数，如 ?page=1&size=10
 * @RequestBody      → 从 HTTP 请求体中取 JSON 数据
 * @Autowired        → 自动注入（Spring 会把 CustomerService 的实现类注入进来）
 */
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // ==================== 1. 新增客户 ====================
    @PostMapping
    public R<Customer> add(@RequestBody Customer customer) {
        customerService.save(customer);          // MyBatis-Plus 内置方法
        return R.ok(customer);
    }

    // ==================== 2. 删除客户（逻辑删除） ====================
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        customerService.removeById(id);          // 不会真删，会把 is_deleted 设为 1
        return R.ok();
    }

    // ==================== 3. 修改客户 ====================
    @PutMapping("/{id}")
    public R<Customer> update(@PathVariable Long id, @RequestBody Customer customer) {
        customer.setId(id);                      // 确保修改的是指定 ID 的记录
        customerService.updateById(customer);
        // 查回最新数据返回
        Customer updated = customerService.getById(id);
        return R.ok(updated);
    }

    // ==================== 4. 查询单个客户 ====================
    @GetMapping("/{id}")
    public R<Customer> getById(@PathVariable Long id) {
        Customer customer = customerService.getById(id);
        if (customer == null) {
            return R.fail(404, "客户不存在");
        }
        return R.ok(customer);
    }

    // ==================== 5. 分页查询客户列表 ====================
    @GetMapping
    public R<Page<Customer>> list(
            @RequestParam(defaultValue = "1")  int page,    // 页码，默认第1页
            @RequestParam(defaultValue = "10") int size,    // 每页条数，默认10条
            @RequestParam(required = false) String keyword  // 搜索关键词（可选）
    ) {
        // 构建查询条件
        QueryWrapper<Customer> wrapper = new QueryWrapper<>();
        if (keyword != null && !keyword.isBlank()) {
            // 姓名或公司包含关键词（模糊搜索）
            wrapper.like("name", keyword)
                   .or()
                   .like("company", keyword);
        }
        // 按创建时间降序排列（最新的在前）
        wrapper.orderByDesc("create_time");

        // 执行分页查询
        Page<Customer> result = customerService.page(new Page<>(page, size), wrapper);
        return R.ok(result);
    }
}
