<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import Sidebar from './components/Sidebar.vue'
import ChangePasswordModal from './components/ChangePasswordModal.vue'

const auth = useAuthStore()
const showPasswordModal = ref(false)

// 登录后弹出修改密码提示（只弹一次，改过就不再弹）
watch(() => auth.isLoggedIn, (v) => {
  if (v && !localStorage.getItem('pwdChanged')) showPasswordModal.value = true
})

function onPasswordDone() {
  localStorage.setItem('pwdChanged', '1')
  showPasswordModal.value = false
}
</script>

<template>
  <div v-if="!auth.isLoggedIn" class="app-login">
    <router-view />
  </div>
  <div v-else class="app-layout">
    <Sidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
  <ChangePasswordModal v-if="showPasswordModal" @done="onPasswordDone" />
</template>

<style scoped>
.app-layout { display: flex; height: 100vh; }
.app-main { flex: 1; padding: 32px 36px; overflow-y: auto; background: var(--c-bg); }
</style>
