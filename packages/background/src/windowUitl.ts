let activeWindowId: number | undefined;

export const handleOpenWindow = async (request: OpenWindowRequest) => {
  const { url, width, height } = request.data;
  if (activeWindowId) {
    await chrome.windows.remove(activeWindowId);
    activeWindowId = undefined;
  }
  try {
    const res = await chrome.windows.create({
      url,
      width,
      height,
      type: "popup",
    });
    activeWindowId = res.id;
  } catch (e) {
    console.error(e);
  }
};

export const registerRemoveWindowListener = () => {
  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === activeWindowId) {
      activeWindowId = undefined;
    }
  });
};
