'use client';
import { Button, ModalFuncProps, NotificationArgsProps } from 'antd';
import React, { ReactNode, useState } from 'react';
import { App } from 'antd';
import { useBoolean, useMount } from 'ahooks';
// import loadingIcon from '@/assets/loading.png';
// import './index.less';
import Icon from './icon';
import { IconType } from './icon/interface';

interface JpFuncProps {
  icon?: string;
  iconColor?: string;
  iconType?: 'info' | 'warn' | 'success' | 'error' | 'yunyun';
  thirdText?: string;
  noCancel?: boolean;
  beforeOk?: () => Promise<boolean>;
  beforeThird?: () => Promise<boolean>;
}

export interface JpModalFuncProps extends JpFuncProps, Omit<ModalFuncProps, 'icon'> {}

export interface JpNotificationProps extends JpFuncProps, Omit<NotificationArgsProps, 'message' | 'icon'> {
  message?: React.ReactNode;
  description: React.ReactNode;
  okText?: string;
  cancelText?: string;
  noFooter?: boolean;
  width?: number | string;
}

function getConfigIcon(config: JpFuncProps): ReactNode | null {
  let icon = null;
  if (config.iconType) {
    switch (config.iconType) {
      case 'info':
        icon = <Icon type='question' size={16} className='mr-sm text-primary'></Icon>;
        break;
      case 'warn':
        icon = <Icon type='question' size={16} className='mr-sm text-warning'></Icon>;
        break;
      case 'error':
        icon = <Icon type='circleClose' size={16} className='mr-sm text-error'></Icon>;
        break;
      case 'success':
        icon = <Icon type='circleCheck' size={16} className='mr-sm text-success'></Icon>;
        break;

      default:
        icon = <Icon type='question' size={16} className='mr-sm text-primary'></Icon>;
        break;
    }
  }
  if (config.icon) {
    icon = <Icon type={config.icon as IconType} className='mr-sm' size={16} color={config.iconColor}></Icon>;
  }
  return icon;
}

function getConfig(config: string | React.ReactElement | JpModalFuncProps): ModalFuncProps {
  const tempConfig: ModalFuncProps = {
    title: '温馨提示',
    content: '',
    width: 320,
    icon: null,
    centered: true,
  };
  if (typeof config === 'string' || React.isValidElement(config)) {
    tempConfig.content = <div className='break-all whitespace-pre-wrap'>{config}</div>;
  } else {
    Object.assign(tempConfig, config);
    const icon = getConfigIcon(tempConfig as JpModalFuncProps);
    if (icon) {
      tempConfig.icon = icon;
    }
    tempConfig.content = <div className='break-all whitespace-pre-wrap'>{(config as ModalFuncProps).content}</div>;
  }
  return tempConfig;
}

const Install: React.FC<unknown> = () => {
  const { modal, message } = App.useApp();
  const [showLoading, showLoadingOpt] = useBoolean(false);
  const [spinTip, setSpinTip] = useState('');

  useMount(() => {
    window.$alert = (config: string | React.ReactElement | JpModalFuncProps) => {
      const options = getConfig(config);
      const instance = modal.info({
        ...options,
        footer: (
          <div className='row-end-center mt-2xl'>
            <Button
              size='large'
              type='primary'
              onClick={() => {
                if (typeof options.onOk === 'function') {
                  options.onOk();
                }
                instance.destroy();
              }}>
              {(config as JpModalFuncProps).okText || '确定'}
            </Button>
          </div>
        ),
      });
    };

    window.$confirm = (config: string | JSX.Element | JpModalFuncProps) => {
      return new Promise((resolve) => {
        const finalConfig = getConfig(config) as JpModalFuncProps;
        const instance = modal.info(
          Object.assign({
            ...finalConfig,
            closeIcon: (
              <div
                className='w-20 h-20'
                onClick={() => {
                  resolve({ isConfirm: 0 });
                }}>
                <Icon type='circleClose' className='text-base' />
              </div>
            ),
            footer: (
              <div className='row-end-center mt-2xl'>
                {finalConfig.noCancel ? null : (
                  <Button
                    size='large'
                    type='default'
                    className='mr-middle'
                    onClick={() => {
                      resolve({ isConfirm: 0 });
                      instance.destroy();
                    }}>
                    {finalConfig.cancelText || '取消'}
                  </Button>
                )}
                {(finalConfig as JpModalFuncProps).thirdText ? (
                  <Button
                    size='large'
                    type='default'
                    className='mr-middle'
                    onClick={async () => {
                      if (finalConfig.beforeThird) {
                        const beforeThird = await finalConfig.beforeThird();
                        if (!beforeThird) {
                          return;
                        }
                      }
                      resolve({ isConfirm: 2 });
                      instance.destroy();
                    }}>
                    {(finalConfig as JpModalFuncProps).thirdText}
                  </Button>
                ) : null}
                <Button
                  size='large'
                  type='primary'
                  onClick={async () => {
                    if (finalConfig.beforeOk) {
                      const beforeOk = await finalConfig.beforeOk();
                      if (!beforeOk) {
                        return;
                      }
                    }
                    resolve({ isConfirm: 1 });
                    instance.destroy();
                  }}>
                  {finalConfig.okText || '确定'}
                </Button>
              </div>
            ),
          }),
        );
      });
    };

    window.$toast = (content: string, duration?: number) => {
      message.info(content, duration || 2);
    };

    window.$success = (content: string, duration?: number) => {
      message.success(content, duration || 2);
    };

    window.$error = (content: string, duration?: number) => {
      message.error(content, duration || 2);
    };

    window.$showLoading = (tip?: string) => {
      showLoadingOpt.setTrue();
      setSpinTip(tip || '');
    };

    window.$hideLoading = () => {
      showLoadingOpt.setFalse();
      setSpinTip('');
    };
  });

  return (
    <>
      {showLoading ? (
        <div
          style={
            !spinTip
              ? {
                  boxShadow: 'none',
                  background: 'transparent',
                }
              : {
                  background: '#fff',
                }
          }>
          {/* <img src={loadingIcon} alt='loading' className={`${!spinTip ? '!w-32 !h-32' : ''}`}></img> */}
          {spinTip ? <div className='ml-middle'>{spinTip}</div> : null}
        </div>
      ) : null}
    </>
  );
};

export default Install;
