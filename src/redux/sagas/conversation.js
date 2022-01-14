import { put, fork, takeLatest, call } from "redux-saga/effects";
import {
  constants as conversationConstants,
  actions as conversationActions,
} from "../actions/conversation-actions";
import { logout } from "../actions/auth-actions";
import { createConversation, getConversations } from "../../api";

export function* createConversationSaga({ payload }) {
  try {
    yield call(createConversation, { ...payload });
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  }
}

export function* getConversationsSaga({ payload }) {
  try {
    const response = yield call(getConversations, { ...payload });

    if (response.status === 200) {
      yield put(
        conversationActions.setConversations(response.data.conversations)
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  }
}

export function* getConversationSaga({ payload }) {
  try {
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
  }
}

function* watchSession() {
  yield takeLatest(
    conversationConstants.CREATE_CONVERSATION,
    createConversationSaga
  );
  yield takeLatest(
    conversationConstants.GET_CONVERSATIONS,
    getConversationsSaga
  );
  yield takeLatest(conversationConstants.GET_CONVERSATION, getConversationSaga);
}

export const conversationSaga = [fork(watchSession)];
