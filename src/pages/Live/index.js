import React, { useEffect } from "react";
import { Divider } from "antd";
import ReactPlayer from "react-player/youtube";

import { connect } from "react-redux";
import { liveSelector } from "redux/selectors/liveSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import Emitter from "services/emitter";

import "./style.scss";
import { INTERNAL_LINKS, EVENT_TYPES } from "enum";

const LivePage = ({ history, live, userProfile }) => {
  useEffect(() => {
    if (userProfile.percentOfCompletion !== 100) {
      Emitter.emit(EVENT_TYPES.SHOW_FIREWALL, "live");
    }
  });
  return (
    <>
      {live.live === true && userProfile.percentOfCompletion === 100 ? (
        <div className="live-page">
          <div className="live-page--container">
            <div className="live-page--container--videoplayer">
              <div className="video">
                <ReactPlayer
                  url={live.url}
                  width="100%"
                  height="100%"
                  playing={true}
                />
              </div>
              <div className="chat">
                <iframe
                  title="live-chat"
                  src={`https://gaming.youtube.com/live_chat?v=${
                    live.url.split("=")[1]
                  }&embed_domain=${window.location.hostname}`}
                ></iframe>
              </div>
            </div>
            <div className="live-item">
              <Divider />
              <h2>{live.title}</h2>
            </div>
            <div className="live-item">
              <p>{live.description}</p>
            </div>
          </div>
        </div>
      ) : (
        history.push(INTERNAL_LINKS.HOME)
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  live: liveSelector(state).live,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
