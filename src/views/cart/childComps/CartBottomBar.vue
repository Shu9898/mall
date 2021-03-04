<template>
  <div class="bottom_bar">
    <div class="choose_all">
      <check-button class="check_button"
                    @click.native="checkAllClick"
                    :is-checked="isAllChecked"></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:{{totalMoney | showTotalMoney}}</div>
    <div class="calc" @click="toCalc">去计算({{totalProducts}})</div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  // 引入类和方法
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters([
        'cartList',
        'totalMoney',
        'totalProducts',
        'isAllChecked',
      ])
    },
    filters: {
      showTotalMoney(value) {
        return '￥' + value
      },
    },
    methods: {
      checkAllClick() {
        this.$store.dispatch('checkAllClick')
      },
      toCalc() {
        if(!this.cartList.find(item => item.isChecked)) {
          this.$toast.show('请先选择想要的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom_bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    height: 40px;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
  }

  .choose_all {
    flex: 25%;
    display: flex;
    align-items: center;
  }

  .check_button {
    margin: 0 7px 0 10px;
  }

  .total {
    flex: 50%;
  }

  .calc {
    flex: 25%;
    background-color: #f8520e;
    text-align: center;
    color: #fff;
    line-height: 40px;
  }
</style>
