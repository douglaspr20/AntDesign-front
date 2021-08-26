import { handleActions } from "redux-actions";
import { Map } from "immutable";

// Action Type Imports
import { constants as postConstants } from "../actions/post-actions";

// Events's Reducer
export const reducers = {
  [postConstants.SET_POST]: (state, { payload }) => {
    return state.merge({ post: payload.post });
  },
  [postConstants.SET_POSTS]: (state, { payload }) => {
    return state.merge({ posts: payload.posts });
  },
};

export const initialState = () =>
  Map({
    posts: [],
    post: {},
  });

export default handleActions(reducers, initialState());
