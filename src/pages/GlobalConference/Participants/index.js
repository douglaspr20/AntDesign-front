import React from "react";
import { ParticipantCard } from "components";

import "./style.scss";

const Participants = () => {
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

export default Participants;
