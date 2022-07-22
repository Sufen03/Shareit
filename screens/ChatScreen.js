<<<<<<< HEAD
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
=======
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
>>>>>>> 26792b483305947ef607469e04303fc4ee470a0a

import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import ChatRoomScreen from "./ChatRoomScreen";


export default function ChatScreen({ navigation, route }) {
  const token = useSelector((state)=>state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
 


  

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.innerContainer}>
            <Image style={{width: 50, height: 50}} source={require('../assets/profile-image.jpg')}/>
            <TouchableOpacity>
            <View>
                <Text>chat display</Text>
            </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
=======
    <View style={styles.container}>
      <Text style={additionalStyles.chatTitle}>ChatScreen</Text>
      <TouchableOpacity onPress={() =>
        navigation.navigate('ChatRoomScreen')}><Text styles={additionalStyles.chatButton}>go to chat room</Text></TouchableOpacity>
    </View>
>>>>>>> 26792b483305947ef607469e04303fc4ee470a0a
  );
}

const additionalStyles = StyleSheet.create({
  chatButton: {
    marginTop:100
    
  },
<<<<<<< HEAD
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 25,
    marginTop: '20%',
    
=======
  chatTitle: {
    color:"red",
>>>>>>> 26792b483305947ef607469e04303fc4ee470a0a
  }
  
});