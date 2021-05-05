import React, { useState, useEffect, useMemo } from 'react';
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import MicroClassSkeleton from './MicroClassSkeleton';
import MicroClassVideosList from './MicroClassVideosList';
import MicroClassVideoWrapper from './MicroClassVideoWrapper';
import CustomButton from "components/Button";
import { Tabs } from 'antd';

import {
  getCourse,
  getCourseClasses,
} from "redux/actions/course-actions";

import { courseSelector } from "redux/selectors/courseSelector";

import './style.scss';
import HARDCODED_MICRO_CLASS_DATA from './HARDCODED_DATA.js';

const { TabPane } = Tabs;

const useMicroClassQuery = (id) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');

    let timeout = setTimeout(() => {
      setData(HARDCODED_MICRO_CLASS_DATA);
      setStatus('success');
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return {
    microClassData: data,
    setMicroClassData: setData,
    status,
  }
}

const MicroClass = ({
  match,
  getCourse,
  course,
  getCourseClasses,
  classes,
}) => {
  const { microClassData, status, setMicroClassData } = useMicroClassQuery(match.params.id);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    getCourse(match.params.id);
    getCourseClasses(match.params.id);
  }, []);

  const activeVideoUrl = useMemo(() => {
    if (microClassData && classes && classes.length) {
      let videoObject = classes.find(item => item.id === activeVideoId);
      if (videoObject && videoObject.videoUrl) {
        return videoObject.videoUrl;
      }
      return null;
    }
    return null;
  }, [activeVideoId, classes]);

  const didWachedAllVideos = useMemo(() => {
    let is_watched = false;
    if (microClassData && classes && classes.length) {
      is_watched = true;
      for (const videoObj of classes) {
        if (!videoObj.is_watched) {
          is_watched = videoObj.is_watched;
        }
      }
    }
    return is_watched;
  }, [classes]);

  function setVideoAsWatched(id) {
    setMicroClassData(prevData => {
      const dataClone = cloneDeep(prevData);
      const videoIndex = dataClone.content.findIndex(item => item.id === id);
      if (videoIndex > -1) {
        dataClone.content[videoIndex].is_watched = true;
      }
      return dataClone;
    });
  }

  function handleClaimCertificate() {
    if (didWachedAllVideos) {
      console.log('Watched all videos, can be certified');
    } else {
      console.log("Haven't watched all videos, can't be certified");
    }
  }

  return (
    <div className="micro-class__page">
      <div className="micro-class__container">
        {status === 'loading' &&
          <MicroClassSkeleton />
        }

        {status === 'success' &&
          <div className="micro-class__row">
            <div className="micro-class__row-1">
              <div className="micro-class__row-1--video-list">
                <h2>{course.title}</h2>

                <MicroClassVideosList
                  list={classes}
                  setActiveVideoId={id => setActiveVideoId(id)}
                  activeVideoId={activeVideoId}
                />

                <div className="micro-class__claim-certificate-button-wrap">
                  <CustomButton
                    disabled={!didWachedAllVideos}
                    htmlType="button"
                    type="primary"
                    size="lg"
                    onClick={handleClaimCertificate}
                    text="Claim Digital Certificate"
                  />
                  <span className="micro-class__claim-certificate-button-span">(only available when all sub-videos have been watched)</span>
                </div>
              </div>
              <div className="micro-class__row-1--video-player">
                <MicroClassVideoWrapper
                  url={activeVideoUrl ? activeVideoUrl : null}
                  id={activeVideoId}
                  setVideoAsWatched={setVideoAsWatched}
                />
              </div>
            </div>
            <div className="micro-class__row-1">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Class Information" key="1">
                    {microClassData.description && (
                      <div>
                        <div className="micro-class__description-card">
                          <h3>Course Description</h3>
                          <p className="micro-class__description-p">{course.description}</p>
                        </div>
                      </div>
                    )}
                </TabPane>
                <TabPane tab="Instructors" key="2">
                  {microClassData.instructors.length && (
                    <div className="micro-class__additional-info-card">
                      <div className="micro-class__additional-info-row">
                        {microClassData.instructors.map((instructor, i) => (
                          <div className="micro-class__additional-info-col"
                            key={i}
                          >
                            <div className="micro-class__additional-info-item">
                              <span className="micro-class__additional-info-ico"
                                style={{
                                  backgroundImage: `url(${instructor.icon})`
                                }}
                              ></span>
                              <span className="micro-class__additional-info-item-text">{instructor.name}</span>
                              <span className="micro-class__additional-info-item-text-sub">{instructor.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabPane>
                <TabPane tab="Sponsors" key="3">
                  {microClassData.sponsors.length && (
                    <div className="micro-class__additional-info-card">
                      <div className="micro-class__additional-info-row">
                        {microClassData.sponsors.map((sponsor, i) => (
                          <div className="micro-class__additional-info-col"
                            key={i}
                          >
                            <a href={sponsor.link} className="micro-class__additional-info-item" target="_blank" rel="noopener noreferrer">
                              <span className="micro-class__additional-info-ico"
                                style={{
                                  backgroundImage: `url(${sponsor.icon})`
                                }}
                              ></span>
                              <span className="micro-class__additional-info-item-text">{sponsor.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  course: courseSelector(state).course,
  classes: courseSelector(state).classes,
});

const mapDispatchToProps = {
  getCourse,
  getCourseClasses,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroClass);
