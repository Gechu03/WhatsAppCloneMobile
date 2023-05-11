import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListarComponentes from '../../components/molecules/ListarComponenets'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listChatRooms } from '../../CustomQueries/queries'
const ListOfChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([])
  useEffect(() => {
    const fetchChatRooms = async () => {
      const userAutenticated = await Auth.currentAuthenticatedUser()
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: userAutenticated.attributes.sub })
      )
      setChatRooms(response.data.getUser.ChatRoomsUsers.items)
    }
    fetchChatRooms()
  }, [])

  return (
    <View style={styles.container}>
      <ListarComponentes listaMensajes={chatRooms} tipo="chat" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

export default ListOfChatsScreen
