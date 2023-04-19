/*
 * @Date: 2023-04-17 15:36:45
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-19 10:48:50
 * @Description:
 */
import { app, BrowserWindow, Menu, session } from "electron";
import { createWindow } from "./utils/createWindow";
import { onAppMenu, createAppMenu } from "./utils/menu";
import { onNavbar } from "./utils/navbar";
import { onRenderContextMenu } from "./utils/renderContextMenu";
import { loadVueDevTools } from "./utils/utils";

// 屏蔽控制台渲染进程使用不安全的方式加载资源 警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

onNavbar();
onAppMenu();
onRenderContextMenu();

// app.on("ready", () => {
//   // 设置app菜单
//   Menu.setApplicationMenu(createAppMenu());
//   createWindow(); // 创建窗口
//   // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
//   app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());
// });

// 替代{app.on("ready",()=>{})}
app.whenReady().then(() => {
  // 设置app菜单
  Menu.setApplicationMenu(createAppMenu());
  createWindow(); // 创建窗口
  loadVueDevTools();
  // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
  app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 macOS窗口全部关闭时,dock中程序不会退出
app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});
