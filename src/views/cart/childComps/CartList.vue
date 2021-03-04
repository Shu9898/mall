<template>
  <div class="cart_list">
      <cart-list-item v-for="(item, index) in cartList"
                      :product="item"
                      :key="index" ref="cart_list_item"></cart-list-item>
  </div>
</template>

<script>

  // 引入子组件
  import CartListItem from "./CartListItem";

  // 引入方法和类
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem,
    },
    computed: {
      ...mapGetters([
        'cartList',
      ])
    }
  }
</script>

<style scoped>

</style>
