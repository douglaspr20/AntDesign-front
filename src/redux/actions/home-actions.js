// Action Types
export const SET_LOADING = "SET_LOADING";

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
