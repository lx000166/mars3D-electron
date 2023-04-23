/*
 * @Date: 2023-04-17 15:36:45
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-23 11:30:07
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// ? <script setup lang="ts" name="xxx">
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { electronStart } from "./plugin/vite-plugin-electron/index";
import { vitePluginMars3d } from "vite-plugin-mars3d";

export default defineConfig({
  base: "./", // * 打包相对路径,否则electron加载index.html时找不到css,js文件
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
      "~s": path.resolve(__dirname, "src/stores"), // 路径别名
      "~h": path.resolve(__dirname, "src/hooks") // 路径别名
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    electronStart(),
    vitePluginMars3d(),
    // 自动按需导入组件库,自动导入components/*下组件
    Components({
      dts: "types/components.d.ts"
    }),
    // 自动引入
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      dts: "types/auto-import.d.ts", // d.ts文件输出目录
      dirs: ["./src/stores"]
    })
  ],
  build: {
    outDir: "output/vite" // 打包输出文件路径
  }
});
