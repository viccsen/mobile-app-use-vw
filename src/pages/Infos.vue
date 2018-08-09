<script>
  import {mapState, createNamespacedHelpers} from 'vuex'
  
  const auth = createNamespacedHelpers('auth')
  const router = createNamespacedHelpers('router')
  const house = createNamespacedHelpers('house')
  
export default {
  components: {
  },
  computed: {
    ...auth.mapState(['token', 'user']),
    ...router.mapState(['isLoading']),
    ...house.mapState(['total', 'list']),
    ...auth.mapGetters(['auditStatus']),
  },
  methods: {
    ...house.mapActions(['fetchList', 'loadMore']),
    onImgError (item, $event) {
      console.log(item, $event)
    },
    onLoadMore () {
      // if ((this.list.length != 0 && this.list.length >= this.total)) return
      this.loadMore({
        ...this.payload,
        s: 20,
        p: this.list.length / 20,
        resolve: () => {
          console.log('this.finished', this.finished)
        },
        reject: () => {
          this.loading = false
        }
      })
    },
    handleClickGuide (e) {
      this.showSearch = !0
    },
    handleSearch () {
      console.log('payload', this.payload)
      this.fetchList({
        ...this.payload,
        p: 0,
        s: 20,
        resolve: () => {
          this.showSearch = false
          this.finished = false
        }
      })
    },
    handleReset () {
      this.payload = Object.keys(this.payload).reduce((obj, it) => {
        obj[it] = null
        return obj
      }, {})
      this.fetchList({
        ...this.payload,
        p: 0,
        s: 20,
        resolve: () => {
          this.showSearch = false
          this.finished = false
        }
      })
    },
    handleRowClick (item) {
      const { id } = item
      if (id !== undefined) {
        this.$router.push({name: 'houseDetail', params: {id: item.id}})
      }
    },
    onRefresh () {
      this.payload = Object.keys(this.payload).reduce((obj, it) => {
        obj[it] = null
        return obj
      }, {})
      this.fetchList({
        p: 0,
        s: 20,
        resolve: () => {
          this.isRefreshing = false
          this.finished = false
        }
      })
    }
  },
  data () {
    return {
      showSearch: false,
      loading: false,
      finished: false,
      active: 0,
      isRefreshing: false,
      payload: {
        mingchen: null,
        huxing: null,
        louceng: null,
        zhuangxiu: null,
        zhongjie: null,
        jianjie: null,
        dianhua: null,
        baozheng: null,
        mianjiMin: null,
        mianjiMax: null,
        jiageMin: null,
        jiageMax: null,
      }
    }
  },
  created () {
    const { path } = this.$route || {}
  
    function endLoading (timer, loading) {
        if (timer) {
                clearTimeout(timer)
          } else {
                loading.clear()
          }
    }
  
    if (this.auditStatus === 1) {
          let loading = {}
          let timer = setTimeout(() => {
            loading = this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
            })
          }, 300)

          this.fetchList({
            s: 20,
            resolve: endLoading(timer, loading),
            reject: endLoading(timer, loading)
          })
      } else {
        this.$router.push({name: 'unauthenticated'})
      }
  },
  watch: {
    $route (n, o) {
    },
    payload (n, o) {
      console.log('new payload', n)
      console.log('old payload', o)
    },
    list (n, o) {
      if (this.loading) {
        this.loading = false
        this.finished = this.list.length >= this.total
      }
      console.log('new list', n)
      console.log('old list', o)
    },
  }
}
</script>
<template>
    <div class="infos-content">
      <div class="search-guide" @click="handleClickGuide">
        <van-icon name="search" /><span>搜索</span>
      </div>
      <van-popup v-model="showSearch" position="top" class="home-search-content">
        <van-cell-group>
          <van-field
            clearable
            v-model="payload.mingchen"
            type="text"
            label="小区名称"
            placeholder="小区名称"
          />

          <van-field
            clearable
            v-model="payload.huxing"
            type="text"
            label="户型"
            placeholder="户型（例 3/2/2）"
          />
          <van-field
            clearable
            v-model="payload.louceng"
            type="number"
            label="楼层"
            placeholder="楼层（例 22）"
          />
          <van-field
            clearable
            v-model="payload.zhuangxiu"
            type="text"
            label="装修"
            placeholder="装修（例 新装）"
          />
          <van-field
            clearable
            v-model="payload.zhongjie"
            type="text"
            label="信息来源"
            placeholder="信息来源"
          />
          <van-field
            clearable
            v-model="payload.jianjie"
            type="textarea"
            label="简介"
            placeholder="简介"
            rows="1"
            autosize
          />
          <van-field
            clearable
            v-model="payload.dianhua"
            type="text"
            label="联系方式"
            placeholder="联系方式"
          />
          <van-row class="radio-content">
            <van-col span="8" class="radio-title">
              包证
            </van-col>
            <van-col span="14">
              <van-radio-group v-model="payload.baozheng">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </van-col>
          </van-row>
          <p class="hairline"/>
          <van-row>
            <van-col span="13">
              <van-field
                  clearable
                  v-model="payload.mianjiMin"
                  type="number"
                  label="面积范围"
                  placeholder="最小面积"
                >
                  <span slot="icon" class="search-slot">㎡</span>
              </van-field>
            </van-col>
            <van-col span="2" class="search-gutter">
              <span> - </span>
            </van-col>
            <van-col span="7">
              <van-field
                  clearable
                  v-model="payload.mianjiMax"
                  type="number"
                  placeholder="最大面积"
                >
                  <span slot="icon" class="search-slot">㎡</span>
              </van-field>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="13">
              <van-field
                  clearable
                  v-model="payload.jiageMin"
                  type="number"
                  label="价格范围"
                  placeholder="最低价格"
              >
                <span slot="icon" class="search-slot">万</span>
              </van-field>
            </van-col>
            <van-col span="2" class="search-gutter">
              <span> - </span>
            </van-col>
            <van-col span="7">
              <van-field
                  clearable
                  v-model="payload.jiageMax"
                  type="number"
                  placeholder="最高价格"
                >
                <span slot="icon" class="search-slot">万</span>
              </van-field>
            </van-col>
          </van-row>
        </van-cell-group>
        <van-row class="search-bottom-buttons">
          <van-col span="12">
            <van-button size="large" type="primary" @click="handleSearch">搜索</van-button>
          </van-col>
          <van-col span="12" class="reset">
            <van-button size="large" type="default" @click="handleReset">重置</van-button>
          </van-col>
        </van-row>

      </van-popup>
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <van-list
          class="home-list"
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoadMore"
          >
          <div v-for="item in list" 
              :key="item.id" 
              class="home-list-item"
              @click="() => handleRowClick(item)">
            <van-row>
              <van-col span="10">{{item.mingchen}}</van-col>
              <van-col span="5">{{item.zhuangxiu}}</van-col>
              <van-col span="5">{{item.mianji}} ㎡</van-col>
              <van-col span="4">{{item.jiage}} 万</van-col>
            </van-row>
          </div>
        </van-list>
        <div v-if="list.length === 0" class="empty-content">
          <p><van-icon name="warn" />暂无数据</p>
        </div>
      </van-pull-refresh>
    </div>
</template>
<style lang="less">
.infos-content {
}
.home-list {
  min-height: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
}
.home-list-item {
  background: rgb(247, 246, 242);
  border-bottom: 1px solid #ddd;
  padding: 15px 25px 15px 10px;
  text-align: center;
  font: 14px/18px 'Tahoma, Helvetica, sans-serif, Arial, Tahoma';
  .van-col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.empty-content {
  color: #999;
  text-align: center;
  font: 16px/36px 'Microsoft YaHei, Helvetica, sans-serif, Arial, Tahoma';
  .van-icon {
    position: relative;
    margin-right: 10px;
    top: 2px;
  }
}
.title {
  color: #000;
  font: 16px/36px 'Microsoft YaHei, Helvetica, sans-serif, Arial, Tahoma';
}
.search-guide {
  position: fixed;
  bottom: 200px;
  right: 0;
  width: 30px;
  color: #fff;
  height: 100px;
  text-align: center;
  padding-top: 20px;
  font: 16px/18px 'Tahoma, Helvetica, sans-serif, Arial';
  background: linear-gradient(to right,#6fb9ee,#0069ff);
  border-radius: 25px 0 0 25px;
  opacity: 0.95;
  z-index: 1000;
  .van-icon {
    position: relative;
    font-size: 16px;
  }
}

.home-search-content {
  .search-gutter {
    text-align: center;
    span {
      line-height: 44px;
    }
  }
  .van-hairline.van-cell:not(:last-child):after {
    content: ""!important;
  }
  .van-field__body {
    height: 100%;
  }
  .van-cell__value--alone {
    height: 24px;
  }
  .search-slot {
    position: relative;
    font: 12px/1 'Tahoma, Helvetica, sans-serif, Arial';
  }
  .van-radio-group {
    display: flex;
    justify-content: space-between;
  }
  .radio-content {
    padding: 10px 15px;
  }
  .radio-title {
    color: #333;
    max-width: 90px;
    font: 14px/24px 'Tahoma, Helvetica, sans-serif, Arial';
  }
  .search-bottom-buttons {
    button {
      border-radius: 0;
    }
    .reset button {
      color: #999;
    }
  }
}
</style>
