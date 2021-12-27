import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import MicroConferenceSkeleton from "./MicroConferenceSkeleton";
import MicroConferenceVideosList from "./MicroConferenceVideosList";
import MicroConferenceVideoWrapper from "./MicroConferenceVideoWrapper";

import { getSession, getSessionClasses } from "redux/actions/session-actions";

import { homeSelector } from "redux/selectors/homeSelector";
import { sessionSelector } from "redux/selectors/sessionSelector";

import { INTERNAL_LINKS } from "enum";

import { ReactComponent as IconArrowBackCircleOutline } from "images/icon-arrow-back-circle-outline.svg";

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
                    <IconArrowBackCircleOutline
                      title="Back to Global Conference"
                      onClick={() => {
                        history.push(INTERNAL_LINKS.GLOBAL_CONFERENCE);
                      }}
                    />{" "}
                    <h2>{session.title}</h2>
                  </div>

                  <MicroConferenceVideosList
                    list={classes}
                    setActiveVideoId={(id) => setActiveVideoId(id)}
                    activeVideoId={activeVideoId}
                    sessionId={match.params.id}
                  />
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
  classes: sessionSelector(state).classes,
  user: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getSession,
  getSessionClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(MicroConference);
