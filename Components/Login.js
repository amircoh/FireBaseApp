import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, Left, Title, Body, Right } from 'native-base';
import FacebookLogin from './FacebookLogin';

import * as Common from '../CommonFunction';

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
        Common.initFirebase();
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
        this.setState({ isLoading: true })
        firebase.auth().signInWithEmailAndPassword(this.state.userMail, this.state.userPassword).then((val) => {
            console.log(val);
            if (val) {
                this.setState({ isLoading: false })
                this.props.navigation.navigate('Details')
            }
        }).catch((error) => {
            this.setState({ isLoading: false })
            alert(error)
        })
    }

    render() {
        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' onPress={() => { this.props.navigation.toggleDrawer() }} />
                        </Button>
                    </Right>
                </Header>


                <Content style={styles.container}>
                    {/* firebaseLogin
                    <Form>
                        <Item rounded style={styles.LoginTxtUserName}>
                            <Input placeholder='    UserName' value={this.state.userMail} onChangeText={(text) => this.setState({ userMail: text })} />
                        </Item>
                        <Item rounded last style={styles.LoginTxtPassword}>
                            <Input secureTextEntry={true} placeholder=' Password' value={this.state.userPassword} onChangeText={(text) => this.setState({ userPassword: text })} />
                        </Item>
                        <Button rounded style={styles.LoginButton} onPress={this.SignIn}>
                            <Text>LogIn</Text>
                        </Button>

                    </Form> */}
                    <FacebookLogin navigation={this.props.navigation} />
                </Content>
                {this.state.isLoading == true &&
                    <ActivityIndicator style={styles.Loader} size="large" color="#0000ff" />
                }
            </Container>
        );
    }
}
