export const listChatRooms = `
query GetUser($id: ID!) {
   getUser(id: $id) {
     id
     ChatRoomsUsers {
       items {
         chatRoom {
           id
           updatedAt
           LastMessage {
             id
             createdAt
             text
           }
           UsersChatRooms {
             items {
               user {
                 id
                 image
                 name
               }
             }
           }
         }
       }
     }
   }
 }
 `

 export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      updatedAt
      name
      UsersChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          user {
            id
            name
            status
            image
          }
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;