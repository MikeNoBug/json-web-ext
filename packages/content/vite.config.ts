import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // 为浏览器环境定义process.env
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": JSON.stringify({}),
    // 全局变量定义
    global: "globalThis",
    // 其他可能需要的Node.js变量
    "process.platform": JSON.stringify("browser"),
    "process.version": JSON.stringify("v18.0.0"),
  },
  build: {
    // 构建目标为 chrome 扩展的 content script
    target: "esnext",
    // 输出目录
    outDir: "../../dist/content",
    // 清空输出目录
    emptyOutDir: true,
    rollupOptions: {
      // 入口文件
      input: "src/index.ts",
      output: {
        entryFileNames: "index.js",
        // CSS文件名不带哈希
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return "assets/[name].[ext]";
        },
        // 不要内联动态导入
        inlineDynamicImports: true,
      },
    },
    // 不分离CSS文件到多个chunk
    cssCodeSplit: false,
    // 库模式，生成IIFE格式
    lib: {
      entry: "src/index.ts",
      formats: ["iife"],
      name: "ContentScript",
      fileName: () => "index.js",
    },
  },
  // 为了支持React开发
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
