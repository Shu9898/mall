<template>
  <div class="profile_login">
    <div class="left">
      <img src="~assets/img/common/placeholder.png" alt="">
    </div>
    <div class="center">
      <div class="login">登录/注册</div>
      <div class="phone">暂无绑定手机号</div>
    </div>
    <div class="right">
      <div class="to"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileLogin"
  }
</script>

<style scoped>
  .profile_login {
    display: flex;
    align-items: center;
    padding: 10px 0;
    background-color: var(--color-tint);
    color: #fff;
  }

  .left {
    flex: 30%;
    text-align: center;
  }

  .left img {
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }

  .center {
    flex: 60%;
  }

  .center .login {
    font-size: 18px;
  }

  .center .phone {
    position: relative;
    margin-top: 8px;
    padding-left: 20px;
  }

  .center .phone::before {
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'icomoon';
    content: "\e958";
  }

  .right {
    flex: 10%;
    font-size: 20px;
  }

  .right .to {
    width: 12px;
    height: 12px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(45deg);
  }

</style>
