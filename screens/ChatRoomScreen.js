import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Linking from 'expo-linking'
import AppLoading from 'expo-app-loading'
import React, { useState, useEffect, Component, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  IMessage,
  Send,
  SendProps,
} from 'react-native-gifted-chat'



import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import ChatScreen from "./ChatRoomScreen";


export default function ChatRoomScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


  

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

const additionalStyles = StyleSheet.create({
  chatButton: {
    marginTop:100
    
  },
  chatTitle: {
    color:"red",
  }

  
  
});