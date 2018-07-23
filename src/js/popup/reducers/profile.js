import { PROFILE_GETLIST_RESULT } from '../../constants/profile';

const initialState = {
  list: []
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GETLIST_RESULT:
      return {
        ...state,
        list: action.payload.list
      };
    default:
      return state;
  }
}
