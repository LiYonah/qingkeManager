<script setup>
import { ref, onMounted, watch } from 'vue'
import { getServices, createService, updateService, deleteService } from '../api/serviceCategory'
import FormModal from '../components/FormModal.vue'

const loading = ref(false); const list = ref([]); const total = ref(0)
const page = ref(1); const keyword = ref('')
const modalVisible = ref(false); const modalTitle = ref('')
const editId = ref(null); const modalInitial = ref(null)

const modalFields = [
  { key:'name', label:'服务名称', required:true },
  { key:'description', label:'描述' },
  { key:'price', label:'价格', type:'number', required:true }
]

async function load() {
  loading.value = true
  try {
    const res = await getServices({ page:page.value, size:10, keyword:keyword.value })
    list.value = res.data.records; total.value = res.data.total
  } finally { loading.value = false }
}
function search() { page.value = 1; load() }
onMounted(load); watch(page, load)

function openCreate() { editId.value = null; modalTitle.value = '新增服务'; modalInitial.value = null; modalVisible.value = true }
function openEdit(row) { editId.value = row.id; modalTitle.value = '编辑服务'; modalInitial.value = row; modalVisible.value = true }
async function handleDelete(row) { if (!confirm('确定删除 '+row.name+' 吗？')) return; await deleteService(row.id); load() }
async function handleSubmit(data) {
  if (data.price !== null) data.price = Number(data.price)
  editId.value ? await updateService(editId.value, data) : await createService(data)
  modalVisible.value = false; load()
}
</script>

<template>
  <div>
    <div class="page-header"><div><h3>🛠️ 服务分类</h3><p class="crumb">服务列表</p></div>
      <button class="btn-add" @click="openCreate">+ 新增服务</button></div>
    <div class="controls">
      <input v-model="keyword" placeholder="搜索名称..." @keyup.enter="search" class="search-input" />
      <button @click="search" class="search-btn">搜索</button>
    </div>
    <div class="table-wrap">
      <table v-if="list.length">
        <thead><tr><th>ID</th><th>名称</th><th>描述</th><th>价格</th><th>操作</th></tr></thead>
        <tbody>
          <tr v-for="row in list" :key="row.id">
            <td>{{ row.id }}</td><td>{{ row.name }}</td><td>{{ row.description||'—' }}</td>
            <td>{{ row.price ? '¥'+Number(row.price).toFixed(2) : '—' }}</td>
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
