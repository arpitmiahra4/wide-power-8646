import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
  } from 'redux';
import { reducer as AuthReducer } from './Auth/auth.reducer';
import thunk from 'redux-thunk';
import { roomReducer } from './Room/room.reducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

  const composeEnhancers: any =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: AuthReducer,
  roomManager : roomReducer 
});

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

export type useAppDispatch = typeof store.dispatch;