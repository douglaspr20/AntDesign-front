import { createSelector } from "reselect";

const myLearningDataSelector = (state) => state.myLearning;

const resultSelector = createSelector(myLearningDataSelector, (payload) => {
  return {
    allSaved: payload.get("allSaved"),
    allCompleted: payload.get("allCompleted"),
    countOfResults: payload.get("countOfResults"),
    currentPage: payload.get("currentPage"),
    loading: payload.get("loading"),
  };
});

export const myLearningSelector = (state) => ({
  ...resultSelector(state)
})
