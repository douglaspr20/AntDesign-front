import { handleActions } from "redux-actions";
import { Map } from "immutable";

// Action Type Imports
import { constants as postConstants } from "../actions/post-actions";

// Events's Reducer
export const reducers = {
  [postConstants.SET_POST]: (state, { payload }) => {
    return state.merge({ post: payload.post });
  },
};

export const initialState = () =>
  Map({
    post: {},
  });

export default handleActions(reducers, initialState());
