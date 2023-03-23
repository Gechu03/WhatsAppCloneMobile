import React from 'react';
import ChatSceen from '../screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListOfChatsScreen from '../screens/ListOfChatsScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const Navigator = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: 'whitesmoke'}}}>
            <Stack.Screen name='Home' component={TabNavigator}  options={{headerShown: false}}/>
            <Stack.Screen name="Chats" component={ListOfChatsScreen} />
            <Stack.Screen name="Chat" component={ChatSceen} />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Navigator