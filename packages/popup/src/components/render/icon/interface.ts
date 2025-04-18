import IconConfig from './iconConfig';

export type IconType = keyof typeof IconConfig;
export interface IconProps extends Omit<React.HTMLProps<HTMLElement>, 'type'> {
  type: IconType;
  size?: number;
  color?: string;
  className?: string;
}
