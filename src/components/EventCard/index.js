import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import clsx from "clsx";

import { CustomButton } from "components";

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
  };

  onCancelAttend = () => {
    this.setState({ going: false });
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
          <h3>{title}</h3>
          <h5>{`${date} ${timezone}`}</h5>
          <h5>{type}</h5>
          <div className="d-flex justify-between items-center w-full">
            <h6>{cost}</h6>
            <div className="d-flex">
              {!going && (
                <CustomButton
                  text="Attend"
                  size="xs"
                  type="primary"
                  onClick={this.onAttend}
                />
              )}
              {going && (
                <div className="d-flex justify-center items-center">
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
};

EventCard.defaultProps = {
  data: {},
  className: "",
};

export default EventCard;
