import fetch from 'isomorphic-fetch'
import QueryString from 'qs'
import { Toast } from 'vant'
import authenticateCache from '../cache/auth'
import store from '../store'

function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  if (response.status === 401) {
    location.href = '/#/login'
  }

  if (response.status === 403) {
    location.href = '/#/403'
  }

  const error = new Error(response.statusText)
  error.response = response
  error.code = response.status
  throw error
}

function request (url = '', options = {}, cache) {
  if (/^#\/403/g.test(location.hash)) {
    return Promise.reject({message: 'Forbidden'})
  }
  let cacheData
  let data = options.data
  const {resolve, reject} = data || {}
  delete options.data

  resolve && delete data.resolve
  reject && delete data.reject

  if (typeof cache === 'function') {
    cacheData = cache()
    if (cacheData) {
      if (resolve) {
        if (typeof resolve === 'function') {
          resolve(cacheData)
        } else {
          throw new Error('resolve should be a function!')
        }
      }
      return Promise.resolve(cacheData)
    }
  }

  const opts = {
    method: 'POST',
    ...options
  }
  opts.headers = {
    ...opts.headers,
  }
  if (url !== '/admin/api/authenticate') {
    let user = authenticateCache() || {}
    const { result = {} } = user
    opts.headers.authorization = result.sc_tk || ''
  }
  if (opts.method === 'GET') {

    // IE 的GET请求要加时间戳，防止304直接返回了
    if (data) {
      data._t = Date.now()
    } else {
      data = {_t: Date.now()}
    }

    url += (/\?/.test(url) ? '&' : '?') + QueryString.stringify(data)
    // url = url.split('?');
    // url = url[0] + '?' + QueryString.stringify(url[1] ? {...QueryString.parse(url[1]), ...data} : data);
  } else {
    opts.headers['content-type'] = 'application/x-www-form-urlencoded' //
    opts.body = serialize(data)
    // opts.headers['content-type'] = 'application/json; charset=UTF-8';
    // opts.body = JSON.stringify(data); //QueryString.stringify(data); //JSON.stringify(data);

  }

  // 支持处理缓存
  const handleCache = data => {
    typeof cache === 'function' && cache(data.result)
    return data
  }

  const getResult = (json) => {
    if (json.status === 1) {
      if (resolve) {
        if (typeof resolve === 'function') {
          resolve({result: json.result})
        } else {
          throw new Error('resolve should be a function!')
        }
      }
      return {result: json.result}
    }
    const error = new Error(json.message || json.msg || '数据加载错误！')
    error.code = json.code
    error.data = json
    error.url = url
    // Message({
    //   type: 'error',
    //   message: error.message
    // })
    Toast(error.message || error.msg || '网络错误，请稍后再试')
    console.error('err message', error.message || error.msg)
    throw error
  }

  let timer = setTimeout(() => store.commit('router/updateLoadingStatus', { isLoading: true }), 300)

  return fetch(url, opts)
    .then(checkHttpStatus)
    .then(res => {
      const contentType = res.headers.get('content-type')
      console.info(contentType)
      if (/^text\/x\-markdown;/g.test(contentType)) {
        return res.text().then(text => {
          return {status: 1, result: text}
        })
      } else { ///^application\/json;/g
        return res.json()
      }
    })
    .then(getResult)
    .then(handleCache)
    .catch(err => {
      if (reject) {
        if (typeof reject === 'function') {
          reject({err})
        } else {
          throw new Error('reject should be a function!')
        }
      }
      return {err}
    }).finally(() => {
      if (timer) {
        clearTimeout(timer)
      } else {
        store.commit('router/updateLoadingStatus', { isLoading: false })
      }
    })
}

export default request

export function serialize (obj, prefix) {
  if (obj) {
    var str = []
    Object.keys(obj).map(p => {
      let v = obj[p]
      if (p && typeof v !== 'undefined') {
        let k = prefix ? prefix + '.' + p : p
        if (typeof v == 'object') {
          v = serialize(v, k)
          if (v) {
            str.push(v)
          }
        } else {
          str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v))
        }
      }
    })
    return str.length ? str.join("&") : ''
  }
  return ''
}
