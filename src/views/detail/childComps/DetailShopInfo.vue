<template>
  <div v-if="Object.keys(shop).length !== 0" class="detail_shop_info">
    <div class="shop_top">
      <img class="logo" :src="shop.logo" alt="">
      <span class="name">{{shop.name}}</span>
    </div>
    <div class="shop_middle">
      <div class="shop_middle_left">
        <span class="sells">
          <span>{{shopSells}}</span>
          <span>总销量</span>
        </span>
        <span class="goods">
          <span>{{shop.goodsCount}}</span>
          <span>全部宝贝</span>
        </span>
      </div>
      <div class="shop_middle_right">
        <div class="score" v-for="item in shop.score">
          <span class="des">{{item.name}}</span>
          <!--当item.isBetter为true和false的时候，显示不同的文字，动态绑定不同的样式-->
          <span class="sco" :class="{low_color: !item.isBetter, high_color: item.isBetter}">{{item.score}}</span>
          <span class="level" :class="{low_bg: !item.isBetter, high_bg: item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
        </div>
      </div>
    </div>
    <div class="shop_bottom">
      <a class="enter_shop" href="#">进店逛逛</a>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      shopSells() {
        return this.shop.sells < 10000 ? this.shop.sells : (this.shop.sells / 10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .detail_shop_info {
    border-bottom: 5px solid #f7f7f7;
  }

  .shop_top {
    display: flex;
    align-items: center;
    margin: 15px 10px;
  }

  .shop_top .logo {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 25px;
    border: 2px solid #f4f4f4;
  }

  .shop_top .name {
    font-size: 18px;
  }

  .shop_middle {
    display: flex;
    padding: 0 10px;
  }

  .shop_middle_left {
    position: relative;
    flex: 1;
    display: flex;
  }

  .shop_middle_left::after {
    position: absolute;
    top: 15px;
    right: -10px;
    content: "";
    width: 1px;
    height: 40px;
    background-color: #ededed;
  }

  .shop_middle_left .sells,
  .shop_middle_left .goods {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .shop_middle_left .sells span:nth-child(1),
  .shop_middle_left .goods span:nth-child(1) {
    margin-bottom: 5px;
    font-size: 18px;
  }

  .shop_middle_left .sells span:nth-child(2),
  .shop_middle_left .goods span:nth-child(2) {
    font-size: 14px;
  }

  .shop_middle_right {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .shop_middle_right .score {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .score .des {
    margin-right: 7px;
  }

  .score .sco {
    width: 50px;
  }

  .score .level {
    color: #fff;
  }

  .low_bg {
    background-color: #9cc787;
  }

  .low_color {
    color: #9cc787;
  }

  .high_bg {
    background-color: #eb919e;
  }

  .high_color {
    color: #eb919e;
  }

  .shop_bottom {
    margin: 15px 0 20px;
    text-align: center;
  }

  .shop_bottom .enter_shop {
    display: inline-block;
    padding: 6px 35px;
    background-color: #f1f5f9;
    border-radius: 10px;
  }

</style>
