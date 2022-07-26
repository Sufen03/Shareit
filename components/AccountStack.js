import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import CameraScreen from '../screens/CameraScreen';
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import ChatScreen from '../screens/ChatScreen';
import ListingScreen from '../screens/ListingScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import EditScreen from '../screens/EditScreen';

const Stack = createStackNavigator();

export default function AccountStack() {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  return (
  <Stack.Navigator>
    <Stack.Screen component={AccountScreen} name="Account" options={{
        title: "Your Account",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: null
      }} />
      <Stack.Screen component={ChatScreen} name="Chats" options={{
        title: "Chats",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: null
      }} />
      <Stack.Screen component={CameraScreen} name="Camera" options={{
        title: "Take a photo",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
      <Stack.Screen component={ListingScreen} name="Listing" options={{
        title: "My Listings",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
      <Stack.Screen component={UserDetailScreen} name="UserListingDetail" options={{
        title: "Listing Detail",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
      <Stack.Screen component={EditScreen} name="Edit" options={{
        title: "Edit Post",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: styles.headerTint
      }}/>
      

  </Stack.Navigator>
  )
}