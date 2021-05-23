/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Badge, Popover } from "antd";
import { Link } from "react-router-dom";

import { INTERNAL_LINKS } from "enum";

import IconNotification from "images/icon-notification.svg";

import "./style.scss";

const Notification = ({ className }) => {
  const notifications = Array.from(Array(30).keys()).map((id) => ({
    id,
    message: `New event ${id + 1} was created`,
  }));

  const content = () => (
    <div className="notification-content">
      {notifications.length > 0 ? (
        <>
          {notifications.slice(0, 10).map((noti) => (
            <div className="notification-item" key={noti.id}>
              <h5 className="notification-item-message">{noti.message}</h5>
            </div>
          ))}
          <div className="notification-item see-more">
            <Link to={INTERNAL_LINKS.NOTIFICATIONS}>See more ...</Link>
          </div>
        </>
      ) : (
        <div className="notification-item">
          <h5 className="notification-item-message">No notifications.</h5>
        </div>
      )}
    </div>
  );

  return (
    <Popover placement="bottom" title="" content={content} trigger="click">
      <Badge
        className={className}
        count={notifications.length}
        overflowCount={999}
      >
        <div className="notification-icon">
          <img src={IconNotification} alt="icon-notification" />
        </div>
      </Badge>
    </Popover>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
};

Notification.defaultProps = {
  className: "",
};

export default Notification;
