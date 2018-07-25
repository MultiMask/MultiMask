import {
  STATE_BUY,
  STATE_INIT,
  STATE_MAIN,
  STATE_SEND,
  STATE_LOGIN,
  STATE_CREATE,
  STATE_WALLET,
  STATE_EXPORTPK,
  STATE_PROFILES,
  STATE_EXPORT_PROFILE,
  STATE_VIEW_BUY,
  STATE_VIEW_INIT,
  STATE_VIEW_MAIN,
  STATE_VIEW_SEND,
  STATE_VIEW_CREATION,
  STATE_VIEW_LOGIN,
  STATE_VIEW_WALLET,
  STATE_VIEW_EXPORTPK,
  STATE_VIEW_PROFILES,
  STATE_VIEW_EXPORT_PROFILE,
  STATE_VIEW_SETTINGS
} from '../../constants/state';

const initialState = {
  view: STATE_VIEW_INIT
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case STATE_BUY:
      return {
        ...state,
        view: STATE_VIEW_BUY
      };
    case STATE_INIT:
      return {
        ...state,
        view: STATE_VIEW_INIT
      };
    case STATE_MAIN:
      return {
        ...state,
        view: STATE_VIEW_MAIN
      };
    case STATE_SEND:
      return {
        ...state,
        view: STATE_VIEW_SEND
      };
    case STATE_LOGIN:
      return {
        ...state,
        view: STATE_VIEW_LOGIN
      };
    case STATE_CREATE:
      return {
        ...state,
        view: STATE_VIEW_CREATION
      };
    case STATE_WALLET:
      return {
        ...state,
        view: STATE_VIEW_WALLET
      };
    case STATE_EXPORTPK:
      return {
        ...state,
        view: STATE_VIEW_EXPORTPK
      };
    case STATE_EXPORT_PROFILE:
      return {
        ...state,
        view: STATE_VIEW_EXPORT_PROFILE
      };
    case STATE_PROFILES:
      return {
        ...state,
        view: STATE_VIEW_PROFILES
      };
    case STATE_VIEW_SETTINGS:
      return {
        ...state,
        view: STATE_VIEW_SETTINGS
      };
    default:
      return state;
  }
}
