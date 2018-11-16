import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import EmptyLayout from './layouts/EmptyLayout';
import MainLayout from './layouts/MainLayout';

import Login from './pages/Login';
import Account from './pages/account/list';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';
import Profiles from './pages/profile';
import ProfileQRCode from './pages/profile/QRCodeView';
import ProfileExport from './pages/profile/ExportProfile';
import ImportProfile from './pages/profile/ImportProfile';
import ExportPK from './pages/account/exportpk';
import Details from './pages/account/details';
import Send from './pages/account/send';
import ChangeNetwork from './pages/account/changeNetwork';
import Assign from './pages/account/assignEosAccount';
import CreateWallet from './pages/wallet';

import Loading from 'popup/pages/Loading';
import Introduction from 'popup/pages/Introduction';
import CreateProfile from 'popup/pages/profile/Create';

import {
  URL_MAIN,
  URL_LOGIN,
  URL_LOADING,
  URL_PROFILE_CREATE,
  URL_INTRODUCTION,
  URL_PROFILE_ADD,
  URL_PROFILE_IMPORT,
  URL_PROFILE_EXPORT,
  URL_PROFILE_MAIN,
  URL_PROFILE_QRCODE
} from 'constants/popupUrl';

const routes = () => {
  return (
    <Switch>
      <AppRoute exact path={URL_MAIN} component={Account} layout={MainLayout} />
      <AppRoute exact path="/create/account" component={CreateAccount} layout={AuthLayout} />
      <AppRoute exact path="/account/details" component={Details} layout={MainLayout} />
      <AppRoute exact path="/account/exportpk" component={ExportPK} layout={MainLayout} needAuth />
      <AppRoute exact path="/account/send" component={Send} layout={MainLayout} />
      <AppRoute exact path="/account/edit/:id" component={ChangeNetwork} layout={MainLayout} />
      <AppRoute exact path="/account/assign" component={Assign} layout={MainLayout} />

      <AppRoute exact path="/wallets/create" component={CreateWallet} layout={MainLayout} />

      <AppRoute exact path="/settings" component={Settings} layout={MainLayout} />

      <AppRoute exact path={URL_PROFILE_MAIN} component={Profiles} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_QRCODE} component={ProfileQRCode} layout={MainLayout} needAuth />
      <AppRoute exact path={URL_PROFILE_EXPORT} component={ProfileExport} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_IMPORT} component={ImportProfile} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_ADD} component={CreateProfile} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_CREATE} component={CreateProfile} layout={EmptyLayout} />

      <AppRoute exact path={URL_LOGIN} component={Login} layout={AuthLayout} />
      <AppRoute exact path={URL_LOADING} component={Loading} layout={EmptyLayout} />
      <AppRoute exact path={URL_INTRODUCTION} component={Introduction} layout={EmptyLayout} />
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
