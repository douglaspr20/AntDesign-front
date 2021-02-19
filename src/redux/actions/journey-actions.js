import { createAction } from "redux-actions";

const GET_ALL_JOURNEYS = "GET_ALL_JOURNEYS";
const SET_ALL_JOURNEYS = "SET_ALL_JOURNEYS";
const ADD_JOURNEY = "ADD_JOURNEY";
const SET_JOURNEY = "SET_JOURNEY";
const UNSET_JOURNEY = "UNSET_JOURNEY";
const GET_JOURNEY = "GET_JOURNEY";
const SET_LOADING = "SET_JOURNEY_LOADING";

export const constants = {
  GET_ALL_JOURNEYS,
  SET_ALL_JOURNEYS,
  ADD_JOURNEY,
  SET_JOURNEY,
  UNSET_JOURNEY,
  GET_JOURNEY,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllJourneys = createAction(GET_ALL_JOURNEYS);
export const getJourney = createAction(GET_JOURNEY, (id) => ({
  id,
}));
export const setAllJourneys = createAction(SET_ALL_JOURNEYS, (journeys) => ({
  journeys,
}));
export const addJourney = createAction(ADD_JOURNEY, (journey) => ({ journey }));
export const setJourney = createAction(SET_JOURNEY, (journey) => ({ journey }));
export const unsetJourney = createAction(UNSET_JOURNEY);
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllJourneys,
  setAllJourneys,
  getJourney,
  addJourney,
  setJourney,
  unsetJourney,
  setLoading,
};
