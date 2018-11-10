import * as bip39 from 'bip39';
import { PROFILE_CREARE_DONE, PROFILE_CREATE_GENERATE } from 'constants/ui/createProfile';

const ProfileCreateAction = {
  generate: () => (dispatch, getState) => {
    dispatch({
      type: PROFILE_CREATE_GENERATE,
      payload: {
        seed: bip39.generateMnemonic()
      }
    });
  },

  done: () => (dispatch, getState) => {
    dispatch({
      type: PROFILE_CREARE_DONE,
    });
  }
};

export default ProfileCreateAction;
