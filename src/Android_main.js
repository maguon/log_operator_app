/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import App from './android/App'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

export default class Android_main extends Component {
  render() {
    return (
            <Provider store={store}>
                 <App /> 
            </Provider>
    )
  }
}
