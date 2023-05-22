import { View, Text, StyleSheet, TextInput } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createMessage, updateChatRoom } from '../../graphql/mutations'

const InputBox = ({ chatroom }) => {
  const [inputValue, setInputValue] = useState('')

  const onSendHandler = async () => {
    if (inputValue === '') {
      return
    }
    const authUser = await Auth.currentAuthenticatedUser()
    const newMessage = {
      chatroomID: chatroom.id,
      text: inputValue,
      userID: authUser.attributes.sub,
    }

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    )

    setInputValue('')
    // set lastMessage

    const resposne = await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      })
    )
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <AntDesign name="plus" size={20} color="royalblue" />
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
        placeholder="type your massage..."
      />
      <MaterialIcons
        onPress={onSendHandler}
        style={styles.send}
        name="send"
        size={16}
        color="white"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 5,
    maxWidth: '75%',
  },
  send: {
    backgroundColor: 'royalblue',
    padding: 7,
    borderRadius: 30,
    overflow: 'hidden',
  },
})

export default InputBox
