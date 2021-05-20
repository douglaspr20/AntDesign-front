import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ReactPlayer from 'react-player/vimeo';
import LoadingGif from 'images/icon-loading.gif';

import {
  setProgress,
} from "redux/actions/course-user-progress-actions";

import './style.scss';

const REQUIRED_VIDEO_PROGRESS_TO_SET_AS_WATCHED = 0.9;

function MicroClassVideoWrapper({ 
  url,
  setVideoAsWatched,
  id,
  courseId,
  setProgress }) {
  const idToCompare = useRef(id);
  const player = useRef(null);

  function handleProgress({ playedSeconds }) {
    setProgress({ courseId, CourseClassId: id, progress_video: playedSeconds });
    /*if (idToCompare.current === id) {
      if (loaded >= REQUIRED_VIDEO_PROGRESS_TO_SET_AS_WATCHED) {
        setVideoAsWatched(id);
      }
    } else {
      idToCompare.current = id;
    }*/
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
        progressInterval={30000}
        onProgress={handleProgress}
        onReady={() => player.current.seekTo(50)}
        ref={player}
        onEnded={(data) => { setProgress({ courseId, CourseClassId: id, viewed: true }); }}
      />
    </div>
  )
}

MicroClassVideoWrapper.propTypes = {
  url: PropTypes.string,
  setVideoAsWatched: PropTypes.func,
  id: PropTypes.number,
};

MicroClassVideoWrapper.defaultProps = {
  url: null,
  setVideoAsWatched: () => {},
  id: null,
};

const mapStateToProps = (state, props) => ({
  
});

const mapDispatchToProps = {
  setProgress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroClassVideoWrapper);