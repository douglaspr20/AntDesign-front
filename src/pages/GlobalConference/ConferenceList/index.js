import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { CustomSelect, AnnualConferenceCard } from "components";
import { CONFERENCE_SETTING, TIMEZONE_LIST } from "enum";

import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { addSession, removeSession } from "redux/actions/home-actions";
import { convertToCertainTime, convertToLocalTime } from "utils/format";

import "./style.scss";

const SessionType = [
  {
    text: "All Sessions",
    value: "all",
  },
  ...CONFERENCE_SETTING.SESSION_TYPE,
];

const TimeSegments = [
  {
    from: 0,
    to: 9,
    format: "0.00 am to 9.00 am ",
  },
  {
    from: 9,
    to: 12,
    format: "9.00 am to 12.00 am ",
  },
  {
    from: 12,
    to: 13,
    format: "12.00 pm to 1.00 pm ",
  },
  {
    from: 13,
    to: 15,
    format: "1.00 pm to 3.00 pm ",
  },
  {
    from: 15,
    to: 17,
    format: "3.00 pm to 5.00 pm ",
  },
  {
    from: 17,
    to: 24,
    format: "5.00 pm to 0.00 am ",
  },
];

const ConferenceList = ({
  data,
  allCategories,
  userProfile,
  addSession,
  removeSession,
}) => {
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

  const onRemoveSession = (session) => {
    removeSession(session);
  };

  useEffect(() => {
    if (data) {
      const sData = (data || []).map((item) => {
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
      });
      const filteredData = TimeSegments.map((step) => {
        const gSessions = sData.filter((item) => {
          const localTime = convertToLocalTime(item.startTime).hours();

          return localTime >= step.from && localTime < step.to;
        });

        return {
          step: step.format,
          data: gSessions,
        };
      });

      setSessionData(filteredData.filter((item) => !isEmpty(item.data)));
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
        {sessionData.map((session, index) => {
          let sessionFiltered;
          if (sortSessionType !== "all") {
            sessionFiltered = session.data.filter(
              (session) => session.type === sortSessionType
            );
          } else {
            sessionFiltered = session.data;
          }

          if (sortCategory !== "all") {
            sessionFiltered = sessionFiltered.filter((session) =>
              session.categories.includes(sortCategory)
            );
          }

          return sessionFiltered.length > 0 ? (
            <div key={index}>
              <h3 className="session-step">{session.step}</h3>
              {sessionFiltered.map((s) => (
                <AnnualConferenceCard
                  key={s.id}
                  session={s}
                  attended={userProfile.attendedToConference}
                  added={(userProfile.sessions || []).includes(s.id)}
                  onAddSession={() => onAddSession(s)}
                  onRemoveSession={() => onRemoveSession(s)}
                />
              ))}
            </div>
          ) : null;
        })}
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
  removeSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList);
