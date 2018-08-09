import { list, detail } from '../services/house'
// import reqwest from 'reqwest'

export default {
  namespaced: true,
  state: {
    list: [],
    total: 0,
    item: {}
  },
  getters: {
    imgList: state => {
      const { item } = state
      return item && item.tupian ? item.tupian.split('|').filter(v => v) : []
    }
  },
  mutations: {
    fetchListSuccess (state, payload) {
      let { data } = payload
      let { list, total } = data || {}
      state.list = [...list]
      state.total = total
    },
    loadMoreSuccess (state, payload) {
      let { data } = payload
      let { list } = data || {}
      let oldList = [...state.list]
      let newList = oldList.concat(list)
      state.list = [...newList]
    },
    fetchDetailSuccess (state, payload) {
      let { data } = payload
      state.item = {...data}
    },
  },
  actions: {
    fetchList ({ commit }, data) {
      return list(data)
      .then(data => {
        console.log('res', data)
        data && data.result && commit({type: 'fetchListSuccess', data: data.result})
      })
      .catch(e => {
        console.error('error!!! ', e.message || e.msg)
      })
    },
    loadMore ({commit}, data) {
      return list(data)
      .then(data => {
        console.log('load more res', data)
        data && data.result && commit({type: 'loadMoreSuccess', data: data.result})
      })
      .catch(e => {
        console.error('error!!! ', e.message || e.msg)
      })
    },
    fetchDetail ({commit}, data) {
      return detail(data)
      .then(data => {
        data && data.result && commit({type: 'fetchDetailSuccess', data: data.result})
      })
      .catch(e => {
        console.error('error!!! ', e.message || e.msg)
      })
    }
  }
}
