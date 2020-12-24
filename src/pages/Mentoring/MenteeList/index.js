import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomButton, MemberCard } from "components";
import { numberWithCommas } from "utils/format";

import "./style.scss";

const MenteeList = ({ user }) => {
  const entry = {
    firstName: "Andryi",
    lastName: "Shevchenko",
    abbrName: "AS",
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

  const [menteeList, setMenteeList] = useState(Data);
  const [total] = useState(234);
  const [match] = useState(8);

  const onShowMore = () => {
    setMenteeList((prev) => [...prev, ...Data]);
  };

  return (
    <div className="mentee-list">
      <div className="mentee-list-header">
        <span className="mentee-list-header-left">{`${numberWithCommas(
          total
        )} ${total === 1 ? "mentor" : "mentors"} match with you`}</span>
        <span className="mentee-list-header-right">
          {`You have ${numberWithCommas(match)} match left this month`}
        </span>
      </div>
      <div className="mentee-list-items">
        {(menteeList || []).map((mentee, index) => (
          <MemberCard
            key={`mentor-${index}`}
            user={mentee}
            match={user ? user.specialties : []}
          />
        ))}
        <div className="mentee-list-items-more">
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

MenteeList.propTypes = {
  user: PropTypes.object,
};

MenteeList.defaultProps = {
  user: {},
};

export default MenteeList;
