/**
 * YApi UI相关功能
 */

import { ApiResponse } from "./types";

/**
 * 创建API请求按钮
 * @param domain 域名
 * @param interfaceId 接口ID
 * @param onRequest 点击按钮时的回调函数
 */
export const createApiButton = (
  domain: string,
  interfaceId: string,
  onRequest: (
    domain: string,
    interfaceId: string,
    button: HTMLButtonElement
  ) => Promise<void>
): void => {
  // 检查是否已经存在按钮，避免重复创建
  if (document.getElementById("yapi-request-btn")) {
    return;
  }

  const button = document.createElement("button");
  button.id = "yapi-request-btn";
  button.textContent = "获取接口数据";
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 10px 20px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  `;

  // 悬停效果
  button.addEventListener("mouseenter", () => {
    button.style.background = "#40a9ff";
    button.style.transform = "translateY(-1px)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "#1890ff";
    button.style.transform = "translateY(0)";
  });

  // 点击事件：发起API请求
  button.addEventListener("click", async () => {
    await onRequest(domain, interfaceId, button);
  });

  document.body.appendChild(button);
};

/**
 * 显示API请求结果
 * @param data 响应数据
 */
export const showApiResult = (data: ApiResponse): void => {
  // 移除之前的结果面板
  const existingPanel = document.getElementById("yapi-result-panel");
  if (existingPanel) {
    existingPanel.remove();
  }

  const panel = document.createElement("div");
  panel.id = "yapi-result-panel";
  panel.style.cssText = `
    position: fixed;
    top: 70px;
    right: 20px;
    width: 400px;
    max-height: 500px;
    z-index: 10001;
    background: white;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    overflow: hidden;
  `;

  // 创建标题栏
  const header = document.createElement("div");
  header.style.cssText = `
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  header.innerHTML = `
    <span>接口数据</span>
    <button id="close-panel" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #999;">×</button>
  `;

  // 创建内容区域
  const content = document.createElement("div");
  content.style.cssText = `
    padding: 16px;
    max-height: 400px;
    overflow-y: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    line-height: 1.5;
  `;

  // 格式化显示数据
  if (data.error) {
    content.style.color = "#ff4d4f";
    content.textContent = data.message || "未知错误";
  } else {
    content.innerHTML = `<pre style="margin: 0; white-space: pre-wrap;">${JSON.stringify(
      data,
      null,
      2
    )}</pre>`;
  }

  panel.appendChild(header);
  panel.appendChild(content);
  document.body.appendChild(panel);

  // 关闭按钮事件
  document.getElementById("close-panel")?.addEventListener("click", () => {
    panel.remove();
  });

  // 点击外部关闭面板
  document.addEventListener("click", function closeOnClickOutside(e) {
    if (
      !panel.contains(e.target as Node) &&
      !document.getElementById("yapi-request-btn")?.contains(e.target as Node)
    ) {
      panel.remove();
      document.removeEventListener("click", closeOnClickOutside);
    }
  });
};

/**
 * 移除yapi相关UI元素
 */
export const removeYapiElements = (): void => {
  document.getElementById("yapi-request-btn")?.remove();
  document.getElementById("yapi-result-panel")?.remove();
};
