import messaging from '../message';

import {
  PROFILE_ADD,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_GETLIST,
  PROFILE_GETLIST_RESULT
} from './../../constants/profile';

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
  },
  remove: id => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_REMOVE,
      payload: { id }
    });
  },
  export: id => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_EXPORT,
      payload: { id }
    });
  }
};

export default ProfileActions;
