
const Global = typeof window !== 'undefined' ? window : global

/**
 * 数据缓存类
 */
export default class Storage {
  /**
   * 数据缓存类构造方法
   * @param {*存储数据时键名前缀} appKey
   * @param {*本地存储或会话存储} storage
   */
  constructor (appKey, storage) {
    this.__storage = storage || Global.localStorage
    this.__appKey = appKey ? `${appKey}-` : ''
  }

  /**
   * 存储数据
   * @param {*键名} key
   * @param {*键值} v
   * @param {*有效时长， 单位，ms} expire
   * @param {*新旧数据是否合并} merge
   */
  setItem (key, v, expire, merge) {
    const { __storage, __appKey } = this
    const k = __appKey + key.toString()
    let str = merge ? { v: { ...{ v: __storage.getItem(k) }, ...{ v } } } : { v: { v } }
    if (expire) {
      str.t = expire + Date.now()
      setTimeout(() => {
        __storage.removeItem(k)
      }, expire)
    }
    __storage.setItem(k, JSON.stringify(str))
  }

  /**
   * 获取缓存数据
   * @param {*键名} key
   */
  getItem (key) {
    const { __appKey, __storage } = this
    const k = __appKey + key.toString()
    let obj = __storage.getItem(k)
    if (obj && obj.t && obj.t < Date.now()) {
      __storage.removeItem(k)
      return null
    }
    obj = JSON.parse(obj)
    return obj && obj.v && obj.v.v
  }

  /**
   * 删除存储数据
   * @param {*存储数据键名} key
   */
  removeItem (key) {
    const { __appKey, __storage } = this
    const k = __appKey + key.toString()
    __storage.removeItem(k)
  }

  /**
   * 删除一组同一前缀数据
   * @param {*相同前缀} keyPrefix
   */
  removeItems (keyPrefix) {
    const { __appKey, __storage } = this
    const k = __appKey + keyPrefix.toString()
    Object.keys(__storage).forEach(it => it.indexOf(k) === 0 && __storage.removeItem(it))
  }

  /**
   * 清空缓存
   * @param {*} expire
   */
  clear (expire) {
    const { __appKey, __storage } = this
    if (expire) {
      Object.keys(__storage).forEach(key => key.indexOf(__appKey) === 0 && __storage.getItem(key))
    } else {
      Object.keys(__storage).forEach(key => key.indexOf(__appKey) === 0 && __storage.removeItem(key))
    }
  }
}
