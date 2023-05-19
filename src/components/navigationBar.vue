<!--
 * @Date: 2023-04-23 15:45:49
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-23 16:22:04
 * @Description: 底部导航栏
-->
<script setup lang="ts" name="navigationBar">
  const route = useRoute();
  const router = useRouter();
  const goPage = (path: string) => {
    router.push(path);
  };
  const link = [
    { name: "城市白模", path: "/page1" },
    { name: "模型漫游", path: "/page2" },
    { name: "加载模型", path: "/page3" }
  ];
</script>

<template>
  <div class="navigationBar">
    <div
      class="navItem"
      :class="{ navItemActive: item.path === route.path }"
      v-for="item in link"
      @click="goPage(item.path)">
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="less" scoped>
  .navigationBar {
    @h: 28px;
    position: absolute;
    z-index: 30;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: @h;
    padding: 5px 0px;
    backdrop-filter: blur(4px);
    line-height: @h;
    background: #ad841342;
    display: flex;
    .navItem {
      // width: 55px;
      height: 100%;
      margin: 0 5px;
      padding: 0 5px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      font-size: 14px;
      color: #ffffffab;
    }
    .navItem:hover {
      background: #cf9b0a50;
    }
    .navItemActive {
      background: #cf9b0a50;
      color: rgb(240, 244, 248);
      text-shadow: 0 0 7px #ff9900;
    }
  }
</style>
