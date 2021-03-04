<template>
  <div class="slide">
    <slot></slot>
    <!--可以插入item的内容-->
  </div>
</template>

<script>
  export default {
    name: "SwiperItem1"
  }
</script>

<style scoped>
  .slide {
    width: 100%;
    /*防止元素被压缩*/
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
