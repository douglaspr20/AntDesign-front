import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NoItemsMessageCard from "components/NoItemsMessageCard";

import { CARD_TYPE } from "enum";

import { liveSelector } from "redux/selectors/liveSelector";

import { getLive } from "redux/actions/live-actions";
import { getLiveEvents } from "redux/actions/event-actions";

import CertificateCard from "./CertificateCard";
import { eventSelector } from "redux/selectors/eventSelector";

import "./style.scss";

const CertificateList = ({
  isOwner,
  type,
  live,
  refresh,
  getLive,
  userProfile,
  liveEvents,
  getLiveEvents,
  currentTab,
  createBusinessPartnerResource,
}) => {
  useEffect(() => {
    getLive();
    getLiveEvents();
  }, [getLive, getLiveEvents]);
  const [setlives] = useState(live);

  useEffect(() => {
    if (refresh) {
      getLive();
      setlives(live);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, createBusinessPartnerResource]);
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
                  if (new Date(liveEvent?.endDate) <= new Date()) {
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
  live: liveSelector(state).live,
  liveEvents: eventSelector(state).allLiveEvents,
});

const mapDispatchToProps = {
  getLive,
  getLiveEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateList);
