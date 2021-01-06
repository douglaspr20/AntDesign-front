import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import ProfileStatusBar from "./ProfileStatusBar";
import { ArticleCard, CustomButton } from "components";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const ArticlesData = [
  {
    title: "We want to show you the most relevan information for you",
    desc:
      "Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    file: "",
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    article: 1,
  },
  {
    title:
      "We want to show you the most relevan information for you the most relevan information for you",
    desc:
      "Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra",
    file: "",
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    articl: 1,
  },
];

const HomePage = ({ userProfile }) => {
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
            <h3 className="list-label">Recommended of the month</h3>
          </Col>
          {ArticlesData.map((article, index) => (
            <Col key={`article-${index}`} lg={{ span: 16, offset: 4 }}>
              <ArticleCard data={article} />
            </Col>
          ))}
        </Row>
        <Row gutter={16}>
          <Col lg={{ span: 16, offset: 4 }}>
            <h3 className="list-label">Recommended For you</h3>
          </Col>
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
                    Access to the best HHRR information library and boost your
                    potential
                  </h2>
                  <CustomButton
                    text="Upgrade"
                    type="primary"
                    size="xl"
                    className="recommend-card-upgrade"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
