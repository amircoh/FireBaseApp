import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import styles from './MainStyle'
import firebase from 'firebase';
export default class FixedLabelExample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userMail: '',
            userPassword: '',
            isLoading: false
        }
    }

    componentDidMount() {
        //this.IsLogedInFromLocalStorage();
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
            if (value && value === 'true') {
                console.log(value);
                this.props.navigation.navigate('Details')
            }
        } catch (e) {
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
        _this.setState({ isLoading: true })
        firebase.auth().signInWithEmailAndPassword(_this.state.userMail, _this.state.userPassword).then((val) => {
            console.log(val);
            if (val) {
                _this.setState({ isLoading: false })
                _this.props.navigation.navigate('Details')
            }
        }).catch((error) => {
            _this.setState({ isLoading: false })
            alert(error)
        })
    }

    FacebookSignIn = () => {

        var provider = new firebase.auth.FacebookAuthProvider();
        // provider.addScope('user_photos');
        provider.setCustomParameters({
            'display': 'popup'
        })

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            alert(user);
            // ...
          }).catch(function(error) {
              alert(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });


    }

    render() {
        return (
            <Container>
                <Header />
                <Content style={styles.container}>
                    <Form>
                        <Item rounded style={styles.LoginTxtUserName}>
                            <Input placeholder='    UserName' value={this.state.userMail} onChangeText={(text) => this.setState({ userMail: text })} />
                        </Item>
                        <Item rounded last style={styles.LoginTxtPassword}>
                            <Input secureTextEntry={true} placeholder=' Password' value={this.state.userPassword} onChangeText={(text) => this.setState({ userPassword: text })} />
                        </Item>
                        <Button rounded style={styles.LoginButton} onPress={this.FacebookSignIn}>
                            <Text>LogIn</Text>
                        </Button>
                    </Form>
                </Content>
                {this.state.isLoading == true &&
                    <ActivityIndicator style={styles.Loader} size="large" color="#0000ff" />
                }
            </Container>
        );
    }
}
