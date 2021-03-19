import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LibraryCard, CustomButton } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { CARD_TYPE } from "enum";

import { EVENT_TYPES, SETTINGS } from "enum";
import Emitter from "services/emitter";

import {
  getFirstChannelLibraryList,
  getMoreChannelLibraryList,
} from "redux/actions/library-actions";
import { librarySelector } from "redux/selectors/librarySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

const ResourcesList = ({
  resources,
  total,
  page,
  channel,
  isOwner,
  loading,
  getFirstChannelLibraryList,
  getMoreChannelLibraryList,
}) => {
  const onShowResourceModal = () => {
    Emitter.emit(EVENT_TYPES.OPEN_ADD_LIBRARY_FORM, "resource");
  };

  const onShowMore = () => {
    getMoreChannelLibraryList(
      { channel: channel.id, page: page + 1 },
      "newest-first"
    );
  };

  useEffect(() => {
    if (channel && channel.id) {
      getFirstChannelLibraryList({ channel: channel.id }, "newest-first");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <div className="channel-page__list-wrap">
      {!isOwner && resources.length === 0 ? (
        <NoItemsMessageCard
          message={"There are no resources for you at the moment"}
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
              />
            ))}
          </div>
          {page * SETTINGS.MAX_SEARCH_ROW_NUM < total && (
            <div className="channel-page-loading d-flex justify-center items-center">
              {loading ? (
                <img src={IconLoadingMore} alt="loading-more-img" />
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
};

ResourcesList.defaultProps = {
  resources: [],
  isOwner: false,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesList);
