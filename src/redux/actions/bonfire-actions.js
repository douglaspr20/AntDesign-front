import { createAction } from "redux-actions";

const CREATE_BONFIRE = "CREATE_BONFIRE";
const GET_BONFIRES = "GET_BONFIRES";
const SET_BONFIRES = "SET_BONFIRES";
const UPDATE_BONFIRE = "UPDATE_BONFIRE";
const DELETE_BONFIRE = "DELETE_BONFIRE";

export const constants = {
  CREATE_BONFIRE,
  GET_BONFIRES,
  SET_BONFIRES,
  UPDATE_BONFIRE,
  DELETE_BONFIRE,
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

export const updateBonfire = createAction(
  UPDATE_BONFIRE,
  (id, bonfire, callback) => ({
    id,
    bonfire,
    callback,
  })
);

export const deleteBonfire = createAction(DELETE_BONFIRE, (id, callback) => ({
  id,
  callback,
}));

export const actions = {
  createBonfire,
  getBonfires,
  setBonfires,
  updateBonfire,
  deleteBonfire,
};
