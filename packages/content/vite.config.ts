import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // 构建目标为 chrome 扩展的 background
    target: "esnext",
    // 输出目录
    outDir: "../../dist/content",
    // 库模式打包

    // 清空输出目录
    emptyOutDir: true,
    rollupOptions: {
      // 入口文件
      input: "src/index.ts",
      output: {
        entryFileNames: "index.js",
      },
    },
  },
});
