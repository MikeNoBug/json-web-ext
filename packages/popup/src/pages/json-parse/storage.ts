import { ChromeLocalKey } from '@/lib/chromeLocalKey';

// 保存JSON解析缓存
export async function saveJsonParseCache(jsonStr: string): Promise<void> {
  if (import.meta.env.CONTAINER !== 'ext') {
    return;
  }
  await chrome.storage.local.set({ [ChromeLocalKey.JSONVALUE]: jsonStr });
}

// 获取JSON解析缓存
export async function getJsonParseCache(): Promise<string | null> {
  if (import.meta.env.CONTAINER !== 'ext') {
    return null;
  }
  const result = await chrome.storage.local.get([ChromeLocalKey.JSONVALUE]);
  return result[ChromeLocalKey.JSONVALUE] || null;
}

// 清除JSON解析缓存
export async function clearJsonParseCache(): Promise<void> {
  if (import.meta.env.CONTAINER !== 'ext') {
    return;
  }
  await chrome.storage.local.remove([ChromeLocalKey.JSONVALUE]);
}