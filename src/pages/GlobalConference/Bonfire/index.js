import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BonfireCard } from "components";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getBonfires } from "redux/actions/bonfire-actions";
import { addBonfire, removeBonfire } from "redux/actions/home-actions";

import { setLoading } from "redux/actions/home-actions";
import { TIMEZONE_LIST } from "enum";
import { convertToCertainTime } from "utils/format";

const Bonfire = ({
  getBonfires,
  addBonfire,
  removeBonfire,
  bonfires,
  userProfile,
}) => {
  const [bonfiresData, setBonfiresData] = useState([]);

  const onAddBonfire = (bonfire) => {
    addBonfire(bonfire);
  };

  const onRemoveBonfire = (bonfire) => {
    removeBonfire(bonfire);
  };
  useEffect(() => {
    const getAllBonfires = async () => {
      getBonfires();
    };

    getAllBonfires();
  }, [getBonfires]);

  useEffect(() => {
    if (bonfires) {
      const sData = (bonfires || [])
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
            period: `${sTime.format("MMMM D")} | From ${sTime.format(
              "h:mm a"
            )} to ${eTime.format("h:mm a")}`,
            hours: `From ${sTime.format("h:mm a")} to ${eTime.format(
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

      setBonfiresData(filteredData);
    }
  }, [bonfires]);

  return (
    <div className="conference-list" style={{ marginTop: "12rem" }}>
      <div className="conference-list-container">
        {bonfiresData.map((bonfire, i) =>
          bonfire.data.length > 0 ? (
            <div key={i}>
              <h3 className="session-step">{bonfire.step}</h3>
              {bonfire.data.map((b, i) => (
                <BonfireCard
                  key={i}
                  bonfire={b}
                  added={(userProfile.bonfires || []).includes(b.id)}
                  onAddBonfire={() => onAddBonfire(b)}
                  onRemoveBonfire={() => onRemoveBonfire(b)}
                />
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...bonfireSelector(state),
  userProfile: homeSelector(state).userProfile,
  bonfires: bonfireSelector(state).bonfires,
});

const mapDispatchToProps = {
  getBonfires,
  setLoading,
  addBonfire,
  removeBonfire,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bonfire);
