import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Headers
import { MainHeader } from "components";
// Enum
import { INTERNAL_LINKS } from "enum";

class TopHeader extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={INTERNAL_LINKS.HOME}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <Route
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.MENTORING}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.EVENTS}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.HUB}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.FAVORITES}
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.READ_LATER}
          render={(props) => <MainHeader {...props} />}
        />
      </Switch>
    );
  }
}

export default TopHeader;
