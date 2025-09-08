# Content Script - React + Antd 集成

## 概述

Content 包已经成功集成了 React 和 Antd，用于在 YApi 页面中渲染用户界面。

## 主要功能

- ✅ **React 框架集成**: 使用 React 18.3.1 构建组件化 UI
- ✅ **Antd UI 组件库**: 集成 Antd 5.20.0 提供现代化 UI 组件
- ✅ **TypeScript 支持**: 完整的 TypeScript 类型支持
- ✅ **Vite 构建配置**: 优化的 Vite 配置支持 React 和 CSS 打包
- ✅ **CSS 样式隔离**: 防止与宿主页面样式冲突的 CSS 隔离

## 技术架构

### 组件结构

```
src/yapi/components/
├── YapiApp.tsx           # 主应用组件
├── YapiButton.tsx        # API请求按钮组件
├── YapiResultPanel.tsx   # 结果展示面板组件
└── index.ts              # 组件导出文件
```

### 核心文件

- `renderer.tsx`: React 渲染器，负责在页面中挂载 React 应用
- `api.ts`: API 请求函数，包含 React 版本的 API 调用
- `styles/index.css`: 样式文件，确保与宿主页面样式隔离
- `index.ts`: 主入口文件，使用 React 渲染替代原有 DOM 操作

## 主要改进

### 1. 组件化架构

- 将原有的 DOM 操作代码重构为 React 组件
- 使用函数组件和 Hooks 管理状态
- 组件间通过 props 进行通信

### 2. 现代化 UI 体验

- 使用 Antd 组件库提供一致的视觉体验
- 支持加载状态、错误处理、消息提示
- 响应式设计和无障碍访问支持

### 3. 样式隔离

- 通过 CSS 作用域防止与宿主页面样式冲突
- 使用固定定位和高 z-index 确保 UI 在最顶层
- 自定义滚动条和代码块样式

### 4. 国际化支持

- 集成 Antd 中文语言包
- 所有 UI 文案使用中文

## 依赖项

### 生产依赖

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `antd`: ^5.20.0
- `@ant-design/icons`: ^5.5.0

### 开发依赖

- `@types/react`: ^18.3.3
- `@types/react-dom`: ^18.3.0
- `@vitejs/plugin-react`: ^4.3.1

## 构建配置

### Vite 配置特点

- 支持 React 和 JSX 编译
- CSS 文件单独输出（通过 manifest.json 引入）
- 库模式打包，生成 IIFE 格式的单文件
- TypeScript 支持和类型检查

### 构建输出

```
dist/content/
├── index.js     # 主JS文件（包含React应用）
└── style.css    # 样式文件
```

## 使用方式

### 初始化

```typescript
import { initYapiFeature } from "./yapi";

// 在页面加载完成后调用
initYapiFeature();
```

### 主要 API

- `renderYapiApp(domain, interfaceId)`: 渲染 React 应用
- `removeYapiApp()`: 移除 React 应用
- `requestInterfaceDataForReact(domain, interfaceId)`: React 版本的 API 请求

## 兼容性

- 支持 Chrome 88+
- 兼容现代浏览器的 ES2020 标准
- 支持 Chrome 扩展 Manifest V3

## 开发指南

### 本地开发

```bash
# 安装依赖
pnpm install

# 开发构建（监听模式）
pnpm run dev

# 生产构建
pnpm run build
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 组件使用函数组件和 React.FC 类型
- 所有异步操作使用 try-catch 进行错误处理

## 注意事项

1. **样式隔离**: 所有样式都通过#yapi-app-container 作用域隔离
2. **事件冒泡**: 防止 UI 事件影响宿主页面
3. **内存管理**: URL 变化时正确清理 React 组件
4. **错误边界**: 包含完整的错误处理和用户反馈
