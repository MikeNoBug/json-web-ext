/**
 * React渲染器 - 负责在页面中渲染React组件
 */

import { createRoot, Root } from "react-dom/client";
import { YapiApp } from "./components";
import "./styles/index.css";

// 存储React根实例
let reactRoot: Root | null = null;
let containerElement: HTMLDivElement | null = null;

/**
 * 创建并渲染YApi React应用
 * @param domain 域名
 * @param interfaceId 接口ID
 */
export const renderYapiApp = (domain: string, interfaceId: string): void => {
  // 如果已经存在，先清理
  removeYapiApp();

  // 创建容器元素
  containerElement = document.createElement("div");
  containerElement.id = "yapi-app-container";

  // 设置容器样式，确保不影响页面布局
  containerElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2147483647;
  `;

  // 将容器添加到页面
  document.body.appendChild(containerElement);

  // 创建React根并渲染应用
  reactRoot = createRoot(containerElement);
  reactRoot.render(<YapiApp domain={domain} interfaceId={interfaceId} />);

  console.log(`YApi React应用已渲染，域名: ${domain}, 接口ID: ${interfaceId}`);
};

/**
 * 移除YApi React应用
 */
export const removeYapiApp = (): void => {
  if (reactRoot) {
    reactRoot.unmount();
    reactRoot = null;
  }

  if (containerElement) {
    containerElement.remove();
    containerElement = null;
  }
};

/**
 * 检查YApi应用是否已经渲染
 */
export const isYapiAppRendered = (): boolean => {
  return reactRoot !== null && containerElement !== null;
};
