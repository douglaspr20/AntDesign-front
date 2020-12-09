import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { INTERNAL_LINKS } from "enum";
import { useAuth0 } from "@auth0/auth0-react";

import { setLoading } from "redux/actions/home-actions";

const PrivateRoute = ({ loading, setLoading, ...props }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const redirect = INTERNAL_LINKS.LOGIN;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isLoading) {
    return <div></div>;
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
  loading: state.home.loading,
});

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
