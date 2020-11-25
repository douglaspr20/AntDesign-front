import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Headers
import TopNavBar from "components/TopNavBar";
// Enum
import { INTERNAL_LINKS } from "enum";

class TopHeader extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={INTERNAL_LINKS.HOME}
          exact
          render={(props) => <TopNavBar {...props} />}
        />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <Route
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.MENTORING}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.EVENTS}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.HUB}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.FAVORITES}
          render={(props) => <TopNavBar {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.READ_LATER}
          render={(props) => <TopNavBar {...props} />}
        />
      </Switch>
    );
  }
}

export default TopHeader;
