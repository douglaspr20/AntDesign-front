import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import queryString from "query-string";

import ProfileStatusBar from "./ProfileStatusBar";
import HomeRecommendationsColumn from "./Column";
import { CustomButton } from "components";
import { getUser } from "redux/actions/home-actions";
import { getRecommendations } from "redux/actions/library-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { librarySelector } from "redux/selectors/librarySelector";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const HomePage = ({
  history,
  location,
  userProfile,
  recommendations,
  getRecommendations,
  getUser,
}) => {
  const onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  useEffect(() => {
    const { success } = queryString.parse(location.search);
    if (success === 1) {
      getUser();
    }

    getRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      {userProfile && userProfile.percentOfCompletion !== 100 && (
        <div className="home-page-profile">
          <Row gutter={16}>
            <Col span={24} lg={{ span: 16, offset: 4 }}>
              <ProfileStatusBar
                percent={userProfile ? userProfile.percentOfCompletion : 0}
              />
            </Col>
          </Row>
        </div>
      )}
      <div className="home-page-container-recommendations">
        <HomeRecommendationsColumn
          history={history}
          items={recommendations.podcasts}
          type="podcast"
          columnTitle="Podcast"
        />
        <HomeRecommendationsColumn
          history={history}
          items={recommendations.conferenceLibrary}
          type="conference"
          columnTitle="Conference Library"
        />
        <HomeRecommendationsColumn
          history={history}
          items={recommendations.libraries}
          type="library"
          columnTitle="Learning Library"
        />
        <HomeRecommendationsColumn
          history={history}
          items={recommendations.events}
          type="event"
          columnTitle="Upcoming Events"
        />
      </div>
      <div className="home-page-container">
        {userProfile && userProfile.memberShip === "free" && (
          <Row gutter={16}>
            <Col lg={{ span: 16, offset: 4 }}>
              <div className="recommend-card">
                <Row gutter={16}>
                  <Col
                    span={24}
                    offset={0}
                    md={{ span: 14, offset: 5 }}
                    className="d-flex flex-column items-center"
                  >
                    <h2 className="recommend-card-label">
                      Upgrade to a PREMIUM Membership and get unlimited access
                      to the LAB features
                    </h2>
                    <CustomButton
                      text="Upgrade"
                      type="primary"
                      size="xl"
                      className="recommend-card-upgrade"
                      onClick={onUpgrade}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
  recommendations: librarySelector(state).recommendations,
});

const mapDispatchToProps = {
  getRecommendations,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
