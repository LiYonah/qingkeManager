<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String,
  fields: Array,    // [{ key, label, type, required, options }]
  initial: Object   // 编辑时传入的初始数据
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({})

// visible 打开时，用 initial 或空值初始化表单
watch(() => props.visible, (v) => {
  if (v) {
    props.fields.forEach(f => {
      form[f.key] = props.initial?.[f.key] ?? ''
    })
  }
})

function handleSubmit() {
  const data = {}
  props.fields.forEach(f => {
    data[f.key] = form[f.key] === '' ? null : form[f.key]
  })
  emit('submit', data)
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h4>{{ title }}</h4>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="modal-body">
          <div v-for="f in fields" :key="f.key" class="form-field">
            <label :for="'field-'+f.key">{{ f.label }}</label>
            <input
              v-if="f.type !== 'select'"
              :id="`field-${f.key}`"
              v-model="form[f.key]"
              :type="f.type || 'text'"
              :required="f.required"
              :placeholder="`请输入${f.label}`"
            />
            <select v-else :id="`field-${f.key}`" v-model="form[f.key]" :required="f.required">
              <option value="">请选择</option>
              <option v-for="o in f.options" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="emit('close')">取消</button>
          <button type="submit" class="btn-submit">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal-card { background:#fff; border-radius:12px; width:460px; max-width:calc(100% - 32px); box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; }
.modal-header { display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid #e8eaed; }
.modal-header h4 { font-size:16px; font-weight:600; }
.close-btn { background:none; border:none; font-size:18px; color:#6b7280; cursor:pointer; }
.modal-body { padding:24px; display:flex; flex-direction:column; gap:16px; max-height:60vh; overflow-y:auto; }
.form-field label { display:block; font-size:13px; font-weight:500; color:#374151; margin-bottom:6px; }
.form-field input, .form-field select {
  width:100%; padding:9px 12px; border:1px solid #e8eaed; border-radius:6px; font-size:14px; font-family:var(--font);
}
.form-field input:focus-visible, .form-field select:focus-visible { outline:2px solid #2563eb; outline-offset:2px; border-color:#2563eb; }
.modal-footer { display:flex; justify-content:flex-end; gap:8px; padding:16px 24px; border-top:1px solid #e8eaed; }
.btn-cancel { padding:8px 20px; border:1px solid #e8eaed; border-radius:6px; background:#fff; cursor:pointer; font-size:14px; }
.btn-submit { padding:8px 20px; border:none; border-radius:6px; background:#2563eb; color:#fff; cursor:pointer; font-size:14px; font-weight:500; }
.btn-submit:hover { background:#1d4ed8; }
</style>
