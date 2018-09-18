import { goBack } from 'connected-react-router';

const RoutingActions = {
  goBack: () => dispatch => {
    return dispatch(goBack());
  }
};
export default RoutingActions;
