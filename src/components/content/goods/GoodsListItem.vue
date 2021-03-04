<template>
  <div class="good_list_item" @click="itemClick">
      <img v-lazy="showImage" alt="" @load="imageLoad">
      <div class="goods_info">
        <p class="title">{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        // if(this.$route.path.indexOf('/home') !== -1) {
        //   return this.goodsItem.show.img
        // }
        // if(this.$route.path.indexOf('/category') !== -1) {
        //   return this.goodsItem.img
        // }
        // if(this.$route.path.indexOf('/detail') !== -1) {
        //   return this.goodsItem.image
        // }
      }
    },
    methods: {
      imageLoad() {
        // console.log('imageLoad')
        // 通过事件总线发射一个事件
        this.$bus.$emit('itemImageLoad')

        // 通过路由区分开发射事件，不同的组件可以通过事件总线监听到不同的事件
        // if(this.$route.path.indexOf('/home') !== -1) {
        //   this.$bus.$emit('homeItemImageLoad')
        // }
        // else if(this.$route.path.indexOf('/detail') !== -1) {
        //   this.$bus.$emit('detailItemImageLoad')
        // }

      },
      itemClick() {
        // console.log('itemClick')
        // 点击跳转到详情页面
        this.$router.push({path: '/detail/' + this.goodsItem.iid}, onComplete => {}, onAbort => {})
      }
    }
  }
</script>

<style scoped>
  .good_list_item {
    position: relative;
    padding-bottom: 72px;
    width: 46%;
    margin-bottom: 15px;
    font-size: 15px;
    line-height: 20px;
  }

  .good_list_item img {
    width: 100%;
    border-radius: 10px;
  }

  .goods_info {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .goods_info .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .goods_info .price {
    color: var(--color-tint);
    margin-right: 12px;
  }

  .goods_info .collect {
    position: relative;
    padding-left: 16px;
  }

  .goods_info .collect::before {
    position: absolute;
    top: 0.5px;
    left: 0;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg");
    background-size: 14px 14px;
    content: "";
  }
</style>
