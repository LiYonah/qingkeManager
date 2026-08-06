package com.qingke.manager.controller;

import com.alibaba.excel.EasyExcel;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.qingke.manager.annotation.OperationLog;
import com.qingke.manager.common.R;
import com.qingke.manager.entity.OrderInfo;
import com.qingke.manager.service.OrderInfoService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 订单控制器 — 业务核心
 *
 * 订单模块把客户、服务分类、员工三个模块关联起来：
 *   客户(customer_id) + 服务(service_category_id) + 金额(amount) → 订单
 *   后续派单时关联员工(employee_id)
 *
 * 筛选支持：按状态、按客户ID、按服务ID
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderInfoService orderService;

    /**
     * 1. 新增订单
     *
     * 自动生成订单编号，格式：QD + 年月日时分秒 + 随机数
     * 例：QD20260806235930123
     */
    @OperationLog(module = "订单管理", action = "新增订单")
    @PostMapping
    public R<OrderInfo> add(@Valid @RequestBody OrderInfo order) {
        order.setOrderNo(generateOrderNo());
        if (order.getStatus() == null) {
            order.setStatus(0); // 默认：待处理
        }
        orderService.save(order);
        return R.ok(order);
    }

    @OperationLog(module = "订单管理", action = "删除订单")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        orderService.removeById(id);
        return R.ok();
    }

    @OperationLog(module = "订单管理", action = "修改订单")
    @PutMapping("/{id}")
    public R<OrderInfo> update(@PathVariable Long id, @Valid @RequestBody OrderInfo order) {
        order.setId(id);
        orderService.updateById(order);
        OrderInfo updated = orderService.getById(id);
        return R.ok(updated);
    }

    @GetMapping("/{id}")
    public R<OrderInfo> getById(@PathVariable Long id) {
        OrderInfo order = orderService.getById(id);
        if (order == null) {
            return R.fail(404, "订单不存在");
        }
        return R.ok(order);
    }

    /**
     * 5. 分页 + 多条件筛选
     */
    @GetMapping
    public R<Page<OrderInfo>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long serviceCategoryId,
            @RequestParam(required = false) Integer status
    ) {
        QueryWrapper<OrderInfo> wrapper = new QueryWrapper<>();

        if (customerId != null) {
            wrapper.eq("customer_id", customerId);
        }
        if (serviceCategoryId != null) {
            wrapper.eq("service_category_id", serviceCategoryId);
        }
        if (status != null) {
            wrapper.eq("status", status);
        }

        wrapper.orderByDesc("create_time");
        Page<OrderInfo> result = orderService.page(new Page<>(page, size), wrapper);
        return R.ok(result);
    }

    /**
     * 6. 导出订单 Excel
     *
     * EasyExcel 逐行写数据，不把全部数据加载到内存，大数据量也不怕 OOM。
     * 浏览器访问：GET /api/orders/export
     * 直接下载 orders.xlsx 文件。
     */
    @GetMapping("/export")
    public void export(HttpServletResponse response) throws IOException {
        List<OrderInfo> list = orderService.list(new QueryWrapper<OrderInfo>().orderByDesc("create_time"));

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("UTF-8");
        String fileName = URLEncoder.encode("订单数据", "UTF-8").replace("+", "%20");
        response.setHeader("Content-Disposition", "attachment;filename*=UTF-8''" + fileName + ".xlsx");

        EasyExcel.write(response.getOutputStream(), OrderInfo.class).sheet("订单列表").doWrite(list);
    }

    /**
     * 生成订单编号：QD + 年月日时分秒 + 3位随机数
     */
    private String generateOrderNo() {
        String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        int random = (int) (Math.random() * 1000);
        return "QD" + time + String.format("%03d", random);
    }
}
