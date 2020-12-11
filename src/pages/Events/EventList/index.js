import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";

import { DateAvatar, EventCard } from "components";
import { NoEventCard } from "components";

import "./style.scss";

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

const DataFormat = "YYYY.MM.DD hh:mm A";

const EventList = ({ data, ...rest }) => {
  const groupedByEventData = groupBy(data, "date");
  console.log("grup", groupedByEventData);

  return (
    <div {...rest} className="event-list">
      {data && data.length === 0 && <NoEventCard />}
      {Object.keys(groupedByEventData).map((date) => {
        const day = moment(date, DataFormat).date();
        const month = moment(date, DataFormat).month();
        return (
          <div className="event-list-batch" key={date}>
            <DateAvatar day={day} month={monthStr[month]} />
            <Row gutter={[0, 36]}>
              {groupedByEventData[date].map((event, index) => (
                <Col
                  key={`${date}-${index}`}
                  span={24}
                  className="event-list-item"
                >
                  <EventCard data={event} />
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

EventList.propTypes = {
  data: PropTypes.array,
};

EventList.defaultProps = {
  data: [],
};

export default EventList;
