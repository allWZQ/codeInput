import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useCountDown, useLoading } from './bar';
import { Logs } from '~/utils';
export default function Foo() {
  const { num, setNum } = useCountDown(0);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    Logs.log(num);
    Logs.log(loading, 'loading');
    if (num > 0) {
      !loading && setLoading(true);
    } else {
      setLoading(false);
    }
  }, [num]);
  return (
    <div>
      <div>当前：{num}</div>
      <div>
        <Button
          disabled={loading}
          onClick={() => {
            if (loading) {
              return;
            } else {
              setNum(20);
            }
          }}
        >
          点击
        </Button>
      </div>
    </div>
  );
}
