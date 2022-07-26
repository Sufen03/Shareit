import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, RefreshControl, Image, Alert} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from 'react-redux';
import  firebase from "../database/firebaseDB";


export default function ListingScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token)
  const [posts, setPosts] = useState([]);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  const db = firebase.firestore().collection("posts");
   const auth = firebase.auth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <FontAwesome name="plus" size={24} style={{ color: styles.headerTint, marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {	
    const user = auth.currentUser;
    const unsubscribe = db.where("name", "==", user.email).onSnapshot((collection) => {
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
      
    return () => unsubscribe();	
  }, []);
  
  

  function addPost() {
    navigation.navigate("Add")
  }

  function deletePost(id) {
    db.doc(id).delete();
    Alert.alert("Post deleted!");
    navigation.navigate("Listing");
  }
  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("UserListingDetail", {id: item.id})}>
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
          <Text style={styles.text}>{item.title}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Image style={{width: 100, height: 100, marginEnd:175}} source={{uri: item.image}} />
            <TouchableOpacity onPress={() => deletePost(item.id)} style={{marginRight:0}}>
            <FontAwesome name="trash" size={40} color="#a80000" />
            </TouchableOpacity>
          </View>
        </View>

      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        key={(item) => item.id}
        numColumns={1}
        justifyContent={{}}
      />
    </View>
  );
}