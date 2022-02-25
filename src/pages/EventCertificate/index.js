import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NoItemsMessageCard from "components/NoItemsMessageCard";

import { CARD_TYPE } from "enum";

import { liveSelector } from "redux/selectors/liveSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { getLive } from "redux/actions/live-actions";
import { getLiveEvents, getEvent } from "redux/actions/event-actions";

import CertificateCard from "./CertificateCard";
import { eventSelector } from "redux/selectors/eventSelector";

import "./style.scss";

const CertificateList = ({
  isOwner,
  type,
  live,
  refresh,
  getLive,
  liveEvents,
  getLiveEvents,
  userProfile,
  myEvent,
  getEvent,
  createBusinessPartnerResource,
}) => {
  const [setlives] = useState(live);
  const [isUserAssistence, setIsUserAssistence] = useState();
  useEffect(() => {
    getLive();
    getLiveEvents();
  }, [getLive, getLiveEvents]);

  useEffect(() => {
    if (refresh) {
      getLive();
      setlives(live);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, createBusinessPartnerResource]);

  useEffect(() => {
    if (Number(live.event)) {
      getEvent(Number(live.event));
    }
  }, [getEvent, live.event]);

  useEffect(() => {
    if (myEvent.id) {
      const usersAssistence =
        myEvent.usersAssistence.length > 0 &&
        myEvent.usersAssistence[0]?.map((el) => JSON.parse(el));
      const usersAssistencefilter = usersAssistence?.filter(
        (el) =>
          el.usersAssistence.length > 0 &&
          el.usersAssistence.includes(userProfile.id)
      );
      setIsUserAssistence(
        usersAssistencefilter.length === usersAssistence?.length ? true : false
      );
    }
  }, [myEvent, userProfile]);
  return (
    <div className="channel-page__list-wrap">
      {!isOwner && live?.length === 0 ? (
        <NoItemsMessageCard
          message={`There are no ${
            type === "article" ? "resources" : "videos"
          } for you at the moment`}
        />
      ) : (
        <>
          <div className="certificate-list-container">
            <div className="certificate-card-list">
              {isOwner && <CertificateCard type={CARD_TYPE.ADD} />}
              {liveEvents &&
                liveEvents?.map((liveEvent) => {
                  if (
                    new Date(myEvent?.endDate) < new Date() &&
                    isUserAssistence
                  ) {
                    return (
                      <CertificateCard
                        type={isOwner ? CARD_TYPE.EDIT : CARD_TYPE.VIEW}
                        key={liveEvent.id}
                        data={liveEvent}
                        // setCurrentValue={setCurrentValue}
                      />
                    );
                  } else return <div key={liveEvent.id}></div>;
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

CertificateList.propTypes = {
  resources: PropTypes.array,
  isOwner: PropTypes.bool,
  refresh: PropTypes.bool,
  filter: PropTypes.object,
  type: PropTypes.string,
};

CertificateList.defaultProps = {
  resources: [],
  isOwner: false,
  refresh: false,
  filter: {},
  type: "article",
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  live: liveSelector(state).live,
  liveEvents: eventSelector(state).allLiveEvents,
  myEvent: eventSelector(state).myEvents,
});

const mapDispatchToProps = {
  getLive,
  getLiveEvents,
  getEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateList);
