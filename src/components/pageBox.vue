<!--
 * @Date: 2023-04-23 16:27:51
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-23 16:29:36
 * @Description: 
-->
<script setup lang="ts"></script>

<template>
  <div class="pageBox">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
  .pageBox {
    pointer-events: none;
    padding-top: var(--nav-height);
  }
</style>
