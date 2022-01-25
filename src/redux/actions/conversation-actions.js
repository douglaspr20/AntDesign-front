import { createAction } from "redux-actions";

const CREATE_CONVERSATION = "CREATE_CONVERSATION";
const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_CONVERSATIONS = "SET_CONVERSATIONS";
const GET_CONVERSATION = "GET_CONVERSATION";
const SET_CONVERSATION = "SET_CONVERSATION";
const READ_MESSAGES = "READ_MESSAGES";

export const constants = {
  CREATE_CONVERSATION,
  GET_CONVERSATIONS,
  SET_CONVERSATIONS,
  GET_CONVERSATION,
  SET_CONVERSATION,
  READ_MESSAGES,
};

// ------------------------------------
// Actions
// ------------------------------------
export const createConversartion = createAction(
  CREATE_CONVERSATION,
  (members) => ({
    members,
  })
);

export const getConversations = createAction(GET_CONVERSATIONS, (id) => ({
  id,
}));

export const setConversations = createAction(
  SET_CONVERSATIONS,
  (conversations) => ({
    conversations,
  })
);

export const getConversation = createAction(
  GET_CONVERSATION,
  (conversationId) => ({
    conversationId,
  })
);

export const setConversation = createAction(
  SET_CONVERSATION,
  (conversation) => ({
    conversation,
  })
);

export const readMessages = createAction(
  READ_MESSAGES,
  (id, ConversationId) => ({
    id,
    ConversationId,
  })
);

export const actions = {
  createConversartion,
  getConversations,
  setConversations,
  getConversation,
  setConversation,
  readMessages,
};
