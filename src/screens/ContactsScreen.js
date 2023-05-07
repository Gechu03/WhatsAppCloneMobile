import React from 'react'
import { useState, useEffect } from 'react'
import ListarComponentes from '../components/molecules/ListarComponenets'
import chats from '../../assets/data/chats.json'
import {API, graphqlOperation} from 'aws-amplify'
import { listUsers } from '../graphql/queries'
import { Alert } from 'react-native'

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) =>{
      setUsers(result?.data?.listUsers?.items);
    });
  },[])

  return (
    <ListarComponentes
      listaMensajes={users}
      tipo="contacts"
    ></ListarComponentes>
  )
}

export default ContactsScreen
