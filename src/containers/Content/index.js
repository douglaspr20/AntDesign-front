import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
// Pages
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import NoPageFound from "pages/NoPageFound";
// Enum
import { INTERNAL_LINKS } from "enum";

class Content extends Component {
  render() {
    return (
      <Layout.Content>
        <Switch>
          <Route
            path={INTERNAL_LINKS.HOME}
            exact
            render={(props) => <HomePage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.LOGIN}
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.SIGNUP}
            render={(props) => <SignupPage {...props} />}
          />
          <Route component={NoPageFound} />
        </Switch>
      </Layout.Content>
    );
  }
}

export default Content;
