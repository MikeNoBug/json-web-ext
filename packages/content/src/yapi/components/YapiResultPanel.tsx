import React from "react";
import { Card, Button, Typography, message } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";
import { ApiResponse, ApiData } from "../types";

const { Text, Paragraph } = Typography;

/**
 * 生成API文档的Markdown格式
 * @param data API数据
 * @returns 格式化的Markdown字符串
 */
const generateMarkdownDoc = (data: ApiData): string => {
  const {
    query_path,
    method,
    req_query,
    res_body,
    req_body_form,
    req_body_other,
    title,
    desc,
  } = data;

  let markdown = `# ${title || "接口文档"}\n\n`;

  if (desc) {
    markdown += `## 接口描述\n${desc}\n\n`;
  }

  // 接口基本信息
  markdown += `## 接口信息\n`;
  markdown += `- **接口路径**: \`${query_path?.path || ""}\`\n`;
  markdown += `- **请求方法**: \`${method?.toUpperCase() || ""}\`\n\n`;

  // GET参数描述
  if (req_query && req_query.length > 0) {
    markdown += `## URL查询参数\n`;
    markdown += `| 参数名 | 是否必需 | 描述 | 示例 |\n`;
    markdown += `|--------|----------|------|------|\n`;
    req_query.forEach((param) => {
      markdown += `| ${param.name || ""} | ${
        param.required === "1" ? "是" : "否"
      } | ${param.desc || ""} | ${param.example || ""} |\n`;
    });
    markdown += `\n`;
  }

  // 请求体参数
  if (req_body_form && req_body_form.length > 0) {
    markdown += `## 请求体参数\n`;
    markdown += `| 参数名 | 是否必需 | 描述 | 示例 |\n`;
    markdown += `|--------|----------|------|------|\n`;
    req_body_form.forEach((param) => {
      markdown += `| ${param.name || ""} | ${
        param.required === "1" ? "是" : "否"
      } | ${param.desc || ""} | ${param.example || ""} |\n`;
    });
    markdown += `\n`;
  } else if (req_body_other) {
    markdown += `## 请求体参数\n`;
    markdown += `\`\`\`json\n${req_body_other}\n\`\`\`\n\n`;
  }

  // 返回数据结构
  if (res_body) {
    markdown += `## 响应数据结构\n`;
    markdown += `\`\`\`json\n${res_body}\n\`\`\`\n`;
  }

  return markdown;
};

interface YapiResultPanelProps {
  /**
   * API响应数据
   */
  data: ApiResponse;
  /**
   * 关闭面板回调
   */
  onClose: () => void;
  /**
   * 是否显示面板
   */
  visible: boolean;
}

/**
 * YApi结果展示面板组件
 */
export const YapiResultPanel: React.FC<YapiResultPanelProps> = ({
  data,
  visible,
  onClose,
}) => {
  if (!visible) return null;

  // 复制Markdown文档到剪贴板
  const handleCopyMarkdown = async () => {
    if (data.error || !data.data) {
      message.error("没有可复制的内容");
      return;
    }

    try {
      const markdownContent = generateMarkdownDoc(data.data);
      await navigator.clipboard.writeText(markdownContent);
      message.success("Markdown文档已复制到剪贴板");
    } catch (error) {
      message.error("复制失败，请重试");
    }
  };

  const renderContent = () => {
    if (data.error) {
      return (
        <Text type="danger" style={{ fontSize: "12px" }}>
          {data.message || "未知错误"}
        </Text>
      );
    }

    if (!data.data) {
      return (
        <Text type="warning" style={{ fontSize: "12px" }}>
          暂无数据
        </Text>
      );
    }

    const markdownContent = generateMarkdownDoc(data.data);

    return (
      <Paragraph
        code
        copyable={false}
        style={{
          margin: 0,
          fontSize: "12px",
          fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          maxHeight: "350px",
          overflow: "auto",
        }}
      >
        {markdownContent}
      </Paragraph>
    );
  };

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>接口文档</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!data.error && data.data && (
              <Button
                type="primary"
                size="small"
                icon={<CopyOutlined />}
                onClick={handleCopyMarkdown}
                title="复制Markdown文档"
              >
                复制
              </Button>
            )}
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onClose}
              title="关闭面板"
              style={{ color: "#666" }}
            >
              关闭
            </Button>
          </div>
        </div>
      }
      size="small"
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        width: "400px",
        maxHeight: "500px",
        zIndex: 10001,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {renderContent()}
    </Card>
  );
};
