import { NEEDAUTH_START, NEEDAUTH_FAIL, NEEDAUTH_SUCCESS } from '../../../constants/ui/needauth';

const initialState = {
  isAuth: null,
  error: null
};

export default function needAuthReducer(state = initialState, action) {
  switch (action.type) {
    case NEEDAUTH_START:
      return {
        isAuth: false,
        error: null
      };
    case NEEDAUTH_SUCCESS:
      return {
        isAuth: true,
        error: null
      };
    case NEEDAUTH_FAIL:
      return {
        isAuth: false,
        error: action.payload.error
      };
  }

  return state;
}
