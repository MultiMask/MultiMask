import { downloadFile } from '../../helpers/files';
import { push, goBack } from 'connected-react-router';
import InternalMessage from 'services/InternalMessage';

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
  PROFILE_SELECT_RESULT,
  PROFILE_IMPORT_SET,
  PROFILE_GET_CURRENT
} from 'constants/profile';

import accountActions from './account';

const ProfileActions = {
  getCurrentProfile: () => (dispatch, getState) => {
    return InternalMessage.signal(PROFILE_GET_CURRENT)
      .send();
  },

  select: profileId => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_SELECT, { payload: { profileId }})
      .send();
  },
  
   getList: () => (dispatch, getState) => {
    InternalMessage.signal(PROFILE_GETLIST)
      .send()
      .then(updateProfileListFn(dispatch));
  },

  update: (id, data) => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_UPDATE, { payload: { id, data }})
      .send()
      .then(updateProfileListFn(dispatch));
  },

  getProfile: id => (dispatch, getState) => {
    return InternalMessage.payload(PROFILE_EXPORT, { payload: { id }})
      .send()
      .then(({ payload: { encodedProfile }}) => {
        return encodedProfile;
      });
  },












  // add: () => (dispatch, getState) => {
  //   InternalMessage.signal(PROFILE_ADD)
  //     .send()
  //     .then(updateProfileListFn(dispatch));
  // },

  // remove: id => (dispatch, getState) => {
  //   InternalMessage.payload(PROFILE_REMOVE, id)
  //     .send()
  //     .then(updateProfileListFn(dispatch));
  // },

  // export: id => (dispatch, getState) => {
  //   return InternalMessage.payload(PROFILE_EXPORT, id)
  //     .send()
  //     .then(({ encodedProfile }) => {
  //       downloadFile(encodedProfile, 'myfilename.mm', 'text/plain;charset=utf-8');
  //       dispatch(goBack());
  //     });
  // },

  // import: (pass, encryptedProfile) => (dispatch, getState) => {
  //   return InternalMessage.payload(PROFILE_IMPORT, { pass, encryptedProfile })
  //     .send()
  //     .then(() => {
  //       updateProfileListFn(dispatch);
  //       dispatch(goBack());
  //     });
  // },

  // setImportingProfile: encryptedProfile => dispatch => {
  //   dispatch({
  //     type: PROFILE_IMPORT_SET,
  //     payload: encryptedProfile
  //   });
  //   dispatch(push('/profiles/import'));
  // }
};

const updateProfileListFn = dispatch => ({ payload }) => {
  dispatch({
    type: PROFILE_GETLIST_RESULT,
    payload
  });
};

export default ProfileActions;
