<template>
  <div class="wrapper" ref="wrapper" >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      /*// this.scroll = new BScroll(document.querySelector('.wrapper'), {})
      // 这里最好不要通过document.querySelector('.wrapper')来获取.wrapper对应的元素，因为一个项目有可能有很多个.wrapper对应的元素，这里获取到的不一定是想要的那个元素。
      // 可以通过给元素设置ref属性，然后通过this.$refs.refname来获取到对应的元素，这样获取到的元素就是唯一的*/
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', position => {
        // console.log(position)
        this.$emit('scroll', position)
      })

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多！！！')
        this.$emit('pullingUp')
      })
    },
    methods: {
      // time=300：表示如果不传time，则默认time是300ms
      scrollTo(x, y, time=300) {
        // 判断是否有scroll对象再调用scroll对象的方法
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
