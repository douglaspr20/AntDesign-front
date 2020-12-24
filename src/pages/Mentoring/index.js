import React, { useState } from "react";
import PropTypes from "prop-types";

import { Tabs } from "components";
import MentorPanel from "./Mentor";
import MenteePanel from "./Mentee";
import MenteeSetting from "./MenteeSetting";
import MentorSetting from "./MentorSetting";
import MentorList from "./MentorList";
import MenteeList from "./MenteeList";

import "./style.scss";

const Mentoring = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [selectedType, setSelectedType] = useState("mentor");
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  const [mentorSetting, setMentorSetting] = useState({});
  const [menteeSetting, setMenteeSetting] = useState({});

  const showSetting = (type) => {
    setOpenSetting(true);
    setSelectedType(type);
  };

  const onSaveMentorSetting = (data) => {
    setOpenSetting(false);
    setIsMentor(true);
    setMentorSetting(data);
  };

  const onSaveMenteeSetting = (data) => {
    setOpenSetting(false);
    setIsMentee(true);
    setMenteeSetting(data);
  };

  const TabData = [
    {
      title: "Mentor",
      content: () => (
        <MentorPanel
          setting={mentorSetting}
          isMentor={isMentor}
          openSetting={() => showSetting("mentor")}
          onEdit={() => showSetting("mentor")}
        />
      ),
    },
    {
      title: "Mentee",
      content: () => (
        <MenteePanel
          setting={menteeSetting}
          isMentee={isMentee}
          openSetting={() => showSetting("mentee")}
          onEdit={() => showSetting("mentee")}
        />
      ),
    },
  ];

  const onTabChange = (tab) => {
    setSelectedType(tab === "1" ? "mentee" : "mentor");
  };

  return (
    <div className="mentoring-page">
      <div className="mentoring-page-container">
        {!openSetting && (
          <Tabs
            current={selectedType === "mentor" ? "0" : "1"}
            data={TabData}
            onChange={onTabChange}
          />
        )}
        {openSetting && selectedType === "mentor" && (
          <MentorSetting
            setting={mentorSetting}
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMentorSetting}
          />
        )}
        {openSetting && selectedType === "mentee" && (
          <MenteeSetting
            setting={menteeSetting}
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMenteeSetting}
          />
        )}
      </div>
      {!openSetting && selectedType === "mentor" && isMentor && (
        <div className="mentoring-page-list">
          <div className="mentoring-page-container">
            <MenteeList />
          </div>
        </div>
      )}
      {!openSetting && selectedType === "mentee" && isMentee && (
        <div className="mentoring-page-list">
          <div className="mentoring-page-container">
            <MentorList />
          </div>
        </div>
      )}
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
