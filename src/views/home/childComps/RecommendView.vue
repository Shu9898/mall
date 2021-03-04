<template>
  <div class="recommend_view">
    <div v-for="item in recommend" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend_view {
    display: flex;
    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend_item {
    flex: 1;
    text-align: center;
  }

  .recommend_item img {
    width: 80%;
    margin-bottom: 7px;
  }
</style>
