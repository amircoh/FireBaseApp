import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeScreen from './Home';
import SignIn from './SignIn'


const RootStack = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    },
  },
  Details: {
    screen: SignIn,
    navigationOptions: {
      title: 'Details'
    }
  }
}, {
  drawerType:'slide' ,edgeWidth:10
  
})

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

