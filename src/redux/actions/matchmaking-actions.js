import { createAction } from "redux-actions";

const GET_MATCHMAKE = "GET_MATCHMAKE";
const SET_MATCHMAKE = "SET_MATCHMAKE";

export const constants = {
  GET_MATCHMAKE,
  SET_MATCHMAKE,
};

const getMatchmake = createAction(GET_MATCHMAKE, (filters, callback) => ({
  filters,
  callback,
}));
const setMatchmake = createAction(SET_MATCHMAKE, (matchmakingUsers) => ({
  matchmakingUsers,
}));

export const actions = {
  getMatchmake,
  setMatchmake,
};
