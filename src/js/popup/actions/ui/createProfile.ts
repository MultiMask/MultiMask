import * as bip39 from 'bip39';
import { PROFILE_CREATE_DONE, PROFILE_CREATE_GENERATE } from 'constants/profile';
import InternalMessage from 'services/InternalMessage';

const ProfileCreateAction = {
  generate: () => (dispatch, getState) => {
    dispatch({
      type: PROFILE_CREATE_GENERATE,
      payload: {
        seed: bip39.generateMnemonic()
      }
    });
  },

  done: () => (dispatch, getState: GetStateFn) => {
    dispatch({
      type: PROFILE_CREATE_DONE,
    });
    
    const seed = getState().ui.profileCreate.seed;
    InternalMessage.payload(PROFILE_CREATE_DONE, { payload: seed })
      .send()
      .then(({ success }) => {
        if (success) {
          // TODO: go to main screen
        }
      });
  }
};

export default ProfileCreateAction;
