import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as channelConstants,
  actions as channelActions,
} from "../actions/channel-actions";
import { actions as homeActions } from "../actions/home-actions";
import { logout } from "../actions/auth-actions";

import {
  createChannel,
  searchChannels,
  getChannel,
  setFollowChannel,
  unsetFollowChannel,
  updateChannel,
  notifyNewEmailChannelsEndPoint,
  getChannelForNameEndPoint,
  exportsFollowersChannel,
  addNewContentEditorChannel,
  removeContentEditorChannel,
  getContentEditorChannelEndPoint
} from "../../api";

export function* createChannelSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(createChannel, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback("");
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getChannelSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getChannel, { ...payload });

    if (response.status === 200) {
      yield put(channelActions.setChannel(response.data.channel));

      if (payload.callback) {
        payload.callback(false);
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(true);
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getChannelForNameSagas({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getChannelForNameEndPoint, { ...payload });
    if (response.status === 200) {
      yield put(channelActions.setChannel({
        channel:response.data.channel,
        followers:response.data.followers
      }));

      if (payload.callback) {
        payload.callback(false);
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(true);
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateChannelSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateChannel, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (err) {
    console.log(err);

    if (err && err.response && err.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wrong. Please try again!");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deleteChannelSaga({ payload }) {}

export function* getFirstChannelListSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchChannels, { ...payload });

    if (response.status === 200) {
      yield put(
        channelActions.setFirstChannelList(
          response.data.channels.rows,
          1,
          response.data.channels.count
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getMoreChannelListSaga({ payload }) {
  yield put(channelActions.setChannelLoading(true));

  try {
    const response = yield call(searchChannels, { ...payload });

    if (response.status === 200) {
      yield put(
        channelActions.setMoreChannelList(
          response.data.channels.rows,
          payload.page,
          response.data.channels.count
        )
      );
    }
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(channelActions.setChannelLoading(false));
  }
}

export function* setFollowChannelSaga({ payload }) {
  yield put(channelActions.setChannelLoading(true));

  try {
    const response = yield call(setFollowChannel, { ...payload });

    if (response.status === 200) {
      yield put(channelActions.setChannel(response.data.channel));
      yield put(homeActions.updateUserInformation(response.data.user));

      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wront. Please try again.");
    }
  } finally {
    yield put(channelActions.setChannelLoading(false));
  }
}

export function* unsetFollowChannelSaga({ payload }) {
  yield put(channelActions.setChannelLoading(true));

  try {
    const response = yield call(unsetFollowChannel, { ...payload });

    if (response.status === 200) {
      yield put(channelActions.setChannel(response.data.channel));
      yield put(homeActions.updateUserInformation(response.data.user));

      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wront. Please try again.");
    }
  } finally {
    yield put(channelActions.setChannelLoading(false));
  }
}

export function* notifyNewEmailChannelsSagas({ payload }) {

  try {
    const response = yield call(notifyNewEmailChannelsEndPoint, payload.chanelContent);

    if (response.status === 200) {
      yield put(channelActions.setChannel(response.data.channel));
      yield put(homeActions.updateUserInformation(response.data.user));

      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wront. Please try again.");
    }
  } 
}

export function* exportFollowersChannelsSagas({ payload }) {

  const {idChannel} = payload

  try {
    const response = yield call(exportsFollowersChannel, {idChannel});

    if (response.status === 200) {
      var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.ms-excel'}));
      var fileLink = document.createElement('a');
  
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `followers.xlsx`);
      document.body.appendChild(fileLink);
  
      fileLink.click();
      document.body.removeChild (fileLink);
      window.URL.revokeObjectURL (fileURL);
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wront. Please try again.");
    }
  } finally {
    yield put(channelActions.setChannelLoading(false));
  }
}

export function* newChannelEditor({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addNewContentEditorChannel, {...payload.data});

    if (response.status === 200 && payload.callback) {

      payload.callback();
  
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getChannelEditor({ payload }) {
  yield put(homeActions.setLoading(true));
  const {id} = payload

  try {

    const response = yield call(getContentEditorChannelEndPoint, id);

    if (response.status === 200) {
      yield put(channelActions.setChannelEditors(response.data.contentEditors));

      if(payload.callback){
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deleteChannelEditor({ payload }) {
  yield put(homeActions.setLoading(true));
  const {id} = payload

  try {
    const response = yield call(removeContentEditorChannel, id);

    if (response.status === 200) {

      if(payload.callback){
        payload.callback();
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchChannel() {
  yield takeLatest(channelConstants.CREATE_CHANNEL, createChannelSaga);
  yield takeLatest(channelConstants.GET_CHANNEL, getChannelSaga);
  yield takeLatest(channelConstants.GET_CHANNEL_FOR_NAME, getChannelForNameSagas)
  yield takeLatest(channelConstants.UPDATE_CHANNEL, updateChannelSaga);
  yield takeLatest(channelConstants.DELETE_CHANNEL, deleteChannelSaga);
  yield takeLatest(
    channelConstants.GET_FIRST_CHANNEL_LIST,
    getFirstChannelListSaga
  );
  yield takeLatest(
    channelConstants.GET_MORE_CHANNEL_LIST,
    getMoreChannelListSaga
  );
  yield takeLatest(channelConstants.SET_FOLLOW_CHANNEL, setFollowChannelSaga);
  yield takeLatest(
    channelConstants.UNSET_FOLLOW_CHANNEL,
    unsetFollowChannelSaga
  );
  yield takeLatest(
    channelConstants.NOTIFY_NEW_INFORMATION_CREATOR,
    notifyNewEmailChannelsSagas
  )
  yield takeLatest(channelConstants.EXPORT_FOLLOWERS_CHANNELS, exportFollowersChannelsSagas)
  yield takeLatest(channelConstants.SET_NEWS_CHANNEL_EDITOR, newChannelEditor)
  yield takeLatest(channelConstants.DELETE_CHANNEL_EDITOR, deleteChannelEditor)
  yield takeLatest(channelConstants.GET_CHANNEL_EDITOR, getChannelEditor)
}

export const channelSaga = [fork(watchChannel)];
