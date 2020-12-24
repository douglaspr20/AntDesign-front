import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomButton, MemberCard } from "components";
import { numberWithCommas } from "utils/format";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const MentorList = ({ user }) => {
  const entry = {
    firstName: "Edgar",
    lastName: "Davis",
    abbrName: "ED",
    img: null,
    about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
    titleProfessions: "HR Management & Coaching",
    proficiencyLevel: "",
    topicsOfInterest: [
      "Leadership",
      "Recruiting",
      "Human Resources",
      "Technologies",
    ],
    personalLinks: {},
    language: "English EN - United States",
    timezone: "(GMT -12:00) Eniwetok, Kwajalein",
    completed: false,
    percentOfCompletion: 75,
    role: "mentor",
    reason:
      "HHRR leader, community cultivator, speaker, mentor, & advisor. Founder at @CraftAndRigor. Curator of HHRSeattle.org. Formerly HHRR leadership FB & AWS",
    connected: false,
  };
  const Data = Array.from(Array(10).keys()).map((item) => ({
    id: item,
    ...entry,
  }));

  const [mentorList, setMentorList] = useState(Data);
  const [total] = useState(1234);
  const [match] = useState(8);

  const onShowMore = () => {
    setMentorList((prev) =>
      [...prev, ...Data].map((item, index) => ({
        ...item,
        id: index,
      }))
    );
  };

  const onMemberCardClick = (member) => {
    Emitter.emit(EVENT_TYPES.OPEN_MEMBER_PANEL, {
      member,
      match: (user || {}).specialties || [],
    });
  };

  const onMatchClicked = (index) => {
    if (!mentorList[index].connected) {
      setMentorList((prev) => {
        prev[index].connected = true;
        return [...prev];
      });
    }
  };

  Emitter.on(EVENT_TYPES.MEMBER_CHANGED, (member) => {
    setMentorList((prev) => {
      prev[member.id] = member;
      return [...prev];
    });
  });

  return (
    <div className="mentor-list">
      <div className="mentor-list-header">
        <span className="mentor-list-header-left">{`${numberWithCommas(
          total
        )} ${total === 1 ? "mentee" : "mentees"} match with you`}</span>
        <span className="mentor-list-header-right">
          {`You have ${numberWithCommas(match)} match left this month`}
        </span>
      </div>
      <div className="mentor-list-items">
        {(mentorList || []).map((mentor, index) => (
          <MemberCard
            key={`mentor-${index}`}
            user={mentor}
            match={user ? user.specialties : []}
            onClick={() => onMemberCardClick(mentor)}
            onMatchClicked={() => onMatchClicked(index)}
          />
        ))}
        <div className="mentor-list-items-more">
          <CustomButton
            text="Show more"
            type="primary outlined"
            size="lg"
            onClick={onShowMore}
          />
        </div>
      </div>
    </div>
  );
};

MentorList.propTypes = {
  user: PropTypes.object,
};

MentorList.defaultProps = {
  user: "",
};

export default MentorList;
