import React, { useEffect, useState } from 'react'
import ChatSceen from '../../screens/ChatScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import ContactsScreen from '../../screens/ContactsScreen'
import SignInScreen from '../../screens/Authentication/SignInScreen/SignInScreen'
import SignUpScreen from '../../screens/Authentication/SignUpScreen/SignUpScreen'
import ConfirmEmailScreen from '../../screens/Authentication/ConfirmEmailScreen/ConfirmEmailScreen'
import { Auth } from 'aws-amplify'
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { createUser } from '../../graphql/mutations'
import { getUser } from '../../graphql/queries'
import NewGroupScreen from '../../screens/NewGroupScreen'
import AddContactsToGroupScreen from '../../screens/AddContactsToGroupScreen'
import GroupInfoScreen from '../../screens/GroupInfoScreen'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  const [user, setUser] = useState(undefined)
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      })

      setUser(authUser)
    } catch {
      setUser(null)
    }
  }

  const syncUser = async () => {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    })

    const userData = await API.graphql(
      graphqlOperation(getUser, { id: user.attributes.sub })
    )

    if (userData.data.getUser) {
      return
    }

    const newUser = {
      id: user.attributes.sub,
      name:
        user.attributes.phone_name ?? user.attributes.email ?? 'Default name',
      status: 'Hey, I am ussing WhatsAppTFG',
    }

    const newUserResponse = API.graphql(
      graphqlOperation(createUser, { input: newUser })
    )
  }

  useEffect(() => {
    checkUser()

    syncUser()
  }, [])

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}
      >
       {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Chat" component={ChatSceen} />
            <Stack.Screen name="New Group" component={NewGroupScreen} />
            <Stack.Screen name="Group Info" component={GroupInfoScreen} />
            <Stack.Screen
              name="Add Contacts"
              component={AddContactsToGroupScreen}
            />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
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
          </>
        ) : (
          <>
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
            <Stack.Screen name="New Group" component={NewGroupScreen} />
            <Stack.Screen name="Group Info" component={GroupInfoScreen} />
            <Stack.Screen
              name="Add Contacts"
              component={AddContactsToGroupScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
