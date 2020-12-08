import { Logs } from './logs';
import { http } from './http';
import Loadable from 'react-loadable';
import { allEnvConfigs, currentEnvConfig } from '~/configs/api';
import { RouteLoadingBox } from '~/components';
import { GlobalStores } from '../stores/index';
import { now } from 'moment';
export class SuperTool {
  envConfigs: EnvConfig = currentEnvConfig;
  /**
   * 是否可以使用chrome调试
   * 现阶段只有local和mock环境可以使用chrome调试
   */
  isDevelop = () => {
    return process.env.IS_DEVELOP || process.env.USE_LOCAL_CONFIG;
  };

  /**
   * 配置当前环境
   * @param env
   */
  setCurrentEnv = (env: string) => {
    let result: EnvConfig = allEnvConfigs[env];
    if (!result) {
      result = allEnvConfigs.production;
    }
    this.envConfigs = result;
  };

  /**
   * 获取一个websocket请求的tag
   * @param tagName
   */
  getTag = (tagName: string) => {
    let random = Math.random() * 100;
    return `${tagName}_${random}`;
  };
  /**
   * 路由跳转
   * @param path
   * @param noShareMemory
   */
  historyPush = (path: string, noShareMemory?: boolean) => {
    let pathStr = path || '/';
    pathStr = `#/${pathStr}`;
    GlobalStores.instance.contextStore.push(path, noShareMemory);
  };

  /**
   * 路由返回
   */
  goBack = () => {
    const { contextStore } = GlobalStores.instance;
    let pathname = window.location.pathname + location.hash;
    setTimeout(() => {
      let nowpathname = window.location.pathname + location.hash;
      if (pathname == nowpathname) {
        contextStore.history?.push('/');
      }
    }, 500);
    contextStore.history?.goBack();
  };
  /**
   *
   * 设置请求url前缀
   * @memberof SuperTool
   */
  setBaseUrl = (prefix) => {
    Logs.log(
      '当前环境',
      this.isDevelop(),
      process.env.IS_DEVELOP,
      process.env.USE_LOCAL_CONFIG,
      process.env.IS_EXT
    );
    if (this.isDevelop()) {
      // 本地环境测试时，不需要所有api都由客户端管理
      return;
    }
    http.defaults.baseURL = prefix;
    Logs.log('设置api成功', http.defaults.baseURL);
  };

  getLoadableComponent = (component: React.ReactNode) => {
    Logs.log(component);
    return Loadable({
      loader: () => component,
      loading: RouteLoadingBox,
    });
  };
}
export const superTool = new SuperTool();
