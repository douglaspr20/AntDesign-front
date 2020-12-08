// Action Type Imports
import { SET_LOADING, SET_PLAN_UPDATED } from "../actions/home-actions";

const initialState = {
  loading: false,
  planUpdated: false,
};
// Home Page's Reducer
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PLAN_UPDATED:
      return {
        ...state,
        planUpdated: action.payload,
      };
    default:
      return { ...state };
  }
}
