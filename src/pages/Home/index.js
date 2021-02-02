import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import ProfileStatusBar from "./ProfileStatusBar";
import { ArticleCard, CustomButton } from "components";
import { getRecommendations } from "redux/actions/library-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { librarySelector } from "redux/selectors/librarySelector";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const HomePage = ({ userProfile, recommendations, getRecommendations }) => {
  const onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  useEffect(() => {
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
      <div className="home-page-container">
        <Row gutter={16}>
          <Col lg={{ span: 16, offset: 4 }}>
            <h3 className="list-label">Our Recommendations</h3>
          </Col>
          {recommendations.map((article, index) => (
            <Col key={`article-${index}`} lg={{ span: 16, offset: 4 }}>
              <ArticleCard data={article} />
            </Col>
          ))}
        </Row>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
