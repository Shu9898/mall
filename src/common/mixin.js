import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgLoad: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 300)
    this.itemImgLoad = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgLoad)
  }
}



import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  // 在合并的时候，只会合并methods中的内容，methods中的方法不会合并，也就是说，当出现名字相同的方法，不会被合并，而是会被覆盖
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  }
}


export const keepState = {
  data() {
    return {
      saveY: 0,
    }
  },
  methods: {
    activated() {
      // console.log('activated')
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // 滚动到指定高度之后最好调用refresh刷新重新计算高度，否则可能出现自动滚回顶部的情况
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存滚动的位置Y
      this.saveY = this.$refs.scroll.getScrollY()
    },
  }
}
