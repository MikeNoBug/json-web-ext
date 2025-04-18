import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const flexPlugin = plugin(({ addUtilities }) => {
  const flex = {
    '.row': {
      display: 'flex',
      flexDirection: 'row',
    },
    '.row-start-start': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '.row-start-end': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    '.row-start-center': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '.row-end-start': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    '.row-end-end': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    '.row-end-center': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    '.row-center-start': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    '.row-center-end': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    '.row-center-center': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.row-between-start': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    '.row-between-end': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    '.row-between-center': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '.row-around-start': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
    '.row-around-end': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    '.row-around-center': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    '.col': {
      display: 'flex',
      flexDirection: 'column',
    },
    '.col-start-start': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '.col-start-end': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    '.col-start-center': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '.col-end-start': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    '.col-end-end': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    '.col-end-center': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    '.col-center-start': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    '.col-center-end': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    '.col-center-center': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.col-between-start': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    '.col-between-end': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    '.col-between-center': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '.col-around-start': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
    '.col-around-end': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    '.col-around-center': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    '.flex-col-scroll': {
      flex: '1',
      height: '0',
      overflow: 'auto',
    },
    '.flex-row-scroll': {
      flex: '1',
      width: '0',
      overflow: 'auto',
    },
  };

  addUtilities(flex);
});

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      'xs': '10px',
      'sm': '12px',
      'base': '14px',
      'lg': '16px',
      'xl': '18px',
      'xxl': '20px',
      '3xl': '22px',
      '4xl': '24px',
    },
    fontWeight: {
      bold: '600',
    },
    /**
     * 目前插件内就只有这些颜色，如果添加其他颜色，必须遵循以下步骤
     * 1. 和ui沟通确定，是否ui出图有问题，没有使用规范内的颜色
     * 2. ui确定添加新的颜色，确定颜色的用途和意义用来命名添加相关颜色
     **/
    colors: {
      primary: '#646cff',
      primaryhover: '#646ce0',
      success: '#4abf8a',
      warning: '#f8c555',
      error: '#f23c3c',
      white: '#fff',
      bc: '#d9d9d9',
    },
    fc: {
      DEFAULT: '#252931',
      default: '#252931',
      second: '#565960',
      third: '#898B8F',
      quaternary: '#BCBDC0',
      disabled: '#898B8F',
    },
    borderRadius: {
      none: '0px',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      full: '100%',
      null: '0px',
    },
    extend: {
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        'sxl': '40px',
      },
    },
  },
  plugins: [flexPlugin],
} satisfies Config;
