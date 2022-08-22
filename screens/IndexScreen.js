import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, Image, SafeAreaView} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from 'react-redux';
import firebase from "../database/firebaseDB";
import DropDownPicker from 'react-native-dropdown-picker';

export default function IndexScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token)
  const [posts, setPosts] = useState([]);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  const [value, setValue] = useState("Food");

  const [isFood, setIsFood] = useState(false)
  const [isElectronics, setIsElectronics] = useState(false)
  const [isClothing, setIsClothing] = useState(false)
  const [isPersonal, setIsPersonal] = useState(false)
  const [isFurniture, setIsFurniture] = useState(false)
  

  const db = firebase.firestore().collection("posts");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <FontAwesome name="plus" size={24} style={{ color: styles.headerTint, marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  });


  function food() {
  
    setValue ("Food")
  }
  function electronics() {
    setValue ("Electronics")
  }
  function clothing() {

    setValue ("Clothing")
  }
  function personal() {
  
    setValue ("Personal Care")
  }
  function furniture() {
   
    setValue ("Furniture")
  }


  useEffect(() => {	
    const unsubscribe = db.where("value", "==", value).onSnapshot((collection) => {
      const updatedPost = collection.docs.map((doc) => {
        const postObject ={
          ...doc.data(),
          id: doc.id,
      };
      console.log(postObject);
      return postObject;
    })
    setPosts(updatedPost);
  })
  return () => {
    clearInterval(value);
  };
  
  return () => unsubscribe();	
});

  
  
  

  function addPost() {
    navigation.navigate("Add")
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center'}}> 
      
        <TouchableOpacity onPress={() => navigation.navigate("Details", {id: item.id})}>
          <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            }}>
            <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
            <Text style={styles.text}>{item.content}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (

    
    <SafeAreaView style={styles.container}>
       

    <TouchableOpacity onPress={food} style={{backgroundColor:"red", width:"15%",borderRadius:"4", textAlign:"center", marginLeft:165, marginTop:15, marginBottom:15}}>
      <Text style={{fontSize:"25", textAlign:"center"}}>Food</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={electronics} style={{backgroundColor:"red", width:"15%",borderRadius:"4", textAlign:"center", marginLeft:165, marginTop:15, marginBottom:15}}>
      <Text style={{fontSize:"25", textAlign:"center"}}>Electronics</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={clothing} style={{backgroundColor:"red", width:"15%",borderRadius:"4", textAlign:"center", marginLeft:165, marginTop:15, marginBottom:15}}>
      <Text style={{fontSize:"25", textAlign:"center"}}>Clothing</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={personal} style={{backgroundColor:"red", width:"15%",borderRadius:"4", textAlign:"center", marginLeft:165, marginTop:15, marginBottom:15}}>
      <Text style={{fontSize:"25", textAlign:"center"}}>Personal Care</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={furniture} style={{backgroundColor:"red", width:"15%",borderRadius:"4", textAlign:"center", marginLeft:165, marginTop:15, marginBottom:15}}>
      <Text style={{fontSize:"25", textAlign:"center"}}>Furniture</Text>
    </TouchableOpacity>

   <FlatList
        data={posts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        key={(item) => item.id}
        keyExtractor={(item) => item.toString}
        numColumns= {3}
      />
      
    </SafeAreaView>
  );
}