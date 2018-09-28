import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import { createMemoryHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export const history = createMemoryHistory();

export function configureStore (initialState?) {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );
}
