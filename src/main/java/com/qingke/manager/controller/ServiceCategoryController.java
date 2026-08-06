package com.qingke.manager.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.qingke.manager.common.R;
import com.qingke.manager.entity.ServiceCategory;
import com.qingke.manager.service.ServiceCategoryService;
import com.qingke.manager.annotation.OperationLog;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-categories")
public class ServiceCategoryController {

    @Autowired
    private ServiceCategoryService serviceCategoryService;

    // 1. 新增
    @OperationLog(module = "服务分类管理", action = "新增服务分类")
    @PostMapping
    public R<ServiceCategory> add(@Valid @RequestBody ServiceCategory category) {
        serviceCategoryService.save(category);
        return R.ok(category);
    }

    // 2. 删除
    @OperationLog(module = "服务分类管理", action = "删除服务分类")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        serviceCategoryService.removeById(id);
        return R.ok();
    }

    // 3. 修改
    @OperationLog(module = "服务分类管理", action = "修改服务分类")
    @PutMapping("/{id}")
    public R<ServiceCategory> update(@PathVariable Long id, @Valid @RequestBody ServiceCategory category) {
        category.setId(id);
        serviceCategoryService.updateById(category);
        ServiceCategory updated = serviceCategoryService.getById(id);
        return R.ok(updated);
    }

    // 4. 查单个
    @GetMapping("/{id}")
    public R<ServiceCategory> getById(@PathVariable Long id) {
        ServiceCategory category = serviceCategoryService.getById(id);
        if (category == null) {
            return R.fail(404, "服务分类不存在");
        }
        return R.ok(category);
    }

    // 5. 分页 + 关键词搜索
    @GetMapping
    public R<Page<ServiceCategory>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {
        QueryWrapper<ServiceCategory> wrapper = new QueryWrapper<>();
        if (keyword != null && !keyword.isBlank()) {
            wrapper.like("name", keyword);
        }
        wrapper.orderByDesc("create_time");
        Page<ServiceCategory> result = serviceCategoryService.page(new Page<>(page, size), wrapper);
        return R.ok(result);
    }
}

