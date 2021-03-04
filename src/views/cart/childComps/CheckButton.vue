<template>
  <div class="check_button" :class="{active: isChecked}">
    <img v-if="isChecked" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check_button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check_button img {
    width: 16px;
    height: 16px;
    margin-bottom: 5px;
  }

  .active {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
