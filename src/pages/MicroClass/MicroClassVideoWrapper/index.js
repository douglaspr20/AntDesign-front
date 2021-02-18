import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/vimeo';
import LoadingGif from 'images/icon-loading.gif';
import './style.scss';

const REQUIRED_VIDEO_PROGRESS_TO_SET_AS_WATCHED = 0.9;

function MicroClassVideoWrapper({ url, setVideoAsWatched, id, }) {
  const idToCompare = useRef(id);

  function handleProgress({ loaded }) {
    if (idToCompare.current === id) {
      if (loaded >= REQUIRED_VIDEO_PROGRESS_TO_SET_AS_WATCHED) {
        setVideoAsWatched(id);
      }
    } else {
      idToCompare.current = id;
    }
  }

  return (
    <div className="micro-class__player-wrapper">
      <img src={LoadingGif} className="micro-class__player-loading" alt="Loading" />
      <ReactPlayer
        className="micro-class__react-player"
        controls={true}
        width="100%"
        height="100%"
        playsinline
        url={url}
        onProgress={handleProgress}
      />
    </div>
  )
}

MicroClassVideoWrapper.propTypes = {
  url: PropTypes.string,
  setVideoAsWatched: PropTypes.func,
  id: PropTypes.string,
};

MicroClassVideoWrapper.defaultProps = {
  url: null,
  setVideoAsWatched: () => {},
  id: null,
};

export default MicroClassVideoWrapper;
