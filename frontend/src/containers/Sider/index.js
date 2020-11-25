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
      </Switch>
    );
  }
}

export default Sider;
