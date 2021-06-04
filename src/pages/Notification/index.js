/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { CustomButton } from "components";
import { INTERNAL_LINKS } from "enum";
import { notificationSelector } from "redux/selectors/notificationSelector";
import {
  getNotifications,
  marketNotificationToRead,
} from "redux/actions/notification-actions";
import { homeSelector } from "redux/selectors/homeSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const MAX_NOTIFICATIONS = 50;

const NotificationPage = ({
  notificationList,
  loading,
  moreLoading,
  currentPage,
  countOfResults,
  userProfile,
  getNotifications,
  marketNotificationToRead,
}) => {
  useEffect(() => {
    getNotifications(1, MAX_NOTIFICATIONS);

    return () => {
      const unreadNotifications = notificationList
        .filter((noti) => !noti.readers.includes(userProfile.id))
        .map((noti) => noti.id);
      marketNotificationToRead(unreadNotifications, userProfile.id);
    };
  }, []);

  const onShowMore = () => {
    getNotifications(currentPage + 1, MAX_NOTIFICATIONS);
  };

  const renderLoading = () => <div className="loading-container" />;

  const renderNotifications = () => (
    <>
      {notificationList.length > 0 ? (
        <>
          {notificationList.map((noti) => (
            <div className="notification-list-item" key={noti.id}>
              <div className="notification-list-item-left">
                <div className="notification-list-item-message">
                  {!noti.readers.includes(userProfile.id) && (
                    <div className="notification-list-item-circle" />
                  )}
                  <h4>{noti.message}</h4>
                </div>
                <h6 className="notification-list-item-date">
                  {moment(noti.createdAt).format("YYYY, MMM DD h:mm a")}
                </h6>
              </div>
              {noti.type === "event" && (
                <a
                  className="notification-list-item-link"
                  href={noti.meta.publicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to public page
                </a>
              )}
              {noti.type === "podcast" && (
                <Link
                  className="notification-list-item-link"
                  to={INTERNAL_LINKS.PODCAST}
                >
                  Go to Podcast
                </Link>
              )}
              {noti.type === "marketplace" && (
                <Link
                  className="notification-list-item-link"
                  to={INTERNAL_LINKS.MARKETPLACE}
                >
                  Go to HR Marketplace
                </Link>
              )}
              {noti.type === "content" && (
                <Link
                  className="notification-list-item-link"
                  to={INTERNAL_LINKS.LEARNING_LIBRARY}
                >
                  Go to Learning library
                </Link>
              )}
            </div>
          ))}
          {currentPage * MAX_NOTIFICATIONS < countOfResults && (
            <div className="notification-page-showmore d-flex justify-center items-center">
              {moreLoading && (
                <img src={IconLoadingMore} alt="loading-more-img" />
              )}
              {!moreLoading && (
                <CustomButton
                  text="Show more"
                  type="primary outlined"
                  size="lg"
                  onClick={onShowMore}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <div className="notification-list-item">
          <h5>No notifications</h5>
        </div>
      )}
    </>
  );

  return (
    <div className="notification-page">
      <div className="notification-page-wrapper">
        {loading ? renderLoading() : renderNotifications()}
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

const mapStateToProps = (state) => ({
  ...notificationSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getNotifications,
  marketNotificationToRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
