import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput, ActivityIndicator, ToastAndroid, Keyboard, Picker
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
      isLoading: false,
      userArray: []
    }
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
    this.getData();
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
    }).catch((error) => {
      console.log(error)
    })
  }

  SignIn = () => {
    firebase.auth().signInWithEmailAndPassword("acohen04@gmail.com", "123456789").then((val) => {
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
        <Button onPress={this.testFunc} title='asdas' />
        <Button onPress={this.testFuncBulk} title='Bulk' />
        {res}
        {this.state.isLoading == true &&
          <ActivityIndicator size="large" color="#0000ff" />
        }


        <Button onPress={this.Register} title='Register' />

        <Button onPress={this.SignIn} title='SignIn' />

      </View>
    )
  }

}

