<script>

export default {
  components: {},
  data () {
    return {
    }
  }
}

</script>

<template>
  <div class="about-content-container">
    <div class="about-content">
      <img src='../../static/qrcode.jpg'/>
      <p>扫码关注公众号，获取更多资讯。</p>
    </div>
  </div>
</template>

<style lang="less">
  .about-content-container {
    position: relative;
    height: 100%;
    background: rgb(247, 246, 242);
  }
  .about-content {
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -125px;
    width: 250px;
    height: 200px;
    text-align: center;
    img {
      width: 129px;
      height: 129px;
      margin-bottom: 10px;
    }
    p {
      font: 14px/1 'Tahoma, Helvetica, sans-serif, Arial, Tahoma';
    }
  }
</style>