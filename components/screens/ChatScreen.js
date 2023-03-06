import { View, Text } from 'react-native'
import React from 'react'

import ChatList from '../atoms/chatListItem'

const ChatScreen = () => {
  return (
    <ChatList data={Chats}/>
  )
}

export default ChatScreen