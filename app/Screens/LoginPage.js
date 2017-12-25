import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import * as firebase from 'firebase'


export default class LoginPage extends Component {
    state = {
        email: "",
        password: "",
    }
    componentDidMount() {
        // firebase.auth().signOut()
          firebase.auth().onAuthStateChanged(auth => {
                if (auth) {
                  this.firebaseRef = firebase.database().ref('users')
                  this.firebaseRef.child(auth.uid).on('value', snap => {
                    const user = snap.val()
                    if (user != null) {
                        this.firebaseRef.child(auth.uid).off('value')
                        this.props.navigation.navigate("TodoMain", {user})
                        }
                    })
                } else {
               return 
            }
          })
        }
    handleLogin = ()=>{
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => this.props.navigation.navigate("TodoMain"))    
        .catch( () => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( () => this.props.navigation.navigate("TodoMain")) 
            .catch(function(error) {
                var errorCode = error.code
                var errorMessage = error.message
              });
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Login Page</Text>
                <TextInput
                style={styles.textInput}
                placeholder="email"
                onChangeText={email => this.setState({email})}
                />
                <TextInput
                style={styles.textInput}
                placeholder="password"
                secureTextEntry
                onChangeText={password => this.setState({password})}
                 />

                 <Button
                 title="Login or Sign Up"
                 onPress={() => this.handleLogin()}
                 />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    textInput: {
        marginTop: 10,
        width:'70%',
        height: 40,
        borderWidth: 1,
        borderColor: 'darkgray'
    }
})