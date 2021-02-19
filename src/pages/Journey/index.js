import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  getAllJourneys,
  addJourney,
} from "redux/actions/journey-actions";


import { journeySelector } from "redux/selectors/journeySelector";
import { journeyItemSelector } from "redux/selectors/journeyItemSelector";

import JourneyHomeMessage from "./Message";
import JourneyCardList from "./CardList";
import JourneyForm from "./Form";
import JourneyDetails from "./Details";

import "./style.scss";

const JourneyPage = ({
  getAllJourneys,
  addJourney,
  allJourneys,
  journey,
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
      allJourneys.length === 0 && !showForm && journey == null &&
      <JourneyHomeMessage onClick={() => { setShowForm(true); }} />
    }
    {
      allJourneys.length > 0 && !showForm && journey == null &&
      <JourneyCardList
        showForm={() => { setShowForm(true); }}
        allJourneys={allJourneys}
      />
    }
    {
      journey != null &&
      <JourneyDetails />
    }
  </div>);
};

const mapStateToProps = (state, props) => ({
  allJourneys: journeySelector(state).allJourneys,
  journey: journeySelector(state).journey,
});

const mapDispatchToProps = {
  addJourney,
  getAllJourneys,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyPage);