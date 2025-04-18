import { useMemo } from 'react';

interface ErrorItem {
  value: string;
  type: 'pre' | 'error' | 'next';
}
const JsonParseError: React.FC<{ error: Error }> = (props) => {
  const errorStrList = useMemo<ErrorItem[]>(() => {
    const list: ErrorItem[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { text, at } = props.error as any;
    list.push({ value: text.slice(at - 10, at - 1), type: 'pre' });
    list.push({ value: text.slice(at - 1, at), type: 'error' });
    list.push({ value: text.slice(at, at + 10), type: 'next' });
    return list;
  }, [props.error]);
  return (
    <>
      <div className='mb-sm text-lg'>解析错误</div>
      <div className='mb-sm'>
        <span>错误类型：</span>
        <span>{props.error.message}</span>
      </div>
      <div>
        <span>错误节选：</span>
        {errorStrList
          .filter((item) => !!item.value)
          .map((item, index) => {
            return (
              <span key={index} className={item.type === 'error' ? 'text-error' : ''}>
                {item.value}
              </span>
            );
          })}
      </div>
    </>
  );
};

export default JsonParseError;
