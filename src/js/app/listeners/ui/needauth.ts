import { NEEDAUTH_CHECK, NEEDAUTH_RESULT } from '../../../constants/ui/needauth';

export default ({ App }) => async ({ type, payload }, sendResponse) => {
  switch (type) {
    case NEEDAUTH_CHECK: {
      sendResponse({
        type: NEEDAUTH_RESULT,
        payload: { isAuth: await App.check(payload.hashPass) }
      });
      break;
    }
  }
};
