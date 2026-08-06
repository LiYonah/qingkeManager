import request from './request'

export const loginApi = (username, password) =>
  request.post('/login', { username, password })

export const registerApi = (data) =>
  request.post('/register', data)

export const changePasswordApi = (oldPassword, newPassword) =>
  request.put('/me/password', { oldPassword, newPassword })
