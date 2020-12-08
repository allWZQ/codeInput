import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ContextStore } from '~/stores/context';
interface IProps {
  path: string;
  component: any;
  exact?: boolean;
  contextStore?: ContextStore;
  noLogin?: boolean;
}
export const RouteLoadingBox = () => {
  return <div>正在加载中。。。</div>;
};

@inject('contextStore')
@observer
export class SuperRoute extends Component<IProps> {
  render() {
    const { component: TobeRender, exact, ...rest } = this.props;
    return (
      <Route
        {...rest}
        exact={exact}
        render={(props) => {
          this.props.contextStore.setHistory(props.history);
          return <TobeRender {...props} />;
        }}
      />
    );
  }
}
