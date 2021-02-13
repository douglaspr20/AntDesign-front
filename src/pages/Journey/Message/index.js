import React from "react";

import {
  CustomButton,
} from "components";

import "./style.scss";

const JourneyHomeMessage = ({
  onClick
}) => {
  return (<div className="learning-journey-message">
    <h3>
      Start a journey and learn together with HHR
    </h3>
    <h3>
      Do you want to create your first learning journey?
    </h3>
    <CustomButton onClick={onClick} text="Yes, I want create a journey" size="md" />
  </div>);
};

export default JourneyHomeMessage;