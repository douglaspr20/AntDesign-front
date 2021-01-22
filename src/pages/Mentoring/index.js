import React, { useState, useEffect } from "react";
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
import { mentoringSelector } from "redux/selectors/mentoringSelector";
import {
  setMentoringInfo,
  getMentoringInfo,
  updateMentoringInfo,
} from "redux/actions/mentoring-actions";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const Mentoring = ({
  userProfile,
  isMentor,
  mentorInfo,
  isMentee,
  menteeInfo,
  setMentoringInfo,
  updateMentoringInfo,
  getMentoringInfo,
}) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [selectedType, setSelectedType] = useState("mentor");

  const showSetting = (type) => {
    setOpenSetting(true);
    setSelectedType(type);
  };

  const onSaveMentorSetting = (data) => {
    setOpenSetting(false);
    if (isMentor) {
      updateMentoringInfo({
        id: mentorInfo.id,
        title: data.title,
        about: data.reason,
        areas: data.specialties,
        isMentor: true,
      });
    } else {
      setMentoringInfo({
        title: data.title,
        about: data.reason,
        areas: data.specialties,
        isMentor: true,
      });
    }
  };

  const onSaveMenteeSetting = (data) => {
    setOpenSetting(false);
    if (isMentee) {
      updateMentoringInfo({
        id: menteeInfo.id,
        title: data.title,
        about: data.reason,
        areas: data.specialties,
        isMentor: false,
      });
    } else {
      setMentoringInfo({
        title: data.title,
        about: data.reason,
        areas: data.specialties,
        isMentor: false,
      });
    }
  };

  const TabData = [
    {
      title: "Mentor",
      content: () => (
        <MentorPanel
          setting={mentorInfo}
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
          setting={menteeInfo}
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

  useEffect(() => {
    getMentoringInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            setting={mentorInfo}
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMentorSetting}
          />
        )}
        {openSetting && selectedType === "mentee" && (
          <MenteeSetting
            setting={menteeInfo}
            onCancel={() => setOpenSetting(false)}
            onSave={onSaveMenteeSetting}
          />
        )}
      </div>
      {!openSetting && selectedType === "mentor" && isMentor && (
        <div className="mentoring-page-list">
          <div className="mentoring-page-container">
            <MenteeList user={mentorInfo} />
          </div>
        </div>
      )}
      {!openSetting && selectedType === "mentee" && isMentee && (
        <div className="mentoring-page-list">
          <div className="mentoring-page-container">
            <MentorList user={menteeInfo} />
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

const mapStateToProps = (state) => {
  return {
    userProfile: homeSelector(state).userProfile,
    isMentor: !!homeSelector(state).userProfile.mentor,
    isMentee: !!homeSelector(state).userProfile.mentee,
    ...mentoringSelector(state),
  };
};

const mapDispatchToProps = {
  setMentoringInfo,
  getMentoringInfo,
  updateMentoringInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mentoring);
