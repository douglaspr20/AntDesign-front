import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

import { actions as channelActions } from "../actions/channel-actions";

export const reducers = {
  [channelActions.SET_CHANNEL]: (state, { payload }) => {
    return state.merge({ selectedChannel: payload.channel });
  },
  [channelActions.SET_FIRST_CHANNEL_LIST]: (state, { payload }) => {
    return state.merge({
      allChannels: cloneDeep([...payload.data]),
      currentPage: payload.page,
      countOfResults: payload.num,
    });
  },
  [channelActions.SET_MORE_CHANNEL_LIST]: (state, { payload }) => {
    const allChannels = state.get("allChannels");
    return state.merge({
      allChannels: cloneDeep([...allChannels, ...payload.data]),
      currentPage: payload.page,
      countOfResults: payload.num,
    });
  },
  [channelActions.SET_CHANNEL_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allChannels: [],
    selectedChannel: [],
    countOfResults: 0,
    currentPage: 1,
  });

export default handleActions(reducers, initialState());
