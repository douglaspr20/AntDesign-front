import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";

import { CustomButton } from "components";

import "./style.scss";

class EventCard extends React.Component {
  render() {
    const {
      data: { date, title, timezone, type, cost, actionType, img },
      className,
    } = this.props;
    const newClassName = `event-card ${className || ""}`;

    return (
      <div className={newClassName}>
        <div className="event-card-img">
          {img && <img src={img} alt="card-img" />}
        </div>
        <div className="event-card-content d-flex flex-column justify-between items-start">
          <h3>{title}</h3>
          <h5>{`${date}${timezone}`}</h5>
          <h5>{type}</h5>
          <div className="d-flex justify-between items-center w-full">
            <h6>{cost}</h6>
            <div className="d-flex">
              {actionType === "attend" && (
                <CustomButton text="Attend" size="xs" type="primary" />
              )}
              {actionType === "going" && (
                <>
                  <CustomButton
                    className="not-going-btn"
                    text="Not going"
                    size="xs"
                    type="secondary outlined"
                    disabled={true}
                  />
                  <CustomButton
                    text="I'm going"
                    icon={<CheckOutlined />}
                    size="xs"
                    type="secondary outlined"
                  />
                </>
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
