import React from "react";
import { Button } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";

interface YapiButtonProps {
  /**
   * 按钮点击回调
   * @param domain 域名
   * @param interfaceId 接口ID
   */
  onClick: (domain: string, interfaceId: string) => Promise<void>;
  /**
   * 域名
   */
  domain: string;
  /**
   * 接口ID
   */
  interfaceId: string;
  /**
   * 加载状态
   */
  loading?: boolean;
}

/**
 * YApi请求按钮组件
 */
export const YapiButton: React.FC<YapiButtonProps> = ({
  onClick,
  domain,
  interfaceId,
  loading = false,
}) => {
  const handleClick = async () => {
    await onClick(domain, interfaceId);
  };

  return (
    <Button
      type="primary"
      icon={<CloudDownloadOutlined style={{ fontSize: "14px" }} />}
      loading={loading}
      onClick={handleClick}
      style={{
        position: "fixed",
        top: "50px",
        right: "20px",
        zIndex: 10000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      获取接口数据
    </Button>
  );
};
