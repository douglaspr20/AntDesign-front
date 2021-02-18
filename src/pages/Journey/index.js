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
import JourneyDetails from "./Details";

import "./style.scss";

const JourneyPage = ({
  getAllJourneys,
  addJourney,
  allJourneys,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [journeyId, setJourneyId] = useState(0);

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
      allJourneys.length === 0 && !showForm && journeyId === 0 &&
      <JourneyHomeMessage onClick={() => { setShowForm(true); }} />
    }
    {
      allJourneys.length > 0 && !showForm && journeyId === 0 &&
      <JourneyCardList showForm={() => { setShowForm(true); }} allJourneys={allJourneys} />
    }
    {
      journeyId > 0 &&
      <JourneyDetails />
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