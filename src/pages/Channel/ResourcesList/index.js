import React from "react";
import PropTypes from "prop-types";

import { LibraryCard } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { CARD_TYPE } from "enum";

function ResourcesList({ resources, isOwner }) {
  return (
    <div className="channel-page__list-wrap">
      {!isOwner && resources.length === 0 ? (
        <NoItemsMessageCard
          message={"There are no resources for you at the moment"}
        />
      ) : (
        <div className="channels__list">
          {isOwner && <LibraryCard type={CARD_TYPE.ADD} />}
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
}

ResourcesList.propTypes = {
  resources: PropTypes.array,
  isOwner: PropTypes.bool,
};

ResourcesList.defaultProps = {
  resources: [],
  isOwner: false,
};

export default ResourcesList;
