import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from '../components/BlogStack';
import AccountStack from '../components/AccountStack';
import { FontAwesome } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";
import { Image } from 'react-native';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: isDark ? "#181818" : "white",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Blog") {
            iconName = "comments";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Blog" component={BlogStack} options={{
            title: 'My Blog',
            tabBarIcon: ({size,focused,black}) => {
              return (
                <Image
                  style={{ resizeMode:'contain', width: 80, height: 50 }}
                  source={require('../assets/tabicon.png')}
                />
              );
            },
          }}
        />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Settings" component={AccountStack} />
    </Tab.Navigator>
  );
}