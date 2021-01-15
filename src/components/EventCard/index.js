import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { withRouter } from "react-router-dom";

import { CustomButton, SpecialtyItem } from "components";
import { EVENT_TYPES, INTERNAL_LINKS } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

class EventCard extends React.Component {
  onAttend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ going: true });
    this.props.onAttend(true);
  };

  onCancelAttend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ going: false });
    this.props.onAttend(false);
  };

  openEventDetails = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_DETAIL, this.props.data);
  };

  onClickConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    Emitter.emit(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, this.props.data);
  };

  onClickClaimDigitalCertificate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.history.push(
      `${INTERNAL_LINKS.CERTIFICATE}/${this.props.data.id}`
    );
  };

  onClickClaimCredits = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {
      data: { title, type, ticket, location, status, image, period },
      className,
    } = this.props;

    return (
      <div
        className={clsx("event-card", className)}
        onClick={this.openEventDetails}
      >
        <div className="event-card-img">
          {image && <img src={image} alt="card-img" />}
        </div>
        <div className="event-card-content d-flex flex-column justify-between items-start">
          <h3>{title}</h3>
          <h5>{period}</h5>
          <h5>{`${location ? location.join(",") : ""} event`}</h5>
          <h6 className="event-card-cost">{ticket}</h6>
          {type && type.length > 0 && (
            <div className="event-card-topics">
              {type.map((ty, index) => (
                <SpecialtyItem key={index} title={ty} active={false} />
              ))}
            </div>
          )}
          <div className="event-card-content-footer">
            <div className="event-card-content-footer-actions">
              {status === "past" && (
                <div className="claim-buttons">
                  <CustomButton
                    className="claim-digital-certificate"
                    text="Confirm I attended this event"
                    size="md"
                    type="primary outlined"
                    onClick={this.onClickConfirm}
                  />
                </div>
              )}
              {status === "confirmed" && (
                <div className="claim-buttons">
                  <CustomButton
                    className="claim-digital-certificate"
                    text="Claim digital certificate"
                    size="md"
                    type="primary outlined"
                    onClick={this.onClickClaimDigitalCertificate}
                  />
                  <CustomButton
                    text="Claim credits"
                    size="md"
                    type="primary"
                    onClick={this.onClickClaimCredits}
                  />
                </div>
              )}
              {status === "attend" && (
                <CustomButton
                  text="Attend"
                  size="md"
                  type="primary"
                  onClick={this.onAttend}
                />
              )}
              {status === "going" && (
                <div className="going-group-part">
                  <div className="going-label">
                    <CheckOutlined />
                    <span>I'm going</span>
                  </div>
                  <CustomButton
                    className="not-going-btn"
                    text="Not going"
                    size="md"
                    type="remove"
                    remove={true}
                    onClick={this.onCancelAttend}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  onAttend: PropTypes.func,
};

EventCard.defaultProps = {
  data: {},
  className: "",
  onAttend: () => {},
};

export default withRouter(EventCard);
