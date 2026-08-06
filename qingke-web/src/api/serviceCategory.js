import request from './request'

export const getServices = (params) => request.get('/service-categories', { params })
export const createService = (data) => request.post('/service-categories', data)
export const updateService = (id, data) => request.put(`/service-categories/${id}`, data)
export const deleteService = (id) => request.delete(`/service-categories/${id}`)
