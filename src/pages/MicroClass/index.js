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
  getCourseInstructors,
  getCourseSponsors,
} from "redux/actions/course-actions";

import { courseSelector } from "redux/selectors/courseSelector";

import { INTERNAL_LINKS } from 'enum';

import { ReactComponent as IconArrowBackCircleOutline } from 'images/icon-arrow-back-circle-outline.svg';

import './style.scss';

const { TabPane } = Tabs;

const useMicroClassQuery = (id) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');

    let timeout = setTimeout(() => {
      setStatus('success');
    }, 1500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line
  }, []);

  return {
    microClassData: data,
    setMicroClassData: setData,
    status,
  }
}

const MicroClass = ({
  history,
  match,
  getCourse,
  course,
  getCourseClasses,
  getCourseInstructors,
  getCourseSponsors,
  classes,
  instructors,
  sponsors,
}) => {
  const { status, setMicroClassData } = useMicroClassQuery(match.params.id);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    getCourse(match.params.id);
    getCourseClasses(match.params.id);
    getCourseInstructors(match.params.id);
    getCourseSponsors(match.params.id);
    // eslint-disable-next-line
  }, []);

  const activeVideoUrl = useMemo(() => {
    if (classes && classes.length) {
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
    if (classes && classes.length) {
      is_watched = true;
      for (const videoObj of classes) {
        if (!videoObj.is_watched) {
          is_watched = videoObj.is_watched;
        }
      }
    }
    return is_watched;
  }, [classes]);

  const setVideoAsWatched = (id) => {
    setMicroClassData(prevData => {
      const dataClone = cloneDeep(prevData);
      const videoIndex = dataClone.content.findIndex(item => item.id === id);
      if (videoIndex > -1) {
        dataClone.content[videoIndex].is_watched = true;
      }
      return dataClone;
    });
  };

  const handleClaimCertificate = () => {
    if (didWachedAllVideos) {
      console.log('Watched all videos, can be certified');
    } else {
      console.log("Haven't watched all videos, can't be certified");
    }
  };

  return (
    <div className="micro-class__page">
      <div className="micro-class__container">
        {status === 'loading' &&
          <MicroClassSkeleton />
        }

        {status === 'success' &&
          <>
            <div className="micro-class__row">
              <div className="micro-class__row-1">
                <div className="micro-class__row-1--video-list">
                  <div className="micro-class__row-1--video-list--title" >
                    <IconArrowBackCircleOutline title="Back to Classes" onClick={() => { history.push(INTERNAL_LINKS.CLASSES); }} /> <h2>{course.title}</h2>
                  </div>

                  <MicroClassVideosList
                    list={classes}
                    setActiveVideoId={id => setActiveVideoId(id)}
                    activeVideoId={activeVideoId}
                    courseId={match.params.id}
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
                    courseId={match.params.id}
                  />

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Class Information" key="1">
                      {course.description && (
                        <div>
                          <div className="micro-class__description-card">
                            <h3>Course Description</h3>
                            <p className="micro-class__description-p">{course.description}</p>
                          </div>
                        </div>
                      )}
                    </TabPane>
                    {instructors.length > 0 && (
                      <TabPane tab="Instructors" key="2">
                        <div>
                          <div className="micro-class__additional-info-card">
                            <div className="micro-class__additional-info-row">
                              {instructors.map((instructor, i) => (
                                <div className="micro-class__additional-info-col"
                                  key={i}
                                >
                                  <a href={instructor.link} className="micro-class__additional-info-item" target="_blank" rel="noopener noreferrer">
                                    <span className="micro-class__additional-info-ico"
                                      style={{
                                        backgroundImage: `url(${instructor.image})`
                                      }}
                                    ></span>
                                    <span className="micro-class__additional-info-item-text">{instructor.name}</span>
                                    <span className="micro-class__additional-info-item-text-sub">{instructor.description}</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    )}
                    {sponsors.length > 0 && (
                      <TabPane tab="Sponsors" key="3">
                        <div>
                          <div className="micro-class__additional-info-card">
                            <div className="micro-class__additional-info-row">
                              {sponsors.map((sponsor, i) => (
                                <div className="micro-class__additional-info-col"
                                  key={i}
                                >
                                  <a href={sponsor.link} className="micro-class__additional-info-item" target="_blank" rel="noopener noreferrer">
                                    <span className="micro-class__additional-info-ico"
                                      style={{
                                        backgroundImage: `url(${sponsor.image})`
                                      }}
                                    ></span>
                                    <span className="micro-class__additional-info-item-text">{sponsor.name}</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    )}
                  </Tabs>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  course: courseSelector(state).course,
  classes: courseSelector(state).classes,
  instructors: courseSelector(state).instructors,
  sponsors: courseSelector(state).sponsors,
});

const mapDispatchToProps = {
  getCourse,
  getCourseClasses,
  getCourseInstructors,
  getCourseSponsors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroClass);
