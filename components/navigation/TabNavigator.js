import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NotImplementedScreen from './NotImplementedScreen';
import ChatScreen from '../screens/ChatScreen';
import ListOfChatsScreen from '../screens/ListOfChatsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Chats'>
      <Tab.Screen name="Status" component={NotImplementedScreen}/>
      <Tab.Screen name="Calls" component={NotImplementedScreen}/>
      <Tab.Screen name="Camera" component={NotImplementedScreen}/>
      <Tab.Screen name="Chats" component={ListOfChatsScreen}/>
      <Tab.Screen name="Settings" component={NotImplementedScreen}/>
    </Tab.Navigator>
  )
}

export default TabNavigator