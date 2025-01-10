<template>
  <div>
    <h1>Feishu Block</h1>
    <p>Feishu Block Content</p>
  </div>
</template>

<script setup lang="ts">
/**
 * 数据协议
 * type FeishuBlock = {
    type: 'feishu',
    props: {
        docId: string;
    },
    style: {
        color: string;
        bgColor: string;
        lineHeight: number | string
    },
    events: {

    },
    lifeCircle: {
        onInit() {},
        onDestroy() {}
    }
}
 */
import { defineAsyncComponent } from "vue";

export const FeishuBlockRenderer = () => {
  return;
};
</script>

<style scoped></style>
