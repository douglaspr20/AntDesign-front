import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  getAllJourneys,
  addJourney,
} from "redux/actions/journey-actions";

import { journeySelector } from "redux/selectors/journeySelector";

import JourneyHomeMessage from "./Message";
import JourneyCardList from "./CardList";
import JourneyForm from "./Form";

import "./style.scss";

const JourneyPage = ({
  getAllJourneys,
  addJourney,
  allJourneys,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllJourneys();
  }, []);

  const onFinish = (data) => {
    addJourney(data);
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (<div className="learning-journey-page">
    { 
      showForm &&
      <JourneyForm
        key='form-journey'
        onSave={onFinish}
        onCancel={() => { 
          closeForm();
        }}
      />
    }
    {
      allJourneys.length === 0 && !showForm &&
      <JourneyHomeMessage onClick={() => { setShowForm(true); }} />
    }
    {
      allJourneys.length > 0 && !showForm &&
      <JourneyCardList showForm={() => { setShowForm(true); }} allJourneys={allJourneys} />
    }
  </div>);
};

const mapStateToProps = (state, props) => ({
  allJourneys: journeySelector(state).allJourneys,
});

const mapDispatchToProps = {
  addJourney,
  getAllJourneys,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyPage);