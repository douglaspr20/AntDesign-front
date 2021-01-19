import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";
import { connect } from "react-redux";

import { DateAvatar, EventCard, CustomButton } from "components";
import { NoEventCard } from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES, SETTINGS } from "enum";
import { envSelector } from "redux/selectors/envSelector";

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

const DataFormat = SETTINGS.DATE_FORMAT;

const EventList = ({ data, isMobile, onAttend, showFilter, onClick, ...rest }) => {
  const [groupedByEventData, setGroupedByEventData] = useState({});

  const onEventChanged = (event, going) => {
    event.going = going;
    onAttend(event);
  };

  const onShowFilter = () => {
    if (isMobile) {
      Emitter.emit(EVENT_TYPES.OPEN_EVENT_FILTER_DRAWER);
    } else {
      showFilter();
    }
  };

  useEffect(() => {
    const groupedData = groupBy(data, "date");

    setGroupedByEventData({ ...groupedData });
  }, [data]);

  return (
    <div className="event-list">
      <div className="event-list-filters">
        <CustomButton
          className="event-list-filters-btn"
          text="Filters"
          type="primary outlined"
          size="lg"
          onClick={onShowFilter}
        />
      </div>
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
                  <EventCard
                    data={event}
                    onAttend={(going) => onEventChanged(event, going)}
                    onClick={onClick}
                  />
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
  onAttend: PropTypes.func,
  onClick: PropTypes.func,
  showFilter: PropTypes.func,
};

EventList.defaultProps = {
  data: [],
  onAttend: () => {},
  onClick: () => {},
  showFilter: () => {},
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

export default connect(mapStateToProps)(EventList);
