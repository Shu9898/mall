<template>
  <div class="detail_tab_bar">
    <div class="customer_service">
      <span></span>
      <span>客服</span>
    </div>
    <div class="shop">
      <span></span>
      <span>店铺</span>
    </div>
    <div class="collect">
      <span></span>
      <span>收藏</span>
    </div>
    <div class="add_cart" @click="addCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
  export default {
    name: "DetailTabBar",
    methods: {
      addCart() {
        // console.log('点击加入购物车')
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .detail_tab_bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    display: flex;
    text-align: center;
    background-color: #fff;
  }

  .customer_service,
  .shop,
  .collect {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .customer_service span:nth-child(1) {
    width: 22px;
    height: 22px;
    background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 -54px;
    background-size: 22px;
  }
  .shop span:nth-child(1) {
    width: 22px;
    height: 22px;
    background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 -100px;
    background-size: 22px;
  }
  .collect span:nth-child(1) {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 -1px;
    background-size: 22px;
  }

  .customer_service span:nth-child(2),
  .shop span:nth-child(2),
  .collect span:nth-child(2) {
    margin-top: 1px;
    font-size: 14px;
  }

  .add_cart {
    flex: 1.5;
    background-color: #ffdd0e;
    line-height: 49px;
  }

  .buy {
    flex: 1.5;
    background-color: #ff7898;
    line-height: 49px;
    color: #fff;
  }
</style>
