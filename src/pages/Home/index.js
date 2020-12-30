import React from "react";
import { Row, Col } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { INTERNAL_LINKS } from "enum";
import ProfileStatusBar from "./ProfileStatusBar";
import { DateAvatar, EventCard, ArticleCard, CustomButton } from "components";
import { updateEventData } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const DataFormat = "YYYY.MM.DD hh:mm A";

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

const monthStr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const HomePage = ({ userProfile, events, updateEventData }) => {
  const groupedByEventData = groupBy(events || [], "date");

  const onEventChanged = (event, going) => {
    let newEvents = events;
    const index = newEvents.findIndex((item) => item.id === event.id);
    if (index >= 0) {
      newEvents[index] = { ...event, going };
      updateEventData(events);
    }
  };

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
          <Col span={24} lg={{ span: 16, offset: 4 }}>
            <div className="d-flex justify-between">
              <h3 className="font-bold">Events</h3>
              <NavLink to={INTERNAL_LINKS.EVENTS}>
                <h3 className="color-primary view_all_events">
                  View all events
                </h3>
              </NavLink>
            </div>
          </Col>
        </Row>
        {Object.keys(groupedByEventData).map((date) => {
          const day = moment(date, DataFormat).date();
          const month = moment(date, DataFormat).month();
          return (
            <div className="event-card-group" key={date}>
              <Row gutter={[16, 20]}>
                <Col span={24} md={{ span: 2 }} lg={{ span: 2, offset: 4 }}>
                  <div className="d-flex justify-center items-center">
                    <DateAvatar day={day} month={monthStr[month]} />
                  </div>
                </Col>
                <Col
                  span={24}
                  md={{ span: 21, offset: 1 }}
                  lg={{ span: 14, offset: 0 }}
                >
                  <Row gutter={18}>
                    {groupedByEventData[date].map((event, index) => (
                      <Col
                        key={`${date}-${index}`}
                        span={24}
                        className="event-card-item"
                      >
                        <EventCard
                          data={event}
                          onAttend={(going) => onEventChanged(event, going)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          );
        })}
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
  events: homeSelector(state).events,
});

const mapDispatchToProps = {
  updateEventData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
