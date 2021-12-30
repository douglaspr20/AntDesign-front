import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import ReactGA from "react-ga";

// Pages
import HomePage from "pages/Home";
import CouncilPage from "pages/Council";
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
import GlobalConferenceSpeakersPage from "pages/GlobalConference/Speakers";
import GlobalConferenceParticipantsPage from "pages/GlobalConference/Participants";
import GlobalConferencePartnersPage from "pages/GlobalConference/Partners";
import GlobalConferenceBonfiressPage from "pages/GlobalConference/Bonfire";
import GlobalConferencePersonalAgendaPage from "pages/GlobalConference/PersonalAgenda";
import GlobalConferenceLeaderboardPage from "pages/GlobalConference/ConferenceLeaderboard";
import GlobalConferenceMyTalentMarketplaceProfilePage from "pages/GlobalConference/MyTalentMarketplaceProfile";
import GlobalConferenceTalentMarketplacePage from "pages/GlobalConference/TalentMarketplace";
import SpeakersPage from "pages/Speakers";
import ParticipantsPage from "pages/Participants";
import LivePage from "pages/Live";
import PodcastSeriesPage from "pages/PodcastSeries";
import PodcastSeriesDetailPage from "pages/PodcastSeriesDetail";
import PostPage from "pages/Post";
import LibraryItemPage from "pages/LibraryItem";
import SkillCohortPage from "pages/SkillCohort";
import SkillCohortDetailPage from "pages/SkillCohortDetail";
import SkillCohortResourcePage from "pages/SkillCohortResources";
import MyLearningPage from "pages/Learnings";
import CouncilConversationsCard from "pages/Council/CouncilConversationsCard";
import SponsorDashboardPage from "pages/SponsorDashboard";

// Enum
import { INTERNAL_LINKS } from "enum";

import { PrivateRoute } from "components";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { injectIntl } from "react-intl";

import { homeSelector } from "redux/selectors/homeSelector";

class Content extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    this.props.history
      .listen((location) => {
        ReactGA.pageview(location.pathname);
      })
      .bind(this);
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
            exact
            path={`${INTERNAL_LINKS.INVITATION}/:hostUserId/:email`}
            render={(props) => (
              <LoginPage signup={true} isInvitation={true} {...props} />
            )}
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
            path={INTERNAL_LINKS.COUNCIL}
            render={(props) => <CouncilPage {...props} />}
          />
          <PrivateRoute
            exact
            path={`${INTERNAL_LINKS.COUNCIL}/resource`}
            render={(props) => <CouncilConversationsCard {...props} />}
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
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE}
            render={(props) => <GlobalConferencePage {...props} />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_SPEAKERS}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceSpeakersPage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTICIPANTS}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceParticipantsPage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTNERS}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferencePartnersPage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_BONFIRE}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceBonfiressPage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PERSONAL_AGENDA}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferencePersonalAgendaPage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_LEADERBOARD}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceLeaderboardPage {...props} />
              </GlobalConferencePage>
            )}
          />
          <PrivateRoute
            exact
            path={
              INTERNAL_LINKS.GLOBAL_CONFERENCE_MY_TALENT_MARKETPLACE_PROFILE
            }
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceMyTalentMarketplaceProfilePage {...props} />
              </GlobalConferencePage>
            )}
          />

          <PrivateRoute
            exact
            path={INTERNAL_LINKS.GLOBAL_CONFERENCE_TALENT_MARKETPLACE}
            render={(props) => (
              <GlobalConferencePage {...props}>
                <GlobalConferenceTalentMarketplacePage {...props} />
              </GlobalConferencePage>
            )}
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
          <PrivateRoute
            exact
            path={`${INTERNAL_LINKS.PROJECTX}/:id`}
            render={(props) => <SkillCohortDetailPage {...props} />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.PROJECTX}
            render={(props) => <SkillCohortPage {...props} />}
          />
          <PrivateRoute
            path={`${INTERNAL_LINKS.LIBRARY_ITEM}/:type/:id`}
            render={(props) => <LibraryItemPage {...props} />}
          />
          {this.props.userProfile.memberShip === "premium" && (
            <Route
              exact
              path={`${INTERNAL_LINKS.PROJECTX}/:id/resources`}
              render={(props) => <SkillCohortResourcePage {...props} />}
            />
          )}
          <PrivateRoute
            exact
            path={`${INTERNAL_LINKS.MY_LEARNINGS}`}
            render={(props) => <MyLearningPage {...props} />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.SPONSOR_DASHBOARD}
            render={(props) => <SponsorDashboardPage {...props} />}
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

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default withRouter(connect(mapStateToProps)(injectIntl(Content)));
