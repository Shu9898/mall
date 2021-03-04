<template>
  <div class="detail">
    <detail-nav-bar class="detail_nav_bar"
                    @titleClick="titleClick"
                    ref="detail_nav_bar"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-comment-info :comment="comment" ref="comment"></detail-comment-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @detailImageLoad="detailImageLoad"
                         ref="detail"></detail-goods-info>
      <detail-goods-params :goods-params="goodsParams"></detail-goods-params>
      <detail-recommend :goods="recommendList" ref="recommend"></detail-recommend>
    </scroll>
    <back-top @click.native="backClick"
              v-if="isShowBackTop"></back-top>
    <detail-tab-bar @addCart="addToCart"></detail-tab-bar>
<!--    <toast :message="message" :is-show="isShowToast"></toast>-->
  </div>
</template>

<script>
  //公共组件
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";

  // 子组件
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommend from "./childComps/DetailRecommend";
  import DetailTabBar from "./childComps/DetailTabBar";

  // 引入方法或类
  import {getDetailData, Goods, Shop, Detail, Params, Comment} from "network/detail";
  import {getRecommendData} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      // Toast,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailRecommend,
      DetailTabBar,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParams: {},
        comment: {},
        recommendList: [],
        // itemImgLoad: null,
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,
        // isShowBackTop: false,
        // message: '',
        // isShowToast: false,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.id

      // 2.根据iid请求数据
      this.getDetailData(this.iid)

      // 3.请求推荐信息的数据
      this.getRecommendData()

      // 1)获取主题的offsetTop -> 不行，获取不到元素
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)

      // 4.给getThemeTopYs赋值
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // hack做法
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      }, 200)
    },
    activated() {
      // 保存传入的iid
      // 不能放在created函数里面，可以放在activated函数里面
      // 因为keep-alive的作用会使这个组件只创建一次，即created函数只调用一次
      // this.iid = this.$route.params.id
    },
    mounted() {
      // 对refresh函数做防抖处理
      const refresh = debounce(this.$refs.scroll.refresh, 300)
      // 对refresh函数做节流处理
      // const refresh = throttle(this.$refs.scroll.refresh, 300)

      // 保存回调函数
      // this.itemImgLoad = () => {
      //   refresh()
      // }

      // 商品详情图片的监听
      // this.$bus.$on('detailImageLoad', () => {
      //   refresh()
      // })
      // 商品参数图片的监听
      this.$bus.$on('paramsImageLoad', () => {
        refresh()
      })
      //商品推荐图片的监听
      // this.$bus.$on('itemImageLoad', this.itemImgLoad)

      // 2)获取主题的offsetTop -> 不行，网络请求的数据有可能还没获取到
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)

    },
    updated() {
      // 每次获取前先清除原有的数据
      // this.themeTopYs = []
      // 4)获取主题的offsetTop
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    },
    destroyed() {
      // Detail.vue没有使用keep-alive保留状态，所以不能使用deactivated函数
      // 这里可以使用destroyed函数
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgLoad)
    },
    methods: {
      ...mapActions([
        'addCartList',
      ]),
      /**
       *网络请求相关的方法
       */
      // 请求推荐信息数据
      getRecommendData() {
        getRecommendData().then(res => {
          // console.log(res)
          this.recommendList = res.data.list
        }).catch(err => {
          console.log(err)
        })
      },
      // 请求详情页数据（除了推荐信息的数据）
      getDetailData(iid) {
        getDetailData(iid).then(res => {
          // console.log(res)
          // 将数据进行抽取并保存
          // 1.获取顶部轮播图数据
          this.topImages = res.result.itemInfo.topImages

          // 2.获取商品基本信息
          this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

          // 3.获取店铺的信息
          this.shop = new Shop(res.result.shopInfo)

          // 4.保存商品的详情数据
          this.detailInfo = new Detail(res.result.detailInfo)

          // 5.获取商品参数信息
          this.goodsParams = new Params(res.result.itemParams)

          // 6.获取用户评论信息，有些商品没有评论，需要先做判断
          if(res.result.rate.cRate !== 0) {
            this.comment = new Comment(res.result.rate)
          }
          // 3)请求完数据后直接获取offsetTop
          // 获取主题的offsetTop -> 虽然数据已经获取到，但是页面渲染需要一定的时间，这里也获取不到元素
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)

          // 5)在nextTick的回调函数中获取offsetTop
          // 获取到数据之后，会进行DOM的渲染，渲染完之后会来到这里回调this.$nextTick中的回调函数
          // 根据最新的数据，对应的DOM已经被渲染出来了，但是图片还没加载完成，所以这里获取到的offsetTop没有包含图片高度
          this.$nextTick(() => {
            // 获取主题的offsetTop
            // this.themeTopYs.push(0)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs)
          })
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 监听事件
       */
      detailImageLoad() {
        // const refresh = debounce(this.$refs.scroll.refresh, 300)
        this.refresh()
        // 这里没有闭包，每次执行完detailImageLoad之后就会释放函数的局部变量refresh，达不到防抖的效果
        // 所以需要将refresh保存起来

        // 6)获取主题的offsetTop
        // 在监听到图片加载完成之后，获取主题的offsetTop
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.detail.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)

        // 监听到图片加载完成，调用getThemeTopYs函数以获取新的offsetTop
        this.getThemeTopYs()


      },
      titleClick(index) {
        // console.log(index)
        //根据index滚动到对应的主题
        this.$refs.scroll.scrollTo(0, - this.themeTopYs[index], 200)
      },
      scroll(position) {
        // if( - position.y < this.themeTopYs[1]) {
        //   this.$refs.detail_nav_bar.currentIndex = 0
        // }
        // else if( - position.y >= this.themeTopYs[1] && - position.y < this.themeTopYs[2]) {
        //   this.$refs.detail_nav_bar.currentIndex = 1
        // }
        // else if( - position.y >= this.themeTopYs[2] && - position.y < this.themeTopYs[3]) {
        //   this.$refs.detail_nav_bar.currentIndex = 2
        // }
        // else if( - position.y >= this.themeTopYs[3] ) {
        //   this.$refs.detail_nav_bar.currentIndex = 3
        // }

        for(let i in this.themeTopYs) {
          // 这里拿到的i是String类型
          // 将i转换为Number：i * 1 或者 parseInt(i)
        }

        for(let i = 0; i < this.themeTopYs.length - 1; i++) {
          // 这里拿到的i是Number类型，因为前面定义i的时候给i赋值为数字0
          // 这里分成两种情况：
          // 当i小于数组长度-1，通过 i < this.themeTopYs.length - 1 && - position.y >= this.themeTopYs[i] && - position.y < this.themeTopYs[i + 1])判断
          // 当i等于数组长度判断，如果按照上面的方式会出现越界，所以单独作为另一种情况来判断， (i === this.themeTopYs.length - 1 && - position.y >= this.themeTopYs[i])
          // 在以上的基础上，此判断会很频繁，每次滚动的时候都会循环进行判断，所以可以记录当前的i值，当i值发生改变的时候，在进行判断修改

          // 1.普通做法：
          // if((this.currentIndex !== i) && ((i < this.themeTopYs.length - 1 && - position.y >= this.themeTopYs[i] && - position.y < this.themeTopYs[i + 1]) || (i === this.themeTopYs.length - 1 && - position.y >= this.themeTopYs[i]))){
          //   this.currentIndex = i
          //   this.$refs.detail_nav_bar.currentIndex = this.currentIndex
          //   // console.log(i)
          // }

          // 2.hack做法：
          if((this.currentIndex !== i) && ( - position.y >= this.themeTopYs[i] && - position.y < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.detail_nav_bar.currentIndex = this.currentIndex
          }
        }

        // 决定是否显示BackTop
        this.isShowBackTop = ( - position.y) > 1000
      },
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0, 1000)
      // }
      addToCart() {
        // console.log('加入购物车')
        // 获取需要在购物车展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.realPrice = this.goods.realPrice
        product.iid = this.iid

        // this.$store.state.cartList.push(product)
        // this.$store.commit('addCartList', product)

        // this.$store.dispatch('addCartList', product).then(res => {
        //   console.log(res)
        // })

        this.addCartList(product).then(res => {
          // this.isShowToast = true
          // this.message = res
          // setTimeout(() => {
          //   this.isShowToast = false
          //   this.message = ''
          // }, 1000)

          this.$toast.show(res, 2000)

        })
      }
    },
  }
</script>

<style scoped>
  .detail {
    position: relative;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.content {*/
  /*  height: calc(100% - 44px);*/
  /*  overflow: hidden;*/
  /*}*/

</style>
