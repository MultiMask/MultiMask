import { MODAL_START, MODAL_CONFIRM, MODAL_CANCEL } from 'constants/ui/modal';

const initialState = {
  show: false,
  res: null,
  rej: null,
  text: 'Are you sure'
};

export default function needAuthReducer (state = initialState, action) {
  switch (action.type) {
    case MODAL_START:
      return {
        ...state,
        ...action.payload,
        show: true,
      };
    case MODAL_CANCEL:
    case MODAL_CONFIRM:
      return {
        show: false,
        res: null,
        rej: null,
        text: initialState.text
      };
  }

  return state;
}
