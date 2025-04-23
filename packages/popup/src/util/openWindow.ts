let currentWindowId: number | undefined;

export async function openWindow(url: string, width: number, height: number) {
  if (typeof chrome === 'undefined' || !chrome.windows) {
    return;
  }
  try {
    if (currentWindowId) {
      chrome.windows.remove(currentWindowId);
    }
    const res = await chrome.windows.create({
      url,
      width,
      height,
      type: 'popup',
    });
    currentWindowId = res.id;
  } catch (err: any) {
    currentWindowId = undefined;
  }
}
