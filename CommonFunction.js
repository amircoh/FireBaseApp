import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { LoginManager } from 'react-native-fbsdk';


export const AppConfig = {
    firebaseConfig: {
        apiKey: "AIzaSyCY9ElYgl3R0Nyj8_JmJNuvn8SD5yFh18A",
        authDomain: "social-6a813.firebaseapp.com",
        databaseURL: "https://social-6a813.firebaseio.com",
        projectId: "social-6a813",
        storageBucket: "social-6a813.appspot.com",
        messagingSenderId: "714246493079",
        appId: "1:714246493079:web:eb4615774a2423cb366ad2",
        measurementId: "G-CTYM8KKYX9"
    },
}


export function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(AppConfig.firebaseConfig);
    }
}

export function SaveToLocalStorage(name, value) {
    AsyncStorage.setItem(name, value);
}

export function RemoveDataFromLocalStorage(value) {
    AsyncStorage.removeItem(value);
}