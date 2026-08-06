<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const navItems = [
  { path: '/employees', icon: '👥', label: '员工管理' },
  { path: '/customers', icon: '🏢', label: '客户管理' },
  { path: '/services', icon: '🛠️', label: '服务分类' },
  { path: '/orders', icon: '📋', label: '订单管理' }
]

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar">
    <div class="brand" @click="router.push('/')">
      <div class="brand-icon">🏢</div>
      <h2>轻客管家</h2>
    </div>
    <nav class="nav">
      <button
        v-for="item in navItems"
        :key="item.path"
        :class="['nav-item', { active: route.path === item.path }]"
        @click="router.push(item.path)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        {{ item.label }}
      </button>
    </nav>
    <div class="footer">
      <div class="user-info">
        <div class="avatar">{{ auth.displayName.charAt(0) }}</div>
        <div>
          <div class="name">{{ auth.displayName }}</div>
          <div class="role">{{ auth.isAdmin ? '管理员' : '普通用户' }}</div>
        </div>
      </div>
      <button class="logout-btn" @click="logout">↩</button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 232px; background: var(--c-sidebar); display: flex; flex-direction: column;
  color: var(--c-sidebar-text); flex-shrink: 0;
}
.brand {
  display: flex; align-items: center; gap: 10px; padding: 20px 20px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer;
}
.brand-icon { width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6, #2563eb); display: flex; align-items: center; justify-content: center; font-size: 17px; }
.brand h2 { font-size: 17px; font-weight: 700; color: #f1f5f9; }
.nav { flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 2px; }
.nav-item {
  display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px;
  border: none; background: none; color: var(--c-sidebar-text); font-size: 14px;
  cursor: pointer; font-family: var(--font); transition: background 0.15s, color 0.15s;
  text-align: left;
}
.nav-item:hover { background: #1e293b; color: #e2e8f0; }
.nav-item.active { background: #1e3a5f; color: #e2e8f0; }
.nav-icon { font-size: 16px; width: 20px; }
.footer {
  padding: 12px 20px 16px; border-top: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 8px;
}
.user-info { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
.avatar {
  width: 30px; height: 30px; border-radius: 6px; background: #334155;
  display: flex; align-items: center; justify-content: center; color: #cbd5e1;
  font-size: 13px; font-weight: 600; flex-shrink: 0;
}
.name { font-size: 13px; color: #e2e8f0; }
.role { font-size: 11px; color: #94a3b8; }
.logout-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; }
.logout-btn:hover { color: #f87171; }
</style>
