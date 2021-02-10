import React from "react";

import {
  CustomButton,
  CustomDrawer,
} from "components";

import "./style.scss";

const JourneyHomeMessage = () => {
  return (<div className="learning-journey-message">
    <h3>
      Start a journey and learn together with HHR
    </h3>
    <h3>
      Do you want to create your first learning journey?
    </h3>
    <CustomButton text="Yes, I want create a journey" size="md" />
  </div>);
};

export default JourneyHomeMessage;