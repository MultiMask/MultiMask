import { MODAL_START, MODAL_CONFIRM, MODAL_CANCEL } from 'constants/ui/modal';

const NeedAuthActions = {
  openModal: (text?: string) => (dispatch, getState) => {
    return new Promise((res, rej) => {
      dispatch({
        type: MODAL_START,
        payload: {
          res, rej, text
        }
      });
    })
  },
  confirmModal: () => (dispatch, getState) => {
    const state: IPopup.AppState = getState();

    state.ui.modal.res();
    dispatch({
      type: MODAL_CONFIRM,
    });
  },
  cancelModal: () => (dispatch, getState) => {
    const state: IPopup.AppState = getState();

    state.ui.modal.rej();
    dispatch({
      type: MODAL_CANCEL,
    });
  },
};

export default NeedAuthActions;
