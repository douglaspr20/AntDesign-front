import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as advertisementConstants } from "../actions/advertisment-actions";

export const reducers = {
  [advertisementConstants.SET_ADVERTISEMENTS_TODAY_BY_PAGE]: (
    state,
    { payload }
  ) => {
    let advertisementsByPage = state.get("advertisementsByPage");
    const page = payload.page;

    advertisementsByPage = {
      ...advertisementsByPage,
      [page]: payload.advertisement,
    };

    return state.merge({
      advertisementsByPage,
    });
  },
  [advertisementConstants.SET_ADVERTISEMENTS_BY_ADVERTISER]: (
    state,
    { payload }
  ) => {
    return state.merge({
      advertisementsByAdvertiser: payload.advertisements,
    });
  },
  [advertisementConstants.SET_ADVERTISEMENT_BY_ID]: (state, { payload }) => {
    return state.merge({
      advertisementById: payload.advertisement,
    });
  },
};

export const initialState = () => {
  return Map({
    advertisementsByPage: {},
    advertisementsByAdvertiser: [],
    advertisementById: {},
  });
};

export default handleActions(reducers, initialState());
