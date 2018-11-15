import { PROFILE_GETLIST_RESULT, PROFILE_SELECT_RESULT, PROFILE_IMPORT_SET } from '../../constants/profile';

const initialState: IPopup.State.Profile = {
  list: [],
  current: '',
  onImport: null
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
    case PROFILE_IMPORT_SET:
      return {
        ...state,
        onImport: action.payload
      };
    default:
      return state;
  }
}
