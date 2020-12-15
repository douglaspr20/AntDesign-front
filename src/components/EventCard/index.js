import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import clsx from "clsx";

import { CustomButton } from "components";
import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      going: props.data ? props.data.going : false,
    };
  }

  onAttend = () => {
    this.setState({ going: true });
    this.props.onAttend();
  };

  onCancelAttend = () => {
    this.setState({ going: false });
  };

  openEventDetails = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_ARTICLE, this.props.data);
  };

  render() {
    const {
      data: { date, title, timezone, type, cost, img },
      className,
    } = this.props;
    const { going } = this.state;

    return (
      <div className={clsx("event-card", className)}>
        <div className="event-card-img">
          {img && <img src={img} alt="card-img" />}
        </div>
        <div className="event-card-content d-flex flex-column justify-between items-start">
          <h3 onClick={this.openEventDetails}>{title}</h3>
          <h5>{`${date} ${timezone}`}</h5>
          <h5>{type}</h5>
          <div className="event-card-content-footer">
            <h6 className="event-card-cost">{cost}</h6>
            <div className="event-card-content-footer-actions">
              {!going && (
                <CustomButton
                  text="Attend"
                  size="xs"
                  type="primary"
                  onClick={this.onAttend}
                />
              )}
              {going && (
                <div className="going-group-part">
                  <div className="going-label">
                    <CheckOutlined />
                    <span>I'm going</span>
                  </div>
                  <CustomButton
                    className="not-going-btn"
                    text="Not going"
                    size="xs"
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

export default EventCard;
