import { PROFILE_GETLIST, PROFILE_GETLIST_RESULT } from './../../constants/profile';

export default ({ messaging, App }) => {
  messaging.on(PROFILE_GETLIST, () => {
    const list = App.io.profile.getList();

    messaging.send({
      type: PROFILE_GETLIST_RESULT,
      payload: {
        list
      }
    });
  });
};
