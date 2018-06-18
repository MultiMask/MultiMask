import messaging from '../../message';

import {
  NEEDAUTH_SUCCESS,
  NEEDAUTH_FAIL,
} from './../../../constants/ui/needauth';

import actions from './../../actions/ui/needauth';

export default function ({ dispatch, getState }) {
  messaging.on(NEEDAUTH_SUCCESS, () => {
    actions.success()(dispatch, getState);
  });

  messaging.on(NEEDAUTH_FAIL, () => {
    actions.fail("Wrong password")(dispatch, getState);
  });
}
