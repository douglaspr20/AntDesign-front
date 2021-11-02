import { createAction } from "redux-actions";

const CREATE_BONFIRE = "CREATE_BONFIRE";
const GET_BONFIRES = "GET_BONFIRES";
const SET_BONFIRES = "SET_BONFIRES";

export const constants = {
  CREATE_BONFIRE,
  GET_BONFIRES,
  SET_BONFIRES,
};

// ------------------------------------
// Actions
// ------------------------------------
export const createBonfire = createAction(
  CREATE_BONFIRE,
  (bonfire, callback) => ({ bonfire, callback })
);
export const getBonfires = createAction(GET_BONFIRES);
export const setBonfires = createAction(SET_BONFIRES, (bonfires) => ({
  bonfires,
}));

export const actions = {
  getBonfires,
  setBonfires,
};
