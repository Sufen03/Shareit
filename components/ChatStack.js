import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

const InnerStack = createStackNavigator();

export default function ChatStack() {
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="ChatScreen" component={ChatScreen} options={{ title: "ChatScreen", ...headerOptions, headerLeft: null }} />
      <InnerStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} options={{ title: "ChatRoom", ...headerOptions }} />
      
    </InnerStack.Navigator>
  )
}