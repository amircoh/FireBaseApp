import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './Home';
import SignIn from './SignIn'


const DrawerStack = createDrawerNavigator({

  Details: {
    screen: SignIn
  }
}, {
  drawerType: 'slide', edgeWidth: 10
})

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DrawerStack
  }
}, { headerMode: 'none' })


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

