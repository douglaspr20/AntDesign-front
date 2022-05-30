import { handleActions } from "redux-actions";

// Action Type Imports
import { constants as speakerConstans } from "redux/actions/speaker-actions";
import { Map } from "immutable";

export const reducers = {
    [speakerConstans.UPDATE_PANEL_SPEAKERS]: (state, { payload }) => {
        return state.merge({
          allPanelSpeakers: payload.panelsSpeakers,
        });
      },
    [speakerConstans.UPDATE_USERS_SPEAKERS]: (state, { payload }) => {
      return state.merge({
        allUserSpeakers: payload.userSpeakers,
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
  