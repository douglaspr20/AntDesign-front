import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AnnualConferenceCard } from "components";
import { TIMEZONE_LIST } from "enum";

import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { addSession, removeSession } from "redux/actions/home-actions";
import { convertToCertainTime } from "utils/format";

import "./style.scss";

const ConferenceList = ({
  data,
  filters,
  userProfile,
  addSession,
  removeSession,
}) => {
  const [sessionData, setSessionData] = useState([]);

  const onAddSession = (session) => {
    addSession(session);
  };

  const onRemoveSession = (session) => {
    removeSession(session);
  };

  useEffect(() => {
    if (data) {
      const sData = (data || [])
        .map((item) => {
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
            )}`,
            tz: `${tz}`,
          };
        })
        .sort((a, b) => {
          if (a.startTime > b.startTime) {
            return 1;
          } else if (b.startTime > a.startTime) {
            return -1;
          }
          return 0;
        });

      let filteredData = [];

      for (let i = 0; i < sData.length; i++) {
        let isEmpty = true;
        for (let j = 0; j <= filteredData.length; j++) {
          if (sData[i].period === filteredData[j]?.step) {
            filteredData[j].data.push(sData[i]);
            isEmpty = false;
          }
        }

        if (isEmpty) {
          filteredData.push({
            step: sData[i].period,
            data: [sData[i]],
          });
        }
      }

      function checkAvailability(arr, val) {
        return arr.some((arrVal) => val === arrVal);
      }

      if (filters.categories) {
        const categories = JSON.parse(filters.categories);
        if (categories.length > 0) {
          const sessionFiltered = filteredData.map((session) => {
            const sessions = session.data.filter((s) => {
              let sessionCanFiltered = false;
              for (const category of categories) {
                if (checkAvailability(s.categories, category)) {
                  sessionCanFiltered = true;
                  break;
                }
              }
              if (sessionCanFiltered) {
                return s;
              }

              return null;
            });
            if (sessions) {
              session.data = sessions;
              return {
                ...session,
              };
            }

            return null;
          });
          setSessionData(sessionFiltered);
        } else {
          setSessionData(filteredData);
        }
      } else {
        setSessionData(filteredData);
      }

      if (filters.sessions) {
        const typeSessions = JSON.parse(filters.sessions);
        if (typeSessions.length > 0) {
          const sessionFiltered = filteredData.map((session) => {
            const sessions = session.data.filter((s) => {
              let sessionCanFiltered = false;
              for (const typeSession of typeSessions) {
                if (s.type === typeSession) {
                  sessionCanFiltered = true;
                  break;
                }
              }
              if (sessionCanFiltered) {
                return s;
              }

              return null;
            });
            if (sessions) {
              session.data = sessions;
              return {
                ...session,
              };
            }

            return null;
          });

          setSessionData(sessionFiltered);
        }
      }
    } else {
      setSessionData([]);
    }
  }, [data, filters]);

  return (
    <div className="conference-list">
      <div className="conference-list-container">
        {sessionData.map((session, index) =>
          session.data.length > 0 ? (
            <div key={index}>
              <h3 className="session-step">{session.step}</h3>
              {session.data.map((s) => (
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
          ) : null
        )}
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
