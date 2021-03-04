<template>
  <div class="tab_control">
    <!--当动态绑定的active为true的时候，才会将active加到元素的class上面-->
    <div v-for="(item, index) in titles"
         class="tab_item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab_control {
    display: flex;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
  }

  .tab_item {
    flex: 1;
  }

  .tab_item span {
    padding: 4px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>









