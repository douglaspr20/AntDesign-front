import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import qs from "query-string";
import { INTERNAL_LINKS } from "enum";
import IconBack from "images/icon-back.svg";
import { Menu } from "antd";

import "./style.scss";

const SimulationSprintDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [selectedKeys, setSelectedKeys] = useState("the-basics");

  const parsed = qs.parse(location.search);

  useEffect(() => {
    setSelectedKeys(parsed.key || "the-basics");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.replaceState(
      null,
      "Page",
      `${INTERNAL_LINKS.SIMULATION_SPRINTS}/${id}/dashboard?key=${selectedKeys}`
    );
  }, [selectedKeys, id]);

  return (
    <div className="simulation-sprint-dashboard-page">
      <div className="simulation-sprint-dashboard-page-header">
        <div className="simulation-sprint-dashboard-page-header-content">
          <div>
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
                <h4>Back to Simulatrions Sprints</h4>
              </div>
            </div>
            <div className="title">
              <h2>Test title yuyuyuyuyuyu</h2>
            </div>
          </div>

          <Menu
            mode="horizontal"
            className="menu-simulation"
            selectedKeys={selectedKeys}
          >
            <Menu.Item
              key="the-basics"
              className="menu-simulation-item"
              onClick={() => setSelectedKeys("the-basics")}
            >
              The Basics
            </Menu.Item>

            <Menu.Item
              key="calendar"
              className="menu-simulation-item"
              onClick={() => setSelectedKeys("calendar")}
            >
              Calendar
            </Menu.Item>
            <Menu.Item
              key="deliverables"
              className="menu-simulation-item"
              onClick={() => setSelectedKeys("deliverables")}
            >
              Deliverables and Resources
            </Menu.Item>

            <Menu.Item
              key="team"
              className="menu-simulation-item"
              onClick={() => setSelectedKeys("team")}
            >
              Team Members
            </Menu.Item>

            <Menu.Item
              key="full-cohort"
              className="menu-simulation-item"
              onClick={() => setSelectedKeys("full-cohort")}
            >
              Full Cohort
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SimulationSprintDashboardPage;
