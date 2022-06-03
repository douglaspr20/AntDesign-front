import React from "react";
import SprintCard from "../SprintCard";

import "./style.scss";

const UpcomingSprints = () => {
  const sprints = [...Array(8)];

  return (
    <div className="upcoming-sprints">
      {sprints.map((sprint, i) => (
        <SprintCard key={i} />
      ))}
    </div>
  );
};

export default UpcomingSprints;
