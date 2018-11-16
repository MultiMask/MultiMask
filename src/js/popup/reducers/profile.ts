import { PROFILE_GETLIST_RESULT, PROFILE_SELECT_RESULT } from '../../constants/profile';

const initialState: IPopup.State.Profile = {
  list: [],
  current: ''
};

export default function accountReducer (state: IPopup.State.Profile = initialState, action) {
  switch (action.type) {
    case PROFILE_GETLIST_RESULT:
      return {
        ...state,
        ...action.payload
      };
    case PROFILE_SELECT_RESULT:
      return {
        ...state,
        current: action.payload.current
      };
    default:
      return state;
  }
}
