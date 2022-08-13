import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import firebase from "../database/firebaseDB";

const auth = firebase.auth();

export default function CreateScreen({ navigation, route }) {
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const image = route.params?.image
  


  async function savePost() {
    const post = {
      title: title,
      content: content,
      image: image,
      claimed: false,
      created: firebase.firestore.Timestamp.now(),
      id: auth.currentUser?.uid, 
      name: auth.currentUser?.email
    };
    
    try {
      await firebase.firestore().collection("posts").add(post);  
      navigation.navigate("Index");	
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {	
    if (route.params?.text) {	
      const newPost = {	
        title: route.params.text,	
        claimed: false,	
        id: notes.length.toString(),
        created: firebase.firestore.Timestamp.now(),
      };	
      setPosts([...post, newPost]);	
    }	
  }, [route.params?.text]);	


  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
      <Image style={{width: 390, height: 250, marginBottom: 15}} source={{uri: image}}/>
        <Text style={[additionalStyles.label, styles.text]}>Enter Title:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Enter Content:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        

        <TouchableOpacity onPress={() => navigation.navigate("blogCamera", {'fromCreate': true})}>
          <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
          {" "}
          Click to take a picture.{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});