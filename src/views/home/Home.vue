<template>
  <div id="home">
    <!--给nav-bar添加类设置非公共样式-->
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab_control"
      v-show="isTabFixed"></tab-control>
    <!--probe-type要动态绑定，如果没有动态绑定，那么传的任何东西都是字符串，这里需要传数字，所以要动态绑定-->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper
        :banner="banner"
        @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature></feature>
      <!--    使用props传数据，当需要传对象或者数组以及变量的时候，需要动态绑定-->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import Feature from "./childComps/Feature";

  // 公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  // 依赖的一些方法
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      // 注册组件的时候最好也按照组件引入的顺序注册
      HomeSwiper,
      RecommendView,
      Feature,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          // 默认将这三个类型的第一页数据请求下来并进行展示，其他数据等到用户在对应的类型进行上拉操作再请求
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImgLoad: null
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1.请求首页轮播图等多个数据
      // getHomeMultidata().then(res => {
      //   // console.log(res)
      //   this.banner = res.data.banner.list
      //   this.recommend = res.data.recommend.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // 2.请求首页商品数据
      // getHomeGoods('pop', 1).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })

      // 3.将网络请求的getHomeMultidata和getHomeGoods抽取到methods里面作为methods的方法
      // 然后在created函数里面直接调用即可
      // 这里注意要通过this拿到methods里面的方法并调用，如果没有this则仍是调用导入的那两个方法
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 200)
      // refresh就是调用debounce返回的函数
      // refresh = function (...args) {
      //   if(timer) clearTimeout(timer)
      //   timer = setTimeout(() => {
      //     this.$refs.scroll.refresh.apply(this, args)
      //   }, 500)
      // }

      // 保存回调函数
      // this.itemImgLoad = () => {
      //   // 调用scroll对象的refresh方法
      //   // this.$refs.scroll.refresh()
      //   // 为了防止refresh函数被频繁调用，将refresh函数做防抖处理
      //   refresh()
      // }

      // 监听事件总线itemImageLoad/监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', this.itemImgLoad)

      // 2.获取tabControl的offsetTop
      // this.tabOffsetTop = this.$refs.tabControl.offsetTop
      // console.log(this.$refs.tabControl.offsetTop); // undefined
      // 如果是普通的div或者其他标签可以直接获取它的offsetTop，但是组件不能直接获取
      // 可以通过组件中的元素来获取组件的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      // console.log(this.$refs.tabControl)
      // console.log(this.$refs.tabControl.$el)
      // console.log(this.$refs.tabControl.$el.offsetTop)
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    activated() {
      // console.log('activated')
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // 滚动到指定高度之后最好调用refresh刷新重新计算高度，否则可能出现自动滚回顶部的情况
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存滚动的位置Y
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgLoad)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*防抖函数
      * 防抖函数中需要传入两个参数：1）需要防抖的函数func 2）等待时间delay
      * */
      // debounce中需要传入两个参数：
      // （1）func需要防抖处理的函数
      // （2）delay延迟时间
      // debounce(func, delay) {
      //   // 用这个timer来记录有没有定时器
      //   let timer = null
      //   // 利用闭包，返回一个函数
      //   return function (...args) {
      //     // 如果上次定时器没有清除，则清除定时器
      //     if(timer) clearTimeout(timer)
      //     // 开启新的定时器
      //     timer = setTimeout(() => {
      //       // 当延迟时间达到delay,则调用func
      //       // 如果直接调用func（func()），那么func的this指向的永远是window
      //       // 调用apply将func的this指向debounce函数return的这个函数的this
      //       // return的函数中的this也就是指向直接调用return的函数那个对象
      //       func.apply(this, args)
      //       // console.log(this)
      //     }, delay)
      //   }
      // },

      /**
       * 监听点击事件的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让两个tabControl中的currentIndex保持一致，都等于最新的index即可
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        // console.log(position)
        this.isShowBackTop = ( - position.y) > 1000

        //2.决定TabControl是否吸顶（position: fixed）
        this.isTabFixed = ( - position.y) > this.tabOffsetTop

      },
      loadMore() {
        // console.log('上拉加载啊啊啊')
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      // loadMore() {
      //   console.log('上拉加载更多把')
      //   // 请求更多数据
      //   this.getHomeGoods(this.currentType)
      //   // 一次上拉加载完成后调用scroll对象的finishPullUp()方法，以实现可以再次上拉加载
      //   this.$refs.scroll.finishPullUp()
      //   // 调用refresh()重新计算可滚动高度
      //   this.$refs.scroll.scroll.refresh()
      // },
      swiperImageLoad() {
        // console.log('轮播图已经加载完成了')
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // console.log(this.tabOffsetTop)
      },
      /**
       * 网路请求的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        }).catch(err => {
          console.log(err)
        })
      },
      getHomeGoods(type) {
        // 通过传入的type动态获取对应的page并+1
        let page = this.goods[type].page + 1
        // 请求当前加载页面的下一页数据
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          // 将网络请求拿到的数据保存到对应的list中
          this.goods[type].list.push(...res.data.list)
          // 请求完成之后修改对应的page值
          this.goods[type].page += 1
        }).catch(err => {
          console.log(err)
        })
        // this.$refs.scroll.finishPullUp()
      }
    },
  }
</script>

<style scoped>
  #home {
    position: relative;
    /*padding-top: 44px;*/
    height: 100vh;
    /*100vh即100%视口高度*/
    /*100vw即100%视口宽度*/
  }

  /*设置导航的非公共样式*/
  .home_nav {
    /*这里的定位是为了防止使用原生滚动时，导航会跟着滚动*/
    /*如果是使用Better-scroll滚动的话，就没必要设置定位了，因为better-scroll可以实现局部滚动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 10;*/
    background-color: var(--color-tint);
    color: #fff;
  }

  /*.tab_control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 1;*/
  /*}*/

  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

  .tab_control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
