import {sessionCache as cacher, DAY} from './index'

const KEY = 'authenticate'

export default function cache (authenticate) {
  return authenticate ? cacher.setItem(KEY, authenticate, DAY * 20) : cacher.getItem(KEY)
}
cache.clear = function () {
  cacher.removeItem(KEY)
}
