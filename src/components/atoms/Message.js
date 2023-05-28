import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Text, StyleSheet } from 'react-native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getUser } from '../../graphql/queries'

dayjs.extend(relativeTime)

const Message = ({ mensaje }) => {
  const [isMe, setIsMe] = useState(false)
  const [username, setUsername] = useState('')
  useEffect(() => {
    const isMyMessage = async () => {
      const useAuth = await Auth.currentAuthenticatedUser()
      setIsMe(mensaje?.userID === useAuth.attributes.sub)
    }

    const getUserFunc = async () => {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: mensaje?.userID })
      )

      setUsername(userData.data.getUser.name)
    }

    isMyMessage()
    getUserFunc()
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
      {!isMe ? <Text style={styles.userName}> {username} </Text> : null}

      <View>
        <Text>{mensaje?.text}</Text>
        <Text style={styles.time}>
          {dayjs(mensaje?.createdAt).fromNow(true)}
        </Text>
      </View>
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

  userName: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '300',
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-start',
  },
})

export default Message
