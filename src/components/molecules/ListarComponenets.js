import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ChatListItem from '../atoms/chatListItem'
import mensajes from '../../../assets/data/chats.json'
import Message from '../atoms/Message'
import ContactListItem from '../atoms/contactsListItem'

const ListarComponentes = ({ listaMensajes, tipo = 'chat', ...props }) => {
  return tipo === 'chat' ? (
    <FlatList
      data={listaMensajes}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      style={styles.listadoChats}
      {...props}
    />
  ) : tipo === 'mensajes' ? (
    <FlatList
      inverted
      data={listaMensajes}
      style={styles.listadoMensajes}
      renderItem={({ item }) => (
        <Message mensaje={item} keyExtractor={(item) => item.createdAt} />
      )}
      {...props}
    />
  ) : tipo === 'contacts' ? (
    <FlatList
      data={listaMensajes}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={styles.listadoChats}
      {...props}
    />
  ) : (
    <></>
  )
}

const styles = StyleSheet.create({
  listadoMensajes: {
    padding: 10,
  },
  listadoChats: {
    backgroundColor: 'white',
  },
})

export default ListarComponentes
