import { handleActions } from "redux-actions";
import { convertToLocalTime} from "utils/format";

// Action Type Imports
import { constants as speakerConstans } from "redux/actions/speaker-actions";
import { Map } from "immutable";

export const reducers = {
    [speakerConstans.UPDATE_PANEL_SPEAKERS]: (state, { payload }) => {
      const {panelsSpeakers} = payload

      let arrayFixed = []
      let num = -1
      let titlesDateReady

      if(panelsSpeakers.panelsSpeakers !== undefined){

        const arrayOrderTime = panelsSpeakers.panelsSpeakers.sort((a,b) => {

          let aTime = convertToLocalTime(a.startDate,a.timeZone).format("YYYY.MMDDHHss")
          let bTime = convertToLocalTime(b.startDate,b.timeZone).format("YYYY.MMDDHHss")

          return Number(bTime) - Number(aTime)

        })

        for(let i = 0; i < arrayOrderTime.length ; i++ ){
            let dateNow = arrayOrderTime[i].startDate
            let timezone = arrayOrderTime[i].timeZone
            if((titlesDateReady !== convertToLocalTime(dateNow,timezone).format().substring(0,10))){
                titlesDateReady = convertToLocalTime(dateNow,timezone).format().substring(0,10)
                num++
                if(!arrayFixed[num]){
                  arrayFixed.push([])
                }
                arrayFixed[num].push(arrayOrderTime[i])
            }else{
              arrayFixed[num].push(arrayOrderTime[i])
            }
            
        }
      }

      return state.merge({
        allPanelSpeakers: panelsSpeakers,
        allPanelSpeakersFormat: arrayFixed,
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

      let arrayFixed= []
      let num = -1
      let titlesDateReady

      if(userSpeakers !== undefined){
        const arrayOrderTime = userSpeakers.sort((a,b) => {

          let aTime = convertToLocalTime(a.startDate,a.timeZone).format("YYYY.MMDDHHss")
          let bTime = convertToLocalTime(b.startDate,b.timeZone).format("YYYY.MMDDHHss")

          return Number(bTime) - Number(aTime)

        })

        for(let i = 0; i < arrayOrderTime.length ; i++ ){
          let dateNow = arrayOrderTime[i].startDate
          let timezone = arrayOrderTime[i].timeZone
          if((titlesDateReady !== convertToLocalTime(dateNow,timezone).format().substring(0,10))){
              titlesDateReady = convertToLocalTime(dateNow,timezone).format().substring(0,10)
              num++
              arrayFixed.push([])
              arrayFixed[num].push(arrayOrderTime[i])
          }else{
            arrayFixed[num].push(arrayOrderTime[i])
          }
        }
      }
    
      return state.merge({
        allPanelsOfOneUser: userSpeakers,
        allPanelsOfOneUserFormat: arrayFixed
      })
    },
    [speakerConstans.SET_BUL_REGISTER]: (state, {payload}) => {
      const {bul} = payload
      
      return state.merge({
        bulRegister: bul
      })
    },
    [speakerConstans.SET_ACTIVE_BUTTON]: (state, {payload}) => {
      const {bul} = payload
      
      return state.merge({
        activeButton: bul
      })
    },
    [speakerConstans.UPDATE_ALL_SPONSOR_2023]: (state, {payload}) => {
      const {sponsor} = payload

      return state.merge({
        allSponsors: sponsor,
      })
    }, 
    [speakerConstans.UPDATE_PARRAF]: (state, {payload}) => {
      const {parraf} = payload

      return state.merge({
        allParrafs: parraf.parraf,
      })
    }, 
  };
  
  export const initialState = () =>
    Map({
        allPanelSpeakers: [],
        allUserSpeakers: [],
        bulRegister: false,
        allSponsors: [],
        activeButton: false,
        allParrafs: [],
        allPanelsOfOneUserFormat: [],
        allPanelSpeakersFormat: []
    }
  );

  export default handleActions(reducers, initialState());
  