import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

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

export async function SaveToLocalStorage(name, value) {
    await AsyncStorage.setItem(name, value).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
}

export async function GetDataFromLocalStorage(value) {
    await AsyncStorage.getItem(value).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
}

export async function RemoveDataFromLocalStorage(value) {
    await AsyncStorage.removeItem(value).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
}