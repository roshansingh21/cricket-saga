import React from 'react';
import {LogBox} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import Game from './screens/Game';

LogBox.ignoreAllLogs();

const Main = () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Game />
    </PersistGate>
  </StoreProvider>
);
export default Main;
