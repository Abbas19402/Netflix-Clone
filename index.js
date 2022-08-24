/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
 
AppRegistry.registerComponent(appName, () => App);

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import 'react-native-gesture-handler';
// import {Router} from 'react-router-native'
// import React from 'react'
 
// AppRegistry.registerComponent(appName, () => {
//     return(
//     <Router>
//         <App />
//     </Router>
//     )
// });