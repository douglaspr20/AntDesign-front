import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import { Tabs, notification } from "antd";
import CustomButton from "components/Button";

import MicroConferenceSkeleton from "./MicroConferenceSkeleton";
import MicroConferenceVideosList from "./MicroConferenceVideosList";

import { setLoading } from "redux/actions/home-actions";

import { homeSelector } from "redux/selectors/homeSelector";
import { sessionSelector } from "redux/selectors/sessionSelector";

import { INTERNAL_LINKS, EVENT_TYPES } from "enum";
import { convertBlobToBase64 } from "utils/format";

import { ReactComponent as IconArrowBackCircleOutline } from "images/icon-arrow-back-circle-outline.svg";
import ImgHHRLogo from "images/img-certificate-logo.png";
import ImgSignature from "images/img-signature.png";
import MicroConferenceVideoWrapper from "./MicroConferenceVideoWrapper";

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

    // eslint-disable-next-line
  }, []);

  return {
    microConferenceData: data,
    setMicroConferenceData: setData,
    status,
  };
};

const MicroConference = ({ history, match, setLoading }) => {
  const { status } = useMicroConferenceQuery(match.params.id);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const activeVideoUrl = useMemo(() => {
    // if (classes && classes.length) {
    //   let videoObject = classes.find((item) => item.id === activeVideoId);
    //   if (videoObject && videoObject.videoUrl) {
    //     return videoObject.videoUrl;
    //   }
    //   return null;
    // }
    return null;
  }, [activeVideoId]);

  return (
    <div className="micro-class__page">
      <div className="micro-class__container">
        {status === "loading" && <MicroConferenceSkeleton />}

        {status === "success" && (
          <>
            <div className="micro-class__row">
              <div className="micro-class__row-1">
                <div className="micro-class__row-1--video-list">
                  <div className="micro-class__row-1--video-list--title">
                    <IconArrowBackCircleOutline
                      title="Back to Global Conference"
                      onClick={() => {
                        history.push(INTERNAL_LINKS.GLOBAL_CONFERENCE);
                      }}
                    />{" "}
                    <h2>titulo</h2>
                  </div>

                  <MicroConferenceVideosList
                    list={[]}
                    setActiveVideoId={(id) => setActiveVideoId(id)}
                    activeVideoId={activeVideoId}
                    courseId={match.params.id}
                  />
                </div>
                <div className="micro-class__row-1--video-player">
                  <MicroConferenceVideoWrapper
                    url={activeVideoUrl ? activeVideoUrl : null}
                    id={activeVideoId}
                    courseId={match.params.id}
                  />

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Session Information" key="1">
                      <div>
                        <div className="micro-class__description-card">
                          <h3>Session Description</h3>
                          <p className="micro-class__description-p">
                            description test
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
  // course: courseSelector(state).course,
  // classes: courseSelector(state).classes,
  // instructors: courseSelector(state).instructors,
  // sponsors: courseSelector(state).sponsors,
  // courseUserProgress: courseClassUserSelector(state).courseUserProgress,
  user: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  // getCourse,
  // getCourseClasses,
  // getCourseInstructors,
  // getCourseSponsors,
  // claimCourse,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(MicroConference);
