import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';
import rootSaga from './sagas';

const middleware = [];

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

middleware.push(sagaMiddleware, loggerMiddleware);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['score', 'over', 'batters', 'wickets', 'matchOver'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middleware)),
);

let persistor = persistStore(store);

export {store, persistor};

sagaMiddleware.run(rootSaga);
