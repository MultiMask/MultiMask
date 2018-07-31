import {
  STATE_CREATE,
  STATE_MAIN,
  STATE_WALLET,
  STATE_BUY,
  STATE_SEND,
  STATE_PROFILES,
  STATE_EXPORT_PROFILE,
  STATE_IMPORT_PROFILE,
  STATE_EXPORTPK,
  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_EXPORTPK,
  STATE_VIEW_SETTINGS,
  STATE_VIEW_EXPORT_PROFILE,
  STATE_VIEW_IMPORT_PROFILE
} from './../../constants/state';

const StateActions = {
  createWallet: () => (dispatch, getState) => {
    dispatch({
      type: STATE_CREATE
    });
  },
  goMain: () => (dispatch, getState) => {
    dispatch({
      type: STATE_MAIN
    });
  },
  goWallet: name => (dispatch, getState) => {
    dispatch({
      type: STATE_WALLET,
      payload: name
    });
  },
  goBuy: () => (dispatch, getState) => {
    dispatch({
      type: STATE_BUY
    });
  },
  goSend: () => (dispatch, getState) => {
    dispatch({
      type: STATE_SEND
    });
  },
  goExportPK: () => (dispatch, getState) => {
    dispatch({
      type: STATE_EXPORTPK
    });
  },
  goExportProfile: () => (dispatch, getState) => {
    dispatch({
      type: STATE_EXPORT_PROFILE
    });
  },
  goImportProfile: () => (dispatch, getState) => {
    dispatch({
      type: STATE_IMPORT_PROFILE
    });
  },
  goProfile: () => (dispatch, getState) => {
    dispatch({
      type: STATE_PROFILES
    });
  },
  goToSettings: () => (dispatch, getState) => {
    dispatch({
      type: STATE_VIEW_SETTINGS
    });
  },
  goBack: () => (dispatch, getState) => {
    const { state, account } = getState();
    const { view } = state;

    switch (view) {
      case STATE_VIEW_BUY:
      case STATE_VIEW_SEND:
      case STATE_VIEW_EXPORTPK:
        StateActions.goWallet(account.name)(dispatch, getState);
        break;
      case STATE_VIEW_EXPORT_PROFILE:
      case STATE_VIEW_IMPORT_PROFILE:
        StateActions.goProfile()(dispatch, getState);
        break;
      default:
        StateActions.goMain()(dispatch, getState);
    }
  }
};
export default StateActions;
