import { goBack, push } from 'connected-react-router';
import { URL_MAIN } from 'constants/popupUrl';

const RoutingActions = {
  goBack: () => dispatch => {
    return dispatch(goBack());
  },
  goMain: () => dispatch => {
    return dispatch(push(URL_MAIN));
  }
};
export default RoutingActions;
