<template>
  <!--Object.keys(goods).length获取到goods对象的可枚举属性的字符串数组的长度，判断其是否为0.如果为0.则是空对象，为false；如果不为0，则为true，以此来决定是否创建此组件-->
  <div class="detail_base_info" v-if="Object.keys(goods).length !== 0">
    <div class="info_title">{{goods.title}}</div>
    <div class="info_price">
      <span class="n_price">{{goods.newPrice}}</span>
      <span class="o_price">{{goods.oldPrice}}</span>
      <!--判断是否有goods.discount，有些商品没有goods.discount-->
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info_other">
    <!--显示columns数组的前两个和services数组的最后一个-->
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info_service">
    <!--这里要取的是services数组中除了最后一个元素的其他所有元素，所以不能直接遍历，通过遍历数字的方式，拿到对应的index，通过services[index]来获取数组-->
    <!--遍历3，拿到的index是1，2，3-->
      <span class="info_service_item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail_base_info {
    padding: 12px 10px 0;
    border-bottom: 5px solid #f7f7f7;
  }

  .info_title {
    font-size: 18px;
    line-height: 1.5;
    color: #323232;
  }

  .info_price {
    display: flex;
    align-items: baseline;
    margin-top: 12px;
  }

  .info_price .n_price {
    margin-right: 7px;
    font-size: 25px;
    color: var(--color-high-text);
  }

  .info_price .o_price {
    margin-right: 5px;
    text-decoration: line-through;
    color: #9a9a9a;
  }

  .info_price .discount {
    transform: translate(0, -10px);
    padding: 0 4px;
    height: 22px;
    background-color: var(--color-tint);
    color: #fff;
    line-height: 22px;
    font-size: 14px;
    border-radius: 10px;
  }

  .info_other {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e4e4;
    color: #9a9a9a;
    font-size: 14px;
  }

  .info_service {
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    font-size: 14px;
  }

  .info_service_item {
    position: relative;
    padding-left: 16px;
  }

  .info_service_item img {
    position: absolute;
    top: 1px;
    left: 0;
    width: 14px;
    height: 14px;
  }

  .info_service_item span {
    color: #363636;
  }

</style>









