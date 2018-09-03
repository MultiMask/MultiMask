import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Account from './pages/account/list';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';
import Profiles from './pages/profile';
import ExportPK from './pages/account/exportpk';
import Details from './pages/account/details';
import Send from './pages/account/send';

const routes = () => {
  return (
    <Switch>
      <AppRoute exact path="/" component={Account} layout={MainLayout} />
      <AppRoute exact path="/account/details" component={Details} layout={MainLayout} />
      <AppRoute exact path="/account/exportpk" component={ExportPK} layout={MainLayout} needAuth />
      <AppRoute exact path="/account/send" component={Send} layout={MainLayout} />
      <AppRoute exact path="/settings" component={Settings} layout={MainLayout} />
      <AppRoute exact path="/profiles" component={Profiles} layout={MainLayout} />
      <AppRoute exact path="/login" component={Login} layout={AuthLayout} />
      <AppRoute exact path="/create/account" component={CreateAccount} layout={AuthLayout} />
    </Switch>
  );
};

const AppRoute = ({ component: Component, layout: Layout, needAuth = false, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout needAuth={needAuth}>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default routes;
