import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";

import { setLoading } from "redux/actions/home-actions";

const PrivateRoute = ({ loading, setLoading, ...props }) => {
  const redirect = INTERNAL_LINKS.LOGIN;

  const isAuthenticated = true;

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
  loading: state.home.loading,
});

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
