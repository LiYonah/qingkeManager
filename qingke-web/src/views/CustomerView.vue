<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customer'
import FormModal from '../components/FormModal.vue'

const loading = ref(false); const list = ref([]); const total = ref(0)
const page = ref(1); const keyword = ref('')
const modalVisible = ref(false); const modalTitle = ref('')
const editId = ref(null); const modalInitial = ref(null)

const modalFields = [
  { key:'name', label:'姓名', required:true },
  { key:'phone', label:'电话' },
  { key:'email', label:'邮箱' },
  { key:'company', label:'公司' },
  { key:'address', label:'地址' }
]

async function load() {
  loading.value = true
  try {
    const res = await getCustomers({ page:page.value, size:10, keyword:keyword.value })
    list.value = res.data.records; total.value = res.data.total
  } finally { loading.value = false }
}
function search() { page.value = 1; load() }
onMounted(load); watch(page, load)

function openCreate() { editId.value = null; modalTitle.value = '新增客户'; modalInitial.value = null; modalVisible.value = true }
function openEdit(row) { editId.value = row.id; modalTitle.value = '编辑客户'; modalInitial.value = row; modalVisible.value = true }
async function handleDelete(row) { if (!confirm('确定删除 '+row.name+' 吗？')) return; await deleteCustomer(row.id); load() }
async function handleSubmit(data) {
  editId.value ? await updateCustomer(editId.value, data) : await createCustomer(data)
  modalVisible.value = false; load()
}
</script>

<template>
  <div>
    <div class="page-header"><div><h3>🏢 客户管理</h3><p class="crumb">客户列表</p></div>
      <button class="btn-add" @click="openCreate">+ 新增客户</button></div>
    <div class="controls">
      <input v-model="keyword" placeholder="搜索名称..." @keyup.enter="search" class="search-input" />
      <button @click="search" class="search-btn">搜索</button>
    </div>
    <div class="table-wrap">
      <table v-if="list.length">
        <thead><tr><th>ID</th><th>姓名</th><th>电话</th><th>公司</th><th>邮箱</th><th>操作</th></tr></thead>
        <tbody>
          <tr v-for="row in list" :key="row.id">
            <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.phone||'—' }}</td>
            <td>{{ row.company||'—' }}</td><td>{{ row.email||'—' }}</td>
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
.search-input { padding:8px 12px; border:1px solid #e8eaed; border-radius:6px; font-size:13px; width:200px; }
.search-btn { padding:8px 16px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:13px; }
.table-wrap { background:#fff; border:1px solid #e8eaed; border-radius:12px; overflow:hidden; }
table { width:100%; border-collapse:collapse; }
th { text-align:left; padding:12px 20px; font-size:12px; color:#6b7280; background:#fafbfc; border-bottom:1px solid #e8eaed; text-transform:uppercase; }
td { padding:12px 20px; font-size:13px; border-bottom:1px solid #f3f4f6; }
tr:last-child td { border-bottom:none; } tr:hover td { background:#fafbfc; }
.actions { display:flex; gap:8px; }
.act-edit { padding:4px 12px; border:1px solid #e8eaed; border-radius:4px; background:#fff; cursor:pointer; font-size:12px; color:#2563eb; }
.act-del { padding:4px 12px; border:1px solid #e8eaed; border-radius:4px; background:#fff; cursor:pointer; font-size:12px; color:#ef4444; }
.act-edit:hover { background:#eff6ff; } .act-del:hover { background:#fef2f2; }
.empty,.loading { text-align:center; padding:40px; color:#6b7280; }
.pager { display:flex; justify-content:center; align-items:center; gap:16px; margin-top:20px; font-size:13px; color:#6b7280; }
.pager button { padding:6px 14px; border:1px solid #e8eaed; border-radius:6px; background:#fff; cursor:pointer; }
.pager button:disabled { opacity:0.4; cursor:not-allowed; }
</style>
