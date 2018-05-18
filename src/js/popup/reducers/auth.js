import {
  AUTH_LOGIN_FAIL,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
} from '../../constants/auth';

const initialState = {
  isAuth: false,
  error: false,
};

export default function accountReducer(state = initialState, action) {
  console.log('auth reducer:', action);

  switch (action.type) {
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        error: true,
      }
    case AUTH_CHECK_FAIL:
      return {
        ...state,
        hasPass: action.hasPass,
        check: false
      }
    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        check: true
      }
  }

  return state;
}
