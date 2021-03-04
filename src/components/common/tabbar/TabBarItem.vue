<template>
  <div id="tab_bar_item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'hotpink'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace({path: this.path}, onComputed => {}, onAbort => {})
        // this.$router.push({path: this.path}, onComputed => {}, onAbort => {})
      }
    }
  }
</script>

<style scoped>
  #tab_bar_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #tab_bar_item img {
    width: 22px;
    height: 22px;
    margin-top: 2px;
  }

  #tab_bar_item p {
    margin-top: 2px;
    font-size: var(--font-size);
  }
</style>
