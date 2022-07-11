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
    [speakerConstans.UPDATE_USERS_SPEAKERS]: (state, { payload }) => {
      const {userSpeakers} = payload
      
      return state.merge({
        allUserSpeakers: userSpeakers,
      })
    },
    [speakerConstans.UPDATE_ALL_PANELS_OF_ONE_USER]: (state, {payload}) => {
      const {userSpeakers} = payload
      
      return state.merge({
        allPanelsOfOneUser: userSpeakers
      })
    },
    [speakerConstans.SET_BUL_REGISTER]: (state, {payload}) => {
      const {bul} = payload
      
      return state.merge({
        bulRegister: bul
      })
    },
    [speakerConstans.UPDATE_ALL_SPONSOR_2023]: (state, {payload}) => {
      const {sponsor} = payload

      return state.merge({
        allSponsors: sponsor,
      })
    }, 
  };
  
  export const initialState = () =>
    Map({
        allPanelSpeakers: [],
        allUserSpeakers: [],
        bulRegister: false,
        allSponsors: [],
    }
  );

  export default handleActions(reducers, initialState());
  