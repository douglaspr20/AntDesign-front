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
      </Switch>
    );
  }
}

export default TopHeader;
