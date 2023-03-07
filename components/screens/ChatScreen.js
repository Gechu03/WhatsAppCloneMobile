import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import BG from '../../assets/images/BG.png'
import Message from '../atoms/Message'
import ListarComponentes from '../molecules/ListarComponenets'
import messages from '../../assets/data/messages.json'

const ChatScreen = () => {
   return (
      <ImageBackground source={BG} style={styles.container}>
         <ListarComponentes listaMensajes={messages} tipo="mensajes"/>

      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
})

export default ChatScreen