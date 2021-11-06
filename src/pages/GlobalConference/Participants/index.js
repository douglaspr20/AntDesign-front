import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { ParticipantCard } from "components";

import "./style.scss";

const Participants = ({ participants, userProfile, getParticipants }) => {
  const [filters, setFilters] = useState({});
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile.topicsOfInterest);
      //getParticipants(userProfile.topicsOfInterest);
    }
  }, [getParticipants, userProfile]);
  return (
    <div className="participants-list">
      <div className="participants-list-container">
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...sessionSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getParticipants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
