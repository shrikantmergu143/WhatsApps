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
import GetFriendEmail from '../user/GetFriendEmail';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Chat(props) {
    const [user,setUser] = useState(auth.currentUser); 
    const [users,setUsers] = useState(props.route.params.users);
   

    const recipient = props.route.params.users;
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            title:users,
            headerStyle:{ backgroundColor:'#FFF' }, 
            headerTitleStyle:{ color:"black" },
            headerTintColor:"black",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View style={{flexDirection:'row',alignItems:'center'}} >
                    <Avatar src={recipient?.photoURL}  />
                    <Text>hi</Text>
                </View>
            )
        });
    },[]);
    return (
        <div>
            {console.log(recipient )}
        </div>
    )
}
