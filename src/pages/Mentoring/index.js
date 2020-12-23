import React from "react";
import PropTypes from "prop-types";

import { Tabs } from "components";
import MentorPanel from "./Mentor";
import MenteePanel from "./Mentee";

import "./style.scss";

const Mentoring = () => {
  const TabData = [
    {
      title: "Mentor",
      content: () => <MentorPanel />,
    },
    {
      title: "Mentee",
      content: () => <MenteePanel />,
    },
  ];
  return (
    <div className="mentoring-page">
      <div className="mentoring-page-container">
        <Tabs data={TabData} />
      </div>
    </div>
  );
};

Mentoring.propTypes = {
  title: PropTypes.string,
};

Mentoring.defaultProps = {
  title: "",
};

export default Mentoring;
