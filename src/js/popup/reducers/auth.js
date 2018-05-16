import {
    AUTH_LOGIN_FAIL
} from '../../constants/auth';
  
  const initialState = {
    isAuth: false,
    error: false,
  };
  
  export default function accountReducer(state = initialState, action) {
    console.log('auth reducer:', action);
  
    switch (action.type) {
      case AUTH_LOGIN_FAIL: {
        return {
          ...state,
          error: true,
        }
        break;
      }
    }
  
    return state;
  }
  