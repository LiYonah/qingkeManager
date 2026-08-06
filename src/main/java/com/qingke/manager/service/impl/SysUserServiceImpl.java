package com.qingke.manager.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qingke.manager.entity.SysUser;
import com.qingke.manager.mapper.SysUserMapper;
import com.qingke.manager.service.SysUserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 系统用户服务实现
 *
 * BCryptPasswordEncoder 是业内最主流的密码加密方案。
 * 同样的密码每次加密结果不同（盐值随机），但校验时能正确匹配。
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public SysUser register(SysUser user) {
        // 先查用户名是否已存在
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", user.getUsername());
        if (baseMapper.selectCount(wrapper) > 0) {
            throw new RuntimeException("用户名已存在");
        }

        // BCrypt 加密后存储（绝不明文存密码）
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 默认角色
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        if (user.getStatus() == null) {
            user.setStatus(1);
        }

        baseMapper.insert(user);
        // 插入后清空密码字段，不返回给前端
        user.setPassword(null);
        return user;
    }

    /**
     * 校验密码（登录时调用）
     * @return 校验成功返回用户对象，失败返回 null
     */
    public SysUser checkLogin(String username, String rawPassword) {
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        SysUser user = baseMapper.selectOne(wrapper);

        if (user == null) return null;
        if (user.getStatus() != null && user.getStatus() == 0) return null;

        // BCrypt 校验：用 matches() 对比明文和密文
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            user.setPassword(null); // 不暴露密码
            return user;
        }
        return null;
    }

    /**
     * 修改密码
     *
     * @param userId      用户 ID
     * @param oldPassword 旧密码（明文）
     * @param newPassword 新密码（明文）
     * @throws RuntimeException 旧密码错误时抛出
     */
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        SysUser user = baseMapper.selectById(userId);
        if (user == null) throw new RuntimeException("用户不存在");

        // 验证旧密码
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("旧密码错误");
        }

        // BCrypt 加密新密码
        user.setPassword(passwordEncoder.encode(newPassword));
        baseMapper.updateById(user);
    }
}
