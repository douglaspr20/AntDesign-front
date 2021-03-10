import React from 'react';
import PropTypes from 'prop-types';
import NoItemsMessageCard from 'components/NoItemsMessageCard';

function VideosList({ videos }) {

  return (
    <div className="channel-page__list-wrap">
      {videos.length === 0
        ? <NoItemsMessageCard message={'There are no videos for you at the moment'} />
        : <div>TODO</div>
      }
    </div>
  );
}

VideosList.propTypes = {
  videos: PropTypes.array,
};

VideosList.defaultProps = {
  videos: [],
};

export default VideosList;
