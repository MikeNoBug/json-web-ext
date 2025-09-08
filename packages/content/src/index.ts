import { initYapiFeature } from "./yapi";
// 导入Antd样式
import "antd/dist/reset.css";

/**
 * 主函数
 */
const main = () => {
  // 初始化YApi功能 (现在使用React渲染)
  initYapiFeature();

  // 原有的右键菜单监听
  document.addEventListener("contextmenu", (e) => {
    console.log("content", e);
  });
};

main();
