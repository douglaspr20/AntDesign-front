// Action Type Imports
import { SET_LOADING } from "../actions/home-actions";

const initialState = {
  loading: false,
};
// Home Page's Reducer
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return { ...state };
  }
}
