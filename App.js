import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './Home';
import SignIn from './SignIn'



const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    },
  },
  Details: {
    screen: SignIn,
    navigationOptions: {
      title: 'Chat with Lucy'
    }
  },
}, {headerMode: 'none'});


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

