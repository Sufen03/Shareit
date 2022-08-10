import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import firebase from "../database/firebaseDB";
import { useSelector } from "react-redux";


export default function ShowScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token);
  const [post, setPost] = useState({title: "", content: "", id: ''});
  const [claimed, setClaimed] = useState(false)
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const db = firebase.firestore();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{marginRight: 10}}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  

  const getPostById = async (id) => {
    const dbRef = db.collection("posts").doc(id);
    const doc = await dbRef.get();
    const post = doc.data();
    setPost({
      ...post,
      id: doc.id,
      claimed
    });
  };

  useEffect(() => {
    getPostById(route.params.id);
  }, [])

  function editPost() {
    navigation.navigate("Edit", { post: post })
    getPostById();
  }

  function toggleClaimed() {
    setClaimed(!claimed)
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, styles.text, { margin: 40 }]}>{post.title}</Text>
        </View>
        <Image style={{resizeMode : 'cover', marginLeft: 22 ,width: "90%", height: 250}} source={{uri: post.image}}/>
        <Text style={[styles.content, styles.text, { margin: 20 }]}>{post.content}</Text>
      <View>
        <TouchableOpacity onPress={() => toggleClaimed()} style={{ marginTop: 60}}>
          <Text style={{marginHorizontal: '36%',fontSize: 28}}>
            {claimed ? 'Claimed' : 'Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
