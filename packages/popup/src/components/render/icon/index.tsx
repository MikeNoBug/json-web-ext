'use client';
import classnames from 'classnames';
import IconConfig from './iconConfig';
import { IconProps, IconType } from './interface';
import '@/style/icon/iconfont.css';

function getTypeClassName(type: IconType): string {
  if (IconConfig[type]) {
    return IconConfig[type];
  }
  return '';
}

function getFinalStyle(size: number | undefined, color: string | undefined, style: React.CSSProperties | undefined): React.CSSProperties {
  const finalStyle: React.CSSProperties = {};
  if (size) {
    finalStyle.fontSize = size;
  }
  if (color) {
    finalStyle.color = color;
  }
  if (style) {
    Object.assign(finalStyle, style);
  }
  return finalStyle;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { size, color, className, style, type, ...resetProps } = props;
  const classNames = classnames('iconfont', getTypeClassName(type), className);
  const finalStyle = getFinalStyle(size, color, style);
  return <i className={classNames} {...resetProps} style={finalStyle} />;
};

export default Icon;
