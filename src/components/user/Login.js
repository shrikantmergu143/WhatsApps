import React,{useEffect,useState} from 'react';
import { View, Text ,StyleSheet, KeyboardAvoidingView,Dimensions,Platform,TouchableOpacity } from 'react-native';
import {Button, Input,Image } from 'react-native-elements';
import { StatusBar } from  'expo-status-bar';
import firebase from 'firebase/app';
import { WhatsApp } from '@material-ui/icons';
import { Avatar,  } from '@material-ui/core';
import { auth,provider } from '../../config/firebase';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Login = ( {navigation} ) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    function loginIn(email,password  ){
       auth.signInWithEmailAndPassword(email,password);
    }
    const GoogleSign = () =>{
      auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container} >

            <StatusBar style="light" />
               <WhatsApp style={{fontSize:110,color:'green'}} />
               <View style={styles.inputConntainer} >
                 <Input placeholder={'Email '}  autoFocus type="email" value={email} onChangeText={(data)=>setEmail(data)}  />
                 <Input placeholder={"Password"} type="password"  secureTextEntry value={password} onSubmitEditing={()=>loginIn(email,password)} onChangeText={(text)=>setPassword(text)}/>
               </View>
               <Button title={'Login'} style={styles.button} onPress={()=>loginIn(email,password)} />
               <Button title={'Register'} style={styles.button} type="outline" onPress={()=>navigation.navigate('Register')}   />
               <TouchableOpacity onPress={GoogleSign} style={{justifyContent:'center',alignItems:'center',height:40,width: screenWidth/1.8,marginTop:10,flexDirection:'row',backgroundColor:'whitesmoke',}} >
                  <Text style={{marginLeft:10}} >Google Login</Text>
               </TouchableOpacity>
            <View style={{height:100}} />
            
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
   inputConntainer:{
      width: screenWidth*0.8,
   },
   button:{
      width: screenWidth/1.8,
      marginTop:10
   },
   container:{
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
      padding: 10,
   },
  
  });
  