import { PROFILE_GETLIST_RESULT, PROFILE_SELECT_RESULT, PROFILE_IMPORT_SET } from '../../constants/profile';

const initialState = {
  list: [],
  selectedId: '',
  importProfile: null
};

export default function accountReducer (state = initialState, action) {
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
    case PROFILE_IMPORT_SET:
      return {
        ...state,
        importProfile: action.payload
      };
    default:
      return state;
  }
}
