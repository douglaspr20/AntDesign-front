import { createSelector } from "reselect";

const speakerSelector = (state) => state.speakers;

const resultSelector = createSelector(speakerSelector, (payload) => {
  return {
    allPanelSpeakers: payload.get("allPanelSpeakers"),
    allUserSpeakers: payload.get("allUserSpeakers"),
    allPanelsOfOneUser: payload.get("allPanelsOfOneUser"),
    bulRegister: payload.get("bulRegister"),
    allSponsors: payload.get("allSponsors"),
  };
});

export const speakerAllPanelSpeakerSelector = (state) => ({
  ...resultSelector(state),
});