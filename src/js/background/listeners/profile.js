import {
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

export default ({ messaging, App }) => {
  messaging.on(PROFILE_GETLIST, () => {
    sendData({ messaging, App });
  });

  messaging.on(PROFILE_ADD, () => {
    App.io.profile.add().then(() => {
      sendData({ messaging, App });
    });
  });

  messaging.on(PROFILE_REMOVE, ({ id }) => {
    App.io.profile.remove(id);
    sendData({ messaging, App });
  });

  messaging.on(PROFILE_EXPORT, ({ id }) => {
    App.io.profile.export(id).then(encodedProfile => {
      messaging.send({
        type: PROFILE_EXPORT_RESULT,
        payload: {
          encodedProfile
        }
      });
    });
  });

  messaging.on(PROFILE_UPDATE, ({ id, data }) => {
    App.io.profile.update(id, data);
    sendData({ messaging, App });
  });

  messaging.on(PROFILE_IMPORT, ({ pass, encryptedProfile }) => {
    const isImport = App.io.profile.import(pass, encryptedProfile);

    if (isImport !== null) sendData({ messaging, App });
  });

  messaging.on(PROFILE_SELECT, ({ profileId }) => {
    App.io.profile.select(profileId);

    messaging.send({
      type: PROFILE_SELECT_RESULT,
      payload: { profileId }
    });
  });
};

const sendData = ({ messaging, App }) => {
  const data = App.io.profile.getData();
  messaging.send({
    type: PROFILE_GETLIST_RESULT,
    payload: data
  });
};
