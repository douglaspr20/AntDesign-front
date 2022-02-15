import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as advertisementConstants } from "../actions/advertisment-actions";

export const reducers = {
  [advertisementConstants.SET_ADVERTISEMENTS_TODAY_BY_PAGE]: (
    state,
    { payload }
  ) => {
    let advertisementsByPage = state.get("advertisementsByPage");
    const page = payload.advertisement.page;

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
    console.log(payload, "payload");
    return state.merge({
      advertisementsByAdvertiser: payload.advertisements,
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
