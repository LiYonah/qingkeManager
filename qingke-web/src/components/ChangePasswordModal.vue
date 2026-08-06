<script setup>
import { ref } from 'vue'
import { changePasswordApi } from '../api/auth'

const emit = defineEmits(['done'])

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!oldPassword.value || !newPassword.value) { error.value = '请填写所有字段'; return }
  if (newPassword.value.length < 6) { error.value = '新密码至少6位'; return }
  if (newPassword.value !== confirmPassword.value) { error.value = '两次密码输入不一致'; return }

  loading.value = true
  try {
    await changePasswordApi(oldPassword.value, newPassword.value)
    emit('done')
  } catch (e) {
    error.value = e.message || '修改失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="overlay">
    <div class="card">
      <div class="card-header">
        <div class="shield">🔐</div>
        <h3>修改初始密码</h3>
        <p>为保证安全，请立即修改默认密码</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="body">
          <div class="field">
            <label>当前密码</label>
            <input v-model="oldPassword" type="password" placeholder="输入当前密码" />
          </div>
          <div class="field">
            <label>新密码</label>
            <input v-model="newPassword" type="password" placeholder="至少6位" />
          </div>
          <div class="field">
            <label>确认新密码</label>
            <input v-model="confirmPassword" type="password" placeholder="再次输入新密码" />
          </div>
          <p v-if="error" class="err">{{ error }}</p>
        </div>
        <div class="footer">
          <button type="submit" class="btn-save" :disabled="loading">{{ loading ? '修改中...' : '确认修改' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.overlay { position:fixed; inset:0; background:rgba(15,23,42,0.7); display:flex; align-items:center; justify-content:center; z-index:9999; }
.card { background:#fff; border-radius:16px; width:420px; max-width:calc(100% - 32px); box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); overflow:hidden; }
.card-header { text-align:center; padding:32px 32px 8px; }
.shield { font-size:40px; margin-bottom:12px; }
.card-header h3 { font-size:20px; font-weight:700; color:#0f172a; }
.card-header p { font-size:13px; color:#6b7280; margin-top:6px; }
.body { padding:20px 32px; display:flex; flex-direction:column; gap:14px; }
.field label { display:block; font-size:13px; font-weight:500; color:#374151; margin-bottom:4px; }
.field input { width:100%; padding:10px 12px; border:1px solid #e8eaed; border-radius:8px; font-size:14px; font-family:var(--font); }
.field input:focus-visible { outline:2px solid #2563eb; outline-offset:2px; border-color:#2563eb; }
.err { font-size:13px; color:#ef4444; text-align:center; }
.footer { padding:16px 32px 32px; }
.btn-save { width:100%; padding:11px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; }
.btn-save:hover { background:#1d4ed8; }
.btn-save:disabled { opacity:0.6; cursor:not-allowed; }
</style>
