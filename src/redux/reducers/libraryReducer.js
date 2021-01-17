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
  [libraryConstants.SET_LIBRARY]: (state, { payload }) => {
    const allLibraries = state.get("allLibraries");
    let index = allLibraries.findIndex(
      (item) => item.id === payload.library.id
    );
    if (index >= 0) {
      allLibraries[index] = payload.library;
    } else {
      allLibraries.push(payload.library);
    }
    return state.merge({
      allLibraries: [...allLibraries],
      selectedLibrary: { ...payload.library },
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allLibraries: [],
    selectedLibrary: {},
  });

export default handleActions(reducers, initialState());
