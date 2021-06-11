import { createAction } from "redux-actions";

const GET_ALL_PODCASTS = "GET_ALL_PODCASTS";
const SET_ALL_PODCASTS = "SET_ALL_PODCASTS";
const SET_LOADING = "SET_PODCASTS_LOADING";
const ADD_PODCAST_TO_CHANNEL = "ADD_PODCAST_TO_CHANNEL";
const GET_FIRST_CHANNEL_PODCAST_LIST = "GET_FIRST_CHANNEL_PODCAST_LIST";
const SET_FIRST_CHANNEL_PODCAST_LIST = "SET_FIRST_CHANNEL_PODCAST_LIST";
const GET_MORE_CHANNEL_PODCAST_LIST = "GET_MORE_CHANNEL_PODCAST_LIST";
const SET_MORE_CHANNEL_PODCAST_LIST = "SET_MORE_CHANNEL_PODCAST_LIST";
const DELETE_CHANNEL_PODCAST = "DELETE_CHANNEL_PODCAST";
const UPDATE_CHANNEL_PODCAST = "UPDATE_CHANNEL_PODCAST";

export const constants = {
  GET_ALL_PODCASTS,
  SET_ALL_PODCASTS,
  SET_LOADING,
  ADD_PODCAST_TO_CHANNEL,
  GET_FIRST_CHANNEL_PODCAST_LIST,
  SET_FIRST_CHANNEL_PODCAST_LIST,
  GET_MORE_CHANNEL_PODCAST_LIST,
  SET_MORE_CHANNEL_PODCAST_LIST,
  DELETE_CHANNEL_PODCAST,
  UPDATE_CHANNEL_PODCAST,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllPodcasts = createAction(GET_ALL_PODCASTS, (filter) => ({
  filter,
}));
export const setAllPodcasts = createAction(
  SET_ALL_PODCASTS,
  (total, page, podcasts) => ({
    total,
    page,
    podcasts,
  })
);
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
export const addPodcastToChannel = createAction(
  ADD_PODCAST_TO_CHANNEL,
  (podcast, callback) => ({ podcast, callback })
);

export const getFirstChannelPodcastList = createAction(
  GET_FIRST_CHANNEL_PODCAST_LIST,
  (filter) => ({ filter })
);
export const setFirstChannelPodcastList = createAction(
  SET_FIRST_CHANNEL_PODCAST_LIST,
  (total, page, channelPodcasts) => ({ total, page, channelPodcasts })
);
export const getMoreChannelPodcastList = createAction(
  GET_MORE_CHANNEL_PODCAST_LIST,
  (filter) => ({ filter })
);
export const setMoreChannelPodcastList = createAction(
  SET_MORE_CHANNEL_PODCAST_LIST,
  (total, page, channelPodcasts) => ({ total, page, channelPodcasts })
);
export const deleteChannelPodcast = createAction(
  DELETE_CHANNEL_PODCAST,
  (episode, callback) => ({ episode, callback })
);
export const updateChannelPodcast = createAction(
  UPDATE_CHANNEL_PODCAST,
  (episode, callback) => ({ episode, callback })
);

export const actions = {
  getAllPodcasts,
  setAllPodcasts,
  setLoading,
  addPodcastToChannel,
  getFirstChannelPodcastList,
  setFirstChannelPodcastList,
  getMoreChannelPodcastList,
  setMoreChannelPodcastList,
  deleteChannelPodcast,
  updateChannelPodcast,
};
