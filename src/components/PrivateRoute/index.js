import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import isEmpty from "lodash/isEmpty";

import { setLoading, getUser } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { authSelector } from "redux/selectors/authSelector";

const PrivateRoute = ({
  id,
  loading,
  setLoading,
  isAuthenticated,
  accessToken,
  userProfile,
  getUser,
  ...props
}) => {
  const redirect = INTERNAL_LINKS.LOGIN;

  if (isAuthenticated && id && isEmpty(userProfile)) {
    getUser(id, accessToken);
  }

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: redirect,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  loading: homeSelector(state).loading,
  userProfile: homeSelector(state).userProfile,
  isAuthenticated: authSelector(state).isAuthenticated,
  accessToken: authSelector(state).accessToken,
  id: authSelector(state).id,
});

const mapDispatchToProps = {
  setLoading,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
