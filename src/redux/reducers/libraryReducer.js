import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as libraryConstants } from "../actions/library-actions";

// Events's Reducer
export const reducers = {
  [libraryConstants.SET_ALL_LIBRARIES]: (state, { payload }) => {
    return state.merge({
      allLibraries: cloneDeep([...payload.libraries]),
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allLibraries: [],
  });

export default handleActions(reducers, initialState());
