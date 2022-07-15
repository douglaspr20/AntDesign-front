import React from "react";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import IconBack from "images/icon-back.svg";
import SimulationResourceCard from "./SimulationResourceCard";
import { Col, Row } from "antd";

import "./style.scss";

const SimulationSprintResourcePage = () => {
  const history = useHistory();

  return (
    <div className="simulation-sprint-resources-page">
      <div className="simulation-sprint-resources-page-container">
        <div
          className="sprints-detail-page-header-content-back-btn"
          onClick={() =>
            history.push(
              `${INTERNAL_LINKS.SIMULATION_SPRINTS}?key=upcoming-sprints`
            )
          }
        >
          <div className="sprints-detail-page-header-content-back">
            <div className="sprints-detail-page-header-content-back-img">
              <img src={IconBack} alt="icon-back" />
            </div>
            <h4>Back to List</h4>
          </div>
        </div>

        <div className="wrapper">
          <div className="container-header d-flex justify-between items-start">
            <div className="todays-resource">
              <h3 className="todays-resource-text">Today's Resource</h3>
              <div className="todays-resources">
                <SimulationResourceCard />
                <SimulationResourceCard />
                <SimulationResourceCard />
              </div>
            </div>
          </div>
          <Row className="previous">
            <Col span={24}>
              <div className="container-header-previous d-flex justify-between items-center">
                <h3>Previous Resources</h3>
              </div>
            </Col>
          </Row>
          <div className="simulation-sprint-resources-list previous-resource">
            <SimulationResourceCard />
            <SimulationResourceCard />
            <SimulationResourceCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationSprintResourcePage;
