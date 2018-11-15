import { info } from 'loglevel';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { createMemoryHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';
import { StorageService } from 'services/StorageService';

import { MAIN, LOGIN, LOADING, PROFILE_CREATE } from 'constants/popupUrl';

export const history = createMemoryHistory();
export type PopupStore = Store<IPopup.AppState, any>;

const TIMEOUT = 1000 * 60 * 15; // 15 minutes

export function configureStore (): Promise<PopupStore> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  return new Promise(resolve => {
    StorageService.PopupState.get()
    .then((initialState: IPopup.AppState) => {
      // backup location
      if (initialState) {
        if (initialState.timestamp && Date.now() - initialState.timestamp < TIMEOUT) {
          delete initialState.auth;
          initialState.router.url = clearUrl(initialState.router.location.pathname);
          
          info('Restore state', initialState);
        }
        delete initialState.timestamp;
      }

      resolve(createStore(
        connectRouter(history)(rootReducer),
        initialState as any,
        composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
      ));
    })
  })
}

export const subscriber = (store: PopupStore) => () => {
  info(store.getState().router.location.pathname);
  StorageService.PopupState.set({
    ...store.getState(),
    timestamp: Date.now()
  });
}

export const clearUrl = (url) => {
  switch (url) {
    case LOGIN:
    case LOADING:
      return MAIN;
    default:
      return url;
  }
}
