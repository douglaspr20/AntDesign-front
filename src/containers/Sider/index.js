import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Sider
import { Sidebar } from "components";
// Enum
import { INTERNAL_LINKS } from "enum";

class Sider extends Component {
  render() {
    return (
      <Switch>
        <Route path={INTERNAL_LINKS.HOME} exact render={() => <Sidebar />} />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <Route
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={() => <Sidebar />}
        />
        <Route path={INTERNAL_LINKS.MENTORING} render={() => <Sidebar />} />
        <Route path={INTERNAL_LINKS.EVENTS} render={() => <Sidebar />} />
        <Route
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={() => <Sidebar />}
        />
        <Route path={INTERNAL_LINKS.HUB} render={() => <Sidebar />} />
        <Route path={INTERNAL_LINKS.FAVORITES} render={() => <Sidebar />} />
        <Route path={INTERNAL_LINKS.READ_LATER} render={() => <Sidebar />} />
      </Switch>
    );
  }
}

export default Sider;
