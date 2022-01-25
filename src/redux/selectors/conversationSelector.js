import { createSelector } from "reselect";

export const conversationDataSelector = (state) => state.conversation;

const resultSelector = createSelector(conversationDataSelector, (payload) => {
  return {
    conversations: payload.get("conversations"),
    conversation: payload.get("conversation"),
  };
});

export const conversationsSelector = (state) => ({
  ...resultSelector(state),
});
