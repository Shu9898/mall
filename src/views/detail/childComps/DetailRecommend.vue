<template>
  <div class="detail_recommend" v-if="Object.keys(goods).length !== 0">
    <div class="recommend_title">相关推荐</div>
    <goods-list :goods="goods"></goods-list>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  export default {
    name: "DetailRecommend",
    components: {
      GoodsList
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .detail_recommend {
    padding-top: 20px;
  }

  .recommend_title {
    position: relative;
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
  }

  .recommend_title::before {
    position: absolute;
    top: 50%;
    left: 65px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }

  .recommend_title::after {
    position: absolute;
    top: 50%;
    right: 65px;
    transform: translate(0, -50%);
    width: 60px;
    height: 1px;
    background-color: #a0a0a0;
    content: "";
  }
</style>
