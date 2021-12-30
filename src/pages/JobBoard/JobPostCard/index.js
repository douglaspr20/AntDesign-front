import React, { useState } from "react";
import { CustomButton } from "components";
import JobPostDrawer from "containers/JobPostDrawer";
import { Space, Form, Tag } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS, JOB_BOARD } from "enum";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";
import { jobBoardSelector } from "redux/selectors/jobBoardSelector";

import "./styles.scss";

const JobPost = ({ post, upsertJobPost, myPostedJobs = false }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const handleOnFinish = (values) => {
    values = {
      ...values,
      location: JSON.stringify(values.location),
      preferredSkills: JSON.stringify(values.preferredSkills),
    };

    upsertJobPost({
      ...values,
      id: post.id,
    });
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

  const displayMoreBtn = !myPostedJobs && (
    <div className="job-post-btn">
      <CustomButton
        text="More"
        block
        onClick={() => history.push(`${INTERNAL_LINKS.JOB_BOARD}/${post.id}`)}
      />
    </div>
  );

  const duplicateJobPost = () => {
    let transformedPost = {
      ...post,
      location: JSON.stringify(post.location),
      preferredSkills: JSON.stringify(post.preferredSkills),
      status: "draft",
    };

    delete transformedPost.id;
    delete transformedPost.createdAt;
    delete transformedPost.updatedAt;

    upsertJobPost(transformedPost);
  };

  const displayMyPostedJobBtns = myPostedJobs && (
    <div className="job-post-btn">
      <Space>
        <CustomButton text="Edit" onClick={() => setIsDrawerVisible(true)} />
        <CustomButton
          text="Duplicate"
          type="secondary"
          onClick={duplicateJobPost}
        />
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
        <div>
          <div className="job-post-card-title">
            <h3>{post.title}</h3>
            {myPostedJobs && displayStatusTag()}
          </div>
          <div>{post.level}</div>
          <div>{displayLocation}</div>
          <div>{post.salary}</div>
        </div>
        {displayMoreBtn}
        {displayMyPostedJobBtns}
      </div>
      <JobPostDrawer
        form={form}
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
        handleOnFinish={handleOnFinish}
        post={post}
        isEdit
        handlePostButton={handlePostButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobPost);
