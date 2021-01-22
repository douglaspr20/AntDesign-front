import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as podcastConstants } from "../actions/podcast-actions";

// Events's Reducer
export const reducers = {
  [podcastConstants.SET_ALL_PODCASTS]: (state, { payload }) => {
    return state.merge({ allEpisodes: cloneDeep(payload.podcasts) });
  },
  [podcastConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    allEpisodes: [],
  });

export default handleActions(reducers, initialState());
