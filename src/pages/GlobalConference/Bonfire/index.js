import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BonfireCard } from "components";

import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { getBonfires, createBonfire } from "redux/actions/bonfire-actions";
import { setLoading } from "redux/actions/home-actions";

const Bonfire = ({ getBonfires }) => {
  useEffect(() => {
    const getAllBonfires = async () => {
      getBonfires();
    };

    getAllBonfires();
  }, [getBonfires]);
  return (
    <div className="conference-list" style={{ marginTop: "12rem" }}>
      <div className="conference-list-container">
        <BonfireCard />
        <BonfireCard />
        <BonfireCard />
        <BonfireCard />
        {/* {sessionData.map((session, index) =>
          session.data.length > 0 ? (
            <div key={index}>
              <h3 className="session-step">{session.step}</h3>
              {session.data.map((s) => (
                <AnnualConferenceCard
                  key={s.id}
                  session={s}
                  attended={userProfile.attendedToConference}
                  added={(userProfile.sessions || []).includes(s.id)}
                  onRemoveSession={() => onRemoveSession(s)}
                />
              ))}
            </div>
          ) : null
        )} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...bonfireSelector(state),
  userProfile: homeSelector(state).userProfile,
  //bonfires: bonfireSelector(state).bonfires,
});

const mapDispatchToProps = {
  getBonfires,
  createBonfire,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bonfire);
