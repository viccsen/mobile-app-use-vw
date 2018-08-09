import request from '../utils/request'
import {GET, POST, PUT, DELETE, PATCH} from '../utils/const'

export async function list (data) {
  return request('/api/1.0/house', {data, method: GET})
}

export async function detail (data) {
  let id = data.id
  delete data.id
  return request('/api/1.0/house/' + id, {data, method: GET})
}
