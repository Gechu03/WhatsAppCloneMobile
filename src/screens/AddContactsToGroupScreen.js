import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import ContactListItem from '../components/atoms/contactsListItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers } from '../graphql/queries'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import { Button } from 'react-native'
import { getChatCommonRoom } from '../CustomQueries/functions'
import { createChatRoomUser } from '../graphql/mutations'

function AddContactsToGroupScreen() {
  const [users, setUsers] = useState([])
  const [selectedUsersID, setSelectedUsersID] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const chatRoom = route.params

  const recibeUsuarios = async () => {
    setLoading(true)
    const userAutenticated = await Auth.currentAuthenticatedUser()
    const dominio = userAutenticated.attributes.email.split('@')[1]
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      let users = result?.data?.listUsers?.items.filter(
        (user) =>
          !chatRoom.chatRoom.UsersChatRooms.items.some(
            (chatRoomUser) =>
              !chatRoomUser._deleted && user.id === chatRoomUser.userId
          )
      )
      users = users.filter((user) => 
       
          user?.name.split('@')[1] === dominio && user?.name !== userAutenticated?.attributes?.email
      )


      setUsers(users)
    })
    setLoading(false)
  }

  useEffect(() => {
    recibeUsuarios()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          disabled={selectedUsersID.length < 1}
          onPress={onAddMenberToGroupPress}
        />
      ),
    })
  }, [selectedUsersID])

  const onAddMenberToGroupPress = async (user) => {
    await Promise.all(
      selectedUsersID.map((userId) =>
        API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: { chatRoomId: chatRoom.chatRoom.id, userId: userId },
          })
        )
      )
    )

    setSelectedUsersID([])

    navigation.goBack()
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
      <FlatList
        data={users}
        onRefresh={recibeUsuarios}
        refreshing={loading}
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

export default AddContactsToGroupScreen
