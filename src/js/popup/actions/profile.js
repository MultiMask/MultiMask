import messaging from '../message';

import {
  PROFILE_ADD,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_GETLIST,
  PROFILE_GETLIST_RESULT,
  PROFILE_UPDATE,
  PROFILE_IMPORT
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
  },
  update: (id, data) => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_UPDATE,
      payload: { id, data }
    });
  },
  import: encryptedProfile => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_IMPORT,
      payload: { encryptedProfile }
    });
  }
};

export default ProfileActions;
