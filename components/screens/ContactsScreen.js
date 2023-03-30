import { View, Text } from 'react-native'
import React from 'react'
import ListarComponentes from '../molecules/ListarComponenets'
import chats from '../../assets/data/chats.json'

const ContactsScreen = () => {
   
  return (
    <ListarComponentes
      listaMensajes={chats}
      tipo="contacts"
    ></ListarComponentes>
  )
}

export default ContactsScreen
