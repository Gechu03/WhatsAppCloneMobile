import React from 'react'
import { useState, useEffect } from 'react'

import ListarComponentes from '../components/molecules/ListarComponenets'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers } from '../graphql/queries'
import { FlatList, Pressable, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createChatRoom, createChatRoomUser } from '../graphql/mutations'
import { getChatCommonRoom } from '../CustomQueries/functions'
import ContactListItem from '../components/atoms/contactsListItem'
import { StyleSheet } from 'react-native'

const ContactsScreen = () => {
  const navigation = useNavigation()
  const [users, setUsers] = useState([])
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result?.data?.listUsers?.items)
    })
  }, [])

  const createAPrivateChatRoom = async (user) => {
    const existingChatRoom = await getChatCommonRoom(user.id)

    if (existingChatRoom) {
      navigation.navigate('Chat', {
        id: existingChatRoom.chatRoom.id,
        name: user?.name,
      })
      return
    }

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    )

    if (!newChatRoomData?.data?.createChatRoom) {
      console.log('Error creating the chat room')
    }

    const newChatRoom = newChatRoomData?.data?.createChatRoom

    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    )

    const AuthUser = await Auth.currentAuthenticatedUser()
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomId: newChatRoom.id, userId: AuthUser.attributes.sub },
      })
    )

    navigation.navigate('Chat', { id: newChatRoom.id, name: user?.name })
  }

  return (
    <FlatList
    style={styles.container}
      data={users}
      renderItem={({ item }) => (
        <ContactListItem
          onPress={() => createAPrivateChatRoom(item)}
          user={item}
        />
      )}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => {
            navigation.navigate('New Group')
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color="royalblue"
            style={{
              marginRight: 20,
              backgroundColor: 'gainsboro',
              padding: 7,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
          <Text style={{ color: 'royalblue', fontSize: 16 }}>New Group</Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
 
})

export default ContactsScreen
