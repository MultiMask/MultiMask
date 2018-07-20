import {
  PROFILE_ADD,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_EXPORT_RESULT,
  PROFILE_GETLIST,
  PROFILE_GETLIST_RESULT,
  PROFILE_UPDATE
} from './../../constants/profile';

export default ({ messaging, App }) => {
  messaging.on(PROFILE_GETLIST, () => {
    sendList({ messaging, App });
  });

  messaging.on(PROFILE_ADD, () => {
    App.io.profile.add().then(() => {
      sendList({ messaging, App });
    });
  });

  messaging.on(PROFILE_REMOVE, ({ id }) => {
    App.io.profile.remove(id);
    sendList({ messaging, App });
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
    sendList({ messaging, App });
  });
};

const sendList = ({ messaging, App }) => {
  const list = App.io.profile.getList();

  messaging.send({
    type: PROFILE_GETLIST_RESULT,
    payload: {
      list
    }
  });
};
