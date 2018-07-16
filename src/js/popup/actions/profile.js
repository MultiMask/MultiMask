import messaging from '../message';

import { PROFILE_ADD, PROFILE_GETLIST, PROFILE_GETLIST_RESULT } from './../../constants/profile';

const ProfileActions = {
  getList: () => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_GETLIST
    });
  },
  getListResult: list => (dispatch, getState) => {
    dispatch({
      type: PROFILE_GETLIST_RESULT,
      payload: { list }
    });
  },
  add: () => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_ADD
    });
  }
};

export default ProfileActions;
