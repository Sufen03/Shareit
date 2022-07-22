import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import ChatRoomScreen from "./ChatRoomScreen";


export default function ChatScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
 


  

  return (
    <View style={styles.container}>
      <Text style={additionalStyles.chatTitle}>ChatScreen</Text>
      <TouchableOpacity onPress={() =>
        navigation.navigate('ChatRoomScreen')}><Text styles={additionalStyles.chatButton}>go to chat room</Text></TouchableOpacity>
    </View>
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