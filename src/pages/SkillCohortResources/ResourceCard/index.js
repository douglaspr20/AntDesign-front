import { CustomButton, CustomModal, CustomInput } from "components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Empty } from 'antd'
import moment from "moment-timezone";
import { isEmpty } from "lodash";
import { Space, Form, Radio } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { skillCohortResourceResponseSelector } from "redux/selectors/skillCohortResourceResponseSelector";
import { skillCohortResourceResponseAssessmentSelector } from "redux/selectors/skillCohortResourceResponseAssessmentSelector";
import { skillCohortResourceResponseRatingSelector } from "redux/selectors/skillCohortResourceResponseRatingSelector";

import { actions as skillCohortResourceResponseActions } from "redux/actions/skillCohortResourceResponse-actions";
import { actions as skillCohortResourceResponseAssessmentActions } from "redux/actions/skillCohortResourceResponseAssessment-actions";
import { actions as skillCohortResourceResponseRatingActions } from "redux/actions/skillCohortResourceResponseRating-actions";

import "./style.scss";

const requiredRule = [{ required: true, message: "This field is required." }];

const ResourceCard = (props) => {
  const {
    isYesterday,
    isPreviousResource,
    skillCohortResource,
    getResourceResponse,
    skillCohortParticipant,
    createResourceResponse,
    getAllResourceResponses,
    updateResourceResponse,
    skillCohortResourceResponse,
    allSkillCohortResourceResponses,
    getSkillCohortResourceResponseAssessment,
    allSkillCohortResourceResponseAssessments,
    upsertSkillCohortResourceResponseAssessment,
    allSkillCohortResourceResponseRatings,
    getAllResponseRating,
    upsertResponseRating,
  } = props;
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showViewComments, setShowViewComments] = useState(false);
  const [currentCommentIndx, setCurrentCommentIndx] = useState(0);

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const history = useHistory();

  useEffect(() => {
    if (!isPreviousResource) {
      if (!isEmpty(skillCohortParticipant)) {
        getResourceResponse(skillCohortResource.id, skillCohortParticipant.id);
      }
    } else {
      if (isYesterday && !isEmpty(skillCohortParticipant)) {
        getAllResourceResponses(
          skillCohortResource.id,
          skillCohortParticipant.id
        );
      }
    }
    // eslint-disable-next-line
  }, [skillCohortParticipant]);

  useEffect(() => {
    if (isPreviousResource) {
      if (!isEmpty(allSkillCohortResourceResponses)) {
        if (isYesterday) {
          const ids = allSkillCohortResourceResponses.map((response) => {
            return response.id;
          });

          getSkillCohortResourceResponseAssessment(
            skillCohortResource.id,
            skillCohortParticipant.id,
            ids
          );
          getAllResponseRating(
            skillCohortResource.id,
            skillCohortParticipant.id
          );
        }
      }
    }
    // eslint-disable-next-line
  }, [allSkillCohortResourceResponses]);

  useEffect(() => {
    form2.resetFields();
    // eslint-disable-next-line
  }, [currentCommentIndx, showCommentModal]);

  const handleRespondSubmit = async (values) => {
    if (isEmpty(skillCohortResourceResponse)) {
      createResourceResponse(
        skillCohortResource.id,
        skillCohortParticipant.id,
        values.response
      );
      setShowRespondModal(false);
    } else {
      updateResourceResponse(
        skillCohortResourceResponse.id,
        values.response,
        history
      );
    }
  };

  const handleSubmitForm2 = (values) => {
    let assessment = {
      assessment: values.assessment,
    };

    let rating = {
      rating: values.rating,
    };

    if (
      !isEmpty(allSkillCohortResourceResponseAssessments[currentCommentIndx])
    ) {
      assessment = {
        ...allSkillCohortResourceResponseAssessments[currentCommentIndx],
        ...assessment,
      };
    } else {
      assessment = {
        ...assessment,
        SkillCohortResourceId: skillCohortResource.id,
        SkillCohortResourceResponseId:
          allSkillCohortResourceResponses[currentCommentIndx].id,
        SkillCohortParticipantId: skillCohortParticipant.id,
      };
    }

    upsertSkillCohortResourceResponseAssessment(assessment);

    if (!isEmpty(allSkillCohortResourceResponseRatings[currentCommentIndx])) {
      rating = {
        ...allSkillCohortResourceResponseRatings[currentCommentIndx],
        ...rating,
      };
    } else {
      rating = {
        ...rating,
        SkillCohortResourceId: skillCohortResource.id,
        SkillCohortResourceResponseId:
          allSkillCohortResourceResponses[currentCommentIndx].id,
        SkillCohortParticipantId: skillCohortParticipant.id,
      };
    }

    upsertResponseRating(rating);
  };

  const handleNextResponse = () => {
    setCurrentCommentIndx((state) => state + 1);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setCurrentCommentIndx(0);
    form2.resetFields();
  };

  const handleShowResponseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRespondModal(true);
  };

  const handleShowCommentModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCommentModal(true);
  };

  const handleShowViewComments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowViewComments(true);
  };

  const assessments = allSkillCohortResourceResponses.map((response) => {
    return allSkillCohortResourceResponseAssessments.find((assessment) => {
      return assessment.SkillCohortResourceResponseId === response.id;
    });
  });

  const ratings = allSkillCohortResourceResponses.map((response) => {
    return allSkillCohortResourceResponseRatings.find((rating) => {
      return rating.SkillCohortResourceResponseId === response.id;
    });
  });

  const isEqual =
    currentCommentIndx === allSkillCohortResourceResponses.length - 1;
  const displayRespondButtonText = !isEmpty(skillCohortResourceResponse)
    ? "Edit response"
    : "Respond";

  const displayResourcesBtn = isPreviousResource ? (
    <>
      <div className="skill-cohort-resource-card-content">
        <div className="skill-cohort-resource-card-join-btn">
          {!isEmpty(allSkillCohortResourceResponses) && isYesterday && (
            <CustomButton
              text="Comment"
              size="md"
              onClick={handleShowCommentModal}
              block={true}
            />
          )}
          {!isYesterday && (
            <CustomButton
              text="View all comments"
              size="md"
              block={true}
              onClick={handleShowViewComments}
            />
          )}
        </div>
      </div>
      <CustomModal
        visible={showCommentModal}
        onCancel={closeCommentModal}
        width={613}
        title={
          !isEmpty(allSkillCohortResourceResponses) &&
          allSkillCohortResourceResponses[currentCommentIndx].response
        }
      >
        <div className="other-user-comment"></div>
        <div className="feedback">
          <Form form={form2} onFinish={handleSubmitForm2}>
            <Form.Item
              name="rating"
              rules={requiredRule}
              initialValue={ratings[currentCommentIndx]?.rating ?? ""}
            >
              <div className="rating-wrapper">
                <Radio.Group buttonStyle="solid">
                  <Space>
                    <h4>Rate</h4>
                    <Radio.Button value="like">
                      <LikeOutlined />
                    </Radio.Button>
                    <Radio.Button value="dislike">
                      <DislikeOutlined />
                    </Radio.Button>
                  </Space>
                </Radio.Group>
                <Space>
                  Comments
                  <span className="commentCtr">{`${
                    currentCommentIndx + 1
                  }/5`}</span>
                </Space>
              </div>
            </Form.Item>
          </Form>
          <Form form={form2} onFinish={handleSubmitForm2}>
            <Form.Item
              name="assessment"
              rules={requiredRule}
              initialValue={assessments[currentCommentIndx]?.assessment ?? ""}
            >
              <CustomInput multiple={true} placeholder="Your feedback here" />
            </Form.Item>
            <div className="assessmentBtn">
              <Form.Item>
                <CustomButton
                  text="Reply"
                  size="md"
                  type="primary outlined"
                  htmlType="submit"
                />
              </Form.Item>
              {!isEqual && (
                <CustomButton
                  text="Next comment"
                  size="md"
                  type="primary"
                  htmlType="button"
                  onClick={handleNextResponse}
                />
              )}
            </div>
          </Form>
        </div>
      </CustomModal>
    </>
  ) : (
    <>
      <div className="skill-cohort-resource-card-content">
        <div className="skill-cohort-resource-card-join-btn">
          <CustomButton
            text={displayRespondButtonText}
            size="md"
            onClick={handleShowResponseModal}
            block={true}
          />
        </div>
      </div>
      <CustomModal
        visible={showRespondModal}
        title="What did you learn from this resource and how are you planning to
        apply it in your day-to-day and long-term HR practice?"
        onCancel={() => setShowRespondModal(false)}
        width={613}
      >
        <div className="question-modal">
          <Form form={form1} onFinish={handleRespondSubmit}>
            <Form.Item
              name="response"
              rules={requiredRule}
              initialValue={
                !isEmpty(skillCohortResourceResponse)
                  ? skillCohortResourceResponse.response
                  : ""
              }
            >
              <CustomInput multiple={true} placeholder="Your answers here." />
            </Form.Item>
            <Form.Item>
              <div className="response-btn">
                <CustomButton
                  text="Post response"
                  size="md"
                  type="primary"
                  htmlType="submit"
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </CustomModal>
    </>
  );

  return (
    <div>
      <a
        href={skillCohortResource.resourceLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="card">
          <Space direction="vertical" size="middle">
            <h3>{skillCohortResource.title}</h3>
            <div className="description">{skillCohortResource.description}</div>
            {isPreviousResource && (
              <div className="description">
                {moment(skillCohortResource.releaseDate).format("LL")}
              </div>
            )}
          </Space>
          {displayResourcesBtn}
        </div>
      </a>
      <CustomModal
        visible={showViewComments}
        title="Comments"
        onCancel={() => setShowViewComments(false)}
        width={613}
      >
        <div className="view-comments">
          {skillCohortResource.SkillCohortResourceResponses.map((response, index) => {
            return <div key={index}>{`${index + 1} - ${response.response}`}</div>;
          }) || []}
          {isEmpty(skillCohortResource.SkillCohortResourceResponses) && <Empty />}
        </div>
      </CustomModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...skillCohortResourceResponseSelector(state),
  ...skillCohortResourceResponseAssessmentSelector(state),
  ...skillCohortResourceResponseRatingSelector(state),
});

const mapDispatchToProps = {
  ...skillCohortResourceResponseActions,
  ...skillCohortResourceResponseAssessmentActions,
  ...skillCohortResourceResponseRatingActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCard);
