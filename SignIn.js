import React from 'react';
import {
    View,
    TextInput, ActivityIndicator, ToastAndroid, Keyboard, Picker, AsyncStorage,BackHandler
} from 'react-native';

import {
    Container, Header, Content, Form, Item, Label, Button, Text, Icon, Left, Title, Body,
    Right, Thumbnail, Input, Footer, FooterTab, Drawer,DatePicker, Badge,ListItem
} from 'native-base';
//import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import { AppConfig } from './CommonFunction';
import styles from './Components/MainStyle';
import * as Common from './CommonFunction';
import { LoginManager } from 'react-native-fbsdk';
import SideBar from './Drawer';

export default class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            isLoading: false,
            userArray: [],
            friendsArray:[],
            chosenDate: new Date() 
        };
        this.setDate = this.setDate.bind(this);

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        Common.initFirebase();
        //this.getData();
        this.getFriendsList();
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    getFriendsList = () => {
        this.setState({
            isLoading:true,
        });
        firebase.database().ref('UsersLogin').on('value', (snap) => {
            this.setState({
                isLoading:false,
                friendsArray: JSON.stringify(snap.val())
            });
        });
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

    logoutFormFB = () => {
        LoginManager.logOut();
        AsyncStorage.removeItem('userid');
        this.props.navigation.navigate('Home');
    }

    closeDrawer() {

        this.drawer._root.close()
    };

    // openDrawer = () => { this.drawer._root.open() };

    openDrawer() {
        this.drawer._root.open()
    };


    // amirTest = (arr) => {
    //     if (arr && arr.length > 0) {
    //         var array = JSON.parse(arr);
    //         return (<View>
    //             {Object.values(array).map((message) => <Text>{message.name}</Text>)}
                
    //         </View>
    //         )
    //     }
          
    // }

    render() {
        const { navigation } = this.props;
        const { userArray ,friendsArray} = this.state

        var today = new Date();
        var bday = navigation.state.params.userBirthDay.toString().substr(6, 4);

        var getFbFriendsList =JSON.stringify(navigation.state.params.userFriendsList);

        var age = today.getFullYear() - bday;


        console.log(userArray + "1");
        let res;
        let friendList;
        let fbFriendsList;



        if (getFbFriendsList) {
           var array =JSON.parse(getFbFriendsList);
           fbFriendsList =<View>

                {Object.values(array).map((val, key) => <Text key={key}>{val.name}</Text>)}
           </View>
        }



        if (friendsArray && friendsArray.length > 0) {
            var array = JSON.parse(friendsArray);
            friendList = <View>
                {Object.values(array).map((message, key) => <Text key={key}>{"Friend " + key + ", " + message.name}</Text>)}
            </View>
        }

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
            <Drawer openDrawerOffset='0.3' type='displace' ref={(ref) => { this.drawer = ref; }} content={<SideBar navigator={this.navigator} />}
                onClose={() => this.closeDrawer()} >
                <Container>

                    <Header>
                        <Left>
                            <Button transparent>
                                {/* <Icon name='menu' onPress={() => { this.props.navigation.toggleDrawer() }} /> */}
                                <Icon name='menu' onPress={() => { this.openDrawer() }} />


                            </Button>
                        </Left>
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.logoutFormFB}>
                                <Text>Sign-Out</Text>
                            </Button>
                            {navigation.state.params.userIdPic &&
                                <Thumbnail source={{ uri: navigation.state.params.userIdPic }} />
                            }

                        </Right>
                    </Header>


                    <Content style={{ paddingTop: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <Text>Welcome, {navigation.state.params.userName}</Text>
                            {/* <Text>{age}</Text> */}
                                {/* {this.amirTest(this.state.friendsArray)} */}
                                {/* {friendList} */}
                                {fbFriendsList}
                        </View>
                        {/* <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(bday, 1, 1)}
                            maximumDate={new Date()}
                            locale={"he-il"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.setDate}
                            disabled={false}
                        />
                        <Text>
                            Date: {this.state.chosenDate.toString().substr(4, 12)}
                        </Text> */}



                        {/* 
                    <Item>
                        <Input placeholder='enter name' value={this.state.inputText} onChangeText={(text) => this.setState({ inputText: text })} />
                    </Item> */}
                        {/* 
                    {res}
                    <Button rounded style={styles.LoginButton} onPress={this.testFunc}>
                        <Text>ADD</Text>
                    </Button>

                    <Button rounded style={styles.LoginButton} onPress={this.testFuncBulk}>
                        <Text>Bulk</Text>
                    </Button>

                    <Button rounded style={styles.LoginButton} onPress={this.Register}>
                        <Text>Register</Text>
                    </Button>

                    <Button rounded style={styles.LoginButton} onPress={this.sendSignInLinkToEmail}>
                        <Text>SendToMail</Text>
                    </Button> */}



                        {this.state.isLoading == true &&
                            <ActivityIndicator size="large" color="#0000ff" />
                        }
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button active vertical>
                                <Icon name="apps" />
                                <Text>Apps</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="camera" />
                                <Text>Camera</Text>
                            </Button>
                            <Button active badge vertical>
                                <Badge ><Text>51</Text></Badge>
                                <Icon active name="navigate" />
                                <Text>Navigate</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="person" />
                                <Text>Contact</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>
        )
    }
}

