import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Headers
import {
  MainHeader,
  ArticleHeader,
  PrivateRoute,
  CertificateHeader,
  PublicHeader,
} from "components";
// Enum
import { INTERNAL_LINKS } from "enum";

class TopHeader extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          path={INTERNAL_LINKS.HOME}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <Route
          path={INTERNAL_LINKS.PUBLIC_EVENT}
          render={(props) => <PublicHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.TERMSOFUSE}
          render={(props) => <PublicHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.PUBLIC_MARKETPLACE}
          render={(props) => <PublicHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.HEART}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.MENTORING}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.EVENTS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.JOURNEY}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.HUB}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.PODCAST}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.FAVORITES}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.READ_LATER}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.MARKETPLACE}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.ARTICLE}/:id`}
          render={(props) => <ArticleHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.CERTIFICATE}/:id`}
          render={(props) => <CertificateHeader {...props} />}
        />
      </Switch>
    );
  }
}

export default TopHeader;
