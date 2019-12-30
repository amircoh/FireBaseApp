import React from 'react';
import { View, Text, Button ,ActivityIndicator ,AsyncStorage} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//import {Button} from '@material-ui/core';
import ReactDOM from 'react-dom';
import firebase from 'firebase';


class HomeScreen extends React.Component {
    static NavigationOptions = {
        title: 'Welcom',
        // headerRight: () => (
        //     <Button
        //         onPress={() => alert('This is a button!')}
        //         title="Info"
        //         color="red"
        //     />)
    };

    constructor(props) {
        super(props)
        this.state = {
            userMail: '',
            userPassword: '',
            isLoading: false
        }
    }

    componentWillMount(){
        this.IsLogedInFromLocalStorage();
    }
    componentDidMount() {
      
        var firebaseConfig = {
            apiKey: "AIzaSyCY9ElYgl3R0Nyj8_JmJNuvn8SD5yFh18A",
            authDomain: "social-6a813.firebaseapp.com",
            databaseURL: "https://social-6a813.firebaseio.com",
            projectId: "social-6a813",
            storageBucket: "social-6a813.appspot.com",
            messagingSenderId: "714246493079",
            appId: "1:714246493079:web:eb4615774a2423cb366ad2",
            measurementId: "G-CTYM8KKYX9"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    IsLogedInFromLocalStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('@IsLogedIn')
          if(value && value ==='true') {
           console.log(value);
           this.props.navigation.navigate('Details')
          }
        } catch(e) {
            console.log(e);;
        }
      }


    Register = () => {
        firebase.auth().createUserWithEmailAndPassword("acohen04@gmail.com", "123456789").then((val) => {
            console.log(val);
        }).catch((error) => {
            console.log(error)
        })
    }

    SignIn = () => {
        var _this = this;
        _this.setState({isLoading:true})
        firebase.auth().signInWithEmailAndPassword(_this.state.userMail, _this.state.userPassword).then((val) => {
            console.log(val);
            if (val) {
                _this.setState({isLoading:false})
                this.props.navigation.navigate('Details')
            }
        }).catch((error) => {
            _this.setState({isLoading:false})
            alert(error)
        })
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Email</Text>
                <TextInput value={this.state.userMail} onChangeText={(text) => this.setState({ userMail: text })} placeholder='Enter Email'></TextInput>

                <Text>Password</Text>
                <TextInput secureTextEntry={true}  value={this.state.userPassword} onChangeText={(text) => this.setState({ userPassword: text })} placeholder='Enter Password'></TextInput>

                <Button onPress={this.SignIn} title='SignIn' />
                {/* 
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                /> */}
                {this.state.isLoading == true &&
                    <ActivityIndicator size="large" color="#0000ff" />
                }

            </View>

        );
    }
}
export default HomeScreen