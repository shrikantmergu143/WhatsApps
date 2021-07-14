import React,{  useLayoutEffect,useEffect,useState  } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView,Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { db,auth } from '../../config/firebase'
import * as EmailValidator from 'email-validator';
import { useCollection } from 'react-firebase-hooks/firestore';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddChat = ({ navigation }) => {
    const [input,setInput] = useState('');
    const Chatss = db.collection('chats').where('users','array-contains',auth.currentUser.email);
    const [chatsSnapshot] = useCollection(Chatss);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add a new Friend',
            headerStyle:{ backgroundColor:'#FFF' },
            headerTitleStyle:{ color:"black" },
            headerTintColor:"black",
        });
    })
    const addChats = async () =>{
        if( EmailValidator.validate(input) && !chatAlreadyExists(input) && input!== auth.currentUser.email ){
            db.collection('chats').add({
                users:[auth.currentUser.email,input],
            }).then(()=>{
                    setInput('');
                    navigation.popToTop();
                }).catch(alert);
        }
        else{
                alert('Invalied Email or Its Already Exixst');
                setInput('')
                navigation.popToTop();
            }
    }
    
    const chatAlreadyExists = (friend)=> !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user =>user===friend )?.length >0 );
    return (
        <SafeAreaView style={styles.container,{flexDirection:'row',justifyContent:'center',alignItems:'center',width:"100%"}} >
            <Input style={{width: screenWidth/2}} onSubmitEditing={()=>addChats} 
                leftIcon={
                        <SearchRoundedIcon style={{fontSize:24}}  />
                        }
                placeholder={"Enter a Friend Email"}  value={input} onChangeText={(data)=>setInput(data)} 
            />
            <TouchableOpacity onPress={addChats} style={{position:'fixed',right:10}} >
                <SendRoundedIcon style={{fontSize:30}}   /> 
            </TouchableOpacity>
            

        </SafeAreaView>
    )
}

export default AddChat;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
    }
})
