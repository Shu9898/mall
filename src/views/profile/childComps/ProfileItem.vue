<template>
  <div class="profile_item">
    <div class="item">
      <div>
        <span>{{showMoney}}</span>
        <span>元</span>
      </div>
      <div>我的余额</div>
    </div>
    <div class="item">
      <div>
        <span>{{discount}}</span>
        <span>个</span>
      </div>
      <div>我的优惠</div>
    </div>
    <div class="item">
      <div>
        <span>{{points}}</span>
        <span>分</span>
      </div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileItem",
    data() {
      return {
        money: 0,
        discount: 0,
        points: 0,
      }
    },
    computed: {
      showMoney() {
        return this.money.toFixed(2)
      }
    }

  }
</script>

<style scoped>
  .profile_item {
    display: flex;
    border-bottom: 10px solid #f2f2f2;
  }
  .profile_item .item {
    flex: 1;
    padding: 18px 0;
    text-align: center;
    border-right: 1px solid #eee;
  }

  .profile_item .item div:nth-child(1) span:nth-child(1) {
    margin-right: 2px;
    font-size: 20px;
    color: #f77249;
    font-weight: 700;
  }

  .profile_item .item div:nth-child(2) {
    margin-top: 5px;
  }

</style>
