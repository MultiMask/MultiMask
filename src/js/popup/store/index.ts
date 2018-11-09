import { info } from 'loglevel';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { createMemoryHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';
import { StorageService } from 'services/StorageService';

export const history = createMemoryHistory();
export type PopupStore = Store<IPopup.AppState, any>;

export function configureStore (): Promise<PopupStore> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  return new Promise(resolve => {
    StorageService.PopupState.get()
      .then(initialState => {
        // backup location
        initialState.router.url = clearUrl(initialState.router.location.pathname);

        resolve(createStore(
          connectRouter(history)(rootReducer),
          initialState,
          composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
        ));
      })
  })
  
}

export const subscriber = (store: PopupStore) => () => {
  StorageService.PopupState.set(store.getState());
}

export const clearUrl = (url) => {
  switch (url) {
    case '/login':
      return '/'
    default:
      return url;
  }
}