import { createSelector } from "reselect";

const podcastDataSelector = (state) => state.podcast;

const resultSelector = createSelector(podcastDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allEpisodes: payload.get("allEpisodes"),
    countOfResults: payload.get("countOfResults"),
    currentPage: payload.get("currentPage"),
  };
});

export const podcastSelector = (state) => ({
  ...resultSelector(state),
});
