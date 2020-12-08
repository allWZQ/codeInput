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
} from './utils';
import { Form } from 'antd';

interface IProps {
  length?: number;
  type?: 'text' | 'password';
  validator?: Function; //onChange校验规则
  isFinishBlur?: boolean; //输入完是否失去焦点
  isFinishSubmit?: boolean; //输入完是否直接提交
  onChange: (v) => void;
  submit?: (e?) => void; //提交的函数
}

const Codebox: FunctionComponent<IProps> = forwardRef((props) => {
  const [code, setCode] = useState<string[]>([]);
  const [dom, setDom] = useState([]);
  const [length] = useState<number>(props.length || 6);
  useEffect(() => {
    setCode(new Array(length).fill(''));
    setDom(new Array(length));
  }, []);
  const {
    isFinishBlur,
    validator,
    isFinishSubmit,
    type,
    onChange,
    submit,
  } = props;
  const onChangeValue = (e, i) => {
    const value = e.target.value.trim();

    if (isFunction(validator)) {
      if (value !== '' && !validator(value, i)) {
        textSelect(e.target);
        return;
      }
    }

    if (code[i] !== value && value) {
      focusOn(i + 1);
    }

    const newCode = [...code];
    newCode[i] = value;
    setCode(newCode);
    textSelect(e.target);
    if (value !== '') {
      focusOn(i + 1);
    }
    if (isFunction(onChange)) {
      if (newCode.every((v) => v !== '')) {
        //如果全部输入完，失去焦点
        !!isFinishBlur && e.target.blur();
        //如果全部输入完，直接提交
        if (!!isFinishSubmit && isFunction(props.submit)) {
          e.target.blur();
          submit(e);
        }
      }
      onChange(newCode);
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
    const inputElement = e.target;
    const arr = [8, 37, 38, 39, 40, 13];
    if (
      !arr.includes(e.keyCode) &&
      inputElement.value.length &&
      inputElement.value == code[i]
    ) {
      resetCodeItem(i);
    } else {
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
          if (!isSomeEmpty(code) && isFunction(props.submit)) {
            props.submit(e);
          }
          break;
        default:
        // 不管你输入什么
        // 都会聚焦文本
        // textSelect(inputElement);
      }
    }
  };
  return useObserver(() => {
    const codeBox = [];
    const inputType = type || 'text';
    for (let i = 0; i < length; i++) {
      const domRef = useRef();
      codeBox.push(
        <div
          key={i}
          className={`${style.codeboxFieldWrap} ${
            i == length / 2 - 1 ? style.lineWrap : null
          }`}
        >
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
            onChange={(e) => onChangeValue(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          />
          {i == length / 2 - 1 ? <span className={style.line}>—</span> : null}
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
