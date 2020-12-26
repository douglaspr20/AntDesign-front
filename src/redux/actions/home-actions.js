// Action Types
export const SET_LOADING = "SET_LOADING";
export const SET_PLAN_UPDATED = "SET_PLAN_UPDATED";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const UPDATE_EVENTS = "UPDATE_EVENTS";
export const UPDATE_MY_EVENTS = "UPDATE_MY_EVENTS";
export const SET_SETTING_COLLAPSED = "SET_SETTING_COLLAPSED";

/* Home Page's Actions */

// Test Setter
export function setLoading(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: data,
    });
  };
}

export function setPlanUpdated(data) {
  return (dispatch) => {
    dispatch({
      type: SET_PLAN_UPDATED,
      payload: data,
    });
  };
}

export function updateUserInformation(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_INFO,
      payload: data,
    });
  };
}

export function updateEventData(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_EVENTS,
      payload: data,
    });
  };
}

export function updateMyEventData(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MY_EVENTS,
      payload: data,
    });
  };
}

export function setSettingCollapsed(data) {
  return (dispatch) => {
    dispatch({
      type: SET_SETTING_COLLAPSED,
      payload: data,
    })
  }
}
