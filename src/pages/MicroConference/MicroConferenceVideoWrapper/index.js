import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPlayer from "react-player/vimeo";
import LoadingGif from "images/icon-loading.gif";

import { setSessionProgress } from "redux/actions/session-class-user-action";
import { sessionClassUserSelector } from "redux/selectors/sessionClassUserSelector";

import "./style.scss";

function MicroConferenceVideoWrapper({
  url,
  id,
  sessionId,
  sessionUserProgress,
  setSessionProgress,
}) {
  const player = useRef(null);

  function handleProgress({ playedSeconds }) {
    setSessionProgress({
      sessionId,
      SessionClassId: id,
      progressVideo: playedSeconds,
    });
  }

  const setProgressVideoPlayer = () => {
    for (let item of sessionUserProgress) {
      if (id === item.AnnualConferenceClassId) {
        player.current.seekTo(item.progressVideo);
      }
    }
  };

  return (
    <div className="micro-conference__player-wrapper">
      <img
        src={LoadingGif}
        className="micro-conference__player-loading"
        alt="Loading"
      />
      <ReactPlayer
        className="micro-conference__react-player"
        controls={true}
        width="100%"
        height="100%"
        playsinline
        url={url}
        progressInterval={30000}
        onProgress={handleProgress}
        playing={true}
        onReady={() => {
          setProgressVideoPlayer();
        }}
        ref={player}
        onEnded={() => {
          setSessionProgress({ sessionId, SessionClassId: id, viewed: true });
        }}
      />
    </div>
  );
}

MicroConferenceVideoWrapper.propTypes = {
  url: PropTypes.string,
  setVideoAsWatched: PropTypes.func,
  id: PropTypes.number,
};

MicroConferenceVideoWrapper.defaultProps = {
  url: null,
  setVideoAsWatched: () => {},
  id: null,
};

const mapStateToProps = (state, props) => ({
  sessionUserProgress: sessionClassUserSelector(state).sessionUserProgress,
});

const mapDispatchToProps = {
  setSessionProgress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroConferenceVideoWrapper);
