<script>

export default {
  components: {},
  data () {
    return {}
  }
}

</script>

<template>
  <div class="forbidden-content-container">
    <div class="forbidden-content">
      <van-icon name="warn"/>
      <h1>403</h1>
      <h2>没有权限</h2>
      <p>请确认授权</p>
      <p>如未获得本应用授权，请联系管理人员</p>
    </div>
  </div>
</template>

<style lang="less">
  .forbidden-content-container {
    background: #F2F0DB;
  }
  .forbidden-content {
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -125px;
    width: 250px;
    height: 200px;
    text-align: center;
    .van-icon {
      color: #EC5741;
      font-size: 55px;
    }
    h1 {
      color: #6D7094;
      font: 60px/1 'Helvetica, Tahoma, sans-serif, Arial';
      margin: 30px auto;
    }
    h2 {
      color: #20253D;
      font: 24px/1 'Tahoma, Helvetica, sans-serif, Arial';
    }
    p {
      color: #51506E;
      margin: 5px auto;
    }
  }
</style>