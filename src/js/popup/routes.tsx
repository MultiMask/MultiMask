import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import EmptyLayout from './layouts/EmptyLayout';
import MainLayout from './layouts/MainLayout';

import Login from './pages/Login';
import Settings from './pages/Settings';

import Profiles from './pages/profile';
import ProfileQRCode from './pages/profile/QRCodeView';
import ProfileGetSeed from 'popup/pages/profile/GetMnemonic';
import ProfileExport from './pages/profile/ExportProfile';
import ImportProfile from './pages/profile/ImportProfile';

import PasswordCreate from './pages/PasswordCreate';
import AccountList from './pages/account/list';

import Details from './pages/account/detail/';
// import ExportPK from './pages/account/detail/exportpk';
import QrCodeLink from './pages/account/detail/QRCodeLink';
import Send from './pages/account/detail/send';
import SendResult from './pages/account/detail/SendResult';
import ChangeNetwork from './pages/account/detail/changeNetwork';
import Assign from './pages/account/detail/assignEosAccount';

import AccountCreate from './pages/account/create';

import Introduction from 'popup/pages/Introduction';
import CreateProfile from 'popup/pages/profile/Create';

import {
  URL_MAIN,
  URL_LOGIN,
  URL_PASS_CREATE,
  URL_PROFILE_CREATE,
  URL_INTRODUCTION,
  URL_ACCOUNT_DETAIL,
  URL_ACCOUNT_QRCODE,
  URL_ACCOUNT_SEND,
  URL_ACCOUNT_SEND_RESULT_HASH,
  URL_ACCOUNT_CREATE,
  URL_ACCOUNT_ASSIGN,
  URL_ACCOUNT_EDIT,
  URL_PROFILE_ADD,
  URL_PROFILE_IMPORT,
  URL_PROFILE_EXPORT,
  URL_PROFILE_MAIN,
  URL_PROFILE_QRCODE,
  URL_PROFILE_SEED,
  URL_SETTING
} from 'constants/popupUrl';

const routes = () => {
  return (
    <Switch>
      <AppRoute exact path={URL_MAIN} component={AccountList} layout={MainLayout} />
      <AppRoute exact path={URL_PASS_CREATE} component={PasswordCreate} layout={AuthLayout} />

      {/* <AppRoute exact path="/account/exportpk" component={ExportPK} layout={MainLayout} needAuth /> */}
      <AppRoute path={URL_ACCOUNT_DETAIL} component={Details} layout={MainLayout} />
      <AppRoute exact path={URL_ACCOUNT_QRCODE} component={QrCodeLink} layout={MainLayout} />
      <AppRoute exact path={URL_ACCOUNT_SEND} component={Send} layout={MainLayout} />
      <AppRoute exact path={URL_ACCOUNT_SEND_RESULT_HASH} component={SendResult} layout={MainLayout} />
      <AppRoute exact path={`${URL_ACCOUNT_EDIT}/:id`} component={ChangeNetwork} layout={MainLayout} />
      <AppRoute exact path={URL_ACCOUNT_ASSIGN} component={Assign} layout={MainLayout} />

      <AppRoute exact path={URL_ACCOUNT_CREATE} component={AccountCreate} layout={MainLayout} />

      <AppRoute exact path={URL_SETTING} component={Settings} layout={MainLayout} />

      <AppRoute exact path={URL_PROFILE_MAIN} component={Profiles} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_QRCODE} component={ProfileQRCode} layout={MainLayout} needAuth />
      <AppRoute exact path={URL_PROFILE_SEED} component={ProfileGetSeed} layout={MainLayout} needAuth />
      <AppRoute exact path={URL_PROFILE_EXPORT} component={ProfileExport} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_IMPORT} component={ImportProfile} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_ADD} component={CreateProfile} layout={MainLayout} />
      <AppRoute exact path={URL_PROFILE_CREATE} component={CreateProfile} layout={EmptyLayout} />

      <AppRoute exact path={URL_LOGIN} component={Login} layout={AuthLayout} />
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
