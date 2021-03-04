<template>
  <div class="side_nav_bar">
    <div v-for="(item, index) in navData"
         class="side_bar_item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">{{item.title}}</div>
  </div>
</template>

<script>
  export default {
    name: "CategorySideNavBar",
    props: {
      navData: {
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
        this.$emit('sideBarClick', index)
      }
    }
  }
</script>

<style scoped>
  .side_nav_bar {
    display: flex;
    flex-direction: column;
  }

  .side_bar_item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 3px solid #ffffff;
  }

  .active {
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
  }
</style>
