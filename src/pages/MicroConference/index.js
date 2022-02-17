import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Tabs } from "antd";

import MicroConferenceSkeleton from "./MicroConferenceSkeleton";
import MicroConferenceVideosList from "./MicroConferenceVideosList";
import MicroConferenceVideoWrapper from "./MicroConferenceVideoWrapper";
import {
  getSession,
  getSessionClasses,
  getParticipants,
  setParticipants,
} from "redux/actions/session-actions";
import { createConversartion } from "redux/actions/conversation-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { INTERNAL_LINKS } from "enum";
import { SpeakerCard, ParticipantCard } from "components";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import IconBack from "images/icon-back.svg";

import "./style.scss";

const { TabPane } = Tabs;

const useMicroConferenceQuery = (id) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");

    let timeout = setTimeout(() => {
      setStatus("success");
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return {
    microConferenceData: data,
    setMicroConferenceData: setData,
    status,
  };
};

const MicroConference = ({
  history,
  match,
  user,
  session,
  classes,
  getSession,
  getSessionClasses,
  getParticipants,
  setParticipants,
  participants,
  createConversartion,
}) => {
  const { status } = useMicroConferenceQuery(match.params.id);
  const [activeVideoId, setActiveVideoId] = useState(null);

  if (user.sessionsJoined && !user.sessionsJoined.includes(+match.params.id)) {
    history.push("/global-conference");
  }

  useEffect(() => {
    getSession(match.params.id);
    getSessionClasses(match.params.id);
  }, [getSession, getSessionClasses, match]);

  useEffect(() => {
    if (user.id) {
      getParticipants(user.id);
    }
  }, [getParticipants, user]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_ONLINE, (participant) => {
      setParticipants(
        participants.map((p) => (p.id === participant.id ? participant : p))
      );
    });
  }, [participants, setParticipants]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_OFFLINE, (participant) => {
      setParticipants(
        participants.map((p) => (p.id === participant.id ? participant : p))
      );
    });
  }, [participants, setParticipants]);

  const handleCreateConversation = (members) => {
    createConversartion(members);
  };

  const activeVideoUrl = useMemo(() => {
    if (classes && classes.length) {
      let videoObject = classes.find((item) => item.id === activeVideoId);
      if (videoObject && videoObject.videoUrl) {
        return videoObject.videoUrl;
      }
      return null;
    }
    return null;
  }, [activeVideoId, classes]);

  return (
    <div className="micro-conference__page">
      <div className="micro-conference__container">
        {status === "loading" && <MicroConferenceSkeleton />}

        {status === "success" && (
          <>
            <div className="micro-conference__row">
              <div className="micro-conference__row-1">
                <div className="micro-conference__row-1--video-list">
                  <div className="micro-conference__row-1--video-list--title">
                    <h2>{session.title}</h2>
                  </div>
                  <MicroConferenceVideosList
                    list={classes}
                    setActiveVideoId={(id) => setActiveVideoId(id)}
                    activeVideoId={activeVideoId}
                    sessionId={match.params.id}
                  />

                  <Link
                    to={INTERNAL_LINKS.GLOBAL_CONFERENCE}
                    className="micro-conference__row-1--video-list--back-link"
                  >
                    <img src={IconBack} alt="icon-back" />
                    <h2>Back to Global Conference</h2>
                  </Link>
                </div>
                <div className="micro-class__row-1--video-player">
                  <MicroConferenceVideoWrapper
                    url={activeVideoUrl ? activeVideoUrl : null}
                    id={activeVideoId}
                    sessionId={match.params.id}
                  />

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Session Information" key="1">
                      <div>
                        <div className="micro-conference__description-card">
                          <h3>Session Description</h3>
                          <p className="micro-conference__description-p">
                            {session.description}
                          </p>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Session Speakers" key="2">
                      <div>
                        <div className="micro-conference__description-card">
                          <h3>Session Speakers</h3>

                          <div className="micro-conference__description-speakers-list">
                            {session.speakers.length > 0 &&
                              session.speakers.map((speaker) => (
                                <SpeakerCard
                                  key={speaker.id}
                                  speaker={speaker}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </TabPane>

                    <TabPane
                      tab="Participants in the Same Class Online"
                      key="4"
                    >
                      <div>
                        <div className="micro-conference__description-card">
                          <h3>Online Participants in this Class</h3>

                          <div className="micro-conference__description-speakers-list">
                            {participants.length > 0 &&
                              participants
                                .filter(
                                  (participant) =>
                                    participant.sessionsJoined.includes(
                                      +match.params.id
                                    ) && participant.isOnline === true
                                )
                                .map((participant, i) => (
                                  <ParticipantCard
                                    key={i}
                                    participant={participant}
                                    handleCreateConversation={
                                      handleCreateConversation
                                    }
                                  />
                                ))}
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  session: sessionSelector(state).session,
  participants: sessionSelector(state).participants,
  classes: sessionSelector(state).classes,
  user: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getSession,
  getSessionClasses,
  getParticipants,
  setParticipants,
  createConversartion,
};

export default connect(mapStateToProps, mapDispatchToProps)(MicroConference);
