<template>
  <div id="cart">
    <nav-bar class="cart_nav">
      <div slot="center">购物车({{counters}})</div>
    </nav-bar>
    <scroll class="cart_content" ref="scroll">
      <cart-list ref="cart_list"></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  // 引入公共组件
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  // 引入子组件
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  // 引入类和方法
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar,
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    computed: {
      ...mapGetters([
        'counters',
      ])
      // ...mapGetters({
      //   counts: 'counters'
      // })
    },
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .cart_nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .cart_content {
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
