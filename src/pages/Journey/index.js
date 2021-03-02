import React, { useEffect } from "react";
import { connect } from "react-redux";

import Emitter from "services/emitter";
import {
  getAllJourneys,
  addJourney,
  updateJourney,
  setShowForm,
} from "redux/actions/journey-actions";


import { journeySelector } from "redux/selectors/journeySelector";
import { homeSelector } from "redux/selectors/homeSelector";

import JourneyHomeMessage from "./Message";
import JourneyCardList from "./CardList";
import JourneyForm from "./Form";
import JourneyDetails from "./Details";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const JourneyPage = ({
  getAllJourneys,
  addJourney,
  updateJourney,
  allJourneys,
  journey,
  setShowForm,
  showForm,
  userProfile,
}) => {

  const planUpdated = userProfile.memberShip !== "free";

  useEffect(() => {
    getAllJourneys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const planUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const onFinish = (data) => {
    if (journey == null) {
      addJourney(data);
    } else {
      updateJourney(journey.id, data);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (<div className="learning-journey-page" style={{ background: showForm === true || journey != null ? "#fff" : 'none' }}>
    <div className="learning-journey-page--content">
      {!planUpdated && (
        <div className="upgrade-notification">
          <div className="upgrade-notification-panel" onClick={planUpgrade}>
            <h3>
              Upgrade to a PREMIUM Membership and get unlimited access to the
              LAB features
              </h3>
          </div>
        </div>
      )}
      {
        planUpdated && showForm &&
        <JourneyForm
          key='form-journey'
          onSave={onFinish}
          onCancel={() => {
            closeForm();
          }}
        />
      }
      {
        planUpdated && allJourneys.length === 0 && !showForm && journey == null &&
        <JourneyHomeMessage onClick={() => { setShowForm(true); }} />
      }
      {
        planUpdated && allJourneys.length > 0 && !showForm && journey == null &&
        <JourneyCardList
          showForm={() => { setShowForm(true); }}
          allJourneys={allJourneys}
        />
      }
      {
        planUpdated && journey != null && !showForm &&
        <JourneyDetails
          showForm={() => { setShowForm(true); }}
        />
      }
    </div>
  </div>);
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
  allJourneys: journeySelector(state).allJourneys,
  journey: journeySelector(state).journey,
  showForm: journeySelector(state).showForm,
});

const mapDispatchToProps = {
  addJourney,
  updateJourney,
  getAllJourneys,
  setShowForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyPage);