import React, { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, UIManager, ActivityIndicator, Keyboard, Image } from 'react-native';
import firebase from "../database/firebaseDB";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


import { useDispatch } from 'react-redux';
import { logInAction } from '../redux/ducks/blogAuth';

const auth = firebase.auth();

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [forgetemail,setForgetEmail] = useState('')

  const [isLogIn, setIsLogIn] = useState(true)
  const [confirmPassword,setConfirmPassword] = useState('')

  const [isForget, setIsForget] = useState(false)

  

  async function login() {	
    try {	
      Keyboard.dismiss();
      await auth.signInWithEmailAndPassword(email, password);	
      navigation.navigate("Logged In");	
    } catch (error) {	
      console.log(error);	
      setErrorText(error.message)
    }	
  }

  async function signUp() {
    if(email === '' && password === '') {
      setErrorText("Please enter email and password");
    }
    
    else if (password !== confirmPassword) {
      setErrorText("Please key in the same password & confirm password")
    }
    
    else if (password.length < 6) {
      setErrorText("Please key at least 6 characters for password")
    }

    else if (email.includes("@" && "."))  {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((_) =>  navigation.navigate('Logged In'))
      .catch(error => setErrorText(error.message))      
    }

    else 
    setErrorText("Please enter a valid email");
  }

  async function forget() {
    if (email == "") {
      setErrorText("Please enter your email");
    } else if (email.includes("@" && ".")) {
      setErrorText("Check your email");
    }
     else 
      setErrorText("Please enter a valid email");
  }

  const buttonText = isLogIn ? "Log In" : isForget ? "Send" : "Sign Up";
  return (
    <View style={styles.container}>
      <Image source={require('../assets/titlelogo.png')} style={{ width: 250, height: 250, borderRadius: 200 }} />
      

      {isForget ? <View /> : <><Text style={styles.title}>
        {isLogIn ? "Log In" : (isForget ? "Forget" : "Sign Up")}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email:"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password:"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>
      </>}


      {isLogIn || isForget ? <View/> :
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password:"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>}

        {isForget ?
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email:"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        : <View/>
        }

      <View/>
      <View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.button} onPress={ isLogIn ? login : isForget ? forget : signUp}>
             
          {loading ? <ActivityIndicator style={styles.buttonText }/> : <Text style={styles.buttonText}> {buttonText} </Text>}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errorText}>
        {errorText}
      </Text>
      {isForget ? <View /> : <TouchableOpacity
        onPress={() => {
         LayoutAnimation.configureNext({
           duration: 700,
           create: { type: 'linear', property: 'opacity' },
           update: { type: 'spring', springDamping: 0.5 }
         });
         setIsLogIn(!isLogIn);
         setErrorText("");
       }}>
          <Text style={styles.switchText}> {isLogIn ? "No account? Sign up now." : "Already have an account? Log in here."}</Text>
      </TouchableOpacity>}

      <TouchableOpacity
         onPress={() => {
          LayoutAnimation.configureNext({
            duration: 700,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'spring', springDamping: 0.5 }
          });
          setIsLogIn(!isLogIn);
          setIsForget(!isForget);
          if (isForget) {
            setIsForget(false);
            setIsLogIn(true)
          } else {
            setIsForget(true);
            setIsLogIn(false)
          }
          setErrorText("");
        }}>
        <Text style={styles.switchText}>Forget Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40, 
    margin: 20
  },
  switchText: {
    fontWeight: '400',
    fontSize: 20, 
    marginTop: 20
  },
  inputView: {
    backgroundColor: "lightgray",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 20, 
    margin: 20,
    color: 'white'
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    marginTop: 20
  }
});
