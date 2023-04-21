<!--
 * @Date: 2023-04-19 14:00:12
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-19 17:33:14
 * @Description: 
-->
<script setup lang="ts">
  import { useMarsMapStore } from "~s/marsMapStore";
  const store = useMarsMapStore();

  onMounted(() => {
    store.setMap("mars3dContainer");
  });
</script>

<template>
  <div id="app">
    <Nav />
    <div id="mars3dContainer" class="mains mars3d-container"></div>
  </div>
</template>

<style lang="less" scoped>
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    .mains {
      height: 100vh;
      width: 100vw;
    }
  }
</style>
