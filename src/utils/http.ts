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
  async (config) => {
    // 增加固定请求参数
    let data = config.data;
    const commonParam = {
      user_id: '1111',
      company_id: '2222',
    };

    data = {
      ...data,
      ...commonParam,
    };
    Logs.line('Http request');
    Logs.log(config.url);
    Logs.log(JSON.stringify(data));

    config.data = {
      data: data,
      user_id: commonParam.user_id,
    };
    config.headers['content-type'] = 'application/json;charset=utf-8';
    // 增加请求头
    config.headers['super-version'] = '1.0.0.0';
    // langStore里面会在window里面挂一个superLanguage的变量
    config.headers['super-lang'] = 'zh-CN';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data.data;
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
