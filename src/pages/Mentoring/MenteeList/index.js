import React, { useState } from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "utils/format";

import "./style.scss";

const MenteeList = () => {
  // const [mentorList, setMentorList] = useState([]);
  const [total] = useState(234);
  const [match] = useState(8);

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
      <div className="mentee-list-items"></div>
    </div>
  );
};

MenteeList.propTypes = {
  title: PropTypes.string,
};

MenteeList.defaultProps = {
  title: "",
};

export default MenteeList;
