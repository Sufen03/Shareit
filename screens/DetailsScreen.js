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

  

  function toggleClaimed() {
    setClaimed(!claimed)
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, styles.text, { margin: 20, fontFamily:'American Typewriter', fontSize:35 }]}>{post.content}</Text>
        </View>
        <Image style={{resizeMode : 'cover', marginLeft: 10 ,width: "95%", borderRadius:10, height: 250}} source={{uri: post.image}}/>
        <Text style={[styles.content, styles.text, { margin: 20, fontSize:25, }]}>Category: {post.value}</Text>
      <View>
        <TouchableOpacity onPress={() => toggleClaimed()} style={{ marginTop: 30}}>
          <Text style={{textAlign:'center',fontSize: 18}}>
            {claimed ? 'Claimed' : 'Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
