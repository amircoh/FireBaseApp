import React, { Component } from 'react';
import { View, Image, ToastAndroid, Keyboard, AsyncStorage } from 'react-native';
import styles from './MainStyle'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import * as Common from '../CommonFunction';
import firebase from 'firebase';

export default class LoginFB extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogedIn: 'true'
        }
    }

    addUserToFirebaseDB = (userid, userName) => {

        var db = firebase.database().ref('UsersLogin/' + userid);
        db.set({
            name: userName
        }).then(() => {
            Keyboard.dismiss();
            ToastAndroid.show('Success Add', ToastAndroid.SHORT);
            this.props.navigation.navigate('Details');
        }).catch((error) => { alert(error) })

    }

    loginClick = () => {

        _responseInfoCallback = (error, result) => {
            if (error) {

                LoginManager.logInWithPermissions(["public_profile"]).then(
                    function (result) {
                        if (result.isCancelled) {
                            console.log("Login cancelled");
                        } else {
                            console.log(
                                "Login success with permissions: " +
                                result.grantedPermissions.toString()
                            );
                        }
                    },
                    function (error) {
                        console.log("Login fail with error: " + error);
                    }
                );
            } else {
                //success Logged In

                this.addUserToFirebaseDB(result.id, result.name)

                Common.SaveToLocalStorage('userid', result.id);

                this.props.navigation.navigate('Details', {
                    userIdPic: result.picture.data.url
                });
            }
        }

        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    //success login
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            parameters: {
                                fields: {
                                    string: 'id,picture,email,name,first_name,middle_name,last_name'
                                }
                            }
                        },
                        this._responseInfoCallback,
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();

                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    fbAutomaticLogin = () => {

        _responseInfoCallback = (error, result) => {

            if (error) {

                LoginManager.logInWithPermissions(["public_profile"]).then(
                    function (result) {
                        if (result.isCancelled) {
                            console.log("Login cancelled");
                        } else {
                            console.log(
                                "Login success with permissions: " +
                                result.grantedPermissions.toString()
                            );
                        }
                    },
                    function (error) {
                        console.log("Login fail with error: " + error);
                    }
                );
            } else {
                //success Logged In
                this.props.navigation.navigate('Details',{
                    userIdPic: result.picture.data.url
                });
            }
        }

        const infoRequest = new GraphRequest(
            '/me',
            {
                parameters: {
                    fields: {
                        string: 'picture,email,name,first_name,middle_name,last_name'
                    }
                }
            },
            _responseInfoCallback,
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
    }


    componentDidMount() {
        Common.initFirebase();
        
        AsyncStorage.getItem('userid').then((res) => {
            if (res !== '' && res !==null) {
                this.fbAutomaticLogin();
            }
        }).catch((error) => {
            alert(error);
        });

    
    }

    render() {
        return (
            <View>

                <Button rounded style={styles.LoginButton} onPress={this.loginClick}>
                    <Text>Login With Facebook</Text>
                </Button>

                {this.state.pic !== null &&
                    <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.pic }} />
                }

            </View>
        );
    }
};
