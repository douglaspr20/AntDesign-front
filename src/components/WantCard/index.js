import React from "react";
import PropTypes from "prop-types";

import { CustomButton } from "components";

import "./style.scss";

const TextData = {
  mentor: {
    buttonLabel: "Yes, I want to be a mentor",
    description: [
      "Give something to the community, share what you already know.",
      "Do you want to be a mentor for the community?",
    ],
  },
  mentee: {
    buttonLabel: "Yes, I want to be a mentee",
    description: [
      "Being part of the community means you can ask for help.",
      "Do you want to be an apprentice with mentors inside the community?",
    ],
  },
};

const WantCard = ({ type, onClick }) => {
  const { description, buttonLabel } = TextData[type];

  return (
    <div className="want-card">
      {description.map((desc, index) => (
        <h4 key={index} className="want-card-title">
          {desc}
        </h4>
      ))}
      <CustomButton
        className="want-card-button"
        text={buttonLabel}
        type="primary"
        size="xl"
        onClick={onClick}
      />
    </div>
  );
};

WantCard.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

WantCard.defaultProps = {
  type: "Yes, I want to be a mentor",
  onClick: () => {},
};

export default WantCard;
