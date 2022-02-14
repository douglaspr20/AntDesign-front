import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as advertisementConstants } from "../actions/advertisment-actions";

export const reducers = {
  [advertisementConstants.SET_ADVERTISEMENTS_TODAY_BY_PAGE]: (
    state,
    { payload }
  ) => {
    return state.merge({
      ...payload,
    });
  },
  [advertisementConstants.SET_ADVERTISEMENT_BY_ADVERTISER]: (
    state,
    { payload }
  ) => {
    return state.merge({
      ...payload,
    });
  },
};

export const initialState = () => {
  return Map({
    advertisementsByPage: {},
    advertisementsByAdvertiser: [],
  });
};

export default handleActions(reducers, initialState());
