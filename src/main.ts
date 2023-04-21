/*
 * @Date: 2023-04-19 14:00:12
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-19 15:11:36
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import AppIcon from "@/utils/aliicons"; // * 阿里图标库
import router from "@/router/router";

import "@/assets/style.less";
import "normalize.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("AppIcon", AppIcon);

app.mount("#app");
