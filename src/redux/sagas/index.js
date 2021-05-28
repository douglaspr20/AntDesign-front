import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { eventSaga } from "./event";
import { librarySaga } from "./library";
import { mentoringSaga } from "./mentoring";
import { podcastSaga } from "./podcast";
import { marketplaceSaga } from "./marketplace";
import { marketplaceCategoriesSaga } from "./marketplaceCategories";
import { categorySaga } from "./category";
import { conferenceSaga } from "./conference";
import { journeySaga } from "./journey";
import { journeyItemSaga } from "./journeyItem";
import { channelSaga } from "./channel";
import { channelCategorySaga } from "./channelCategory";
import { notificationSaga } from "./notification";
import { sessionSaga } from "./session";

export default function* sagas() {
  yield all([
    ...authSaga,
    ...userSaga,
    ...eventSaga,
    ...librarySaga,
    ...mentoringSaga,
    ...podcastSaga,
    ...marketplaceSaga,
    ...marketplaceCategoriesSaga,
    ...categorySaga,
    ...conferenceSaga,
    ...journeySaga,
    ...journeyItemSaga,
    ...channelSaga,
    ...channelCategorySaga,
    ...notificationSaga,
    ...sessionSaga,
  ]);
}
