<template>
  <div class="detail_goods_info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="detail_title">商品详情</div>
    <div class="detail_image" v-for="item in detailInfo.detailImage">
      <div class="desc">{{item.key}}：</div>
      <img alt="" v-for="img in item.list" :src="img" @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        // this.$bus.$emit('detailImageLoad')
        this.$emit('detailImageLoad')
      }
    }
  }
</script>

<style scoped>
  .detail_goods_info {
    padding: 20px 10px;
    background-color: #fff;
  }
  .detail_title {
    position: relative;
    font-size: 18px;
    text-align: center;
  }

  .detail_title::before {
    position: absolute;
    top: 50%;
    left: 75px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }

  .detail_title::after {
    position: absolute;
    top: 50%;
    right: 75px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }

  .detail_image {
    margin-top: 20px;
  }

  .detail_image .desc {
    margin: 10px 0;
  }

  .detail_image img {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
  }
</style>
