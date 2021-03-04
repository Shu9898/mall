<template>
  <div class="cart_list_item">
    <div class="choose">
      <check-button class="check_button"
                    :is-checked="product.isChecked"
                    @click.native="checkClick"></check-button>
    </div>
    <div class="product">
      <div class="img">
        <img :src="product.image" alt="">
      </div>
      <div class="content">
        <div class="title">{{product.title}}</div>
        <div class="desc">{{product.desc}}</div>
        <span class="price">{{product.realPrice | showPrice}}</span>
        <span class="counter">
          <button
            class="increase"
            v-show="isEdit"
            @click="increaseProduct">+</button>
          <span @click="counterClick">x{{product.count}}</span>
          <button
            class="decrease"
            v-show="isEdit"
            @click="decreaseProduct"
            :disabled="canDecrease">-</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton,
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isEdit: false,
        canDecrease: false,
      }
    },
    filters: {
      showPrice(value) {
        return '￥' + value
      }
    },
    methods: {
      /**
       * 监听点击的方法
       */
      checkClick() {
        // 不能直接修改state里面的状态
        // this.product.isChecked = !this.product.isChecked
        this.$store.dispatch('productCheckChange', this.product)
      },
      counterClick() {
        this.isEdit = !this.isEdit
      },
      increaseProduct() {
        this.$store.commit('increaseProduct', this.product)
      },
      decreaseProduct() {
        if(this.product.count > 1) {
          this.canDecrease = false
          this.$store.commit('decreaseProduct', this.product)
        }
        else {
          this.canDecrease = true
        }
      }
    },
  }
</script>

<style scoped>
  .cart_list_item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid #dcdcdc;
  }

  .choose {
    flex: 8%;
  }

  .product {
    flex: 92%;
    display: flex;
  }

  .product .img {
    flex: 30%;
  }

  .product .img img {
    width: 100%;
    height: 100px;
    border-radius: 10px;
  }

  .product .content {
    position: relative;
    flex: 70%;
    margin: 0 10px;
  }

  .product .content .title {
    width: 220px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product .content .desc {
    width: 220px;
    margin-top: 7px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product .content .price {
    position: absolute;
    left: 0;
    bottom: 10px;
    font-size: 16px;
    color: #ed8b51;
  }

  .product .content .counter {
    position: absolute;
    right: 0;
    bottom: 10px;
  }

  .counter .increase,
  .counter .decrease {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 7px;
    font-size: 18px;
    color: #aaa;
  }

  .counter span {
    margin: 0 6px;
  }
</style>
