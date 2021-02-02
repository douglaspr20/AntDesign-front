import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
// Pages
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import PasswordRecoveryPage from "pages/PasswordRecovery";
import ResetPasswordPage from "pages/ResetPassword";
import HEARTPage from "pages/Heart";
import LearningLibraryPage from "pages/Library";
import ArticlePage from "pages/Article";
import FavouritePage from "pages/Favourites";
import EventsPage from "pages/Events";
import PodcastPage from "pages/Podcast";
import MentoringPage from "pages/Mentoring";
import CertificatePage from "pages/Certificate";
import PublicEventPage from "pages/PublicEvent";
import TermsOfUsePage from "pages/TermsOfUSe";
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
            exact
            path={INTERNAL_LINKS.LOGIN}
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            path={`${INTERNAL_LINKS.LOGIN}/:sentEmail`}
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.JOIN}
            render={(props) => <LoginPage signup={true} {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.SIGNUP}
            render={(props) => <SignupPage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.PASSWORD_RECOVERY}
            render={(props) => <PasswordRecoveryPage {...props} />}
          />
          <Route
            path={`${INTERNAL_LINKS.PUBLIC_EVENT}/:id`}
            render={(props) => <PublicEventPage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.RESET_PASSWORD}
            render={(props) => <ResetPasswordPage {...props} />}
          />
          <Route
            path={INTERNAL_LINKS.TERMSOFUSE}
            render={(props) => <TermsOfUsePage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.HEART}
            render={(props) => <HEARTPage {...props} />}
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
          <PrivateRoute
            path={INTERNAL_LINKS.PODCAST}
            render={(props) => <PodcastPage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.MENTORING}
            render={(props) => <MentoringPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.CERTIFICATE}/:id`}
            render={(props) => <CertificatePage {...props} />}
          />
          <Route component={NoPageFound} />
        </Switch>
      </Layout.Content>
    );
  }
}

export default Content;
