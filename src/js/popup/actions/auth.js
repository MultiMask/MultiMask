import messaging from "../message";

import {
    AUTH_CHECK
} from "./../../constants/auth";

export default {
  check: () => (dispatch, getState) => {
    messaging.send({
      type: AUTH_CHECK
    });
  },
};
