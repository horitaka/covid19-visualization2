import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger';

import {
  covid19DataReducer,
  appStateReducer,
  covid19DataEditReducer,
  rootSaga
} from "./modules";

export default function configuStore() {
  const rootReducers = combineReducers({
    covid19Data: covid19DataReducer,
    appState: appStateReducer,
    covid19DataEdit: covid19DataEditReducer,
  });
  const sagaMiddleware = createSagaMiddleware();

  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
  });

  const store = createStore(
    rootReducers,
    applyMiddleware(sagaMiddleware, loggerMiddleware)
  )

  sagaMiddleware.run(rootSaga);

  return store;
}
