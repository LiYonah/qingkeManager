package com.qingke.manager.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.qingke.manager.common.R;
import com.qingke.manager.entity.Employee;
import com.qingke.manager.service.EmployeeService;
import com.qingke.manager.annotation.OperationLog;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 员工控制器
 *
 * 相比 CustomerController 新增了：
 *   - 组合筛选：同时按部门 + 在职状态 + 关键词搜索
 *   - 条件判断：用 isNotBlank() 判断参数是否有值，有值才加筛选条件
 */
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ==================== 1. 新增员工 ====================
    @OperationLog(module = "员工管理", action = "新增员工")
    @PostMapping
    public R<Employee> add(@Valid @RequestBody Employee employee) {
        employeeService.save(employee);
        return R.ok(employee);
    }

    // ==================== 2. 删除员工（逻辑删除） ====================
    @OperationLog(module = "员工管理", action = "删除员工")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        employeeService.removeById(id);
        return R.ok();
    }

    // ==================== 3. 修改员工 ====================
    @OperationLog(module = "员工管理", action = "修改员工")
    @PutMapping("/{id}")
    public R<Employee> update(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        employee.setId(id);
        employeeService.updateById(employee);
        Employee updated = employeeService.getById(id);
        return R.ok(updated);
    }

    // ==================== 4. 查询单个员工 ====================
    @GetMapping("/{id}")
    public R<Employee> getById(@PathVariable Long id) {
        Employee employee = employeeService.getById(id);
        if (employee == null) {
            return R.fail(404, "员工不存在");
        }
        return R.ok(employee);
    }

    // ==================== 5. 分页 + 多条件筛选 ====================
    @GetMapping
    public R<Page<Employee>> list(
            @RequestParam(defaultValue = "1")   int page,       // 页码
            @RequestParam(defaultValue = "10")  int size,       // 每页条数
            @RequestParam(required = false)     String keyword, // 搜索（姓名）
            @RequestParam(required = false)     String department, // 部门筛选
            @RequestParam(required = false)     Integer status    // 状态筛选：1-在职，0-离职
    ) {
        QueryWrapper<Employee> wrapper = new QueryWrapper<>();

        // 姓名模糊搜索
        if (keyword != null && !keyword.isBlank()) {
            wrapper.like("name", keyword);
        }

        // 部门精确筛选
        if (department != null && !department.isBlank()) {
            wrapper.eq("department", department);
        }

        // 在职状态筛选
        if (status != null) {
            wrapper.eq("status", status);
        }

        wrapper.orderByDesc("create_time");

        Page<Employee> result = employeeService.page(new Page<>(page, size), wrapper);
        return R.ok(result);
    }

    // ==================== 6. 获取所有部门列表（供下拉框使用） ====================
    @GetMapping("/departments")
    public R<java.util.List<String>> departments() {
        // 用 DISTINCT 查出现有的所有部门名
        QueryWrapper<Employee> wrapper = new QueryWrapper<>();
        wrapper.select("DISTINCT department").isNotNull("department").orderByAsc("department");
        java.util.List<Employee> list = employeeService.list(wrapper);
        java.util.List<String> depts = list.stream()
                .map(Employee::getDepartment)
                .toList();
        return R.ok(depts);
    }
}
