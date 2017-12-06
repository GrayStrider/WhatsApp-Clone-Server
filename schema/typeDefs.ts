export default `
  scalar Date

  type Query {
    me: User
    users: [User!]
    chats: [Chat!]!
    chat(chatId: ID!): Chat
  }

  enum MessageType {
    LOCATION
    TEXT
    PICTURE
  }

  type Chat {
    #May be a chat or a group
    id: ID!
    createdAt: Date!
    #Computed for chats
    name: String
    #Computed for chats
    picture: String
    #All members, current and past ones. Includes users who still didn't get the chat listed.
    allTimeMembers: [User!]!
    #Whoever gets the chat listed. For groups includes past members who still didn't delete the group. For chats they are the only ones who can send messages.
    listingMembers: [User!]!
    #Actual members of the group. Null for chats. For groups they are the only ones who can send messages. They aren't the only ones who get the group listed.
    actualGroupMembers: [User!]
    #Null for chats
    admins: [User!]
    #If null the group is read-only. Null for chats.
    owner: User
    #Computed property
    isGroup: Boolean!
    messages(amount: Int): [Message]!
    #Computed property
    lastMessage: Message
    #Computed property
    updatedAt: Date!
    #Computed property
    unreadMessages: Int!
  }

  type Message {
    id: ID!
    sender: User!
    chat: Chat!
    content: String!
    createdAt: Date!
    #FIXME: should return MessageType
    type: Int!
    #Whoever still holds a copy of the message. Cannot be null because the message gets deleted otherwise
    holders: [User!]!
    #Computed property
    ownership: Boolean!
    #Whoever received the message
    recipients: [Recipient!]!
  }

  type Recipient {
    user: User!
    message: Message!
    chat: Chat!
    receivedAt: Date
    readAt: Date
  }

  type User {
    id: ID!
    name: String
    picture: String
    phone: String
  }
`;
