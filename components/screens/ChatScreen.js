import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import mensajes from '../../assets/data/chats.json'
import ChatList from '../molecules/chatsList'


const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatList listaMensajes={mensajes}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
});

export default ChatScreen