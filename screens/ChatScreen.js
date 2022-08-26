import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "../database/firebaseDB";
const auth = firebase.auth();
const db = firebase.firestore().collection("messages");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const messages = collectionSnapshot.docs.map((doc) => {
          const date = doc.data().createdAt.toDate();
          const newDoc = { ...doc.data(), createdAt: date };
          
          return newDoc;
        });
        setMessages(messages);
      });

   

    
    

    },[])

    useEffect(() => {
      // Side-effect...
      return function cleanup() {
        // Side-effect cleanup...
      };
    });

  function sendMessages(newMessages) {
    console.log(newMessages);
    db.add(newMessages[0]);
  }

  return (
    
      

    <GiftedChat
      messages={messages}
      onSend={sendMessages}
      listViewProps={{ style: { backgroundColor: "white" } }}
      user={{ _id: auth.currentUser?.uid, name: auth.currentUser?.email }}
    />
  );
}

const styles = StyleSheet.create({});
