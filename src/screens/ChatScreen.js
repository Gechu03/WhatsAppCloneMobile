import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import BG from '../../assets/images/BG.png'
import ListarComponentes from '../components/molecules/ListarComponenets'
import InputBox from '../components/atoms/InputBox'
import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getChatRoom, listMessagesByChatRoom } from '../graphql/queries'
import { ActivityIndicator } from 'react-native'

const ChatScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [chatRoom, setChatRoom] = useState(null)
  const [messages, setMessages] = useState([])

  const chatRoomId = route.params

  // recibe chatRoom
  useEffect(() => {
    API.graphql(
      graphqlOperation(getChatRoom, {
        id: chatRoomId.id,
        chatName: chatRoomId.name,
      })
    ).then((result) => {
      setChatRoom(result?.data?.getChatRoom);
    })
  }, [])

  // recibe Mensages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID: chatRoomId.id,
        sortDirection: 'DESC',
      })
    ).then((result) => {
      setMessages(result?.data?.listMessagesByChatRoom?.items);
    })
  },[])

  useEffect(() => {
    navigation.setOptions({ title: route?.params?.name })
  }, [route.params.name])

  if (!chatRoom) {
    return <ActivityIndicator />
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 110}
      style={styles.container}
    >
      <ImageBackground source={BG} style={styles.list}>
        <ListarComponentes listaMensajes={messages} tipo="mensajes" />
        <InputBox style={styles.input} chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height: '100%',
  },
  input: {
    flex: 1,
    top: 0,
  },
})

export default ChatScreen
