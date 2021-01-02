import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";

import { setLoading } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { authSelector } from "redux/selectors/authSelector";

const PrivateRoute = ({ loading, setLoading, isAuthenticated, ...props }) => {
  const redirect = INTERNAL_LINKS.LOGIN;

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
  isAuthenticated: authSelector(state).isAuthenticated,
});

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
