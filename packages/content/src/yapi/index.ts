/**
 * YApi功能模块主入口
 */

import { checkYapiUrl } from "./utils";
import { removeYapiElements } from "./ui";
import { renderYapiApp, removeYapiApp, isYapiAppRendered } from "./renderer";

/**
 * 初始化YApi功能 (使用React渲染)
 */
export const initYapiFeature = (): void => {
  // 页面加载完成后检查URL
  const checkAndRenderApp = () => {
    const yapiInfo = checkYapiUrl();
    if (yapiInfo) {
      console.log(
        `检测到yapi接口页面，域名: ${yapiInfo.domain}, 接口ID: ${yapiInfo.interfaceId}`
      );

      // 使用React渲染YApi应用
      renderYapiApp(yapiInfo.domain, yapiInfo.interfaceId);
    } else {
      // 如果不是YApi页面，移除现有的应用
      if (isYapiAppRendered()) {
        removeYapiApp();
      }
    }
  };

  // 立即检查一次
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndRenderApp);
  } else {
    checkAndRenderApp();
  }

  // 监听URL变化（SPA应用可能需要）
  let currentUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      // 移除旧的React应用
      removeYapiApp();
      // 移除旧按钮和面板（兼容性）
      removeYapiElements();
      // 重新检查并渲染
      setTimeout(checkAndRenderApp, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// 导出所有功能
export * from "./types";
export * from "./utils";
export * from "./ui";
export * from "./api";
export * from "./components";
export * from "./renderer";
