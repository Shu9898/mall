<template>
  <div class="detail_nav_bar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title_item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '评论', '详情', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      /*
      * 监听事件
      * */
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        // console.log(this.$router)
        // this.$router.go(-1)
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }

  .title .title_item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
