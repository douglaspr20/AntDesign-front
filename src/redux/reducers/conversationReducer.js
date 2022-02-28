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
};

export const initialState = () =>
  Map({
    conversations: [],
    conversation: {},
  });

export default handleActions(reducers, initialState());
