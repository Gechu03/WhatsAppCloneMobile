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
