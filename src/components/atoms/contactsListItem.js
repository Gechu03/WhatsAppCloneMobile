import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations'
import { listChatRooms } from '../../CustomQueries/queries'
import { getChatCommonRoom } from '../../CustomQueries/functions'

const ContactListItem = ({ user }) => {
  const navigation = useNavigation()
  const clickHandler = async () => {
    const existingChatRoom = await getChatCommonRoom(user.id)

    if (existingChatRoom) {
      navigation.navigate('Chat', { id: existingChatRoom.id, name: user?.name })
      return
    }

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    )

    if (!newChatRoomData?.data?.createChatRoom) {
      console.log('Error creating the chat room')
    }

    const newChatRoom = newChatRoomData?.data?.createChatRoom

    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    )

    const AuthUser = await Auth.currentAuthenticatedUser()
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: { chatRoomId: newChatRoom.id, userId: AuthUser.attributes.sub },
      })
    )

    navigation.navigate('Chat', { id: newChatRoom.id, name: user?.name })
  }

  return (
    <Pressable
      onPress={() => clickHandler()}
      id={user?.id}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri:
            user?.image ??
            'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg',
        }}
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user?.name}
        </Text>

        <Text numberOfLines={2} style={styles.date}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 70,
    borderTopColor: 'gray',
    borderTopWidth: 0.2,
    paddingVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    fontWeight: '300',
    color: 'gray',
    overflow: 'hidden',
  },
})

export default ContactListItem
