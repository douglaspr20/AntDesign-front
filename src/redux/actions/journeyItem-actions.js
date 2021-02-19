import { createAction } from "redux-actions";

const GET_ALL_JOURNEY_ITEMS = "GET_ALL_JOURNEY_ITEMS";
const SET_JOURNEY_ITEMS = "SET_JOURNEY_ITEMS";
const SET_JOURNEY_ID = "SET_JOURNEY_ID";
const SET_LOADING = "SET_JOURNEY_ITEMS_LOADING";

export const constants = {
  GET_ALL_JOURNEY_ITEMS,
  SET_JOURNEY_ITEMS,
  SET_JOURNEY_ID,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllJourneyItems = createAction(GET_ALL_JOURNEY_ITEMS, (id) => ({
  id
}));
export const setAllJourneyItems = createAction(SET_JOURNEY_ITEMS, (journeyItems) => ({
  journeyItems,
}));
export const setJourneyId = createAction(SET_JOURNEY_ID, (journeyId) => ({
  journeyId,
}));

export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllJourneyItems,
  setAllJourneyItems,
  setJourneyId,
  setLoading,
};
