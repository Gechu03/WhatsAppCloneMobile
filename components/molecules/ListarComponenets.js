import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ChatListItem from '../atoms/chatListItem'
import mensajes from '../../assets/data/chats.json'
import Message from '../atoms/Message'

const ListarComponentes = ({listaMensajes, tipo='chat'}) => {
  if(tipo === 'chat'){
    return(
    <FlatList
    data={listaMensajes}
    renderItem={({ item }) => <ChatListItem chat={item} />} />
    )
    
  }else if (tipo === 'mensajes'){
    return(
      <FlatList
      inverted
      data={listaMensajes}
      style={styles.listadoMensajes}
      renderItem={({ item }) => <Message mensaje={item}  />} />
      )
  }
}

const styles = StyleSheet.create({
  listadoMensajes: {
    padding: 10,
    
  }
})

export default ListarComponentes