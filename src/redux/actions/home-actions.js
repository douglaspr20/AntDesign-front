// Action Types
export const SET_LOADING = "SET_LOADING";
export const SET_PLAN_UPDATED = "SET_PLAN_UPDATED";

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
