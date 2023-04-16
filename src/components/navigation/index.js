import React from 'react'
import ChatSceen from '../../screens/ChatScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import ContactsScreen from '../../screens/ContactsScreen'
import SignInScreen from '../../screens/Authentication/SignInScreen/SignInScreen'
import SignUpScreen from '../../screens/Authentication/SignUpScreen/SignUpScreen'
import ConfirmEmailScreen from '../../screens/Authentication/ConfirmEmailScreen/ConfirmEmailScreen'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatSceen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
