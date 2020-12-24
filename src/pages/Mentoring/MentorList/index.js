import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomButton, MemberCard } from "components";
import { numberWithCommas } from "utils/format";

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
    language: "",
    timezone: "",
    completed: false,
    percentOfCompletion: 75,
  };
  const Data = Array.from(Array(10).keys()).map((item) => ({ ...entry }));

  const [mentorList, setMentorList] = useState(Data);
  const [total] = useState(1234);
  const [match] = useState(8);

  const onShowMore = () => {
    setMentorList((prev) => [...prev, ...Data]);
  };

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
