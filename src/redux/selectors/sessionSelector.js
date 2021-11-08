import { createSelector } from "reselect";

const sessionDataSelector = (state) => state.session;

const resultSelector = createSelector(sessionDataSelector, (payload) => {
  return {
    sessionLoading: payload.get("sessionLoading"),
    allSessions: payload.get("allSessions"),
    sessionsUser: payload.get("sessionsUser"),
    countOfResults: payload.get("countOfResults"),
    currentPageParticipants: payload.get("currentPageParticipants"),
    participants: payload.get("participants"),
  };
});

export const sessionSelector = (state) => ({
  ...resultSelector(state),
});
