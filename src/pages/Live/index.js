import React, { useEffect } from "react";
import { Divider } from "antd";
import ReactPlayer from "react-player/youtube";

import { connect } from "react-redux";
import { getUser } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { liveSelector } from "redux/selectors/liveSelector";

import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import { CustomButton } from "components";

import Interweave from "interweave";
import "./style.scss";
import { INTERNAL_LINKS } from "enum";

const LivePage = ({ userProfile, getUser, history, live }) => {
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpgrade = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  return (
    <>
      {live.live === true ? (
        <>
          {(live.live === true && userProfile.memberShip === "premium") ||
          (live.live === true &&
            userProfile.memberShip === "free" &&
            live.isFree === true) ? (
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
                  <Interweave content={live.description} />
                </div>
              </div>
            </div>
          ) : (
            <div className="live-page">
              <div className="home-page-container--upgrade">
                {userProfile && userProfile.memberShip === "free" && (
                  <div className="recommend-card">
                    <h2 className="recommend-card-label">
                      Upgrade to a PREMIUM Membership and get unlimited access
                      to the LAB features
                    </h2>
                    <CustomButton
                      text="Upgrade"
                      type="primary"
                      size="xl"
                      className="recommend-card-upgrade"
                      onClick={onUpgrade}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        history.push(INTERNAL_LINKS.HOME)
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  live: liveSelector(state).live,
});

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
