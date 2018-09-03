import {
  PROFILE_GET,
  PROFILE_GET_RESULT,
  PROFILE_ADD,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_EXPORT_RESULT,
  PROFILE_GETLIST,
  PROFILE_GETLIST_RESULT,
  PROFILE_UPDATE,
  PROFILE_IMPORT,
  PROFILE_SELECT,
  PROFILE_SELECT_RESULT
} from './../../constants/profile';

export default ({ App }) => ({ type, payload }, sendResponse) => {
  switch (type) {
    // case PROFILE_GET: {
    //   App.io.profile.export(payload.id).then(encodedProfile => {
    //     sendResponse({
    //       type: PROFILE_GET_RESULT,
    //       payload: {
    //         encodedProfile
    //       }
    //     });
    //   });

    //   break;
    // }

    // case PROFILE_GETLIST: {
    //   sendData({ sendResponse, App });
    //   break;
    // }

    // case PROFILE_ADD: {
    //   App.io.profile.add().then(() => {
    //     sendData({ sendResponse, App });
    //   });
    //   break;
    // }

    // case PROFILE_REMOVE: {
    //   App.io.profile.remove(payload.id);
    //   sendData({ sendResponse, App });
    //   break;
    // }

    // case PROFILE_SELECT: {
    //   const { profileId } = payload;
    //   App.io.profile.select(profileId);

    //   sendResponse({
    //     type: PROFILE_SELECT_RESULT,
    //     payload: { profileId }
    //   });

    //   break;
    // }

    // case PROFILE_UPDATE: {
    //   App.io.profile.update(payload.id, payload.data);
    //   sendData({ sendResponse, App });

    //   break;
    // }

    // case PROFILE_EXPORT: {
    //   App.io.profile.export(payload.id).then(encodedProfile => {
    //     sendResponse({
    //       type: PROFILE_EXPORT_RESULT,
    //       payload: {
    //         encodedProfile
    //       }
    //     });
    //   });

    //   break;
    // }

    // case PROFILE_IMPORT: {
    //   const { pass, encryptedProfile } = payload;

    //   App.io.profile.import(pass, encryptedProfile);
    //   sendData({ sendResponse, App });

    //   break;
    // }
  }
};

const sendData = ({ sendResponse, App }) => {
  sendResponse({
    type: PROFILE_GETLIST_RESULT,
    payload: App.io.profile.getData()
  });
};
