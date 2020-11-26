import React from "react";
import { Row, Col } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";

import ProfileStatusBar from "./ProfileStatusBar";
import { DateAvatar, EventCard } from "components";

import "./style.scss";

const DataFormat = "YYYY.MM.DD hh:mm A";
const EventsData = [
  {
    date: "2020.11.18 19:00 pm",
    title: "Meetup - How to improve your soft skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    actionType: "attend",
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    date: "2020.11.18 19:00 pm",
    title: "Meetup - Beers and HHRR after work",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    actionType: "going",
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    date: "2020.11.22 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    actionType: "attend",
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
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

class HomePage extends React.Component {
  render() {
    const groupedByEventData = groupBy(EventsData, "date");
    console.log("grup", groupedByEventData);

    return (
      <div className="home-page">
        <div className="home-page-profile">
          <Row gutter={16}>
            <Col lg={{ span: 16, offset: 4 }}>
              <ProfileStatusBar percent={90} />
            </Col>
          </Row>
        </div>
        <div className="home-page-container">
          <Row gutter={16}>
            <Col lg={{ span: 16, offset: 4 }}>
              <div className="d-flex justify-between">
                <h3 className="text-bold">Events</h3>
                <h3 className="color-primary view_all_events">
                  View all events
                </h3>
              </div>
            </Col>
          </Row>
          {Object.keys(groupedByEventData).map((date) => {
            const day = moment(date, DataFormat).date();
            const month = moment(date, DataFormat).month();
            return (
              <div className="event-card-group" key={date}>
                <Row gutter={16}>
                  <Col lg={{ span: 2, offset: 4 }}>
                    <DateAvatar day={day} month={monthStr[month]} />
                  </Col>
                  <Col lg={{ span: 14 }}>
                    <Row gutter={18}>
                      {groupedByEventData[date].map((event, index) => (
                        <Col
                          key={`${date}-${index}`}
                          span={24}
                          className="event-card-item"
                        >
                          <EventCard data={event} />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
