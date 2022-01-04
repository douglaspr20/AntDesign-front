import { Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "components";
import JobPostDrawer from "containers/JobPostDrawer";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";
import { jobBoardSelector } from "redux/selectors/jobBoardSelector";

import JobPost from "../JobPostCard";
import "./styles.scss";

const RecruiterView = ({
  mainJobPosts,
  upsertJobPost,
  getMyJobPosts,
  myJobPosts,
  allJobPosts,
  getAllJobPosts,
  currentPage,
  filter,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [status, setStatus] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    getMyJobPosts({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentTab === "0") {
      getAllJobPosts({
        currentPage,
        ...filter,
      });
    } else {
      getMyJobPosts({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const displayMyPostedJobs = () => {
    return (
      <div className="recruiter-view">
        <div
          className="job-post-card"
          onClick={() => setIsDrawerVisible(true)}
          style={{ cursor: "pointer" }}
        >
          <PlusOutlined
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 48,
            }}
          />
        </div>
        {myJobPosts.map((post) => {
          return <JobPost post={post} key={post.id} myPostedJobs />;
        })}
      </div>
    );
  };

  const TabData = [
    {
      title: "Main job board",
      content: () => <div>{mainJobPosts(allJobPosts)}</div>,
    },
    {
      title: "My posted jobs",
      content: displayMyPostedJobs,
    },
  ];

  const handleOnFinish = (values) => {
    values = {
      ...values,
      location: JSON.stringify(values.location),
      preferredSkills: JSON.stringify(values.preferredSkills),
      status,
    };

    upsertJobPost(values);
    form.resetFields();
    setIsDrawerVisible(false);
  };

  const handlePostButton = () => {
    setStatus("active");
    form.submit();
  };

  const handleDraftButton = () => {
    setStatus("draft");
    form.submit();
  };

  return (
    <>
      <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
      <JobPostDrawer
        form={form}
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
        handleOnFinish={handleOnFinish}
        handlePostButton={handlePostButton}
        handleDraftButton={handleDraftButton}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  ...jobBoardSelector(state),
});

const mapDispatchToProps = {
  ...jobBoardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterView);
