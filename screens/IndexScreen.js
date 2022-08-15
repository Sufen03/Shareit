import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, Image, SafeAreaView} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "../database/firebaseDB";

export default function IndexScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token)
  const [posts, setPosts] = useState([]);
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
  
  

  function addPost() {
    navigation.navigate("Add")
  }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Home Appliances', value: 'Home Appliances'},
      {label: 'Food', value: 'Food'},
      {label: 'Electronics', value: 'Electronics'},
      {label: 'Clothing', value: 'Clothing'},
      {label: 'Personal Care', value: 'Personal Care'},
      {label: 'Furniture', value: 'Furniture'},
      {label: 'MISC', value: 'MISC'},
  ]);
  
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
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
     
    />
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