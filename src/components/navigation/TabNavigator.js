import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NotImplementedScreen from './NotImplementedScreen'

import ListOfChatsScreen from '../../screens/ListOfChatsScreen'
import { Ionicons, Entypo } from '@expo/vector-icons'
import SettingsScreen from '../../screens/SettingsScreen'
import { FontAwesome,AntDesign } from '@expo/vector-icons'; 
import NewGroupScreen from '../../screens/NewGroupScreen'
import ContactsScreen from '../../screens/ContactsScreen'
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'whitesmoke' },
        headerStyle: { backgroundColor: 'whitesmoke' },
      }}
    >
      <Tab.Screen
        name="Status"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Group"
        component={NewGroupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ListOfChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubble-outline" size={size} color={color} />
          ),
         
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
