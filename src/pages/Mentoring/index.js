import React, { useState } from "react";
import PropTypes from "prop-types";

import { Tabs } from "components";
import MentorPanel from "./Mentor";
import MenteePanel from "./Mentee";
import MenteeSetting from "./MenteeSetting";
import MentorSetting from "./MentorSetting";

import "./style.scss";

const Mentoring = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [selectedType, setSelectedType] = useState("mentor");

  const showSetting = (type) => {
    setOpenSetting(true);
    setSelectedType(type);
  };

  const onSaveMentorSetting = () => {
    setOpenSetting(false);
  };

  const onSaveMenteeSetting = () => {
    setOpenSetting(false);
  };

  const TabData = [
    {
      title: "Mentor",
      content: () => <MentorPanel openSetting={() => showSetting("mentor")} />,
    },
    {
      title: "Mentee",
      content: () => <MenteePanel openSetting={() => showSetting("mentee")} />,
    },
  ];

  return (
    <div className="mentoring-page">
      <div className="mentoring-page-container">
        {!openSetting && <Tabs data={TabData} />}
        {openSetting && selectedType === "mentor" && (
          <MentorSetting
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMentorSetting}
          />
        )}
        {openSetting && selectedType === "mentee" && (
          <MenteeSetting
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMenteeSetting}
          />
        )}
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
