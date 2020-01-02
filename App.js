import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './Home';
import SignIn from './SignIn'

const DrawerStack = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    },
  }
}, {
  drawerType: 'slide', edgeWidth: 10
})

const RootStack = createStackNavigator({
  Home: {
    screen: DrawerStack,
  },
  Details: {
    screen: SignIn
  }
}, { headerMode: 'none' })

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

