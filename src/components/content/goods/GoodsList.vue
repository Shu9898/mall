<template>
  <div class="goods">
  <!--通过v-for遍历显示GoodsListItem即可，有多少个数据，就显示多少item-->
  <!--这里不用使用插槽，因为所有item组件的样式都是一样的，插槽是一个组件要插入不同的东西才需要使用-->
  <!--通过v-for展示各个item组件，有多少条数据，就展示多少个，同时需要将展示的数据传递给item，这样才能在item中布局这个数据，设置样式来展示这些数据-->
    <goods-list-item v-for="(item, index) in goods"
                     :goods-item="item"
                     :key="index"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      },
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 10px;
  }
</style>
