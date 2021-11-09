import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import ReactGA from 'react-ga';

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
import MicroClassCertificatePage from "pages/MicroClassCertificate";
import ClassesPage from "pages/Classes";
import MicroClassPage from "pages/MicroClass";
import JourneyPage from "pages/Journey";
import PublicEventPage from "pages/PublicEvent";
import TermsOfUsePage from "pages/TermsOfUSe";
import MarketplacePage from "pages/Marketplace";
import NoPageFound from "pages/NoPageFound";
import ConferenceLibrary from "pages/ConferenceLibrary";
import ChannelsPage from "pages/Channels";
import ChannelPage from "pages/Channel";
import NotificationPage from "pages/Notification";
import GlobalConferencePage from "pages/GlobalConference";
import SpeakersPage from "pages/Speakers";
import ParticipantsPage from "pages/Participants";
import LivePage from "pages/Live";
import PodcastSeriesPage from "pages/PodcastSeries";
import PodcastSeriesDetailPage from "pages/PodcastSeriesDetail";
import PostPage from "pages/Post";
import LibraryItemPage from "pages/LibraryItem";
// Enum
import { INTERNAL_LINKS } from "enum";

import { PrivateRoute } from "components";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Content extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    this.props.history.listen((location) => {
      ReactGA.pageview(location.pathname);
    }).bind(this);
  }

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
            path={INTERNAL_LINKS.PUBLIC_MARKETPLACE}
            render={(props) => <MarketplacePage {...props} />}
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
            path={INTERNAL_LINKS.CLASSES}
            render={(props) => <ClassesPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.MICRO_CLASS}/:id`}
            render={(props) => <MicroClassPage {...props} />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.CHANNELS}
            render={(props) => <ChannelsPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.CHANNELS}/:id`}
            render={(props) => <ChannelPage {...props} />}
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
          <PrivateRoute
            path={`${INTERNAL_LINKS.MICRO_CLASS_CERTIFICATE}/:id`}
            render={(props) => <MicroClassCertificatePage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.JOURNEY}
            render={(props) => <JourneyPage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.MARKETPLACE}
            render={(props) => <MarketplacePage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.CONFERENCE_LIBRARY}
            render={(props) => <ConferenceLibrary {...props} />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.PODCAST_SERIES}
            render={(props) => <PodcastSeriesPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.PODCAST_SERIES}/:id`}
            render={(props) => <PodcastSeriesDetailPage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.NOT_FOUND}
            render={(props) => <NoPageFound {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.NOTIFICATIONS}
            render={(props) => <NotificationPage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE}
            render={(props) => <GlobalConferencePage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.SPEAKERS}`}
            render={(props) => <SpeakersPage {...props} />}
          />

          <PrivateRoute
            path={`${INTERNAL_LINKS.PARTICIPANTS}/:idConference`}
            render={(props) => <ParticipantsPage {...props} />}
          />
          <PrivateRoute
            path={INTERNAL_LINKS.LIVE}
            render={(props) => <LivePage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.POST}/:id/:edit?`}
            render={(props) => <PostPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.LIBRARY_ITEM}/:type/:id`}
            render={(props) => <LibraryItemPage {...props} />}
          />
          <Route
            exact
            path={`${INTERNAL_LINKS.PUBLIC_EVENT}/:id`}
            render={(props) => <PublicEventPage {...props} />}
          />
          <Route component={NoPageFound} />
        </Switch>
      </Layout.Content>
    );
  }
}

export default withRouter(Content);
