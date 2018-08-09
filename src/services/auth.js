import request from '../utils/request'
import {GET, POST, PUT, DELETE, PATCH} from '../utils/const'

export async function AuthCheck (data) {
  return request('/api/1.0/wechat/auth/check', {data, method: POST})
}

export async function AuthCallback (data) {
  return request('/api/1.0/wechat/callback', {data, method: POST})
}
