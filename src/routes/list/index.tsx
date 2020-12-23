import { Carousel } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { axiosHttp } from './axios';
import CodePhone from './codePhone';
import Happly from './happly';
import VirtualList from './virtualList';

const List = () => {
  const carousel = useRef<Carousel>();
  const [data, setdata] = useState([]);
  useEffect(() => {
    axiosHttp.getList().then((res) => {
      setdata(res?.data);
    });
    axiosHttp.getUserInfo();
  }, []);
  return (
    <Carousel ref={carousel} dots={false}>
      <CodePhone />
      <VirtualList data={data} />
      <Happly />
    </Carousel>
  );
};

export default List;
