import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Text, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'

dayjs.extend(relativeTime)

const Message = ({ mensaje }) => {
  const [isMe, setIsMe] = useState(false)
  useEffect(() => {
    const isMyMessage = async () => {
      const useAuth = await Auth.currentAuthenticatedUser()
      setIsMe(mensaje?.userID === useAuth.attributes.sub)
    }

    isMyMessage()
  })

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? '#DCF8C5' : 'white',
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text>{mensaje?.text}</Text>
      <Text style={styles.time}>{dayjs(mensaje?.createdAt).fromNow(true)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 2,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
})

export default Message
