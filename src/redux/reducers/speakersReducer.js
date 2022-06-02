import { handleActions } from "redux-actions";

// Action Type Imports
import { constants as speakerConstans } from "redux/actions/speaker-actions";
import { Map } from "immutable";

export const reducers = {
    [speakerConstans.UPDATE_PANEL_SPEAKERS]: (state, { payload }) => {
      const {panelsSpeakers} = payload

      return state.merge({
        allPanelSpeakers: panelsSpeakers,
      });
    },
    [speakerConstans.UPDATE_ADD_PANEL_SPEAKERS]: (state, { payload }) => {
      const {panelsSpeakers} = payload
      const speakers = state.get("allPanelSpeakers");

      return state.merge({
        allPanelSpeakers: [speakers, panelsSpeakers],
      });
    },
    [speakerConstans.UPDATE_USERS_SPEAKERS]: (state, { payload }) => {
      const {userSpeakers} = payload
      
      return state.merge({
        allUserSpeakers: userSpeakers,
      })
    }
  };
  
  export const initialState = () =>
    Map({
        allPanelSpeakers: [],
        allUserSpeakers: []
    }
  );

  export default handleActions(reducers, initialState());
  