import messaging from '../message';
import { downloadFile } from '../helpers';
import { PROFILE_GETLIST_RESULT, PROFILE_EXPORT_RESULT, PROFILE_SELECT_RESULT } from './../../constants/profile';

import profileActions from './../actions/profile';
import accountActions from './../actions/account';

export default function({ dispatch, getState }) {
  messaging.on(PROFILE_GETLIST_RESULT, ({ list, profileId }) => {
    profileActions.getListResult({ list, profileId })(dispatch, getState);
  });

  messaging.on(PROFILE_EXPORT_RESULT, ({ encodedProfile }) => {
    downloadFile(encodedProfile, 'myfilename.mm', 'text/plain;charset=utf-8');
  });

  messaging.on(PROFILE_SELECT_RESULT, ({ profileId }) => {
    profileActions.getSelectResult(profileId)(dispatch, getState);
    //TODO: Make middleware for chain async actions
    accountActions.getInfo()(dispatch, getState);
  });
}
