<template>
  <div id="profile">
    <nav-bar class="nav_bar">
      <div slot="center">我的</div>
    </nav-bar>
    <profile-login></profile-login>
    <profile-item></profile-item>
    <profile-list></profile-list>
  </div>
</template>

<script>
  // 引入公共组件
  import NavBar from "components/common/navbar/NavBar";

  // 引入子组件
  import ProfileLogin from "./childComps/ProfileLogin";
  import ProfileItem from "./childComps/ProfileItem";
  import ProfileList from "./childComps/ProfileList";

  // 引入方法和类

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileLogin,
      ProfileItem,
      ProfileList,
    },
  }
</script>

<style scoped>
  .nav_bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
