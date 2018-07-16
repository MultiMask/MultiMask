import messaging from '../message';

import { PROFILE_GETLIST_RESULT } from './../../constants/profile';

import profileActions from './../actions/profile';

export default function({ dispatch, getState }) {
  messaging.on(PROFILE_GETLIST_RESULT, res => {
    profileActions.getListResult(res.list)(dispatch, getState);
  });
}
