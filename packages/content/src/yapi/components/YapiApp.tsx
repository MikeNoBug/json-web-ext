import React, { useState, useCallback } from "react";
import { ConfigProvider, message } from "antd";
import zhCN from "antd/locale/zh_CN";
import { YapiButton } from "./YapiButton";
import { YapiResultPanel } from "./YapiResultPanel";
import { ApiResponse } from "../types";
import { requestInterfaceDataForReact } from "../api";

interface YapiAppProps {
  /**
   * 域名
   */
  domain: string;
  /**
   * 接口ID
   */
  interfaceId: string;
}

/**
 * YApi主应用组件
 */
export const YapiApp: React.FC<YapiAppProps> = ({ domain, interfaceId }) => {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<ApiResponse | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  // 处理API请求
  const handleRequest = useCallback(
    async (domain: string, interfaceId: string) => {
      try {
        setLoading(true);
        const response = await requestInterfaceDataForReact(
          domain,
          interfaceId
        );
        setResultData(response);
        setPanelVisible(true);

        if (response.error) {
          message.error("请求失败");
        } else {
          message.success("数据获取成功");
        }
      } catch (error) {
        console.error("API请求失败:", error);
        message.error("请求失败，请稍后重试");
        setResultData({
          error: true,
          message: error instanceof Error ? error.message : "未知错误",
        });
        setPanelVisible(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 关闭结果面板
  const handleClosePanel = useCallback(() => {
    setPanelVisible(false);
    setResultData(null);
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <YapiButton
          domain={domain}
          interfaceId={interfaceId}
          onClick={handleRequest}
          loading={loading}
        />
        {resultData && (
          <YapiResultPanel
            data={resultData}
            onClose={handleClosePanel}
            visible={panelVisible}
          />
        )}
      </div>
    </ConfigProvider>
  );
};
