<template>
  <div v-if="Object.keys(comment).length !== 0" class="detail_comment_info">
    <div class="comment_header">
      <div class="title">用户评价</div>
      <div class="more">更多</div>
    </div>
    <div class="comment_content">
      <div class="user">
        <img :src="comment.avatar" alt="" class="avatar">
        <span class="user_name">{{comment.userName}}</span>
      </div>
      <div class="content">
        <div class="user_content">{{comment.content}}</div>
        <span class="date">{{comment.date | showTime}}</span>
        <span class="style">{{comment.style}}</span>
        <div class="content_image"
             v-if="comment.images !== null">
          <img v-for="item in comment.images" :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate, formatDate12_24} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      comment: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showTime(value) {
        // 1.将时间戳转换为date对象
        const date = new Date(value * 1000)

        // 2.将date进行格式化
        // 24小时制
        // return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        // 12小时制
        return formatDate12_24(date, 'yyyy-MM-dd HH:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .detail_comment_info {
    padding: 10px 10px 15px;
    border-bottom: 5px solid #f7f7f7;
  }

  .comment_header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 15px;
    color: #363636;
    line-height: 30px;
  }

  .comment_content {
    padding: 10px 0;
  }

  .comment_content .user {
    display: flex;
    align-items: center;
  }

  .comment_content .user .avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 20px;
  }

  .comment_content .user .user_name {
    font-size: 14px;
  }

  .comment_content .content {
    margin-top: 10px;
    font-size: 14px;
  }

  .comment_content .content .user_content {
    margin-bottom: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .comment_content .content .date {
    margin-right: 10px;
    color: #a2a2a2;
  }

  .comment_content .content .style {
    color: #a2a2a2;
  }

  .comment_content .content .content_image {
    margin-top: 10px;
    display: flex;
  }

  .comment_content .content .content_image img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

</style>
