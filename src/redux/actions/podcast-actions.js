import { createAction } from "redux-actions";

const GET_ALL_PODCASTS = "GET_ALL_PODCASTS";
const SET_ALL_PODCASTS = "SET_ALL_PODCASTS";
const SET_LOADING = "SET_PODCASTS_LOADING";

export const constants = {
  GET_ALL_PODCASTS,
  SET_ALL_PODCASTS,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllPodcasts = createAction(GET_ALL_PODCASTS, (filter) => ({ filter }));
export const setAllPodcasts = createAction(SET_ALL_PODCASTS, (podcasts) => ({
  podcasts,
}));
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllPodcasts,
  setAllPodcasts,
  setLoading,
};
