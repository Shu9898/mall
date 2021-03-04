<template>
  <div class="profile_list">
    <div class="profile_list_item1">我的消息</div>
    <div class="profile_list_item2">积分商城</div>
    <div class="profile_list_item3">会员卡</div>
    <div class="profile_list_item4">我的购物车</div>
    <div class="profile_list_item5">下载购物APP</div>
  </div>
</template>

<script>
  export default {
    name: "ProfileList",
  }
</script>

<style scoped>
  div[class*="profile_list_item"] {
    position: relative;
    padding: 12px 50px;
    border-bottom: 1px solid #eeeeee;
  }

  div[class*="profile_list_item"]::before {
    position: absolute;
    top: 11px;
    left: 20px;
    content: '\e945';
    font-family: 'icomoon';
    font-size: 18px;
    color: var(--color-tint);
  }

  div.profile_list_item2::before {
    content: '\ead0';
  }

  div.profile_list_item3::before {
    content: '\eaa0';
  }

  div.profile_list_item4::before {
    content: '\e93a';
  }

  div.profile_list_item5::before {
    content: '\ea3f';
  }
</style>
