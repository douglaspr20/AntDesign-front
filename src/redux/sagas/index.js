import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { eventSaga } from "./event";
import { librarySaga } from "./library";
import { mentoringSaga } from "./mentoring";
import { podcastSaga } from "./podcast";
import { marketplaceSaga } from "./marketplace";
import { marketplaceCategoriesSaga } from "./marketplaceCategories";

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
  ]);
}
