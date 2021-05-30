/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Badge, Popover, Spin } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { INTERNAL_LINKS } from "enum";
import { notificationSelector } from "redux/selectors/notificationSelector";
import { getNotifications } from "redux/actions/notification-actions";
import { homeSelector } from "redux/selectors/homeSelector";

import IconNotification from "images/icon-notification.svg";
import IconLoading from "images/icon-loading.gif";

import "./style.scss";

const MAX_NOTIFICATIONS = 10;

const Notification = ({
  className,
  notificationList,
  loading,
  countOfResults,
  unreadCount,
  userProfile,
  getNotifications,
}) => {
  const renderLoading = () => (
    <div className="loading-container">
      <Spin indicator={<img src={IconLoading} alt="loading-img" />} />
    </div>
  );

  const renderNotifications = () => (
    <>
      {notificationList.slice(0, 10).map((noti) => (
        <div className="notification-item" key={noti.id}>
          {!noti.readers.includes(userProfile.id) && (
            <div className="notification-item-circle" />
          )}
          <h5 className="notification-item-message">{noti.message}</h5>
        </div>
      ))}
      <div className="notification-item see-more">
        <Link to={INTERNAL_LINKS.NOTIFICATIONS}>See more ...</Link>
      </div>
    </>
  );

  const content = () => (
    <div className="notification-content">
      {notificationList.length > 0 ? (
        loading ? (
          renderLoading()
        ) : (
          renderNotifications()
        )
      ) : (
        <div className="notification-item">
          <h5 className="notification-item-message">No notifications.</h5>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    getNotifications(1, MAX_NOTIFICATIONS);
  }, []);

  return (
    <Popover placement="bottom" title="" content={content} trigger="click">
      <Badge
        className={className}
        count={unreadCount}
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

const mapStateToProps = (state) => ({
  ...notificationSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
