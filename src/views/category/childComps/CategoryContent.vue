<template>
  <div class="content">
    <div v-for="item in subCategory.list" class="category_item">
      <img :src="item.image" alt="" @load="imageLoad">
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryContent",
    props: {
      subCategory: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('subCategoryImageLoad')
      }
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .category_item {
    flex: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  .category_item img {
    width: 60px;
    height: 60px;
  }

  .category_item .title {

  }
</style>
