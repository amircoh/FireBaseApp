import React from 'react';
import {
    View,
    Button,
    TextInput, ActivityIndicator, ToastAndroid, Keyboard, Picker, AsyncStorage
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import { AppConfig } from './Enums';

export default class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            isLoading: false,
            userArray: []
        }
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(AppConfig.firebaseConfig);
        }
        this.getData();
    }


    storeData = async () => {
        try {
            console.log("start");

            await AsyncStorage.setItem('@IsLogedIn', 'true');
            console.log("success add");
        } catch (e) {
            console.log(e);
        }
    }



    getData = () => {
        firebase.database().ref('users').on('value', (snap) => {

            this.setState({
                userArray: JSON.stringify(snap.val())
            })
        }, function (error) {
            console.log(error)
        })
    }

    testFunc = () => {
        if (this.state.inputText === '') {
            return;
        } else {
            this.setState({
                isLoading: true
            })
            var db = firebase.database().ref('users/' + this.state.inputText);
            db.set({
                name: this.state.inputText
            }).then(() => {
                this.setState({
                    isLoading: false,
                    inputText: ''
                })
                Keyboard.dismiss();
                ToastAndroid.show('Success Add', ToastAndroid.SHORT);
            }).catch((error) => { alert(error) })
        }
    }

    testFuncBulk = () => {

        var names = [
            {
                name: 'amir11',
                age: 22
            },
            {
                name: 'test11',
                age: 33
            }
        ]

        this.setState({
            isLoading: true
        })

        names.forEach(value => {
            var db = firebase.database().ref('users/' + value.name);
            db.set({
                name: value.name
            }).then(() => {
                this.setState({
                    isLoading: false,
                    inputText: ''
                })
                Keyboard.dismiss();
                ToastAndroid.show('Success Add', ToastAndroid.SHORT);
            }).catch((error) => { alert(error) })

        });

    }

    handlePickerValueChange = (val) => {
        this.setState({ userName: val });
        console.log(val);
    }

    Register = () => {
        firebase.auth().createUserWithEmailAndPassword("acohen04@gmail.com", "123456789").then((val) => {
            console.log(val);

            this.storeData();


        }).catch((error) => {
            console.log(error)
            alert(error);
        })
    }

    sendSignInLinkToEmail = () => {

        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'http://localhost:8081',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.ios'
            },
            android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
            },
            dynamicLinkDomain: 'amirtest.page.link'
        };


        firebase.auth().sendSignInLinkToEmail("acohen04@gmail.com", actionCodeSettings).then((val) => {
            console.log(val);

        }).catch((error) => {
            console.log(error)
        })
    }


    render() {
        const { userArray } = this.state
        console.log(userArray + "1");
        let res;

        if (userArray.length > 0) {
            var array = JSON.parse(userArray);
            res = <Picker
                selectedValue={this.state.userName}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => this.handlePickerValueChange(itemValue)
                }>
                {Object.values(array).map((val, index) => {
                    return (<Picker.Item label={val.name} value={val.name} key={index} />)
                })}
            </Picker>
        }


        return (
            <View>
                <TextInput value={this.state.inputText} onChangeText={(text) => this.setState({ inputText: text })} placeholder='enter name'></TextInput>
                <Button onPress={this.testFunc} title='ADD' />
                <Button onPress={this.testFuncBulk} title='Bulk' />
                {res}
                {this.state.isLoading == true &&
                    <ActivityIndicator size="large" color="#0000ff" />
                }

                <Button onPress={this.Register} title='Register' />

                <Button onPress={this.sendSignInLinkToEmail} title='SendToMail' />

            </View>
        )
    }
}

