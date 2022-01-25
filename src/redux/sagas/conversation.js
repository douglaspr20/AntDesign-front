import { put, fork, takeLatest, call, select } from "redux-saga/effects";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";
import {
  constants as conversationConstants,
  actions as conversationActions,
} from "../actions/conversation-actions";
import { logout } from "../actions/auth-actions";
import { createConversation, getConversations, readMessages } from "../../api";

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
      const conversationsData = Object.values(
        groupBy(response.data.conversations || [], "id")
      ).map((conversation) => {
        const newConversation = conversation.reduce(
          (res, item) => ({
            ...res,
            ...omit(item, [
              "userid",
              "abbrName",
              "email",
              "firstName",
              "lastname",
              "img",
              "timezone",
              "messageid",
              "ConversationId",
              "sender",
              "text",
              "messagedate",
              "viewedUser",
            ]),
            members: [
              ...(res.members || []),
              {
                id: item.userid,
                abbrName: item.abbrName,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                img: item.image,
                timezone: item.timezone,
              },
            ],
            messages: [
              ...(res.messages || []),
              item.messageid && {
                id: item.messageid,
                ConversationId: item.ConversationId,
                sender: item.sender,
                text: item.text,
                messageDate: item.messagedate,
                viewedUser: item.viewedUser,
              },
            ],
          }),
          {}
        );

        const membersReduce = (newConversation.members || []).filter(
          (member, index, self) =>
            index === self.findIndex((m) => m.id === member.id)
        );
        const messagesReduce = (newConversation.messages || []).filter(
          (message, index, self) =>
            index === self.findIndex((m) => m?.id === message?.id && m !== null)
        );

        return {
          ...newConversation,
          members: membersReduce,
          messages: messagesReduce,
        };
      });

      yield put(conversationActions.setConversations(conversationsData));
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
  }
}

export function* readMessagesSaga({ payload }) {
  try {
    const response = yield call(readMessages, { ...payload });

    if (response.status === 200) {
      const selectAllState = (state) => state;

      const allState = yield select(selectAllState);

      const conversations = allState.conversation.get("conversations");

      const conversationsData = conversations.map((conversation) => {
        const newConversationMessages = conversation.messages.map((message) => {
          const newMessage = response.data.messages.find(
            (newMessage) => newMessage.id === message.id
          );

          if (newMessage) {
            return newMessage;
          }

          return message;
        });

        return {
          ...conversation,
          messages: newConversationMessages,
        };
      });

      yield put(conversationActions.setConversations(conversationsData));
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
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
  yield takeLatest(conversationConstants.READ_MESSAGES, readMessagesSaga);
}

export const conversationSaga = [fork(watchSession)];
