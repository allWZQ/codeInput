import { superTool } from '~/utils';

export const paths = {
  LIST: '/',
  DETAIL: '/detail',
};

export const routes: IRoute[] = [
  {
    key: paths.LIST,
    name: '列表',
    isExact: true,
    path: paths.LIST,
    component: superTool.getLoadableComponent(import('./list')),
  },
  {
    key: paths.DETAIL,
    name: '详情',
    isExact: true,
    path: paths.DETAIL,
    component: superTool.getLoadableComponent(import('./detail')),
  },
];
