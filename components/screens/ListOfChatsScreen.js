import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import mensajes from '../../assets/data/chats.json'
import ListarComponentes from '../molecules/ListarComponenets'


const ListOfChatsScreen = () => {
  return (
    <View style={styles.container} >
      <ListarComponentes listaMensajes={mensajes} tipo='chat' />
      
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

export default ListOfChatsScreen