<script>
  import Vue from 'vue'
  import moment from 'moment'
  import { Lazyload, ImagePreview } from 'vant'
  import {mapState, createNamespacedHelpers} from 'vuex'

  // options 为可选参数，无则不传
  Vue.use(Lazyload, {loading: '../static/loading.png'})
  const house = createNamespacedHelpers('house')

export default {
  components: {},
  computed: {
    ...house.mapState(['item', 'imgList']),
    ...house.mapGetters(['imgList']),
  },
  methods: {
    ...house.mapActions(['fetchDetail']),
    moment,
    handleClickImg (e, index) {
      e.preventDefault()
      ImagePreview(this.imgList, index)
    },
    onClickBack () {
      this.$router.back()
    }
  },
  data () {
    return {}
  },
  created () {
    const { params } = this.$route || {}
    const { id } = params
    if (id) {
      this.fetchDetail({id})
    }
  },
  watch: {
    item (n, o) {
      console.log('new item', n)
      console.log('old item', o)
    },
    imgList (n, o) {
      console.log('new imgList', n)
      console.log('old imgList', o)
    },
  }
}

</script>

<template>
  <div class="house-detail">
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="onClickBack"
    />
    <div class="house-detail-content">
      <van-swipe>
        <van-swipe-item v-for="(item, index) in imgList" :key="index">
          <img v-lazy="item" @click="(e) => handleClickImg(e, index)"/>
        </van-swipe-item>
      </van-swipe>
      <div class="detail-content">
        <h2>{{item.mingchen}}
          <span v-if="item.zhuangxiu">{{item.zhuangxiu}}</span>
          <span v-if="item.niandai">{{item.niandai}}</span>
          <span v-if="item.nianxian">{{item.nianxian}}</span>
        </h2>
        <p><label>面积:</label>{{item.mianji || '--'}}<span v-if="item.jiage"> ㎡</span></p>
        <p><label>价格:</label><span class="detail-price">{{item.jiage || '--'}}</span><span v-if="item.jiage"> 万</span></p>
        <van-row>
          <van-col span="12">
            <p><label>户型:</label>{{item.huxing || '--'}}</p>  
          </van-col>
          <van-col span="12">
            <p><label>楼层:</label>{{item.louceng || '--'}}<span v-if="item.jiage"> 楼</span></p>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <p><label>产权:</label>{{item.chanquan || '--'}}</p>  
          </van-col>
          <van-col span="12">
            <p><label>包证:</label>{{item.baozheng || '--'}}</p>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <p><label>唯一:</label>{{item.weiyi || '--'}}</p>  
          </van-col>
          <van-col span="12">
            <p style="font-size: 14px"><label>时间:</label>{{item.dateCreated ? moment(item.dateCreated).format('YYYY-MM-DD') : '--'}}</p>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <p><label>中介:</label>{{item.zhongjie || '--'}}</p>  
          </van-col>
          <van-col span="12">
            <p style="font-size: 14px"><label>电话:</label>{{item.dianhua || '--'}}</p>
          </van-col>
        </van-row>
        <p class="detail-jianjie"><label>简介:</label>{{item.jianjie || '--'}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .house-detail {
    .van-swipe {
      height: 200px;
      text-align: center;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        vertical-align: text-bottom;
      }
    }
  }
  .house-detail-content {
  }
  .detail-content {
    padding: 0 20px;
    text-align: left;
    h2 {
      color: #000;
      font: 26px/1 'Tahoma, Microsoft YaHei, Helvetica, sans-serif, Arial';
      span {
        display: inline-block;
        font: 12px/20px 'Tahoma, Microsoft YaHei, Helvetica, sans-serif, Arial';
        margin: 0 0;
        padding: 0 5px;
        color: rgb(48, 127, 245);
        background: rgb(170, 199, 243);
        border-radius: 5px;
        vertical-align: middle;
      }
    }
    p {
      color: rgb(7, 105, 150);
      font: 18px/18px 'Tahoma, Microsoft YaHei, Helvetica, sans-serif, Arial';
      label {
        color: #999;
        font: 14px/1 'Tahoma, Microsoft YaHei, Helvetica, sans-serif, Arial';
        margin-right: 10px;
        letter-spacing: 3px;
      }
    }
    .van-row {
      margin: 18px 0;
    }
    .van-col {
      p {
        margin: 0;
      }
    }
    p {
        span {
          font-size: 14px;
          color: rgb(122, 173, 197);
        }
        span.detail-price {
          font-size: 22px;
          color: #f1bc0b;
        }
    }
    p.detail-jianjie {
      color: #333;
      font: 14px/28px 'Tahoma, Microsoft YaHei, Helvetica, sans-serif, Arial';
    }
  }
</style>