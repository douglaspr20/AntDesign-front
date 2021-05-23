import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const NotificationPage = ({ title }) => {
  const notifications = Array.from(Array(30).keys()).map((id) => ({
    id,
    message: `New event ${id + 1} was created`,
    date: "2020, May 22 10:00 am",
  }));

  return (
    <div className="notification-page">
      <div className="notification-page-wrapper">
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <div className="notification-list-item" key={noti.id}>
              <h4 className="notification-list-item-message">{noti.message}</h4>
              <h6 className="notification-list-item-date">{noti.date}</h6>
            </div>
          ))
        ) : (
          <div className="notification-list-item">
            <h5>No notifications</h5>
          </div>
        )}
      </div>
    </div>
  );
};

NotificationPage.propTypes = {
  title: PropTypes.string,
};

NotificationPage.defaultProps = {
  title: "",
};

export default NotificationPage;
