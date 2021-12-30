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
import { courseSaga } from "./course";
import { courseClassUserSaga } from "./courseClassUser";
import { notificationSaga } from "./notification";
import { sessionSaga } from "./session";
import { liveSaga } from "./live";
import { postSaga } from "./post";
import { postCommentSaga } from "./postComment";
import { envSaga } from "./env";
import { bonfireSaga } from "./bonfire";
import { skillCohortSaga } from "./skillCohort";
import { skillCohortParticipantSaga } from "./skillCohortParticipant";
import { skillCohortResourceSaga } from "./skillCohortResource";
import { skillCohortResourceResponseSaga } from "./skillCohortResourceResponse";
import { SkillCohortResourceResponseAssessmentSaga } from "./skillCohortResourceResponseAssessment";
import { SkillCohortResourceResponseRatingSaga } from "./skillCohortResourceResponseRating";
import { learningSaga } from "./myLearning";
import { partnersSaga } from "./partners";
import { jobBoardSaga } from "./jobBoard"
import { marketplaceProfileSaga } from "./marketplaceProfile";
import { councilSaga } from "./council";
import { councilCommentSaga } from "./councilComments";

export default function* sagas() {
  yield all([
    ...authSaga,
    ...userSaga,
    ...councilSaga,
    ...councilCommentSaga,
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
    ...courseSaga,
    ...courseClassUserSaga,
    ...notificationSaga,
    ...sessionSaga,
    ...liveSaga,
    ...postSaga,
    ...postCommentSaga,
    ...envSaga,
    ...bonfireSaga,
    ...skillCohortSaga,
    ...skillCohortParticipantSaga,
    ...skillCohortResourceSaga,
    ...skillCohortResourceResponseSaga,
    ...SkillCohortResourceResponseAssessmentSaga,
    ...SkillCohortResourceResponseRatingSaga,
    ...learningSaga,
    ...partnersSaga,
    ...jobBoardSaga,
    ...marketplaceProfileSaga,
  ]);
}
