package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.OrderInfo;
import com.qingke.manager.mapper.OrderInfoMapper;
import com.qingke.manager.service.OrderInfoService;
import org.springframework.stereotype.Service;

@Service
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements OrderInfoService {
}
