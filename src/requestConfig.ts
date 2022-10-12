import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { CONSTANTS_BEARER_TOKEN } from './constants/local-storage-constants';

// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
interface ResponseStructure {
  data: {
    code: number;
    message: string;
  };
  status: number;
  statusText: string;
  errorCode?: number;
}

/**
 * @doc https://umijs.org/docs/max/request#配置
 */

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { errorCode, statusText, data } = res as unknown as ResponseStructure;
      if (data.code < 0) {
        const error: any = new Error(statusText);
        error.name = 'BizError';
        error.info = { errorCode };
        throw error;
      }
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
        throw error;
      } else {
        message.error('Request error, please retry.');
      }
    },
  },
};

export const authHeaderConfig: RequestConfig = {
  requestInterceptors: [
    (url: string, options?: Record<string, any>) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(CONSTANTS_BEARER_TOKEN)}`,
      };
      return {
        url,
        options: { ...options, headers },
      };
    },
  ],
};

export const responseConfig: RequestConfig = {
  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;
      if (data.code === -113) {
        message.error('Invalid token');
      }
      return response;
    },
  ],
};
