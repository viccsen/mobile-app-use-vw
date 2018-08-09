<script>

const homeMap = [
  [0, '/'],
  [1, '/about']
].map(v => ({
  value: v[0],
  name: v[1]
}))

export default {
  components: {
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    go (name) {
      this.$router.push(name)
    },
    goAbout () {
      this.go('about')
    },
    goHome () {
      this.go('/')
    },
  },
  data () {
    return {
      active: 0,
    }
  },
  created () {
    const { path } = this.$route || {}
    const view = homeMap.find(v => v.name === path)
    if (view) {
      this.active = view.value
    }
  },
  watch: {
    $route (n, o) {
      // const { path } = n || {}
      // const view = homeMap.find(v => v.name === path)
      // if (view) {
      //   this.viewIndex = view.value
      // }
    }
  }
}
</script>
<template>
  <div class="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" class="home-tabbar">
      <van-tabbar-item icon="wap-home" @click="goHome">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="goAbout">关于我们</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="less">
.home {
  position: relative;
  background: rgb(250, 247, 247);
  padding: 0;
}
.home-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
