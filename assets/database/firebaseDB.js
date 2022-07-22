import firebase from "firebase";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBsTUovJFsqcxnjQhyMUhf3Jv2IQm-MXoI",
    authDomain: "shareit-ef3a3.firebaseapp.com",
    projectId: "shareit-ef3a3",
    storageBucket: "shareit-ef3a3.appspot.com",
    messagingSenderId: "639549228103",
    appId: "1:639549228103:web:08478f2c1fd17787045d62"
  };

  firebase.initializeApp(firebaseConfig);
export default firebase;