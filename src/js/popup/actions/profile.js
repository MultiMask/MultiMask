import messaging from '../message';

import {
  PROFILE_ADD,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_GETLIST,
  PROFILE_GETLIST_RESULT,
  PROFILE_UPDATE,
  PROFILE_IMPORT,
  PROFILE_SELECT,
  PROFILE_SELECT_RESULT
} from './../../constants/profile';

const ProfileActions = {
  getList: () => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_GETLIST
    });
  },
  getListResult: ({ list, profileId }) => (dispatch, getState) => {
    dispatch({
      type: PROFILE_GETLIST_RESULT,
      payload: { list, profileId }
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
  import: (pass, encryptedProfile) => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_IMPORT,
      payload: { pass, encryptedProfile }
    });
  },
  select: profileId => (dispatch, getState) => {
    messaging.send({
      type: PROFILE_SELECT,
      payload: { profileId }
    });
  },
  getSelectResult: profileId => (dispatch, getState) => {
    dispatch({
      type: PROFILE_SELECT_RESULT,
      payload: { profileId }
    });
  }
};

export default ProfileActions;
