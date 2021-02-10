import React from "react";

import {
  CustomButton,
  CustomDrawer,
} from "components";

import "./style.scss";

const JourneyHomeMessage = () => {
  return (<div class="learning-journey-message">
    <h3>
      Start a journey and learn together with HHR Do you want to create your first learning journey?
      </h3>
    <CustomButton text="Yes, I want create a journey" size="sm" />
  </div>);
};

export default JourneyHomeMessage;