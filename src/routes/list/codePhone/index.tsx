import { Button, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import Codebox from '~/components/SuperCodeInput';
import { axiosHttp } from '../axios';
import style from '../style.scss';
import ReactCodeInput from 'react-code-input';

const CodePhone = () => {
  const [code, setcode] = useState<string[]>([]);
  const [codeloading, setcodeloading] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const getCode = () => {
    setcodeloading(true);
    axiosHttp.getCode().then(() => {
      setcodeloading(false);
    });
  };
  const submit = useCallback(() => {
    setsubmitLoading(true);
    axiosHttp.login(code.toString().replace(/,/g, '')).then(() => {
      setsubmitLoading(false);
    });
  }, [code]);
  return (
    <div className={style.body}>
      <div className={style.btn}>
        <Button loading={codeloading} type="primary" onClick={getCode}>
          获取验证码
        </Button>
      </div>
      <div>{code}</div>
      <div />
      <div>
        <Codebox
          length={4}
          type="password"
          onChange={(codeArray) => setcode(codeArray)}
        />
      </div>
      <div className={style.btn}>
        <Button type="primary" loading={submitLoading} onClick={submit}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default CodePhone;
