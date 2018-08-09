<template>
    <div id="app">
		    <router-view></router-view>
        <!-- <div v-if="isLoading" class="content-loading">
          <van-loading color="black" />
        </div> -->
    </div>
</template>

<script>
  import {mapState, createNamespacedHelpers} from 'vuex'
  const auth = createNamespacedHelpers('auth')
  const router = createNamespacedHelpers('router')

export default {
  components: {
  },
  computed: {
      ...auth.mapState(['token']),
      ...router.mapState(['isLoading'])
  },
  watch: {
    "$route": "checkAuthenticate"
  },
  methods: {
    checkAuthenticate (to, from) {
                // if(this.$route.path !== '/login'){
                //     if(!this.token){
                //         this.$router.replace('/login')
                //     }
                // }else{
                //     // if(token){
                //     //     this.$router.replace('/')
                //     // }
                // }
      }
  }
}
</script>

<style lang="less">
@import 'vant/lib/vant-css/index.css';
html, body, #app, #app > div {
  height: 100%;
}
body {
  user-select: none;
  font-size: 14px;
}
* {
  box-sizing: border-box;
}
ul, li {
  list-style: none;
}
body {
  background-color: #f8f8f8;
}

img { 
  content: normal !important; 
}

.content-loading {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  div {
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
  }
}

.van-cell__title .van-icon {
  font-size: 18px;
}

p.hairline {
  position: relative;
  height: 1px;
  margin: 0;
  background: transparent;
}
p.hairline:after {
  content: ""!important;
  position: absolute;
  left: 15px;
  right: 0;
  width: auto;
  height: 1px;
  background: #e5e5e5;
  transform: scaleY(0.5);
}
</style>
