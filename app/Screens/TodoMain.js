import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Moment from 'moment'
import Card from '../components/card.js'
import * as firebase from "firebase"
export default class TodoMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notes: [],
            note: ''
        }
    }  
    componentDidMount(){
        const user = firebase.auth().currentUser
        firebase.database().ref(user.uid).child("todo").on("value", snap => {
            let array =[]
            snap.forEach(snappp => {
                var childData = snappp.val();
                array.push(childData)                
        })
        this.setState({notes: array})
    }) }
    

  render() {
    const {notes} = this.state
      const notess = notes.map((chiled, i) => {
                   console.log("ssss", chiled.date)
                     return ( 
                                <Card 
                                key={i}
                                keyval={i}
                                note={chiled}
                                onPress={ () => this.deletMethod(chiled)}
                        />
                        )
                })
    return (
      <View style={styles.container}>
        <View style={styles.header} >
        <TextInput 
                value={this.state.note}
                placeholderTextColor={"white"}
                style={styles.textInput}
                placeholderStyle={{color: "white"}}
                placeholder={" < Notes Here  "}
                onChangeText={(note) => this.setState({note})}
                
            />
            <TouchableOpacity
                onPress={() => this.handlePress()}
                style={styles.addButton}>
                    <Text style={styles.addButtonText} > + </Text>    
             </TouchableOpacity>
        </View>
        <View style={styles.midContainer}>
            <ScrollView >
            { notess }
            </ScrollView>
        </View>
        
        <View style={styles.footer}>
            <Text style={styles.headerText}> Memos Always Help </Text>          
        </View>
      </View>
    );
  }
  deletMethod(key) {
     this.state.notes.splice(key, 1)
     this.setState({notes: this.state.notes})
     console.log("this is delete" + this.state.notes)
  }
  handlePress () {
      const user = firebase.auth().currentUser
    if (this.state.note){
       firebase.database().ref(user.uid).child("todo")
      .push({
        date: Moment().format('MMMM Do YYYY'),
        note: this.state.note
           })
        this.setState({note: ''})
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header:{
      paddingBottom:30,
    //   paddingLeft:40,
      flex:0.8,
      width:'100%',
      backgroundColor: "#FF4200",
      justifyContent: 'center',
      alignItems: 'center'
  },
  textInput:{
      marginLeft: 40,
      marginTop:30,
    width: '100%',
    color: 'white',
    height:30,
    paddingLeft: 10,
    borderLeftWidth: 5,
    borderLeftColor: "white",
   
   },
  headerText:{
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    
  },    
   midContainer:{    
       flex: 4,
       width:'100%',

   },
   footer:{
       backgroundColor: "#242426",
       flex:0.5,
       flexDirection: 'row',
       width:'100%',
       justifyContent:'center',
       alignItems: 'center'
   },
   addButton:{
    position: 'absolute',
    backgroundColor: '#242426',
    zIndex: 12,
    width: 80,
    height:80,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 50,
    top: 105,
    right:50,
    elevation: 8
   },
   addButtonText:{
    color: '#FA0034',
    fontSize: 50
   },
 

});
