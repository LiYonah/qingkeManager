package com.qingke.manager.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qingke.manager.entity.SysUser;

public interface SysUserService extends IService<SysUser> {
    /**
     * 注册新用户（密码自动 BCrypt 加密）
     */
    SysUser register(SysUser user);
}
