import React, { useState } from "react";
import { CustomButton } from "components";
import JobPostDrawer from "containers/JobPostDrawer";
import { Form, Tag, Space, Tooltip } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS, JOB_BOARD } from "enum";
import { PlusOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";
import { jobBoardSelector } from "redux/selectors/jobBoardSelector";

import "./styles.scss";

const JobPostCard = ({ post, upsertJobPost, myPostedJob = false }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [status, setStatus] = useState();
  const [form] = Form.useForm();
  const history = useHistory();

  const handleOnFinish = (values) => {
    let preferredSkills = values.preferredSkills?.map((skill) => {
      return {
        title: skill.preferredSkills[0],
        skill: skill.preferredSkills[1],
        level: skill.preferredSkills[2],
      };
    });

    const transformedPreferredSkillsMain = {
      title: values.preferredSkillsMain[0],
      skill: values.preferredSkillsMain[1],
      level: values.preferredSkillsMain[2],
    };

    preferredSkills = [transformedPreferredSkillsMain, ...preferredSkills];

    delete values.preferredSkillsMain;

    values = {
      ...values,
      location: JSON.stringify(values.location),
      preferredSkills: JSON.stringify(preferredSkills),
      mainJobFunctions: JSON.stringify(values.mainJobFunctions),
      status: status || values.status,
    };

    if (status) {
      form.setFieldsValue({
        status,
      });
    }

    upsertJobPost({
      ...values,
      id: post.id,
    });

    setStatus(null);
  };

  const handlePostButton = () => {
    form.submit();
  };

  const displayLocation = post.location
    .map((location) => {
      const data = JOB_BOARD.LOCATIONS.find((loc) => loc.value === location);

      return data.text;
    })
    .join("/");

  const displayMoreBtn = !myPostedJob && (
    <div className="job-post-btn">
      <CustomButton
        text="More Information"
        block
        onClick={() =>
          history.push(
            `${INTERNAL_LINKS.TALENT_MARKETPLACE}/job-post/${post.id}`
          )
        }
      />
    </div>
  );

  const duplicateJobPost = () => {
    let transformedPost = {
      ...post,
      location: JSON.stringify(post.location),
      preferredSkills: JSON.stringify(post.preferredSkills),
      mainJobFunctions: JSON.stringify(post.mainJobFunctions),
      status: "draft",
    };

    delete transformedPost.id;
    delete transformedPost.createdAt;
    delete transformedPost.updatedAt;

    upsertJobPost(transformedPost);
  };

  const handlePostJob = () => {
    upsertJobPost({
      ...post,
      preferredSkills: JSON.stringify(post.preferredSkills),
      mainJobFunctions: JSON.stringify(post.mainJobFunctions),
      location: JSON.stringify(post.location),
      status: "active",
    });
  };

  const handlePostDraftButton = () => {
    setStatus("active");
    form.submit();
  };

  const displayMyPostedJobBtns = myPostedJob && (
    <div className="job-post-btn">
      <Space>
        <Tooltip title="Edit Job Post">
          <EditOutlined
            onClick={() => setIsDrawerVisible(true)}
            className="job-post-bnt-icon"
          />
        </Tooltip>
        {post.status === "draft" && (
          <Tooltip title="Publish Job Post">
            <PlusOutlined
              onClick={handlePostJob}
              className="job-post-bnt-icon"
            />
          </Tooltip>
        )}
        <Tooltip title="Duplicate Job Post">
          <CopyOutlined
            onClick={duplicateJobPost}
            className="job-post-bnt-icon"
          />
        </Tooltip>
      </Space>
    </div>
  );

  const displayStatusTag = () => {
    let color;

    if (post.status === "active") {
      color = "blue";
    } else if (post.status === "draft") {
      color = "orange";
    } else if (post.status === "expired") {
      color = "red";
    } else {
      color = "black";
    }

    const data = JOB_BOARD.STATUS.find(
      (status) => status.value === post.status
    );

    return <Tag color={color}>{data.text}</Tag>;
  };

  return (
    <div className="job-post-card">
      <div className="job-post">
        <div className="job-post-card-wrapper">
          <div className="job-post-card-header">
            <h3>{post.jobTitle}</h3>
            {myPostedJob && displayStatusTag()}
          </div>
          <div className="job-post-card-content">
            <div>
              <strong>Role level:</strong> {post.level}
            </div>
            <div>
              <strong>Job location type:</strong> {displayLocation}
            </div>
            <div>
              <strong>Salary range:</strong> {post.salaryRange}
            </div>
          </div>
        </div>
        {displayMoreBtn}
        {displayMyPostedJobBtns}
      </div>
      <JobPostDrawer
        isEdit
        form={form}
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
        handleOnFinish={handleOnFinish}
        post={post}
        handlePostButton={handlePostButton}
        handlePostDraftButton={handlePostDraftButton}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...jobBoardSelector(state),
});

const mapDispatchToProps = {
  ...jobBoardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPostCard);
