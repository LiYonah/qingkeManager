import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/', redirect: '/employees' },
  { path: '/employees', name: 'Employees', component: () => import('../views/EmployeeView.vue'), meta: { title: '员工管理' } },
  { path: '/customers', name: 'Customers', component: () => import('../views/CustomerView.vue'), meta: { title: '客户管理' } },
  { path: '/services', name: 'Services', component: () => import('../views/ServiceView.vue'), meta: { title: '服务分类' } },
  { path: '/orders', name: 'Orders', component: () => import('../views/OrderView.vue'), meta: { title: '订单管理' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：未登录跳回登录页
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.path !== '/login' && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
