/**
 * YApi相关工具函数
 */

/**
 * 检查当前页面URL是否匹配yapi接口页面格式
 * @returns 如果匹配返回{域名，接口ID}，否则返回null
 */
export const checkYapiUrl = (): {
  domain: string;
  interfaceId: string;
} | null => {
  const currentUrl = window.location.href;
  // 匹配格式：https://{包含yapi的域名}/project/{projectId}/interface/api/{interfaceId}
  const yapiUrlPattern =
    /https:\/\/([^\/]*yapi[^\/]*)\/project\/\d+\/interface\/api\/(\d+)/;
  const match = currentUrl.match(yapiUrlPattern);

  if (match && match[1] && match[2]) {
    return {
      domain: match[1],
      interfaceId: match[2],
    };
  }

  return null;
};

/**
 * 构建API请求URL
 * @param domain 域名
 * @param interfaceId 接口ID
 * @returns API请求URL
 */
export const buildApiUrl = (domain: string, interfaceId: string): string => {
  return `https://${domain}/api/interface/get?id=${interfaceId}`;
};
