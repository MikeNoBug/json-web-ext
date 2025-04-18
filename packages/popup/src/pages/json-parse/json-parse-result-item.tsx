import Icon from '@/components/render/icon';
import { ReusltItem } from './interface';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { Popover } from 'antd';

interface JSONParseResultItemProps {
  item: ReusltItem;
  showTransfer: boolean;
  index: number;
  toggleExpand: (index: number) => void;
  itemDelTransfer: (index: number) => void;
}

const JSONParseResultItem: React.FC<JSONParseResultItemProps> = (props) => {
  const { item, showTransfer } = props;

  const handleToggle = useMemoizedFn(() => {
    props.toggleExpand(props.index);
  });

  const showDetailTransferIcon = useMemo<boolean>(() => {
    if (item.dataType !== 'string') {
      return false;
    }
    const value = item.value as string;
    if (value.startsWith('{') && value.endsWith('}')) {
      return true;
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      return true;
    }
    return false;
  }, [item.dataType, item.value]);

  const handleItemDelTransfer = useMemoizedFn(() => {
    props.itemDelTransfer(props.index);
  });

  if (item.hideCount === 0) {
    return (
      <div style={{ paddingLeft: item.level * 12 }} className='text-lg'>
        {item.keyName ? (
          <>
            <span className='text-primary font-bold'>&quot;{item.keyName}&quot;</span>
            <span>&nbsp;:&nbsp;</span>
          </>
        ) : null}
        {item.dataType === 'leftBracket' ? (
          <span>
            <Icon type='circleMinus' className='text-md mr-xs cursor-pointer' onClick={handleToggle}></Icon>
            {item.value}
          </span>
        ) : null}
        {item.dataType === 'rightBracket' ? <span>{item.value}</span> : null}
        {item.dataType === 'null' ? <span className='font-bold text-warning'>null</span> : null}
        {item.dataType === 'string' ? (
          <span className='font-bold text-success'>
            {showDetailTransferIcon ? (
              <Popover content='点击将此字符串再次解析（此字符串可能为含有反义符的json字符串）'>
                <Icon type='repeair' className='cursor-pointer mr-xs !text-primary' onClick={handleItemDelTransfer}></Icon>
              </Popover>
            ) : null}
            <span>&quot;{!showTransfer ? item.value : (item.value as string).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}&quot;</span>
          </span>
        ) : null}
        {item.dataType === 'number' ? <span className='font-bold text-primary'>{item.value}</span> : null}
        {item.dataType === 'boolean' ? <span className='font-bold text-error'>{item.value + ''}</span> : null}
        {item.showComma ? <span>,</span> : null}
      </div>
    );
  }
  if (item.hideCount === 1 && item.dataType === 'leftBracket') {
    return (
      <div className='text-lg' style={{ paddingLeft: item.level * 12 + 'px' }}>
        {item.keyName ? <span className='font-bold text-primary'>{item.keyName}</span> : null}
        {item.keyName ? <span>:</span> : null}
        <span>
          <Icon type='circlePlus' className='mr-xs cursor-pointer' onClick={handleToggle}></Icon>
          {item.value === '{' ? 'Object{...}' : `Arrary[${item.arrayLength}]`}
          {item.showComma ? ',' : ''}
        </span>
      </div>
    );
  }
  return null;
};

export default JSONParseResultItem;
