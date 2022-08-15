import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from '../components/BlogStack';
import AccountStack from '../components/AccountStack';
import { FontAwesome } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";
import { Image } from 'react-native';
import ChatStack from './ChatStack';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "cyan",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: isDark ? "#181818" : "white",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "ShareIts") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Chats") {
            iconName = "comments";
          }
          
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ShareIts" component={BlogStack} />
      <Tab.Screen name="Chats" component={ChatStack} />
      <Tab.Screen name="Profile" component={AccountStack} />
    </Tab.Navigator>
  );
}