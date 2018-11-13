import { goBack, push } from 'connected-react-router';
import { MAIN } from 'constants/popupUrl';

const RoutingActions = {
  goBack: () => dispatch => {
    return dispatch(goBack());
  },
  goMain: () => dispatch => {
    return dispatch(push(MAIN));
  }
};
export default RoutingActions;
