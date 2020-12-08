import React from 'react';
import { Switch, HashRouter, Redirect } from 'react-router-dom';
import { SuperRoute } from '~/components';
import { routes } from '~/routes/routes.config';
import style from './style.scss';

export const RouteHome = () => {
  const renderRoute = (route: IRoute) => {
    return (
      <SuperRoute
        key={route.key}
        exact={route.isExact}
        path={route.path}
        component={route.component}
      />
    );
  };
  return (
    <div className={style.box}>
      <HashRouter>
        <Switch>
          {routes.map(renderRoute)}
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
};
