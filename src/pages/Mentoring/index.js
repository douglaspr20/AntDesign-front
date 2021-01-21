import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Emitter from "services/emitter";

import { Tabs } from "components";
import MentorPanel from "./Mentor";
import MenteePanel from "./Mentee";
import MenteeSetting from "./MenteeSetting";
import MentorSetting from "./MentorSetting";
import MentorList from "./MentorList";
import MenteeList from "./MenteeList";
import { homeSelector } from "redux/selectors/homeSelector";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const Mentoring = ({ userProfile }) => {
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

  const isPremium = userProfile.memberShip !== "free";

  const onTabChange = (tab) => {
    setSelectedType(tab === "1" ? "mentee" : "mentor");
  };

  const planUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  return (
    <div className="mentoring-page">
      {!isPremium && (
        <div className="mentoring-page-firewall">
          <div className="upgrade-notification-panel" onClick={planUpgrade}>
            <h3>UPGRADE TO PREMIUM</h3>
            <h3>TO GET ACCESS TO THE LEARNING LIBRARY</h3>
          </div>
        </div>
      )}
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
            <MenteeList user={mentorSetting} />
          </div>
        </div>
      )}
      {!openSetting && selectedType === "mentee" && isMentee && (
        <div className="mentoring-page-list">
          <div className="mentoring-page-container">
            <MentorList user={menteeSetting} />
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

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(Mentoring);
