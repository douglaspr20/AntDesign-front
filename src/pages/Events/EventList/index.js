import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";
import { connect } from "react-redux";

import { DateAvatar, EventCard, CustomButton } from "components";
import { NoEventCard } from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES, SETTINGS, CARD_TYPE } from "enum";
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

const EventList = ({
  data,
  isMobile,
  onAttend,
  showFilter,
  onClick,
  edit,
  type,
  onMenuClick,
  onAddEvent,
  onConfirmAttendance,
  onConfirmCredit,
  userProfile,
  ...rest
}) => {
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

  const getRandomNumber = () => Math.floor(Math.random() * 1000);

  useEffect(() => {
    const groupedData = groupBy(
      data?.map((item) => ({ ...item, groupKey: item?.date?.slice(0, 10) })),
      "groupKey"
    );

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
      {data && data.length === 0 && type !== CARD_TYPE.EDIT && <NoEventCard />}
      {edit && type === CARD_TYPE.EDIT && (
        <div className="event-list-batch">
          <div />
          <EventCard
            className="add"
            type={CARD_TYPE.ADD}
            onClick={onAddEvent}
          />
        </div>
      )}
      {Object.keys(groupedByEventData).map((date) => {
        const day = moment(date, DataFormat).date();
        const month = moment(date, DataFormat).month();
        return (
          <div
            className="event-list-batch"
            key={`${date}-${getRandomNumber()}`}
          >
            <DateAvatar day={day} month={monthStr[month]} />
            <Row gutter={[0, 36]}>
              {groupedByEventData[date].map((event, index) => (
                <Col
                  key={`col-${date}-${getRandomNumber()}`}
                  span={24}
                  className="event-list-item"
                >
                  <EventCard
                    edit={edit}
                    data={event}
                    userProfile={userProfile}
                    onAttend={(going) => onEventChanged(event, going)}
                    onClick={onClick}
                    onMenuClick={(menu) => onMenuClick(menu, event)}
                    onConfirmAttendance={onConfirmAttendance}
                    onConfirmCredit={onConfirmCredit}
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
  edit: PropTypes.bool,
  type: PropTypes.string,
  onAttend: PropTypes.func,
  onClick: PropTypes.func,
  showFilter: PropTypes.func,
  onMenuClick: PropTypes.func,
  onAddEvent: PropTypes.func,
  onConfirmAttendance: PropTypes.func,
  onConfirmCredit: PropTypes.func,
  userProfile: PropTypes.object,
};

EventList.defaultProps = {
  data: [],
  edit: false,
  type: CARD_TYPE.VIEW,
  userProfile: {},
  onAttend: () => {},
  onClick: () => {},
  showFilter: () => {},
  onMenuClick: () => {},
  onAddEvent: () => {},
  onConfirmAttendance: () => {},
  onConfirmCredit: () => {},
};

const mapStateToProps = (state) => ({
  isMobile: envSelector(state).isMobile,
});

export default connect(mapStateToProps)(EventList);
