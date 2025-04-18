import { ThemeConfig } from 'antd';
const style: ThemeConfig = {
  token: {
    colorPrimary: '#646cff',
    // colorPrimaryHover: '#646ce0',
    colorSuccess: '#4abf8a',
    colorWarning: '#f8c555',
    colorError: '#f23c3c',
    fontSize: 14,
    /**
     * 行高
     *  size-small 不生效，行高不足，导致高度不够，所以在app.less内重写样式
     */
    lineHeight: 1.435, // size-middle
    lineHeightLG: 1.435, //size-large
  },
  components: {
    Button: {
      colorPrimary: '#646cff',
      algorithm: true,
    },
  },
};

export default style;
