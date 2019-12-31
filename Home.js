import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
//import {Button} from '@material-ui/core';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import LoginComponent from './Components/Login';

class HomeScreen extends React.Component {
 
    constructor(props) {
        super(props)
  
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LoginComponent navigation ={this.props.navigation} />
            </View>
        );
    }
}
export default HomeScreen