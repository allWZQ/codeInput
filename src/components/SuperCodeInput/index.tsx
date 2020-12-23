import { useObserver } from 'mobx-react';
import React, {
  forwardRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import style from './style.scss';
import {
  isFunction,
  textSelect,
  removeDefaultBehavior,
  isSomeEmpty,
  deBounce,
} from './utils';
import { Form } from 'antd';

interface IProps {
  length?: number;
  type?: 'text' | 'password';
  validator?: Function; //onChange校验规则
  isFinishSubmit?: boolean; //输入完是否直接提交
  onChange: (v) => void;
  submit?: (e?) => void; //提交的函数
}

const Codebox: FunctionComponent<IProps> = forwardRef((props) => {
  const { validator, isFinishSubmit, type, onChange, submit } = props;
  const [code, setCode] = useState<string[]>([]);
  const [dom, setDom] = useState([]);
  const [length] = useState<number>(props.length || 6);
  const [flag, setflag] = useState(true);
  useEffect(() => {
    setCode(new Array(length).fill(''));
    setDom(new Array(length));
  }, []);
  //输入完直接提交
  useEffect(() => {
    !!isFinishSubmit &&
      isFunction(props.submit) &&
      !isSomeEmpty(code) &&
      submit();
  }, [code]);
  const onChangeValue = (e, i) => {
    const value = e.target.value.trim();
    if (isFunction(validator)) {
      if (value !== '' && !validator(value, i)) {
        textSelect(e.target);
        return;
      }
    }

    const newCode = [...code];
    newCode[i] = value;
    setCode(newCode);
    textSelect(e.target);

    if (!!value) {
      focusOn(i + 1);
    }

    if (isFunction(onChange)) {
      onChange(newCode);
      if (!isSomeEmpty(newCode)) {
        //如果全部输入完，失去焦点
        if (!!isFinishSubmit) {
          e.target.blur();
        }
      }
    }
  };
  const getPrevBox = (i) => {
    return dom[i - 1];
  };
  const getNextBox = (i) => {
    return dom[i + 1];
  };
  const focusOn = (i) => {
    const element = dom[i]?.current;
    if (element) {
      element?.focus();
    }
  };
  //重置code
  const resetCodeItem = (i) => {
    const newCode = [...code];
    newCode[i] = '';
    setCode(newCode);
  };
  const onKeyDown = (e, i) => {
    switch (e.keyCode) {
      case 8: // 删除完之后，退回到上一个输入框
        // if (e.target.value === '') {
        // 如果空的话，那么就退回到上一个输入框
        resetCodeItem(i);
        removeDefaultBehavior(e);
        focusOn(i - 1);
        // }
        break;
      case 37: // 左
      case 38: // 上
        removeDefaultBehavior(e);
        if (getPrevBox(i)) {
          focusOn(i - 1);
        } else {
          focusOn(i);
        }
        break;
      case 39: // 右
      case 40: // 下
        removeDefaultBehavior(e);
        if (getNextBox(i)) {
          focusOn(i + 1);
        } else {
          focusOn(i);
        }
        break;
      case 13:
        if (!isSomeEmpty(code) && isFunction(submit)) {
          submit();
        }
        break;
      case 16:
        setflag(true);
        break;
      default:
        // 不管输入什么都会聚焦文本
        textSelect(e.target);
    }
  };
  return useObserver(() => {
    const codeBox = [];
    const inputType = type || 'text';
    for (let i = 0; i < length; i++) {
      const domRef = useRef();
      codeBox.push(
        <div key={i} className={`${style.codeboxFieldWrap}`}>
          <input
            type={inputType}
            maxLength={1}
            autoComplete="false"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={code[i] || ''}
            ref={(dom[i] = domRef)}
            onFocus={(e) => textSelect(e.target)}
            onClick={(e) => textSelect(e.target)}
            onInput={(e) => flag && onChangeValue(e, i)}
            onChange={(e) => flag && onChangeValue(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onCompositionStart={() => setflag(true)}
            onCompositionEnd={() => setflag(false)}
          />
        </div>
      );
    }
    return (
      <div className={style.codeboxContainer}>
        <Form>{codeBox}</Form>
      </div>
    );
  });
});

export default Codebox;
