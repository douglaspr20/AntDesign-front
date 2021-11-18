import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as myLearningConstants } from "../actions/myLearning-actions";

const reducers = {
  [myLearningConstants.SET_ALL_SAVED]: (state, { payload }) => {
    return state.merge({
      allSaved: payload.allSaved,
    });
  },
  [myLearningConstants.SET_ALL_COMPLETED]: (state, { payload }) => {
    return state.merge({
      allCompleted: payload.allCompleted,
    });
  },
  [myLearningConstants.UPDATE_SAVE_FOR_LATER_LIBRARY]: (state, { payload }) => {
    const allSaved = state.get("allSaved");
    const allItemsWithHRCredits = state.get("allItemsWithHRCredits");
    const allEventVideos = state.get("allEventVideos");

    let newAllSaved = { ...allSaved };
    let newAllItemsWithHRCredits = { ...allItemsWithHRCredits };
    let newAllEventVideos = { ...allEventVideos };

    const newAllSavedIndex =
      newAllSaved &&
      newAllSaved[payload.item] &&
      newAllSaved[payload.item].findIndex(
        (item) => item.id === payload.data.id
      );

    if (newAllSavedIndex >= 0) {
      const filteredItem =
        newAllSaved[payload.item]?.filter(
          (item) => item.id !== payload.data.id
        ) || -1;

      if (filteredItem !== -1) {
        newAllSaved = {
          ...newAllSaved,
          [payload.item]: filteredItem,
        };
      }
    } else {
      if (payload.yearIndex === -1) {
        newAllSaved = {
          ...(newAllSaved || {}),
          [payload.item]: [...(newAllSaved[payload.item] || []), payload.data],
        };
      }
    }

    const newAllItemsWithHRCreditsIndex =
      newAllItemsWithHRCredits &&
      newAllItemsWithHRCredits.rows &&
      newAllItemsWithHRCredits.rows.findIndex(
        (item) => item.id === payload.data.id
      );

    if (newAllItemsWithHRCreditsIndex >= 0) {
      newAllItemsWithHRCredits.rows[newAllItemsWithHRCreditsIndex] =
        payload.data;
    }

    const newAllEventVideosIndex =
      newAllEventVideos &&
      newAllEventVideos.rows &&
      newAllEventVideos.rows.findIndex((item) => item.id === payload.data.id);

    if (newAllEventVideosIndex >= 0) {
      newAllEventVideos.rows[newAllEventVideosIndex] = payload.data;
    }

    return state.merge({
      allSaved: newAllSaved,
      allItemsWithHRCredits: newAllItemsWithHRCredits,
      allEventVideos: newAllEventVideos,
    });
  },
  [myLearningConstants.UPDATE_COMPLETED_LIBRARY]: (state, { payload }) => {
    const allCompleted = state.get("allCompleted");
    let newAllCompleted = { ...allCompleted };

    const index =
      newAllCompleted &&
      newAllCompleted[payload.item] &&
      newAllCompleted[payload.item].findIndex(
        (item) => item.id === payload.data.id
      );

    if (index >= 0) {
      const filteredItem =
        newAllCompleted[payload.item]?.filter(
          (item) => item.id !== payload.data.id
        ) || [];

      newAllCompleted = {
        ...newAllCompleted,
        [payload.item]: filteredItem,
      };
    } else {
      newAllCompleted = {
        ...newAllCompleted,
        [payload.item]: [
          ...(newAllCompleted[payload.item] || []),
          payload.data,
        ],
      };
    }

    return state.merge({
      allCompleted: newAllCompleted,
    });
  },
  [myLearningConstants.SET_ALL_ITEMS_WITH_HR_CREDITS]: (state, { payload }) => {
    return state.merge({
      allItemsWithHRCredits: payload.items,
    });
  },
  [myLearningConstants.UPDATE_SAVE_MORE_IN_HR_CREDITS]: (
    state,
    { payload }
  ) => {
    const allItemsWithHRCredits = state.get("allItemsWithHRCredits");
    const indx =
      allItemsWithHRCredits &&
      allItemsWithHRCredits.rows &&
      allItemsWithHRCredits.rows.findIndex((item) => item.id === payload.id);

    const transformAllItemsWithHRCredits = {
      ...allItemsWithHRCredits,
    };

    if (indx >= 0) {
      transformAllItemsWithHRCredits.rows[indx] = {
        ...payload.data,
      };
    }

    return state.merge({
      allItemsWithHRCredits: transformAllItemsWithHRCredits,
    });
  },
  [myLearningConstants.LEARNING_LOADING]: (state, { payload }) => {
    return state.merge({
      loading: payload.loading,
    });
  },
  [myLearningConstants.SET_MORE_ALL_ITEMS_WITH_HR_CREDITS]: (
    state,
    { payload }
  ) => {
    const allItemsWithHRCredits = state.get("allItemsWithHRCredits");

    allItemsWithHRCredits.rows = [
      ...allItemsWithHRCredits.rows,
      ...(payload.items.rows || []),
    ];

    return state.merge({
      allItemsWithHRCredits,
      allItemsWithHRCreditsCurrentPage: payload.page,
    });
  },
  [myLearningConstants.SET_ALL_EVENT_VIDEOS]: (state, { payload }) => {
    return state.merge({
      allEventVideos: payload.videos,
    });
  },
};

export const initialState = () => {
  return Map({
    allSaved: {},
    allCompleted: {},
    allItemsWithHRCredits: {},
    allEventVideos: {},
    allItemsWithHRCreditsCurrentPage: 1,
    allEventVideosCurrentPage: 1,
    currentPage: 1,
    countOfResults: 0,
    loading: false,
  });
};

export default handleActions(reducers, initialState());
