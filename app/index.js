import React from 'react';
import { StyleSheet, View} from 'react-native';
import Routes from './Screens/Routes'
import * as firebase from "firebase"

const config = {
    apiKey: "AIzaSyAqy1qS4bKs8Yg9PW8PgeC8ahUYERiQ2Vk",
    authDomain: "todo-meetupsss.firebaseapp.com",
    databaseURL: "https://todo-meetupsss.firebaseio.com",
    projectId: "todo-meetupsss",
    storageBucket: "",
    messagingSenderId: "18510537782"
  };
  firebase.initializeApp(config);

export default class App extends React.Component {
 
  render() {
 
    return (
        <View style={{flex: 1}}>
            <Routes />
        </View>
     )
  }
}

