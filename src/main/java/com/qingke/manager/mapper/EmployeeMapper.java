package com.qingke.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qingke.manager.entity.Employee;
import org.apache.ibatis.annotations.Mapper;

/**
 * 员工 Mapper — 数据访问层
 *
 * 和 CustomerMapper 一样，继承 BaseMapper 后自动获得全套 CRUD。
 * 只需要这一个空接口，MyBatis-Plus 运行时会自动生成实现类。
 */
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> {
}
