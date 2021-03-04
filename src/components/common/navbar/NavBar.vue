<template>
  <div class="nav_bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  /*导航组件的公共样式在这里设置，非公共样式比如背景颜色，文本颜色等等则不在这里设置*/
  /*在使用这个导航的组件里面再去设置非公共样式*/
  .nav_bar {
    display: flex;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    font-size: 18px;
  }

  .left,
  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
