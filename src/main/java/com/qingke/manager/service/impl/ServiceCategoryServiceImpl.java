package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.ServiceCategory;
import com.qingke.manager.mapper.ServiceCategoryMapper;
import com.qingke.manager.service.ServiceCategoryService;
import org.springframework.stereotype.Service;

@Service
public class ServiceCategoryServiceImpl extends ServiceImpl<ServiceCategoryMapper, ServiceCategory> implements ServiceCategoryService {
}
