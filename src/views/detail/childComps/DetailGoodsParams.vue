<template>
  <div v-if="Object.keys(goodsParams).length !== 0" class="detail_goods_params">
    <div class="params_title">商品参数</div>
    <table class="size">
      <tr v-for="item in goodsParams.sizes">
        <td v-for="size in item">{{size}}</td>
      </tr>
    </table>
    <table class="infos">
      <tr v-for="item in goodsParams.infos">
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
    <div v-if="goodsParams.images ? true : false" class="params_image">
      <img v-for="img in goodsParams.images" :src="img" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsParams",
    props: {
      goodsParams: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('paramsImageLoad')
      }
    }
  }
</script>

<style scoped>
  .detail_goods_params {
    padding: 20px;
  }

  .params_title {
    position: relative;
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
  }

  .params_title::before {
    position: absolute;
    top: 50%;
    left: 65px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }

  .params_title::after {
    position: absolute;
    top: 50%;
    right: 65px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }

  .size {
    width: 100%;
  }

  .size tr {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #edeaeb;
  }

  .size tr td {
    flex: 1;
  }

  .size tr td:nth-child(1) {
    flex: 1.5;
  }

  .infos {
    width: 100%;
    margin-top: 10px;
    line-height: 1.5;
  }

  .infos tr {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #edeaeb;
  }

  .infos tr td:nth-child(1) {
    flex: 0.8;
  }

  .infos tr td:nth-child(2) {
    flex: 2;
    color: var(--color-tint);
  }

  .params_image img {
    width: 100%;
    border-radius: 10px;
  }
</style>
