import dayjs from 'dayjs'
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { onUpdateChatRoom } from '../../graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'
dayjs.extend(relativeTime)

const ChatListItem = ({ chat }) => {
 
  const [user, setUser] = useState()
  const navigation = useNavigation()
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const getAuthUser = async () => {
      const userAutenticated = await Auth.currentAuthenticatedUser()

      console.log( chatRoom.UsersChatRooms.items[0].user.id, chat.id, chatRoom?.id)
      const usertoSet = chatRoom.UsersChatRooms.items.find(
        (item) => item?.user?.id !== userAutenticated.attributes.sub
      )

      setUser(usertoSet?.user)
    }
    getAuthUser()
  }, [])

  // fetch Chat Room
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chat.id]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {
          id: chatRoom?.id,
          name: user?.name ?? ' ',
        })
      }
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
        <View style={styles.messageInfo}>
          <Text numberOfLines={1} style={styles.name}>
            {chatRoom.name || user?.name}
          </Text>
          <Text style={styles.date}>
            {chatRoom?.LastMessage?.createdAt
              ? dayjs(chatRoom?.LastMessage?.createdAt).fromNow(true)
              : ''}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.lastMessage}>
          {chatRoom?.LastMessage?.text}
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
  },
  lastMessage: {
    fontWeight: '300',
    color: 'gray',
    marginTop: 10,
  },
})

export default ChatListItem
