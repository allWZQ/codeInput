//选中文本
export const textSelect = (element) => {
  const start = 0;
  const end = element.value.length;
  if (element.createTextRange) {
    //IE浏览器
    var range = element.createTextRange();
    range.moveStart('character', -end);
    range.moveEnd('character', -end);
    range.moveStart('character', start);
    range.moveEnd('character', end);
    range.select();
  } else {
    element.setSelectionRange(start, end);
    element.focus();
  }
};
//阻止默认行为
export const removeDefaultBehavior = (event) => {
  event = event || window.event; //用于IE
  if (event.preventDefault) event.preventDefault(); //标准技术
  if (event.returnValue) event.returnValue = false; //IE

  // 阻止事件冒泡
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  return false; //用于处理使用对象属性注册的处理程序
};
//判断是否是函数
export const isFunction = (any): boolean => {
  return typeof any === 'function';
};
//判断验证码的位数
export const isSomeEmpty = (code): boolean => {
  if (!code.length) {
    return true;
  }
  const isCount = code.some((value) => {
    return value === '';
  });
  return isCount;
};
