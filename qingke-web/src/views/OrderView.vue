<script setup>
import { ref, onMounted, watch } from 'vue'
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/order'
import FormModal from '../components/FormModal.vue'

const loading = ref(false); const list = ref([]); const total = ref(0)
const page = ref(1); const status = ref(null)
const modalVisible = ref(false); const modalTitle = ref('')
const editId = ref(null); const modalInitial = ref(null)

const modalFields = [
  { key:'customerId', label:'客户ID', type:'number', required:true },
  { key:'serviceCategoryId', label:'服务ID', type:'number', required:true },
  { key:'employeeId', label:'员工ID', type:'number' },
  { key:'amount', label:'金额', type:'number', required:true },
  { key:'status', label:'状态', type:'select', options:[{value:0,label:'待处理'},{value:1,label:'进行中'},{value:2,label:'已完成'},{value:3,label:'已取消'}] },
  { key:'remark', label:'备注' }
]

async function load() {
  loading.value = true
  try {
    const params = { page:page.value, size:10 }
    if (status.value !== null && status.value !== '') params.status = status.value
    const res = await getOrders(params)
    list.value = res.data.records; total.value = res.data.total
  } finally { loading.value = false }
}
function filter() { page.value = 1; load() }
onMounted(load); watch(page, load)

function openCreate() { editId.value = null; modalTitle.value = '新增订单'; modalInitial.value = null; modalVisible.value = true }
function openEdit(row) { editId.value = row.id; modalTitle.value = '编辑订单'; modalInitial.value = row; modalVisible.value = true }
async function handleDelete(row) { if (!confirm('确定删除订单 '+row.orderNo+' 吗？')) return; await deleteOrder(row.id); load() }
async function handleSubmit(data) {
  if (data.customerId) data.customerId = Number(data.customerId)
  if (data.serviceCategoryId) data.serviceCategoryId = Number(data.serviceCategoryId)
  if (data.employeeId) data.employeeId = Number(data.employeeId)
  if (data.amount) data.amount = Number(data.amount)
  if (data.status !== null && data.status !== '') data.status = Number(data.status)
  editId.value ? await updateOrder(editId.value, data) : await createOrder(data)
  modalVisible.value = false; load()
}

const statusMap = {0:'待处理',1:'进行中',2:'已完成',3:'已取消'}
const statusClass = (s) => { const m={0:'badge-warning',1:'badge-info',2:'badge-success',3:'badge-neutral'}; return m[s]||'badge-neutral' }
</script>

<template>
  <div>
    <div class="page-header"><div><h3>📋 订单管理</h3><p class="crumb">订单列表</p></div>
      <button class="btn-add" @click="openCreate">+ 新增订单</button></div>
    <div class="controls">
      <select v-model="status" @change="filter" class="filter-select">
        <option :value="null">全部状态</option>
        <option :value="0">待处理</option><option :value="1">进行中</option>
        <option :value="2">已完成</option><option :value="3">已取消</option>
      </select>
    </div>
    <div class="table-wrap">
      <table v-if="list.length">
        <thead><tr><th>ID</th><th>订单编号</th><th>客户ID</th><th>服务ID</th><th>金额</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          <tr v-for="row in list" :key="row.id">
            <td>{{ row.id }}</td><td>{{ row.orderNo }}</td><td>{{ row.customerId }}</td>
            <td>{{ row.serviceCategoryId }}</td><td>¥{{ Number(row.amount).toFixed(2) }}</td>
            <td><span :class="['badge',statusClass(row.status)]">{{ statusMap[row.status]||'—' }}</span></td>
            <td class="actions"><button class="act-edit" @click="openEdit(row)">编辑</button><button class="act-del" @click="handleDelete(row)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="!loading" class="empty">暂无数据</p>
      <p v-if="loading" class="loading">加载中...</p>
    </div>
    <div class="pager" v-if="total>10">
      <button :disabled="page<=1" @click="page--">上一页</button>
      <span>第{{ page }}页/共{{ Math.ceil(total/10) }}页</span>
      <button :disabled="page>=Math.ceil(total/10)" @click="page++">下一页</button>
    </div>
    <FormModal :visible="modalVisible" :title="modalTitle" :fields="modalFields" :initial="modalInitial" @close="modalVisible=false" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.page-header h3 { font-size:22px; font-weight:700; color:#0f172a; }
.crumb { font-size:13px; color:#6b7280; margin-top:2px; }
.btn-add { padding:8px 18px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:14px; font-weight:500; }
.btn-add:hover { background:#1d4ed8; }
.controls { margin-bottom:16px; display:flex; gap:8px; }
.filter-select { padding:8px 12px; border:1px solid #e8eaed; border-radius:6px; font-size:13px; background:#fff; }
.table-wrap { background:#fff; border:1px solid #e8eaed; border-radius:12px; overflow:hidden; }
table { width:100%; border-collapse:collapse; }
th { text-align:left; padding:12px 20px; font-size:12px; color:#6b7280; background:#fafbfc; border-bottom:1px solid #e8eaed; text-transform:uppercase; }
td { padding:12px 20px; font-size:13px; border-bottom:1px solid #f3f4f6; }
tr:last-child td { border-bottom:none; } tr:hover td { background:#fafbfc; }
.actions { display:flex; gap:8px; }
.act-edit { padding:4px 12px; border:1px solid #e8eaed; border-radius:4px; background:#fff; cursor:pointer; font-size:12px; color:#2563eb; }
.act-del { padding:4px 12px; border:1px solid #e8eaed; border-radius:4px; background:#fff; cursor:pointer; font-size:12px; color:#ef4444; }
.act-edit:hover { background:#eff6ff; } .act-del:hover { background:#fef2f2; }
.badge { display:inline-block; padding:2px 8px; border-radius:10px; font-size:11px; }
.badge-success { background:#ecfdf5; color:#059669; } .badge-info { background:#eff6ff; color:#2563eb; }
.badge-warning { background:#fffbeb; color:#d97706; } .badge-neutral { background:#f3f4f6; color:#6b7280; }
.empty,.loading { text-align:center; padding:40px; color:#6b7280; }
.pager { display:flex; justify-content:center; align-items:center; gap:16px; margin-top:20px; font-size:13px; color:#6b7280; }
.pager button { padding:6px 14px; border:1px solid #e8eaed; border-radius:6px; background:#fff; cursor:pointer; }
.pager button:disabled { opacity:0.4; cursor:not-allowed; }
</style>
