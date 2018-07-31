import messaging from '../message';
import { downloadFile } from '../helpers';
import { PROFILE_GETLIST_RESULT, PROFILE_EXPORT_RESULT } from './../../constants/profile';

import profileActions from './../actions/profile';

export default function({ dispatch, getState }) {
  messaging.on(PROFILE_GETLIST_RESULT, res => {
    profileActions.getListResult(res.list)(dispatch, getState);
  });

  messaging.on(PROFILE_EXPORT_RESULT, ({ encodedProfile }) => {
    downloadFile(encodedProfile, 'myfilename.mm', 'text/plain;charset=utf-8');
  });
}
