import { currentEnvConfig } from '~/configs/api';
import { Logs } from '~/utils';
import axios from 'axios';
import { when } from 'mobx';

// 创建axios实例
export const http = axios.create({
  timeout: 1000 * 60,
  baseURL: `${currentEnvConfig.host}/`,
});

http.interceptors.request.use(
  (config) => {
    console.warn('--- Http request start ---');
    console.log(config.method, config.url);
    console.log(config.data || config.params);
    console.warn('--- Http request end---');

    return config;
  },
  (error) => {
    console.error(error);
  }
);

http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data;
  },
  (error) => {
    // 拦截错误
    Logs.error(error);
    const err = {
      ...error,
      ...error.response,
      // 返回接口返回的错误信息 报错
    };
    return Promise.reject(err); //
  }
);
