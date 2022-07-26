import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from '../screens/IndexScreen';
import CreateScreen from '../screens/CreateScreen';

import ShowScreen from '../screens/DetailsScreen';
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import CameraScreen from '../screens/CameraScreen';



const InnerStack = createStackNavigator();

export default function BlogStack() {
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "All Listings", ...headerOptions, headerLeft: null }} />
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Post", ...headerOptions }} />
      <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} />
      
     
      <InnerStack.Screen name="blogCamera" component={CameraScreen} options={{ headerOptions }} />
      
    </InnerStack.Navigator>
  )
}