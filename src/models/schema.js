export const schema = {
  models: {
    ChatRoom: {
      name: 'ChatRoom',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        ChatMessages: {
          name: 'ChatMessages',
          isArray: true,
          type: {
            model: 'Message',
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['chatroomID'],
          },
        },
        UsersChatRooms: {
          name: 'UsersChatRooms',
          isArray: true,
          type: {
            model: 'ChatRoomUser',
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['chatRoom'],
          },
        },
        LastMessage: {
          name: 'LastMessage',
          isArray: false,
          type: {
            model: 'Message',
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'HAS_ONE',
            associatedWith: ['id'],
            targetNames: ['chatRoomLastMessageId'],
          },
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        image: {
          name: 'image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        chatRoomLastMessageId: {
          name: 'chatRoomLastMessageId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'ChatRooms',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
    Message: {
      name: 'Message',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: [],
        },
        text: {
          name: 'text',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        chatroomID: {
          name: 'chatroomID',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        userID: {
          name: 'userID',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Messages',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'key',
          properties: {
            name: 'byChatRoom',
            queryField: 'listMessagesByChatRoom',
            fields: ['chatroomID', 'createdAt'],
          },
        },
        {
          type: 'key',
          properties: {
            name: 'byUser',
            fields: ['userID'],
          },
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
    User: {
      name: 'User',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        status: {
          name: 'status',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        image: {
          name: 'image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        UserMessages: {
          name: 'UserMessages',
          isArray: true,
          type: {
            model: 'Message',
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['userID'],
          },
        },
        ChatRoomsUsers: {
          name: 'ChatRoomsUsers',
          isArray: true,
          type: {
            model: 'ChatRoomUser',
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['user'],
          },
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Users',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
    ChatRoomUser: {
      name: 'ChatRoomUser',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        chatRoomId: {
          name: 'chatRoomId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: [],
        },
        userId: {
          name: 'userId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: [],
        },
        chatRoom: {
          name: 'chatRoom',
          isArray: false,
          type: {
            model: 'ChatRoom',
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['chatRoomId'],
          },
        },
        user: {
          name: 'user',
          isArray: false,
          type: {
            model: 'User',
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['userId'],
          },
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'ChatRoomUsers',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'key',
          properties: {
            name: 'byChatRoom',
            fields: ['chatRoomId'],
          },
        },
        {
          type: 'key',
          properties: {
            name: 'byUser',
            fields: ['userId'],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  codegenVersion: '3.4.3',
  version: '06cf385871e86a9aa15539aa4b802c30',
}
