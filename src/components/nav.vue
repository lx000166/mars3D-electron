<!--
 * @Date: 2023-04-19 14:00:12
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-19 15:47:00
 * @Description: 
-->
<script setup lang="ts" name="AppNav">
  const control = [
    { key: "mini", icon: "icon-2zuixiaohua-2" },
    { key: "big", icon: "icon-zuidahua1" },
    { key: "close", icon: "icon-close-bold" }
  ];

  const controlButtonClick = (val: string) => {
    window.ipc.send("navBar", val);
  };
</script>

<template>
  <div id="appNav" class="drag">
    <div class="no-drag appNav_left"></div>
    <div class="no-drag appNav_right">
      <div
        v-for="item in control"
        :key="item.key"
        @click="controlButtonClick(item.key)"
        class="controlButton">
        <AppIcon class="app-icon" :type="item.icon" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  #appNav {
    width: 100vw;
    height: var(--nav-height);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: aliceblue;
    mix-blend-mode: difference;

    .appNav_left,
    .appNav_right {
      height: 100%;
    }

    .appNav_right {
      .controlButton {
        font-size: 12px;
        text-align: center;
        line-height: var(--nav-height);
        height: var(--nav-height);
        width: 36px;
        display: inline-block;
      }
      .controlButton:hover {
        background-color: #81818186;
      }
      .controlButton:last-child:hover {
        background-color: #fa0000cb;
      }
    }
  }
</style>
