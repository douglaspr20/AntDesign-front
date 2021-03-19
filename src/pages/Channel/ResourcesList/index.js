import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LibraryCard } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { CARD_TYPE } from "enum";

import { EVENT_TYPES } from "enum";
import Emitter from "services/emitter";

import { getFirstChannelLibraryList } from "redux/actions/library-actions";
import { librarySelector } from "redux/selectors/librarySelector";
import { channelSelector } from "redux/selectors/channelSelector";

const ResourcesList = ({
  resources,
  total,
  page,
  channel,
  isOwner,
  getFirstChannelLibraryList,
}) => {
  const onShowResourceModal = () => {
    Emitter.emit(EVENT_TYPES.OPEN_ADD_LIBRARY_FORM, "resource");
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
  channel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  getFirstChannelLibraryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesList);
