import { JpModalFuncProps } from '@/components/render/install';
import { PrismaClient } from '@prisma/client';
declare global {
  interface PySuccessResponse<R> {
    success: true;
    data: R;
  }

  interface PyErrorResponse {
    success: false;
    msg: string;
    code?: number | string;
    nextOption?: string;
  }

  declare type PyResponse<R> = PyErrorResponse | PySuccessResponse<R>;

  declare type PyPromise<R> = Promise<PyResponse<R>>;

  interface GlobalThis {
    prisma?: PrismaClient;
  }

  interface Window {
    $alert: (arg: string | React.ReactElement | JpModalFuncProps) => void;
    $confirm: (arg: string | React.ReactElement | JpModalFuncProps) => Promise<{ isConfirm: 0 | 1 | 2 }>;
    $toast: (arg: string, duration?: number) => void;
    $success: (arg: string, duration?: number) => void;
    $error: (arg: string, duration?: number) => void;
    $showLoading: (tip: string) => void;
    $hideLoading: () => void;
  }

  type PickProps<T> = {
    [P in keyof T]?: T[P];
  };

  type DataType = 'number' | 'string' | 'reg' | 'object' | 'array' | 'null' | 'leftBracket' | 'rightBracket' | 'boolean' | '';
}

export {};
