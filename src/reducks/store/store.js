import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { UserReducer } from '../users/reducers';
import { createLogger } from 'redux-logger';

export default function createStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UserReducer,
    }),
    applyMiddleware(logger, routerMiddleware(history), thunk)
  );
}
