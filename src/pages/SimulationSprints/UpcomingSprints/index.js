import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import SprintCard from "../SprintCard";

import { getAllSimulationSprints } from "redux/actions/simulationSprint-actions";
import { simulationSprintSelector } from "redux/selectors/simulationSprintSelector";

import "./style.scss";

const UpcomingSprints = ({ getAllSimulationSprints, allSimulationSprints }) => {
  useEffect(() => {
    getAllSimulationSprints({
      date: moment().format(),
    });
  }, [getAllSimulationSprints]);

  return (
    <div className="upcoming-sprints">
      {allSimulationSprints.map((sprint, i) => (
        <SprintCard key={i} sprint={sprint} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allSimulationSprints: simulationSprintSelector(state).allSimulationSprints,
});

const mapDispatchToProps = {
  getAllSimulationSprints,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingSprints);
