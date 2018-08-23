import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Account from './pages/account';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';

const routes = () => {
  return (
    <Switch>
      <AppRoute exact path="/" component={Account} layout={MainLayout} />
      <AppRoute exact path="/settings" component={Settings} layout={MainLayout} />
      <AppRoute exact path="/login" component={Login} layout={AuthLayout} />
      <AppRoute exact path="/create/account" component={CreateAccount} layout={AuthLayout} />
    </Switch>
  );
};

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default routes;
