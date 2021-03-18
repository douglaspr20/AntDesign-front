import React from "react";
import PropTypes from "prop-types";
import { LibraryCard } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";

function ResourcesList({ resources }) {
  return (
    <div className="channel-page__list-wrap">
      {resources.length === 0 ? (
        <NoItemsMessageCard
          message={"There are no resources for you at the moment"}
        />
      ) : (
        <div className="channels__list">
          {resources.map((item, index) => (
            <LibraryCard key={index} data={item} locked={false} />
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
