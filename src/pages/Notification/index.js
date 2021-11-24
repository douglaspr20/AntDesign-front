/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Table, Tooltip } from "antd";
import isEmpty from "lodash/isEmpty";

import { CustomButton } from "components";
import { INTERNAL_LINKS } from "enum";
import { notificationSelector } from "redux/selectors/notificationSelector";
import {
  getNotifications,
  markNotificationToRead,
  markNotificationToUnRead,
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
  markNotificationToRead,
  markNotificationToUnRead,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const onMarkAsRead = () => {
    markNotificationToRead(
      selectedRows.map((row) => row.id),
      userProfile.id
    );
  };

  const onMarkAsUnread = () => {
    markNotificationToUnRead(
      selectedRows.map((row) => row.id),
      userProfile.id
    );
  };

  const HeaderMenus = [
    {
      icon: "fas fa-envelope",
      action: onMarkAsRead,
      tooltip: "Mark as read",
    },
    {
      icon: "fas fa-envelope-open",
      action: onMarkAsUnread,
      tooltip: "Mark as unread",
    },
  ];

  const renderHeader = () =>
    isEmpty(selectedRows) ? null : (
      <div className="notification-table-header">
        {HeaderMenus.map((menu) => (
          <Tooltip placement="top" title={menu.tooltip}>
            <div
              className="notification-table-header-cell"
              onClick={menu.action}
            >
              <i className={menu.icon} />
            </div>
          </Tooltip>
        ))}
      </div>
    );

  const Columns = [
    {
      title: renderHeader,
      dataIndex: "description",
      render: (action, data) => renderNotification(data),
    },
  ];

  useEffect(() => {
    getNotifications(1, MAX_NOTIFICATIONS);

    return () => {};
  }, []);

  const onShowMore = () => {
    getNotifications(currentPage + 1, MAX_NOTIFICATIONS);
  };

  const renderLoading = () => <div className="loading-container" />;

  const renderNotification = (noti) => {
    return (
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
            onClick={() => markNotificationToRead([noti.id], userProfile.id)}
          >
            Go to Event
          </a>
        )}
        {noti.type === "resource" && (
          <a
            className="notification-list-item-link"
            href={`${INTERNAL_LINKS.PROJECTX}/${noti.meta.SkillCohortId}/resources`}
            rel="noopener noreferrer"
            onClick={() => markNotificationToRead([noti.id], userProfile.id)}
          >
            Go to Resource
          </a>
        )}
        {noti.type === "podcast" && (
          <Link
            className="notification-list-item-link"
            to={INTERNAL_LINKS.PODCAST}
            onClick={() => markNotificationToRead([noti.id], userProfile.id)}
          >
            Go to Podcast
          </Link>
        )}
        {noti.type === "marketplace" && (
          <Link
            className="notification-list-item-link"
            to={INTERNAL_LINKS.MARKETPLACE}
            onClick={() => markNotificationToRead([noti.id], userProfile.id)}
          >
            Go to HR Marketplace
          </Link>
        )}
        {noti.type === "content" && (
          <Link
            className="notification-list-item-link"
            to={INTERNAL_LINKS.LEARNING_LIBRARY}
            onClick={() => markNotificationToRead([noti.id], userProfile.id)}
          >
            Go to Learning library
          </Link>
        )}
      </div>
    );
  };

  const rowSelection = {
    selectedRowKeys: (selectedRows || []).map((row) => row.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const onRowClick = (record) => {
    const isExisted = selectedRows.find((row) => row.id === record.id);
    if (isExisted) {
      setSelectedRows(selectedRows.filter((row) => row.id !== record.id));
    } else {
      setSelectedRows([...selectedRows, record]);
    }
  };

  const renderNotifications = () => (
    <>
      {notificationList.length > 0 ? (
        <>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            onRow={(record) => ({
              onClick: () => onRowClick(record),
            })}
            className="notification-table"
            columns={Columns}
            dataSource={notificationList}
            pagination={false}
            bordered={false}
            rowKey="id"
          />
          {currentPage * MAX_NOTIFICATIONS < countOfResults && (
            <div className="notification-page-showmore d-flex justify-center items-center">
              {moreLoading && (
                <div className="notification-page-loading-more">
                  <img src={IconLoadingMore} alt="loading-more-img" />
                </div>
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
  markNotificationToRead,
  markNotificationToUnRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
