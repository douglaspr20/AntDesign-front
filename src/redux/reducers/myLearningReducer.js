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
    let newAllSaved = { ...allSaved };

    const filteredItem =
      newAllSaved[payload.item].filter((item) => item.id !== payload.data.id) ||
      -1;

    newAllSaved = {
      ...newAllSaved,
      [payload.item]: filteredItem,
    };

    return state.merge({
      allSaved: newAllSaved,
    });
  },
  [myLearningConstants.UPDATE_COMPLETED_LIBRARY]: (state, { payload }) => {
    const allCompleted = state.get("allCompleted");
    let newAllCompleted = { ...allCompleted };

    const index =
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
          ...newAllCompleted[payload.item],
          payload.data
        ],
      };
    }

    return state.merge({
      allCompleted: newAllCompleted,
    });
  },
};

export const initialState = () => {
  return Map({
    allSaved: {},
    allCompleted: {},
    currentPage: 1,
    countOfResults: 0,
    loading: false,
  });
};

export default handleActions(reducers, initialState());
