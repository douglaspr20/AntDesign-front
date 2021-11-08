import React, { useEffect } from "react";
import { connect } from "react-redux";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { getParticipants } from "redux/actions/session-actions";
import { SETTINGS } from "enum";
import { ParticipantCard, CustomButton } from "components";
import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const Participants = ({
  sessionLoading,
  participants,
  currentPageParticipants,
  countOfResults,
  userProfile,
  getParticipants,
}) => {
  useEffect(() => {
    if (userProfile.topicsOfInterest.length > 0) {
      getParticipants({
        topics: userProfile.topicsOfInterest,
      });
    }
  }, [getParticipants, userProfile]);

  const onShowMore = () => {
    getParticipants({
      topics: userProfile.topicsOfInterest,
      page: currentPageParticipants + 1,
    });
  };
  return (
    <div className="participants-list">
      <div className="participants-list-container">
        {participants.map((participant, i) => (
          <ParticipantCard key={i} participant={participant} />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: "30%" }}>
        {currentPageParticipants * SETTINGS.MAX_SEARCH_ROW_PARTICIPANTS_NUM <
          countOfResults && (
          <div className=" d-flex justify-center items-center">
            {sessionLoading && (
              <div className="participants-list-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!sessionLoading && (
              <CustomButton
                text="Show more"
                type="primary outlined"
                size="lg"
                onClick={onShowMore}
              />
            )}
          </div>
        )}
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
