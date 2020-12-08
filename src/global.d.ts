declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.conf' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  const content: any;
  export default content;
}

interface IRoute {
  name: string;
  key: string;
  // 是否绝对匹配
  isExact?: boolean;
  // 所使用的路由路径
  path?: string;
  component?: any;
}
