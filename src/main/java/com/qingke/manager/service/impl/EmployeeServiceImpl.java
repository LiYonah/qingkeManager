package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.Employee;
import com.qingke.manager.mapper.EmployeeMapper;
import com.qingke.manager.service.EmployeeService;
import org.springframework.stereotype.Service;

/**
 * 员工服务实现类
 */
@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee> implements EmployeeService {
}
