import { message } from 'antd';
import { action } from 'mobx';
import { http } from '~/utils';

class AxiosHttp {
  @action
  getCode = async () => {
    const params = {
      phone: '17850808997',
    };
    try {
      const res = await http.post('/getSend', params);
      if (res?.code !== 200) {
        message.error(res?.msg);
      } else {
        message.success(res?.msg);
        return true;
      }
      console.log(res);
    } catch (error) {
      message.error(error);
    }
  };
  @action
  login = async (data) => {
    const params = {
      phone: '17850808997',
      code: data,
    };
    try {
      const res = await http.post('/login', params);
      if (res?.code == 200) {
        message.success(res?.msg);
      } else {
        message.error(res?.msg);
      }
    } catch (error) {
      message.error(error);
    }
  };
  @action
  getList = async () => {
    const params = {
      count: 100000,
    };
    try {
      const res = await http.get('/list', { params });
      console.log(res);
      return res;
    } catch (error) {
      message.error(error);
    }
  };
  @action
  getUserInfo = async () => {
    try {
      const res = await http.get('/users');
      console.log(res);
    } catch (error) {
      message.error(error);
    }
  };
}

export const axiosHttp = new AxiosHttp();
