import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, RefreshControl, Image} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from 'react-redux';
import firebase from "../database/firebaseDB";

export default function IndexScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token)
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

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

  useEffect(() => {	
    const unsubscribe = db.onSnapshot((collection) => {
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
  
  

  function onRefresh() {
    setRefreshing(true);
    const response = setPosts()
    setRefreshing(false);
  }

  function addPost() {
    navigation.navigate("Add")
  }

  function deletePost(id) {	
    console.log("Deleting " + id);	
    // To delete that item, we filter out the item we don't want	
    db.doc(id).delete();
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
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
          <Text style={styles.text}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
          <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
          <TouchableOpacity onPress={() => deletePost(item.id)} style={{marginLeft: "auto", marginTop: 60}}>
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
        refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refreshing}
          onRefresh={onRefresh}/>}
      />
    </View>
  );
}