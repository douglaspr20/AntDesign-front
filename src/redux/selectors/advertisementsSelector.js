import { createSelector } from "reselect";

const advertisementDataSelector = (state) => state.advertisement;

const resultSelector = createSelector(advertisementDataSelector, (payload) => ({
  advertisementsByPage: payload.get("advertisementsByPage"),
  advertisementsByAdvertiser: payload.get("advertisementsByAdvertiser"),
}));

export const advertisementSelector = (state) => ({
  ...resultSelector(state),
});
