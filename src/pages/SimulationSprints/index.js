import React from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";
import SprintsCard from "./SprintsCard";

const SimulationSprintsPage = ({ userProfile }) => {
  return (
    <div className="simulation-sprints">
      <div className="simulation-sprints-container">
        <Menu
          mode="horizontal"
          className="sub-menu"
          // selectedKeys={localPathname}
        >
          <Menu.Item
            key="global-conference"
            className="sub-menu-item-global-conference"
          >
            General Information
          </Menu.Item>

          <Menu.Item key="speakers" className="sub-menu-item-global-conference">
            Upcoming Sprints
          </Menu.Item>
          <Menu.Item
            key="participants"
            className="sub-menu-item-global-conference"
          >
            My Sprints
          </Menu.Item>
        </Menu>

        <div className="simulation-sprints-information">
          <h3>Hi {userProfile.firstName}</h3>
          <p>Welcome to Hacking HR’s Simulation Sprints!</p>
          <p>
            {" "}
            Thank you for checking out this page to find out more about one of
            our flagship learning programs.
          </p>
        </div>

        <div className="simulation-sprints-information">
          <h2>Simulation Sprints</h2>
          <p>
            ProjectX is a cohort-based, skill-focused learning program designed
            to help you learn or improve your knowledge in the specific
            cohort-skills. We do this through daily resources that will help you
            learn and encourage you to reflect about the lessons learned and how
            to apply them to your daily professional work.
          </p>
        </div>

        <div className="simulation-sprints-information">
          <h2>How it works</h2>
          <p>
            This program is intense, but light touch: we will provide a daily
            resource that you should be able to read, listen or watch in less
            than 20 minutes.
          </p>
          <p>
            After reading, listening or watching the resource, you will provide
            a personal reflection about what you learned and how you plan to
            apply the lessons learned.
          </p>
          <p>
            This cohort program lasts 66 consecutive days (yes, consecutive
            means every day, including weekends and any holidays that fall in
            between). Each day, for 66 consecutive days, you will receive via
            email and the cohort dashboard a daily resource. You need to provide
            your daily reflection also in the dashboard.
          </p>
          <p>
            This approach to learning is fast, but also allows for lots of
            flexibility. Reading/watching/listening to the daily resource and
            providing your reflection won’t take more than 20-25 minutes per
            day… Hey, “excellence is a habit”… and we aim to make light-touch
            learning a habit with discipline and commitment.
          </p>
          <p>
            The program relies on daily consistency and discipline. Instead of
            bugging you with heavy daily resources, “self-pace” learning program
            from which you disengage too soon or long programs that lasts for
            hours and months, we only ask you for 20-25 minutes or less on a
            daily basis for 66 days. That’s it!
          </p>
        </div>

        <div className="simulation-sprints-information">
          <h2>The Conditions</h2>
          <p>
            Please note: you MUST complete all the requirements of the program
            and the completion will be assessed weekly. If in any given week you
            fail to complete two or more reflections, unfortunately you will be
            removed from the program and won’t be able to access the dashboard
            anymore and won’t receive the learning resources either.
          </p>
          <p>We hope you join us! </p>
          <p>Thank you! </p>
        </div>

        <div className="simulation-sprints-prices">
          <SprintsCard
            title="One Cohort"
            description="Lorem ipsum"
            prices="29.99"
          />
          <SprintsCard
            title="Five Cohort"
            description="Lorem ipsum"
            prices="69.99"
          />
          <SprintsCard
            title="Eight Cohort"
            description="Lorem ipsum"
            prices="79.99"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulationSprintsPage);
