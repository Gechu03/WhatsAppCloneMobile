import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import ContactListItem from '../components/atoms/contactsListItem'
import { useNavigation } from '@react-navigation/native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers } from '../graphql/queries'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import { Button } from 'react-native'
import { getChatCommonRoom } from '../CustomQueries/functions'
import { createChatRoom, createChatRoomUser } from '../graphql/mutations'

function NewGroupScreen() {
  const [users, setUsers] = useState([])
  const [selectedUsersID, setSelectedUsersID] = useState([])
  const [chatName, setName] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const recibeUsuarios = async () => {
      const userAutenticated = await Auth.currentAuthenticatedUser()
      const dominio = userAutenticated.attributes.email.split('@')[1]
      API.graphql(graphqlOperation(listUsers)).then((result) => {
        const users = result?.data?.listUsers?.items.filter(
          (user) =>
            user.name.split('@')[1] === dominio &&
            user.name !== userAutenticated.attributes.email
        )
        setUsers(users)
      })
    }

    recibeUsuarios()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
          disabled={!chatName || selectedUsersID.length < 1}
          onPress={onCreateGroupPress}
        />
      ),
    })
  }, [chatName, selectedUsersID])

  const onCreateGroupPress = async (user) => {
    const existingChatRoom = await getChatCommonRoom(user.id)

    if (existingChatRoom) {
      navigation.navigate('Chat', {
        id: existingChatRoom.chatRoom.id,
        name: user?.name,
      })
      return
    }

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: { name: chatName } })
    )

    if (!newChatRoomData?.data?.createChatRoom) {
      console.log('Error creating the chat room')
    }

    const newChatRoom = newChatRoomData?.data?.createChatRoom

    await Promise.all(
      selectedUsersID.map((userId) =>
        API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: { chatRoomId: newChatRoom.id, userId: userId },
          })
        )
      )
    )

    const AuthUser = await Auth.currentAuthenticatedUser()
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomId: newChatRoom.id, userId: AuthUser.attributes.sub },
      })
    )
    setSelectedUsersID([])
    setName('')
    navigation.navigate('Chat', { id: newChatRoom.id, name: chatName })
  }

  const onContactPress = (id) => {
    setSelectedUsersID((usersID) => {
      if (usersID.includes(id)) {
        return [...usersID].filter((uid) => uid !== id)
      } else {
        return [...usersID, id]
      }
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Group Name"
        value={chatName}
        onChangeText={setName}
        style={styles.input}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem
            user={item}
            selectable={true}
            isSelected={selectedUsersID.includes(item.id)}
            onPress={() => onContactPress(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    padding: 10,
    margin: 10,
  },
})

export default NewGroupScreen
