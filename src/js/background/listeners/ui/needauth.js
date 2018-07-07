import {
  NEEDAUTH_CHECK,
  NEEDAUTH_SUCCESS,
  NEEDAUTH_FAIL,
} from "../../../constants/ui/needauth";

export default ({ messaging, App }) => {
  messaging.on(NEEDAUTH_CHECK, async data => {
    const completed = await App.login(data.pass);

    messaging.send({
      type: completed ? NEEDAUTH_SUCCESS : NEEDAUTH_FAIL
    });
  });
};
