<!--
 * @Date: 2023-04-17 16:07:31
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-23 16:52:34
 * @Description: 
-->
<script setup lang="ts">
  import * as mapWork from "./map";

  const { mapLifeCycle } = useMarsMapStore();
  mapLifeCycle(mapWork.lifeCycle);
</script>

<template>
  <PageBox> 123 </PageBox>
</template>

<style lang="less" scoped></style>
