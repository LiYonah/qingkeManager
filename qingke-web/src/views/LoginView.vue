<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('admin')
const password = ref('123456')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/employees')
  } catch (e) {
    error.value = e.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="logo">
        <div class="logo-icon">🏢</div>
        <h1>轻客管家</h1>
      </div>
      <p class="subtitle">企业办公服务综合管理系统</p>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="username">用户名</label>
          <input id="username" v-model="username" type="text" placeholder="请输入用户名" autocomplete="username" />
        </div>
        <div class="field">
          <label for="password">密码</label>
          <input id="password" v-model="password" type="password" placeholder="请输入密码" autocomplete="current-password" />
        </div>
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #f0f4ff, #e8eeff 40%, #f4f5f7);
}
.login-card {
  background: #fff; border-radius: 16px; padding: 48px 40px 40px;
  max-width: 400px; width: calc(100% - 32px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.12);
  border: 1px solid #e8eaed;
}
.logo { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.logo-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; font-size: 20px; }
.logo h1 { font-size: 22px; font-weight: 700; color: #0f172a; }
.subtitle { font-size: 14px; color: #6b7280; margin-bottom: 32px; }
.field { margin-bottom: 20px; }
.field label { display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px; }
.field input {
  width: 100%; padding: 10px 14px; border: 1px solid #e8eaed; border-radius: 8px;
  font-size: 14px; font-family: var(--font); background: #fafbfc; transition: border 0.2s;
}
.field input:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-color: #2563eb; background: #fff; }
.btn {
  width: 100%; padding: 11px; background: #2563eb; color: #fff; border: none;
  border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px;
}
.btn:hover { background: #1d4ed8; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.error { margin-top: 12px; font-size: 13px; color: #ef4444; text-align: center; }
</style>
