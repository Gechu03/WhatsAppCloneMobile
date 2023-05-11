import { listChatRooms, deleteChatRoom } from './queries'
import { API, graphqlOperation, Auth } from 'aws-amplify'

export const getChatCommonRoom = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser()

  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  )

  const chatRooms = response?.data?.getUser?.ChatRoomsUsers?.items || []

  const chatRoom = chatRooms.find((item) =>
    item.chatRoom.UsersChatRooms.items.some(
      (userItem) => userItem.user.id === userID
    )
  )
  return chatRoom
}
