import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import LoginComponent from './Components/Login';
import LoginFB from './Components/FacebookLogin';


class HomeScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LoginFB/>
            </View>
        );
    }
}
export default HomeScreen