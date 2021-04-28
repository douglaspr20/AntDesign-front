import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as courseConstants,
  actions as courseActions,
} from "../actions/course-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  get,
  getAll,
  getCourseClasses,
} from "../../api/module/course";

export function* getAllCoursesSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAll);

    if (response.status === 200) {
      yield put(courseActions.setAllCourses(response.data.courses));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getCourseSaga({payload}) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(get, payload.id);

    if (response.status === 200) {
      yield put(courseActions.setCourse(response.data.course));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getCourseClassesSaga({payload}) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getCourseClasses, payload.id);

    if (response.status === 200) {
      yield put(courseActions.setCourseClasses(response.data.courseClasses));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(courseConstants.GET_ALL_COURSES, getAllCoursesSaga);
  yield takeLatest(courseConstants.GET_COURSE, getCourseSaga);
  yield takeLatest(courseConstants.GET_COURSE_CLASSES, getCourseClassesSaga);
}

export const courseSaga = [fork(watchLogin)];
