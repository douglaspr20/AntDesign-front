import React, { useState } from "react";
import { Divider } from "antd";
import ReactPlayer from "react-player/youtube";

import Interweave from "interweave";
import { connect } from "react-redux";
import { updateEvent } from "redux/actions/event-actions";
import { liveSelector } from "redux/selectors/liveSelector";

import { CustomButton } from "components";
import Modal from "components/Modal";

import { INTERNAL_LINKS } from "enum";
import "./style.scss";

const LivePage = ({ history, live, updateEvent }) => {
  const [visibleEventConfirm, setVisibleEventConfirm] = useState(false);
  const handleConfirmAssistence = () => {
    setVisibleEventConfirm(true);
  };

  const onConfirmAssistence = () => {
    updateEvent(live.event);
    setVisibleEventConfirm(false);
  };
  return (
    <>
      {live.live === true ? (
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
            <div live-item>
              {live.eventAssistence && (
                <div className="live-confirm-assistence-button-container">
                  <CustomButton
                    text="Click here to confirm you are participating in this event"
                    onClick={handleConfirmAssistence}
                  />
                  <Modal
                    visible={visibleEventConfirm}
                    title="Attendance Confirmation"
                    width={500}
                    onCancel={() => setVisibleEventConfirm(false)}
                    onOk={() => setVisibleEventConfirm(false)}
                    okText="Confirm"
                  >
                    <p>
                      Confirming your participation to this event will generate
                      a Digital Badge of participation. The badge will be
                      available at the end of the event under your profile, in
                      My Learning, in the Digital Certificates tab:
                    </p>
                    <div className="buttons-confirm-container">
                      <CustomButton
                        text="Confirm"
                        size="md"
                        onClick={onConfirmAssistence}
                      />
                      <CustomButton
                        text="Cancel"
                        size="md"
                        onClick={() => setVisibleEventConfirm(false)}
                      />
                    </div>
                  </Modal>
                </div>
              )}
              <div className="live-item">
                <Divider />
                <h2>{live.title}</h2>
              </div>
              <div className="live-item">
                <Interweave content={live.description} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        history.push(INTERNAL_LINKS.HOME)
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  live: liveSelector(state).live,
});

const mapDispatchToProps = {
  updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
