import React, { useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { getCouncilMembers } from "redux/actions/home-actions";
import { ParticipantCard } from "components";
import "./style.scss";

const CouncilMembers = ({
  userProfile,
  councilMembers,
  getCouncilMembers,
}) => {

  useEffect(() => {
    if (userProfile.topicsOfInterest.length > 0) {
      getCouncilMembers();
    }

  }, [userProfile, getCouncilMembers]);

  return (
    <div className="channel-page__list-wrap">
      <div className="participants-list">
        {councilMembers?.map((councilMember, i) => (
          <ParticipantCard
            key={i}
            participant={councilMember}
            invitedAllBonfires={true}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...sessionSelector(state),
  userProfile: homeSelector(state).userProfile,
  councilMembers: homeSelector(state).councilMembers,
});

const mapDispatchToProps = {
  getParticipants,
  getCouncilMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilMembers);
