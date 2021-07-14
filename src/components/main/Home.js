import React,{ useState,useLayoutEffect,useEffect } from 'react'
import { StatusBar } from  'expo-status-bar';
import {Button, Input,Image,Text } from 'react-native-elements';
import { db,auth } from '../../config/firebase';
import CustomListItems from './CustomListItems';
import { Avatar,IconButton } from '@material-ui/core';
import { KeyboardAvoidingView,View,StyleSheet,Dimensions ,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import firebase from 'firebase';
import {  useCollection  } from 'react-firebase-hooks/firestore';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Home({navigation}) {
    const [user,setUser]= useState(auth.currentUser);
    const Chatss = db.collection('chats').where('users','array-contains',auth.currentUser.email);
    const [chatsSnapshot] = useCollection(Chatss);
    const signOutUser =() =>{
        auth.signOut();
    }
    useEffect(()=>{
        if(auth){
            db.collection("users").doc(auth.currentUser.uid).set({
                email:auth.currentUser.email,
                lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
                photoURL:auth.currentUser.photoURL,
              },
              {merge:true}  
              ).catch(alert);
              db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                  const user = snapshot.data();
                  user.id=snapshot;
                  setUser(user);
              })
        }
        else{
            console.log('false')
        }
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"WhatsApp",
            headerStyle:{ backgroundColor:'#FFF' }, 
            headerTitleStyle:{ color:"black",fontWeight:600,borderBottomWidth:0 },
            headerTintColor:"black",
            headerLeft:()=>(
                <View  style={{flexDirection:'row',margin:10}} >
                        <TouchableOpacity    style={{marginLeft:5}} >
                            <Avatar style={{fontSize:24}} src={auth.currentUser.photoURL} />
                        </TouchableOpacity>
                </View>
            ),
            headerRight:() => (
                    <View style={{marginRight:15}} style={{flexDirection:'row',margin:10}} >
                        <TouchableOpacity   style={{margin:10}} >
                            <SearchRoundedIcon  style={{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('AddChat')}    style={{margin:10}} >
                            <PersonAddRoundedIcon  />
                        </TouchableOpacity>
                        <TouchableOpacity    style={{margin:10}} >
                            <MoreVertRoundedIcon  style={{fontSize:20}} />
                        </TouchableOpacity>
                    </View>
            ),
        });
    },[]);
    return (
        <View style={{backgroundColor:'white',}} >
            <ScrollView style={styles.container} >  
                {
                    chatsSnapshot?.docs.map(chat=>(
                        <CustomListItems key={chat.id} id={chat.id} users={chat.data().users} navigation={navigation} />  
                    ))
                }
            </ScrollView>
            
                
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        height:"100%",
    }
})