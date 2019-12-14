import React from 'react';
import { Provider } from 'react-redux';

import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import { StatusBar } from 'react-native';
import Routes from './routes';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" backgroundColor="rgba(20,20,23,.8)" />
      <Routes />
    </Provider>
  );
}
