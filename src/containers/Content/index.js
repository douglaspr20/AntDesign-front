import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
// Pages
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import LearningLibraryPage from "pages/Library";
import ArticlePage from "pages/Article";
import FavouritePage from "pages/Favourites";
import EventsPage from "pages/Events";
import NoPageFound from "pages/NoPageFound";
// Enum
import { INTERNAL_LINKS } from "enum";

import { PrivateRoute } from "components";

class Content extends Component {
  render() {
    return (
      <Layout.Content>
        <Switch>
          <PrivateRoute
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
          <PrivateRoute
            path={INTERNAL_LINKS.LEARNING_LIBRARY}
            render={(props) => <LearningLibraryPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.ARTICLE}/:id`}
            render={(props) => <ArticlePage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.FAVORITES}
            render={(props) => <FavouritePage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.EVENTS}
            render={(props) => <EventsPage {...props} />}
          />
          <Route component={NoPageFound} />
        </Switch>
      </Layout.Content>
    );
  }
}

export default Content;
