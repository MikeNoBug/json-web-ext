/**
 * YApi API请求相关功能
 */

import { buildApiUrl } from "./utils";
import { showApiResult } from "./ui";
import { ApiResponse } from "./types";

/**
 * 发起接口数据请求
 * @param domain 域名
 * @param interfaceId 接口ID
 * @param button 按钮元素，用于更新状态
 */
export const requestInterfaceData = async (
  domain: string,
  interfaceId: string,
  button: HTMLButtonElement
): Promise<void> => {
  const apiUrl = buildApiUrl(domain, interfaceId);

  // 更新按钮状态为加载中
  const originalText = button.textContent;
  button.textContent = "请求中...";
  button.disabled = true;
  button.style.background = "#d9d9d9";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include", // 包含cookie用于身份验证
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP错误! 状态: ${response.status}`);
    }

    const data = await response.json();

    // 显示结果
    showApiResult(data);
  } catch (error) {
    console.error("API请求失败:", error);
    showApiResult({
      error: true,
      message: `请求失败: ${
        error instanceof Error ? error.message : "未知错误"
      }`,
    });
  } finally {
    // 恢复按钮状态
    button.textContent = originalText;
    button.disabled = false;
    button.style.background = "#1890ff";
  }
};

/**
 * 发起接口数据请求 (React版本) - 只处理请求，不处理UI
 * @param domain 域名
 * @param interfaceId 接口ID
 * @returns Promise<ApiResponse> API响应数据
 */
export const requestInterfaceDataForReact = async (
  domain: string,
  interfaceId: string
): Promise<ApiResponse> => {
  const apiUrl = buildApiUrl(domain, interfaceId);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include", // 包含cookie用于身份验证
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP错误! 状态: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API请求失败:", error);
    return {
      error: true,
      message: `请求失败: ${
        error instanceof Error ? error.message : "未知错误"
      }`,
    };
  }
};
