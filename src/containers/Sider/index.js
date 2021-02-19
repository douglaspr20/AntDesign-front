import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Sider
import { Sidebar, PrivateRoute } from "components";
// Enum
import { INTERNAL_LINKS } from "enum";

class Sider extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path={INTERNAL_LINKS.HOME} exact render={() => <Sidebar />} />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <PrivateRoute
          path={INTERNAL_LINKS.HEART}
          render={() => <Sidebar />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={() => <Sidebar />}
        />
        <PrivateRoute path={INTERNAL_LINKS.MENTORING} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.EVENTS} render={() => <Sidebar />} />
        <PrivateRoute
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={() => <Sidebar />}
        />
        <PrivateRoute path={INTERNAL_LINKS.JOURNEY} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.JOURNEY_FORM} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.HUB} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.PODCAST} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.FAVORITES} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.READ_LATER} render={() => <Sidebar />} />
        <PrivateRoute path={INTERNAL_LINKS.MARKETPLACE} render={() => <Sidebar />} />
      </Switch>
    );
  }
}

export default Sider;
