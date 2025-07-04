'use client';
import { useMemoizedFn, useMount } from 'ahooks';
import { Button, Checkbox, Input } from 'antd';
import { useRef, useState } from 'react';
import { parse } from './jsonParse';
import { Result } from './interface';
import JsonParseError from './json-parse-error';
import JSONParseResultItem from './json-parse-result-item';
import ClipBorad from 'clipboard';
import Icon from '@/components/render/icon';
import { saveJsonParseCache, getJsonParseCache, clearJsonParseCache } from './storage';

const JsonParse: React.FC = () => {
  const [jsonStr, setJsonStr] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [sortFlag, setSortFlag] = useState(false);
  const [showTransfer, setShowTransfer] = useState(true);
  const changeTimer = useRef(0);

  useMount(async () => {
    if (import.meta.env.CONTAINER !== 'ext') {
      return;
    }
    const value = await getJsonParseCache();
    if (value) {
      await clearJsonParseCache();
      handleJsonStrChange({
        target: {
          value,
        },
      });
    }
  });
  const handleJsonStrChange = useMemoizedFn(async (e) => {
    const value = e.target.value;
    setJsonStr(value);
    clearTimeout(changeTimer.current);
    changeTimer.current = window.setTimeout(async () => {
      const parseResult = parse(value, sortFlag);
      setResult(parseResult);
      // 保存当前状态到缓存
      if (import.meta.env.CONTAINER === 'ext') {
        await saveJsonParseCache(value);
      }
    }, 300);
  });

  const handleSortChange = useMemoizedFn(async () => {
    const value = !sortFlag;
    setSortFlag(value);
    const parseResult = parse(jsonStr, value);
    setResult(parseResult);
    // 保存当前状态到缓存
    if (import.meta.env.CONTAINER === 'ext') {
      await saveJsonParseCache(jsonStr);
    }
  });

  const handleToggleExpand = useMemoizedFn((index) => {
    setResult((prev) => {
      if (!prev) {
        return prev;
      }
      if (!prev.data || !prev.data.length) {
        return prev;
      }
      const newData = [...prev.data];
      const expandFlag = newData[index].hideCount > 0;
      const level = newData[index].level;
      for (let i = index; i < newData.length; i++) {
        if (expandFlag) {
          newData[i] = {
            ...newData[i],
            hideCount: newData[i].hideCount - (newData[i].level - level) - 1,
          };
        } else {
          newData[i] = {
            ...newData[i],
            hideCount: newData[i].hideCount + (newData[i].level - level) + 1,
          };
        }
        if (newData[i].level === level && index !== i) {
          break;
        }
      }
      return {
        ...prev,
        data: newData,
      };
    });
  });

  const handleItemDelTransfer = useMemoizedFn((index) => {
    let value = '';
    const resultArray = result?.data || [];
    for (let i = 0; i < resultArray.length; i++) {
      const keyName = resultArray[i].keyName;
      const tempValue = resultArray[i].value;
      const dataType = resultArray[i].dataType;
      value += keyName ? `"${keyName}"` : '';
      if (keyName) {
        value += ':';
      }
      console.log(i === index);
      if (dataType === 'string') {
        value += i === index ? tempValue : `"${tempValue}"`;
      } else {
        value += tempValue;
      }
      if (resultArray[i].showComma) {
        value += ',';
      }
    }
    setJsonStr(value);
    setResult(parse(value, sortFlag));
  });
  const handleCopy = useMemoizedFn(() => {
    const clipInstance = new ClipBorad('#clib-btn-json-parse');
    clipInstance.on('success', (item) => {
      window.$success('复制成功');
      item.clearSelection();
      clipInstance.destroy();
    });
    clipInstance.on('error', (item) => {
      item.clearSelection();
      clipInstance.destroy();
    });
  });

  const handleFullScreen = useMemoizedFn(async () => {
    // 保存当前状态
    await saveJsonParseCache(jsonStr);

    const request: OpenWindowRequest = {
      type: 'openWindow',
      data: {
        url: './popup/index.html?container=web',
        width: 1280,
        height: 800,
      },
    };
    await chrome.runtime.sendMessage(request);
    window.close();
  });

  return (
    <div className='w-full h-full bg-white row-start-start'>
      <Input.TextArea className='!h-full !w-1/2' draggable={false} value={jsonStr} placeholder='请输入json字符串' onChange={handleJsonStrChange}></Input.TextArea>
      <div className='col-start-start w-1/2 border-solid border-l-0 border-bc !h-full rounded-sm'>
        <div className='row-start-center h-52 border-solid w-full border-l-0 border-r-0 border-t-0 border-b-1 border-bc px-md'>
          {showTransfer ? (
            <Button
              type='primary'
              onClick={() => {
                setShowTransfer(false);
              }}>
              删除转义符
            </Button>
          ) : (
            <Button
              type='primary'
              className='ml-md'
              onClick={() => {
                setShowTransfer(true);
              }}>
              显示转义符
            </Button>
          )}
          <Button type='primary' className='ml-md' id='clib-btn-json-parse' onClick={handleCopy} data-clipboard-target='.json-parse-result-con'>
            复制
          </Button>
          <Checkbox className='ml-md' checked={sortFlag} onChange={handleSortChange}>
            按升序排序
          </Checkbox>
          <div className='flex-1'></div>
          {window.container === 'ext' ? <Icon type='fullScreen' className='cursor-pointer' onClick={handleFullScreen}></Icon> : null}
        </div>
        <div className='h-0 overflow-auto flex-1 p-sm json-parse-result-con w-full'>
          {result?.error ? <JsonParseError error={result.error}></JsonParseError> : null}
          {result?.data?.length ? (
            <>
              {result.data.map((item, index) => {
                return (
                  <JSONParseResultItem
                    itemDelTransfer={handleItemDelTransfer}
                    toggleExpand={handleToggleExpand}
                    index={index}
                    showTransfer={showTransfer}
                    item={item}
                    key={index}></JSONParseResultItem>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JsonParse;
