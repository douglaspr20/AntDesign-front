import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notification } from "antd";

import { LibraryCard, CustomButton } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { CARD_TYPE } from "enum";

import { SETTINGS } from "enum";

import LibraryAddDrawer from "containers/LibraryAddDrawer";
import {
  getFirstChannelLibraryList,
  getMoreChannelLibraryList,
  deleteChannelLibrary,
  setLibrary,
  shareChannelLibrary,
} from "redux/actions/library-actions";
import { librarySelector } from "redux/selectors/librarySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

const ResourcesList = ({
  resources,
  total,
  page,
  filter,
  channel,
  isOwner,
  loading,
  type,
  refresh,
  getFirstChannelLibraryList,
  getMoreChannelLibraryList,
  deleteChannelLibrary,
  setLibrary,
  shareChannelLibrary,
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onShowResourceModal = () => {
    setEditMode(false);
    setVisibleDrawer(true);
  };

  const onShowMore = () => {
    getMoreChannelLibraryList(
      {
        ...filter,
        channel: channel.id,
        contentType: type,
        page: page + 1,
      },
      "newest-first"
    );
  };

  const getFirstBunchOfResources = () => {
    if (channel && channel.id) {
      getFirstChannelLibraryList(
        { ...filter, channel: channel.id, contentType: type },
        "newest-first"
      );
    }
  };

  const handleLibrary = (menu, library) => {
    switch (menu) {
      case "edit":
        setEditMode(true);
        setLibrary(library);
        setVisibleDrawer(true);
        break;
      case "delete":
        deleteChannelLibrary(library, (err) => {
          if (err) {
            notification.error({
              message: err,
            });
          } else {
            notification.info({
              message: "Library was successfully deleted.",
            });
            getFirstBunchOfResources();
          }
        });
        break;
      case "share":
        shareChannelLibrary(library, (err) => {
          if (err) {
            notification.error({
              message: err,
            });
          } else {
            notification.info({
              message:
                "Your library was successfully added to Learning Library.",
            });
          }
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (refresh) {
      getFirstBunchOfResources();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, filter, refresh]);

  return (
    <div className="channel-page__list-wrap">
      <LibraryAddDrawer
        visible={visibleDrawer}
        type={type}
        edit={editMode}
        onAdded={() => {
          setVisibleDrawer(false);
          getFirstBunchOfResources();
        }}
        onClose={() => setVisibleDrawer(false)}
      />
      {!isOwner && resources.length === 0 ? (
        <NoItemsMessageCard
          message={`There are no ${
            type === "article" ? "resources" : "videos"
          } for you at the moment`}
        />
      ) : (
        <>
          <div className="channels__list">
            {isOwner && (
              <LibraryCard type={CARD_TYPE.ADD} onAdd={onShowResourceModal} />
            )}
            {resources.map((item, index) => (
              <LibraryCard
                type={isOwner ? CARD_TYPE.EDIT : CARD_TYPE.VIEW}
                key={index}
                data={item}
                locked={false}
                onMenuClick={(menu) => handleLibrary(menu, item)}
              />
            ))}
          </div>
          {page * SETTINGS.MAX_SEARCH_ROW_NUM < total && (
            <div className="channel-page-loading d-flex justify-center items-center">
              {loading ? (
                <div className="channel-page-loading-more">
                  <img src={IconLoadingMore} alt="loading-more-img" />
                </div>
              ) : (
                <CustomButton
                  text="Show More"
                  type="primary outlined"
                  onClick={onShowMore}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

ResourcesList.propTypes = {
  resources: PropTypes.array,
  isOwner: PropTypes.bool,
  refresh: PropTypes.bool,
  filter: PropTypes.object,
  type: PropTypes.string,
};

ResourcesList.defaultProps = {
  resources: [],
  isOwner: false,
  refresh: false,
  filter: {},
  type: "article",
};

const mapStateToProps = (state) => ({
  resources: librarySelector(state).allLibraries,
  total: librarySelector(state).countOfResults,
  page: librarySelector(state).currentPage,
  loading: librarySelector(state).loading,
  channel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  getFirstChannelLibraryList,
  getMoreChannelLibraryList,
  deleteChannelLibrary,
  setLibrary,
  shareChannelLibrary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesList);
