import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListarComponentes from '../components/molecules/ListarComponenets'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listChatRooms } from '../CustomQueries/queries'
import { onCreateChatRoom, onUpdateChatRoom } from '../graphql/subscriptions'

const ListOfChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([])
  const [loading, setLoding] = useState(false)
  const fetchChatRooms = async () => {
    setLoding(true)
    const userAutenticated = await Auth.currentAuthenticatedUser()
    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: userAutenticated.attributes.sub })
    )
    const rooms = response?.data?.getUser?.ChatRoomsUsers?.items.filter(
      (item) => !item._deleted
      ) 

    const sortedRooms = orderRooms(rooms)
    setChatRooms(sortedRooms)
    setLoding(false)
  }

  const orderRooms = (rooms) => {
    const sortedRooms = rooms.sort(
      (r1, r2) =>
        new Date(r2.chatRoom?.updatedAt) - new Date(r1.chatRoom?.updatedAt)
    )

    return sortedRooms
  }

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom)
    ).subscribe({
      next: () => {
        fetchChatRooms()
      },
      error: (err) => console.warn(err),
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateChatRoom)
    ).subscribe({
      next: () => {
        fetchChatRooms()
      },
      error: (err) => console.warn(err),
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    fetchChatRooms()
  }, [])

  return (
    <View style={styles.container}>
      <ListarComponentes
        listaMensajes={chatRooms}
        onRefresh={fetchChatRooms}
        refreshing={loading}
        tipo="chat"
      />
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
