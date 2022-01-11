import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Headers
import {
  MainHeader,
  ArticleHeader,
  PrivateRoute,
  CertificateHeader,
  PublicHeader,
} from "components";
// Enum
import { INTERNAL_LINKS } from "enum";

class TopHeader extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          path={INTERNAL_LINKS.HOME}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <Route path={INTERNAL_LINKS.LOGIN} />
        <Route path={INTERNAL_LINKS.SIGNUP} />
        <Route path={INTERNAL_LINKS.JOIN} />
        <Route
          path={INTERNAL_LINKS.TERMSOFUSE}
          render={(props) => <PublicHeader {...props} />}
        />
        <Route
          path={INTERNAL_LINKS.PUBLIC_MARKETPLACE}
          render={(props) => <PublicHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.HEART}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.COUNCIL}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.COUNCIL}/resouce`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.BUSINESS_PARTNER}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.BUSINESS_PARTNER}/resource`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CLASSES}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.MICRO_CLASS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CHANNELS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CHANNELS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.LEARNING_LIBRARY}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.MENTORING}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.EVENTS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CERTIFICATIONS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.JOURNEY}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.HUB}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.PODCAST}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.FAVORITES}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.READ_LATER}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.MARKETPLACE}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.ARTICLE}/:id`}
          render={(props) => <ArticleHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.CERTIFICATE}/:id`}
          render={(props) => <CertificateHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.MICRO_CLASS_CERTIFICATE}/:id`}
          render={(props) => <CertificateHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.CONFERENCE_LIBRARY}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          exact
          path={`${INTERNAL_LINKS.MICRO_CONFERENCE}/:id`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_SPEAKERS}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTICIPANTS}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTNERS}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_BONFIRE}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_PERSONAL_AGENDA}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_RECOMMENDED_AGENDA}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_LEADERBOARD}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_MY_TALENT_MARKETPLACE_PROFILE}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          exact
          path={INTERNAL_LINKS.GLOBAL_CONFERENCE_TALENT_MARKETPLACE}
          render={(props) => <MainHeader {...props} />}
        />

        <PrivateRoute
          path={`${INTERNAL_LINKS.SPEAKERS}`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.PARTICIPANTS}/:idConference`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.LIVE}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.NOT_FOUND}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.NOTIFICATIONS}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.PODCAST_SERIES}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.POST}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.LIBRARY_ITEM}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.PROJECTX}`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.PROJECTX}/:id`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.MY_LEARNINGS}`}
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.SPONSOR_DASHBOARD}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={INTERNAL_LINKS.TALENT_MARKETPLACE}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <PrivateRoute
          path={`${INTERNAL_LINKS.TALENT_MARKETPLACE}/job-post/:id`}
          exact
          render={(props) => <MainHeader {...props} />}
        />
        <Route
          exact
          path={`${INTERNAL_LINKS.PUBLIC_EVENT}/:id`}
          render={(props) => <PublicHeader {...props} />}
        />
      </Switch>
    );
  }
}

export default TopHeader;
