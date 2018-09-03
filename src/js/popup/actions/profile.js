import InternalMessage from '../../libs/InternalMessage';
import { downloadFile } from '../helpers';
import { goBack } from 'connected-react-router';

import {
  PROFILE_GET,
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

import accountActions from './account';

const ProfileActions = {
  getProfile: id => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_GET, { id })
      .send()
      .then(({ payload: { encodedProfile } }) => {
        return encodedProfile;
      });
  },

  getList: () => (dispatch, getState) => {
    InternalMessage.signal(PROFILE_GETLIST)
      .send()
      .then(updateProfileListFn(dispatch));
  },

  add: () => (dispatch, getState) => {
    InternalMessage.signal(PROFILE_ADD)
      .send()
      .then(updateProfileListFn(dispatch));
  },

  remove: id => (dispatch, getState) => {
    InternalMessage.payload(PROFILE_REMOVE, { id })
      .send()
      .then(updateProfileListFn(dispatch));
  },

  // TODO: Add loading
  select: profileId => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_SELECT, { profileId })
      .send()
      .then(({ payload: { profileId } }) => {
        dispatch({
          type: PROFILE_SELECT_RESULT,
          payload: { profileId }
        });

        return accountActions.getInfo()(dispatch, getState);
      });
  },

  update: (id, data) => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_UPDATE, { id, data })
      .send()
      .then(updateProfileListFn(dispatch));
  },

  export: id => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_EXPORT, { id })
      .send()
      .then(({ payload: { encodedProfile } }) => {
        downloadFile(encodedProfile, 'myfilename.mm', 'text/plain;charset=utf-8');
        dispatch(goBack());
      });
  },

  import: (pass, encryptedProfile) => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_IMPORT, { pass, encryptedProfile })
      .send()
      .then(updateProfileListFn(dispatch));
  }
};

const updateProfileListFn = dispatch => ({ payload }) => {
  dispatch({
    type: PROFILE_GETLIST_RESULT,
    payload
  });
};

export default ProfileActions;
