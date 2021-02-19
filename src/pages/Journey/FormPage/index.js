import React from "react";
import { connect } from "react-redux";

import {
  addJourney,
} from "redux/actions/journey-actions";

import JourneyForm from "pages/Journey/Form";

const JourneyFormPage = ({
  addJourney,
}) => {

  const onFinish = (data) => {
    addJourney(data);
  };

  return (<div className="learning-journey-page">
    <JourneyForm
      key='form-journey'
      onSave={onFinish}
    />
  </div>);
};

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
  addJourney,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyFormPage);