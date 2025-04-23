import { handleOpenWindow, registerRemoveWindowListener } from "./windowUitl";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "parseJSON",
    title: "解析 JSON",
    contexts: ["selection"], // 只在选中文本时显示
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "parseJSON" && info.selectionText) {
    // 保存选中的文本到 storage
    chrome.storage.local.set(
      {
        JSONVALUE: info.selectionText,
      },
      () => {
        const reuqest: OpenWindowRequest = {
          type: "openWindow",
          data: {
            url: chrome.runtime.getURL("/popup/index.html?container=web"),
            width: 1280,
            height: 800,
          },
        };
        handleOpenWindow(reuqest);
      }
    );
  }
});

registerRemoveWindowListener();
// 导入 Chrome 扩展 API 类型
chrome.runtime.onMessage.addListener((request: MessageRquest) => {
  switch (request.type) {
    case "openWindow":
      handleOpenWindow(request);
      break;
  }
});
