import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks,saveDeck, getInitialData,ResetDecks,setReminder } from './utils/api'
import thunk from 'redux-thunk'
import logger from './middleware/logger'
import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import NavigationManager from "./components/NavigationManager"



export default class App extends React.Component {


  render() 
  {
  return (
    <View style={{ flex:1}}>
    <Provider store={createStore(reducer, applyMiddleware(thunk, logger))}>
    <NavigationManager />
    </Provider>
    </View>
  );
}
}
