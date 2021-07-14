import  firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA455IScPVXoVAjMP8Kjpogbc2rVM_u0WA",
  authDomain: "instashre-2c6a1.firebaseapp.com",
  databaseURL: "https://instashre-2c6a1-default-rtdb.firebaseio.com",
  projectId: "instashre-2c6a1",
  storageBucket: "instashre-2c6a1.appspot.com",
  messagingSenderId: "758145740018",
  appId: "1:758145740018:web:cfebe0d0d2b43bef61346b"
};
let app;
if( firebase.apps.length ===0 ){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export { db , auth , provider};