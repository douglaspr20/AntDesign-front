import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

import { constants as channelConstants } from "../actions/channel-actions";

export const reducers = {
  [channelConstants.SET_CHANNEL]: (state, { payload }) => {

    if(payload.channel.channel){
      return state.merge({ 
        selectedChannel: payload.channel.channel, 
        followers: payload.channel.followers
      });
    }else{
      return state.merge({ 
        selectedChannel: payload.channel, 
      });
    }
  },
  [channelConstants.SET_CHANNEL_EDITOR]: (state, { payload }) => {
    return state.merge({
      userChannelEditor: payload.channelEditor
    });
  },
  [channelConstants.SET_FIRST_CHANNEL_LIST]: (state, { payload }) => {
    return state.merge({
      allChannels: cloneDeep([...payload.data]),
      currentPage: payload.page,
      countOfResults: payload.num,
    });
  },
  [channelConstants.SET_MORE_CHANNEL_LIST]: (state, { payload }) => {
    const allChannels = state.get("allChannels");
    return state.merge({
      allChannels: cloneDeep([...allChannels, ...payload.data]),
      currentPage: payload.page,
      countOfResults: payload.num,
    });
  },
  [channelConstants.SET_CHANNEL_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [channelConstants.SET_BUL_CHANNEL_PAGE]: (state, { payload }) => {
    return state.merge({ bulChannelPage: payload.bul });
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
    bulChannelPage: 'nada',
    followers: [],
    userChannelEditor: []
  });

export default handleActions(reducers, initialState());
