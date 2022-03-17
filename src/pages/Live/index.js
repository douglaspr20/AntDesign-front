import React, { useState, useEffect } from "react";
import { Divider, Modal } from "antd";
import moment from "moment";
import ReactPlayer from "react-player/youtube";

import Interweave from "interweave";
import { connect } from "react-redux";
import { updateEventUserAssistence } from "redux/actions/event-actions";
import { getUser } from "redux/actions/home-actions";
import { getEvent } from "redux/actions/event-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { liveSelector } from "redux/selectors/liveSelector";
import { eventSelector } from "redux/selectors/eventSelector";

import Emitter from "services/emitter";
import { EVENT_TYPES, INTERNAL_LINKS } from "enum";

import { CustomButton } from "components";

import "./style.scss";

const LivePage = ({
  userProfile,
  getUser,
  history,
  updateEventUserAssistence,
  live,
  myEvents,
  getEvent,
}) => {
  const [visibleEventConfirm, setVisibleEventConfirm] = useState(false);
  const [firstTimes, setFirstTimes] = useState([]);
  const [times, setTimes] = useState([]);
  const handleConfirmAssistence = () => {
    setVisibleEventConfirm(true);
  };

  const onConfirmAssistence = () => {
    let usersAssistence;
    usersAssistence = times.length > 0 && times.map((el) => JSON.stringify(el));
    if (!usersAssistence) {
      usersAssistence = firstTimes.map((el) => JSON.stringify(el));
      usersAssistence = [...new Set(usersAssistence)];
    }
    updateEventUserAssistence({
      ...myEvents,
      usersAssistence,
    });
    setVisibleEventConfirm(false);
  };

  useEffect(() => {
    getUser();
    if (live.event) {
      getEvent(Number(live.event));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  useEffect(() => {
    if (myEvents.usersAssistence) {
      myEvents.usersAssistence.length > 0 &&
        setTimes(JSON.parse(myEvents.usersAssistence));
    }
  }, [myEvents]);

  /*
   * validating event date to confirm live assistence
   * adding user to the users assistence list
   */

  useEffect(() => {
    if (!times || !times[0]?.start) {
      if (userProfile.id && myEvents.id) {
        const userAssistenceJsonToArray =
          myEvents.usersAssistence?.length > 0 &&
          myEvents.usersAssistence[0]?.map((el) => JSON.parse(el));

        setTimes(userAssistenceJsonToArray);
        myEvents.startAndEndTimes &&
          myEvents.startAndEndTimes.map((time) => {
            const start = moment(time.startTime).format("MMM DD HH");
            const end = moment(time.endTime).format("MMM DD HH");
            const usersEventAssistence = [];
            const userAssistence = userProfile.id;
            if (userAssistenceJsonToArray) {
              const addingUserToTheListUserAssistence =
                userAssistenceJsonToArray?.map((item) => {
                  if (userAssistence) {
                    if (item.usersAssistence?.length > 0) {
                      return usersEventAssistence.push(
                        ...item.usersAssistence,
                        userAssistence
                      );
                    }
                    return usersEventAssistence.push(userAssistence);
                  }
                  return item;
                });

              console.log(addingUserToTheListUserAssistence);
            }
            const norepeat = [...new Set(usersEventAssistence)];
            if (norepeat?.length > 0) {
              return setTimes((prev) => {
                const index = prev.findIndex(
                  (el) =>
                    moment(el.start).format("MM DD") ===
                      moment(start).format("MM DD") &&
                    moment(el.end).format("MM DD") ===
                      moment(end).format("MM DD")
                );
                console.log('end', moment(end).format("MM DD"))
                console.log('start', moment(start).format("MM DD"))
                console.log("index", index);
                console.log('prev', prev)
                prev[index] = {
                  start: prev[index].start,
                  end: prev[index].end,
                  usersAssistence: norepeat,
                };
                return [...prev];
              });
            } else {
              return setFirstTimes((prev) => {
                return [
                  ...prev,
                  {
                    start,
                    end,
                    usersAssistence: userAssistence ? [userAssistence] : false,
                  },
                ];
              });
            }
          });
      }
    }
  }, [myEvents, live, userProfile.id, times]);

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
                        onOk={() => onConfirmAssistence()}
                        okText="Confirm"
                      >
                        <p>
                          Confirming your participation to this event will
                          generate a Digital Badge of participation. The badge
                          will be available at the end of the event under your
                          profile, in My Learning, in the Digital Certificates
                          tab:
                        </p>
                        <div className="buttons-confirm-container"></div>
                      </Modal>
                    </div>
                  )}
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
                      Upgrade to a PREMIUM Membership and get access to this
                      LIVE event and also unlimited access to the premium
                      features in the Hacking HR LAB. Click on UPGRADE on the
                      top right
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
  myEvents: eventSelector(state).myEvents,
});

const mapDispatchToProps = {
  updateEventUserAssistence,
  getUser,
  getEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
