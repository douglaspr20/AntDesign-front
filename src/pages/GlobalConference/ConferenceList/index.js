import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CustomSelect, AnnualConferenceCard } from "components";
import { CONFERENCE_SETTING, TIMEZONE_LIST } from "enum";

import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { addSession } from "redux/actions/home-actions";
import { convertToCertainTime } from "utils/format";

import "./style.scss";

const SessionType = [
  {
    text: "All Sessions",
    value: "all",
  },
  ...CONFERENCE_SETTING.SESSION_TYPE,
];

const ConferenceList = ({ data, allCategories, userProfile, addSession }) => {
  const [sortTheme, setSortTheme] = useState("main");
  const [sortCategory, setSortCategory] = useState("all");
  const [sortSessionType, setSortSessionType] = useState("all");
  const [categoryOptions, setCategoryOptions] = useState([
    {
      text: "All Categories",
      value: "all",
    },
  ]);
  const [sessionData, setSessionData] = useState([]);

  const onAddSession = (session) => {
    addSession(session);
  };

  useEffect(() => {
    if (data) {
      setSessionData(
        (data || []).map((item) => {
          const sTime = convertToCertainTime(item.startTime, item.timezone);
          const eTime = convertToCertainTime(item.endTime, item.timezone);
          let tz = TIMEZONE_LIST.find((t) => t.value === item.timezone);
          if (tz) {
            if (tz.offset > 0) {
              tz = `${tz.abbr} (GMT+${tz.offset})`;
            } else if (tz.offset < 0) {
              tz = `${tz.abbr} (GMT-${-tz.offset})`;
            } else {
              tz = `${tz.abbr} (GMT)`;
            }
          } else {
            tz = "";
          }

          return {
            ...item,
            date: sTime.format("MMM, D, YYYY"),
            period: `From ${sTime.format("h:mm a")} to ${eTime.format(
              "h:mm a"
            )} ${tz}`,
          };
        })
      );
    } else {
      setSessionData([]);
    }
  }, [data]);

  useEffect(() => {
    setCategoryOptions([
      {
        text: "All Categories",
        value: "all",
      },
      ...allCategories.map((category) => ({
        text: category.title,
        value: category.value,
      })),
    ]);
  }, [allCategories]);

  return (
    <div className="conference-list">
      <div className="conference-list-header">
        <h3>{`${data.length} talk${data.length === 1 ? "" : "s"}`}</h3>
        <div className="conference-list-header-select">
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={[{ value: "main", text: "Main theme" }]}
            value={sortTheme}
            onChange={setSortTheme}
          />
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={categoryOptions}
            value={sortCategory}
            onChange={setSortCategory}
          />
          <CustomSelect
            className="conference-list-header-sort"
            bordered={false}
            options={SessionType}
            value={sortSessionType}
            onChange={setSortSessionType}
          />
        </div>
      </div>
      <div className="conference-list-container">
        {sessionData.map((session, index) => (
          <AnnualConferenceCard
            key={index}
            session={session}
            attended={userProfile.attendedToConference}
            added={(userProfile.sessions || []).includes(session.id)}
            onAddSession={() => onAddSession(session)}
          />
        ))}
      </div>
    </div>
  );
};

ConferenceList.propTypes = {
  data: PropTypes.array,
};

ConferenceList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  addSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList);
