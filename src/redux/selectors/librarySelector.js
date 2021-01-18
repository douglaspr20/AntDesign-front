import { createSelector } from "reselect";

const libraryDataSelector = (state) => state.library;

const resultSelector = createSelector(libraryDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allLibraries: payload.get("allLibraries"),
    error: payload.get("error"),
    selectedLibrary: payload.get("selectedLibrary"),
    countOfResults: payload.get("countOfResults"),
    currentPage: payload.get("currentPage"),
    recommendations: payload.get("recommendations"),
  };
});

export const librarySelector = (state) => ({
  ...resultSelector(state),
});
