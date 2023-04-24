<!--
 * @Date: 2023-04-17 16:07:31
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-24 13:11:45
 * @Description: 
-->
<script setup lang="ts">
  import * as mapWork from "./map";
  // 只有action可以直接解构,state和getter解构会丢失响应性 需要用storeToRefs包裹
  // const { mapLifeCycle } = useMarsMapStore();
  // mapLifeCycle(mapWork.lifeCycle);
  useLifeCycle(mapWork.lifeCycle)
</script>

<template>
  <PageBox> 123 </PageBox>
</template>

<style lang="less" scoped></style>
