import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Emitter from "services/emitter";
import { notification } from "antd";

import ReactPlayer from "react-player";
import { SpecialtyItem, CustomButton } from "components";
import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";
import {
  claimConferenceLibrary,
  setConferenceLibraryViewed,
} from "redux/actions/conference-actions";
import { EVENT_TYPES } from "enum";
import LibraryClaimModal from "../LibraryCard/LibraryClaimModal";

import IconVideo from "images/icon-video.svg";

import "./style.scss";

const ConferenceCard = ({
  data,
  userProfile,
  allCategories,
  keyword,
  frequency,
  claimConferenceLibrary,
  setConferenceLibraryViewed,
}) => {
  const { title, year, categories } = data || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [showFirewall, setShowFirewall] = useState(false);

  const onCardClick = () => {
    if (data.link && !modalVisible && !showFirewall) {
      window.open(data.link);

      if (data.viewed && !data.viewed[userProfile.id]) {
        setConferenceLibraryViewed(data.id, "unmark");
      }
    }
  };

  const onClaimCredits = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userProfile && userProfile.memberShip === "premium") {
      setModalVisible(true);
    } else {
      setShowFirewall(true);
    }
  };

  const planUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const onHRClaimOffered = async () => {
    claimConferenceLibrary(data.id, (err) => {
      if (err) {
        notification.error({
          message: "Error",
          description: (err || {}).msg,
        });
      } else {
        notification.info({
          message: "Email was send successfully.",
        });
        setModalVisible(false);
      }
    });
  };

  return (
    <div className="conference-card" onClick={onCardClick}>
      <div className="conference-card-header">
        <ReactPlayer
          className="conference-card-player"
          controls={false}
          url={data.link}
        />
      </div>
      <div className="conference-card-content">
        <h3 className="conference-card-title">{title}</h3>
        <h6 className="conference-card-year">{year}</h6>
        <div className="conference-card-categories">
          {(categories || []).map((item, index) => {
            const category = allCategories.find((cat) => cat.value === item);
            return (
              <SpecialtyItem
                key={index}
                title={category ? category.title : item}
                active={false}
              />
            );
          })}
        </div>
        <div className="conference-card-content-footer">
          <div className="d-flex items-center">
            <div className="conference-card-icon">
              <img src={IconVideo} alt="doc-icon" />
            </div>
            <h6>Video</h6>
          </div>
          <div className="d-flex flex-column">
            {data.viewed && data.viewed[userProfile.id] ? (
              <CustomButton
                className="mark-viewed"
                type={
                  data.viewed[userProfile.id] === "unmark"
                    ? "secondary"
                    : "remove"
                }
                size="xs"
                text={
                  data.viewed[userProfile.id] === "unmark"
                    ? "Mark as Viewed"
                    : "Viewed"
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConferenceLibraryViewed(
                    data.id,
                    data.viewed[userProfile.id] === "unmark" ? "mark" : "unmark"
                  );
                }}
              />
            ) : null}
            {data.showClaim === 1 && (
              <CustomButton
                className="claim-credits"
                type="primary"
                size="xs"
                text="Claim HR Credits"
                onClick={onClaimCredits}
              />
            )}
          </div>
          {/* <div className="d-flex items-center">
            <SvgIcon name="star" className="conference-card-icon" />
            <SvgIcon name="bookmark" className="conference-card-icon" />
          </div> */}
        </div>
      </div>
      {frequency ? (
        <div className="conference-card-keyword">
          {`${keyword}: Found ${frequency} time${frequency > 1 ? "s" : ""}`}
        </div>
      ) : null}
      {showFirewall && (
        <div
          className="conference-card-firewall"
          onClick={() => setShowFirewall(false)}
        >
          <div className="upgrade-notification-panel" onClick={planUpgrade}>
            <h3>
              Upgrade to a PREMIUM Membership and get unlimited access to the
              LAB features
            </h3>
          </div>
        </div>
      )}
      <div className="test">
        <LibraryClaimModal
          visible={modalVisible}
          title="HR Credit Offered"
          destroyOnClose={true}
          data={data}
          onClaim={onHRClaimOffered}
          onCancel={() => setModalVisible(false)}
        />
      </div>
    </div>
  );
};

ConferenceCard.propTypes = {
  data: PropTypes.object,
  frequency: PropTypes.number,
  keyword: PropTypes.string,
};

ConferenceCard.defaultProps = {
  data: {},
  frequency: 0,
  keyword: "",
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  claimConferenceLibrary,
  setConferenceLibraryViewed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceCard);
