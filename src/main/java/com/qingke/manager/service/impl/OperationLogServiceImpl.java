package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.OperationLog;
import com.qingke.manager.mapper.OperationLogMapper;
import com.qingke.manager.service.OperationLogService;
import org.springframework.stereotype.Service;

@Service
public class OperationLogServiceImpl extends ServiceImpl<OperationLogMapper, OperationLog> implements OperationLogService {
}
