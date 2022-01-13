import { createSelector } from "reselect";

const conversationDataSelector = (state) => state.conversation;

const resultSelector = createSelector(conversationDataSelector, (payload) => {
  return {
    conversations: payload.get("conversations"),
    conversation: payload.get("conversation"),
  };
});

export const conversationeSelector = (state) => ({
  ...resultSelector(state),
});
