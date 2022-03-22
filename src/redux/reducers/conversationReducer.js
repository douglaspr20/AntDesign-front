import { handleActions } from "redux-actions";
import { Map } from "immutable";

// Action Type Imports
import { constants as conversationConstants } from "../actions/conversation-actions";

// Session's Reducer
export const reducers = {
  [conversationConstants.SET_CONVERSATIONS]: (state, { payload }) => {
    return state.merge({
      conversations: payload.conversations,
    });
  },
  [conversationConstants.SET_CONVERSATION]: (state, { payload }) => {
    return state.merge({
      conversation: payload.conversation,
    });
  },
  [conversationConstants.UPDATE_CONVERSATION]: (state, { payload }) => {
    const allConversations = state.get("conversations");

    const conversationsUpdate = allConversations.map((conversation) =>
      conversation.id === payload.conversation.id
        ? {
            ...payload.conversation,
            messages: conversation.messages,
          }
        : conversation
    );
    return state.merge({
      conversations: conversationsUpdate,
    });
  },
};

export const initialState = () =>
  Map({
    conversations: [],
    conversation: {},
  });

export default handleActions(reducers, initialState());
