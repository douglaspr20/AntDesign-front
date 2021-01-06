import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Headers
import {
  MainHeader,
  ArticleHeader,
  PrivateRoute,
  CertificateHeader,
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
          path={INTERNAL_LINKS.HUB}
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
