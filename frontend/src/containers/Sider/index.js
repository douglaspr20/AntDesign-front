import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Sider
import NavBar from "components/NavBar";
// Enum
import { INTERNAL_LINKS } from "enum";

class Sider extends Component {
  render() {
    return (
      <Switch>
        <Route path={INTERNAL_LINKS.HOME} exact render={() => <NavBar />} />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
      </Switch>
    );
  }
}

export default Sider;
