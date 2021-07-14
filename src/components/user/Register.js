import React,{ useState,useLayoutEffect } from 'react'
import { KeyboardAvoidingView,View,StyleSheet,Dimensions } from 'react-native'
import { StatusBar } from  'expo-status-bar';
import {Button, Input,Image,Text } from 'react-native-elements';
import { auth, db } from '../../config/firebase';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Register({navigation}) {
    const [name,setName] = useState('');
    const [imageURl, setImageURL] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login",
        });
    }, [navigation]);

    const register=()=>{
        auth.createUserWithEmailAndPassword(email,password)
            .then(authUser=>{
             db.collection('users').doc(authUser.user.uid).set({
                    name: name,
                    email:email,
                    photoURL:imageURl || "https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                    })
               .then()
               authUser.user.updateProfile({
                displayName:name,
                photoURL:imageURl || "https://image.shutterstock.com/image-vector/user-icon-260nw-523867123.jpg"
                })
            }).catch(error=>{alert(error)});
    };
    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container} >
            <StatusBar style="light" />
            <Text h4 style={{marginBottom:50}}>Create a WhatsApp account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder={'Full Name '}  autoFocus autoFocus type="Text" value={name} onChangeText={(data)=>setName(data)}  />
                <Input placeholder={'Email'}  autoFocus autoFocus type="Text" value={email} onChangeText={(data)=>setEmail(data)}  />
                <Input placeholder={"Password"} type="password"  secureTextEntry value={password} onChangeText={(text)=>setPassword(text)}/>
                <Input onSubmitEditing={register} placeholder={'Profile Picture Url ( Optional )'}  autoFocus autoFocus type="Text" value={imageURl} onChangeText={(data)=>setImageURL(data)}  />
                
            </View>
            <Button  title="Register" onPress={register}  style={styles.button}/>
            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
    },
    inputContainer:{
        width: screenWidth*0.8,
    },
    button:{
        width: screenWidth/1.8,
        marginTop:10
    }
})