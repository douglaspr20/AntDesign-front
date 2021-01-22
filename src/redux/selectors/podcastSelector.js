import { createSelector } from "reselect";

const podcastDataSelector = (state) => state.podcast;

const resultSelector = createSelector(podcastDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allEpisodes: payload.get("allEpisodes"),
  };
});

export const podcastSelector = (state) => ({
  ...resultSelector(state),
});
