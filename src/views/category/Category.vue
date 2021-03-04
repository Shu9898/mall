<template>
  <div id="category">
    <nav-bar class="category_nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category_content">
      <category-side-nav-bar :nav-data="navData"
                             class="side_nav"
                             @sideBarClick="sideBarClick"></category-side-nav-bar>
      <scroll class="item_content"
              ref="scroll"
              :probe-type="3"
              @scroll="scroll">
        <category-content :sub-category="subCategory"></category-content>
        <tab-control :titles="['综合', '新品', '销量']"
                     @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
    </div>
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //引入公共组件
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  //引入子组件
  import CategorySideNavBar from "./childComps/CategorySideNavBar";
  import CategoryContent from "./childComps/CategoryContent";

  //引入方法或类
  import {getCategoryNavData, getSubCategory, getSubCategoryDetail} from "network/category";
  import {debounce} from "common/utils";
  import {backTopMixin} from "common/mixin";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      CategorySideNavBar,
      CategoryContent,
    },
    data() {
      return {
        navData: [],
        maitKey: '',
        miniWallkey: '',
        subCategory: {},
        goods: {
          'pop': {list: []},
          'new': {list: []},
          'sell': {list: []}
        },
        currentType: 'pop',
        saveY: 0,
      }
    },
    mixins: [backTopMixin],
    created() {
      this.getCategoryNavData()
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 300)
      this.$bus.$on('subCategoryImageLoad', () => {
        refresh()
      })
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
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
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 网路请求相关方法
       */
      getCategoryNavData() {
        getCategoryNavData().then(res => {
          // console.log(res)
          this.navData = res.data.category.list
          this.maitKey = this.navData[0].maitKey
          this.miniWallkey = this.navData[0].miniWallkey
          this.getSubCategory(this.maitKey)
          this.getSubCategoryDetail(this.miniWallkey, 'pop')
        }).catch(err => {
          console.log(err)
        })
      },
      getSubCategory(maitKey) {
        getSubCategory(maitKey).then(res => {
          // console.log(res)
          this.subCategory = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      getSubCategoryDetail(miniWallkey, currentType) {
        getSubCategoryDetail(miniWallkey, currentType).then(res => {
          // console.log(res)
          this.goods[currentType].list = res
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 监听点击相关的方法
       */
      sideBarClick(index) {
        // 点击侧边导航，通过网络请求请求对应的数据
        this.maitKey = this.navData[index].maitKey
        this.miniWallkey = this.navData[index].miniWallkey
        this.currentType = 'pop'
        this.getSubCategory(this.maitKey)
        this.getSubCategoryDetail(this.miniWallkey, 'pop')
        this.$refs.scroll.scrollTo(0, 0)
      },
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
        this.getSubCategoryDetail(this.miniWallkey, this.currentType)
      },
      scroll(position) {
        this.isShowBackTop = ( - position.y) > 1000
      }
    },
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .category_nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .category_content {
    position: relative;
    height: calc(100% - 44px - 49px);
  }

  .side_nav {
    position: absolute;
    left: 0;
    top: 0;
    right: 75%;
    bottom: 0;
  }

  .item_content {
    position: absolute;
    right: 0;
    left: 25%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

</style>
