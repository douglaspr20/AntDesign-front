import React, { useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { ParticipantCard } from "components";

import "./style.scss";

const Participants = ({ participants, userProfile, getParticipants }) => {
  useEffect(() => {
    if (userProfile.topicsOfInterest.length > 0) {
      getParticipants({
        topics: userProfile.topicsOfInterest,
      });
    }
  }, [getParticipants, userProfile]);

  return (
    <div className="participants">
      <div className="participants-container">
        <h2>Recommended Participants To Connect With</h2>
        <div className="participants-list">
          {participants.map((participant, i) => (
            <ParticipantCard key={i} participant={participant} />
          ))}
        </div>
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
