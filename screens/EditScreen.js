import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View,ScrollView, TextInput, TextEdit, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { updatePicAction } from "../redux/ducks/accountPref";
import DropDownPicker from "react-native-dropdown-picker";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

import firebase from "../database/firebaseDB";


const auth = firebase.auth();

export default function EditScreen({ navigation, route }) {
  const [post, setPost] = useState(route.params.post);
  const picture = useSelector((state) => state.accountPrefs.postPicture);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const image = route.params?.image
  const id = post.id

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Food', value: 'Food'},
    {label: 'Electronics', value: 'Electronics'},
    {label: 'Clothing', value: 'Clothing'},
    {label: 'Personal Care', value: 'Personal Care'},
    {label: 'Furniture', value: 'Furniture'},
  ]);




 

  async function updatePost() {

    const post = {
      value: value,
      content: content,
      image: image,
      claimed: false,
      created: firebase.firestore.Timestamp.now(),
      id: auth.currentUser?.uid, 
      name: auth.currentUser?.email
    };

    console.log(id)
    
    try {
      await firebase.firestore().collection("posts").doc(id).update(post);  
      navigation.navigate("Index");	
    } catch (error) {
      console.log(error.message)
    }
  
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
      <View style={{ margin: 20 }}>
        <Image style={{resizeMode : 'cover', height: 250, width: '90%', marginLeft: 22, marginBottom: 20}} source={{uri: picture ?? image }}/>
        <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
     
    />
        <Text style={[additionalStyles.label, styles.text]}>
          Edit Details:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        
        <TouchableOpacity onPress={() => navigation.navigate("blogCamera", {'fromEdit': true, post})}>
          <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
          Edit your image.
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={updatePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );



  // return (
  //   <View style={styles.container}>
  //     <Text style={[styles.title, styles.text, { margin: 40 }]}>
  //       {post.title}
  //     </Text>
  //     <Text style={[styles.title, styles.text, { margin: 20 }]}>
  //       {post.content}
  //     </Text>
  //   </View>
  // );

  // return (
  //   <View style={styles.container}>
  //     <Text style={[styles.text, styles.title, { marginTop: 20 }]}>
  //        Edit Screen
  //      </Text>
  //   </View>
  // );
}

//const styles = StyleSheet.create({});
const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    backgroundColor: 'white',
    height:35,
    borderRadius:8,
    
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
    marginTop:10,
  },
});