import {FlatList } from 'react-native'
import React from 'react'
import ChatListItem from '../atoms/chatListItem'
import chats from '../../assets/data/chats.json'

const ChatList = (data) => {
  
  return (
   <FlatList
      data={chats}
      renderItem={({item}) => <ChatListItem chat={item}/>}/>
  )
}

export default ChatList