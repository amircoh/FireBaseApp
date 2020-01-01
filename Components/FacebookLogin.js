import React, { Component } from 'react';
import { View, Button, Image } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class LoginFB extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pic: '',
        }
    }

    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log(result.toString());
            this.setState({
                pic: result.picture.data.url
            })
        }
    }

    getGrapf = () => {

        const infoRequest = new GraphRequest(
            '/me',
            {
                parameters: {
                    fields: {
                        string: 'picture,email,name,first_name,middle_name,last_name'
                    }
                }
            },
            this._responseInfoCallback,
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
    }


    render() {
        return (
            <View>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} />
                <Button
                    title="Press me"
                    onPress={this.getGrapf}
                />
                {this.state.pic !== null &&
                    <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.pic }} />
                }

            </View>
        );
    }
};
