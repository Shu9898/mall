<template>
  <div id="swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <!--如果showIndicator为true并且图片张数大于1-->
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <!--这里只需要获取到slideCount的index值-->
        <div v-for="(item, index) in slideCount" class="indi_item" :class="{active: index === currentIndex - 1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper1",
    props: {
      // 滚动下一张图片的时间
      interval: {
        type: Number,
        default: 3000
      },
      // 延迟轮播时间
      animDuration: {
        type: Number,
        default: 300
      },
      // 滑动比例，当滑动超过这个比例，则滚动到下一张，如果没超过这个比例，则返回原来的那一张
      moveRatio: {
        type: Number,
        default: 0.25
      },
      // 是否显示导航点
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        slideCount: 0, // slide元素的个数
        totalWidth: 0, // swiper的宽度，也即一个item的宽度
        swiperStyle: {}, // swiper的样式，主要用于设置滚动transform，translate和transition
        currentIndex: 1, // 记录当前的index
        scrolling: false // 是否正在滚动
      }
    },
    // 当组件被挂载到DOM上面，会回调mounted函数
    mounted: function () {
      setTimeout(() => {
        // 1.操作DOM，在前后添加Slide

        // 2.开启定时器
      }, 3000)
    },
    methods: {
      /**
       * 定时器操作
       */
      startTimer: function () {

      },
      stopTimer: function () {

      },

      /**
       * 滚动到正确的位置
       */

      /**
       * 校验正确的位置
       */

      /**
       * 设置滚动的位置
       */

      /**
       * 操作DOM，在DOM添加Slide
       */
      handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');

      }

      /**
       * 拖动事件处理
       */

      /**
       * 控制上一个，下一个
       */

    }
  }
</script>

<style scoped>
  #swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
  }

  .indi_item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    margin: 0 5px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
  }


</style>
