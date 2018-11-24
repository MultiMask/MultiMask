import * as bip39 from 'bip39';
import { PROFILE_CREATE_DONE, PROFILE_CREATE_GENERATE } from 'constants/profile';
import InternalMessage from 'services/InternalMessage';

import AuthActions from 'popup/actions/auth';
import ProfileActions from 'popup/actions/profile';

const ProfileCreateAction = {
  generate: () => (dispatch, getState) => {
    dispatch({
      type: PROFILE_CREATE_GENERATE,
      payload: {
        seed: bip39.generateMnemonic()
      }
    });
  },

  done: (userSeed?: string) => (dispatch, getState: GetStateFn) => {
    const seed = userSeed || getState().ui.profileCreate.seed;
    InternalMessage.payload(PROFILE_CREATE_DONE, { payload: { seed } })
      .send()
      .then(({ success, payload: { profileId } }) => {
        if (!success) {
          throw new Error('Error on create new profile');
        }
        return ProfileActions.select(profileId)(dispatch, getState);
      })
      .then(({ payload: { current } }) => {
        return AuthActions.entrance(current, true)(dispatch, getState);
      })
      .then(() => {
        dispatch({
          type: PROFILE_CREATE_DONE
        });
      });
  }
};

export default ProfileCreateAction;
