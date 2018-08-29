import { PROFILE_GETLIST_RESULT, PROFILE_SELECT_RESULT } from '../../constants/profile';

const initialState = {
  list: [],
  selectedId: ''
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GETLIST_RESULT:
      return {
        ...state,
        list: action.payload.list,
        selectedId: action.payload.profileId
      };
    case PROFILE_SELECT_RESULT:
      return {
        ...state,
        selectedId: action.payload.profileId
      };
    default:
      return state;
  }
}
