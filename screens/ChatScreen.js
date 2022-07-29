import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

export default function ChatScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
 


  

  return (
    <View style={styles.container}>
      <Text style={additionalStyles.chatTitle}>ChatScreen</Text>
      <TouchableOpacity onPress={() =>
        navigation.navigate('ChatRoomScreen')}><Text styles={additionalStyles.chatButton}>go to chatting room</Text></TouchableOpacity>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});