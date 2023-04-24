<!--
 * @Date: 2023-04-19 14:00:12
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-24 09:02:44
 * @Description: 
-->
<script setup lang="ts">
  // 只有action可以直接解构,state和getter解构会丢失响应性 需要用storeToRefs包裹
  const { setMap } = useMarsMapStore();

  onMounted(() => {
    setMap("mars3dContainer");
  });
</script>

<template>
  <div id="app">
    <Nav />
    <NavigationBar />
    <div id="mars3dContainer" class="mars3dContainer"></div>
    <div id="mars3dContainer" class="viewContainer">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    .mars3dContainer,
    .viewContainer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
    }
    .mars3dContainer {
      z-index: 1;
    }
    .viewContainer {
      z-index: 2;
      pointer-events: none;
    }
  }
</style>
