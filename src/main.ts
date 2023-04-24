/*
 * @Date: 2023-04-19 14:00:12
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-24 09:47:01
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router/router";

import "@/assets/style.less";
import "normalize.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("AppIcon", Appicon); // * 阿里图标库

app.mount("#app");
