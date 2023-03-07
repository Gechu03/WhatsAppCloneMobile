import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ChatListItem from '../atoms/chatListItem'
import mensajes from '../../assets/data/chats.json'

const ChatList = ({listaMensajes}) => {

  return (
   
    <FlatList
      data={listaMensajes}
      renderItem={({ item }) => <ChatListItem styles={styles.list} chat={item} />} />
   
  )
}

const styles = StyleSheet.create({
  list: {
    borderTopColor: 'black',
  },
})

export default ChatList