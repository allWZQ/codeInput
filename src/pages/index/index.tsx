import React, { Component } from 'react';
import { render } from 'react-dom';
import { mode } from './mode';
import { Button } from 'antd';
import json from './config.conf';
import './style.css';
import style from './style.scss';
import { currentEnvConfig } from '~/configs/api';
import Foo from './foo';
import { Logs } from '~/utils';
import { observer, Provider } from 'mobx-react';
import { GlobalStores } from '../../stores/index';
import { RouteHome } from './home/index';
import { observable } from 'mobx';
import SnowStorm from 'react-snowstorm';
interface IProps {
  name: string;
}
function log(target) {
  Logs.log('hello', target);
  Logs.log(json.test);
  Logs.log(currentEnvConfig);
}

@log
@observer
export default class Index extends Component<IProps> {
  @observable btnText = 'test1';
  changeBtNText = () => {
    if (this.btnText == 'test1') {
      this.btnText = 'test2';
    } else {
      this.btnText = 'test1';
    }
  };
  render() {
    const img1 = require('./images/xshell.png');
    return (
      <div className={style.divBox}>
        <SnowStorm />
        <RouteHome />
      </div>
    );
  }
}

render(
  <Provider {...new GlobalStores()}>
    <Index name="123" />
  </Provider>,
  document.getElementById('root')
);
