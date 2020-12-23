import { Button } from 'antd';
import React, { useEffect } from 'react';
import useVirtual from '~/components/SuperVirtual';
import Style from './style.scss';

interface IProps {
  data: any[];
}

const VirtualList = (props: IProps) => {
  const { data } = props;
  const [list, containerProps, wrapperProps, reCalculate] = useVirtual({
    total: data.length,
    height: 380,
    itemHeight: 54,
  });
  useEffect(() => {
    reCalculate();
  }, [data]);
  return (
    <div className={Style.body}>
      <div {...containerProps}>
        <div {...wrapperProps}>
          {list.map(({ style, index }) => {
            return (
              <div
                key={index}
                style={{
                  ...style,
                }}
                className={Style.itemBox}
              >
                <Button
                  onClick={() => {
                    console.log(index);
                  }}
                >
                  111112
                </Button>
                {data[index].name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
