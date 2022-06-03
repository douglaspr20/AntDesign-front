import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Space } from "antd";
import moment from "moment-timezone";
import { CustomButton, CustomModal } from "components";
import { INTERNAL_LINKS } from "enum";
import IconBack from "images/icon-back.svg";

import "./style.scss";

const SimulationSprint = () => {
  const [confirmJoinModal, setConfirmJoinModal] = useState(false);

  const history = useHistory();
  return (
    <div className="sprints-detail-page">
      <div className="sprints-detail-page-header">
        <div className="sprints-detail-page-header-content">
          <div>
            <div
              className="sprints-detail-page-header-content-back-btn"
              onClick={() =>
                history.push(
                  `${INTERNAL_LINKS.SIMULATION_SPRINTS}?key=upcoming-sprints`
                )
              }
            >
              <div className="sprints-detail-page-header-content-back">
                <div className="sprints-detail-page-header-content-back-img">
                  <img src={IconBack} alt="icon-back" />
                </div>
                <h4>Back to List</h4>
              </div>
            </div>
            <div className="title">
              <h2>Driving Change and Innovation</h2>
            </div>
          </div>
        </div>
        <div className="sprints-btn">
          <CustomButton
            text="Join"
            htmlType="button"
            onClick={() => setConfirmJoinModal(true)}
            disabled={false}
          />
        </div>
      </div>
      <div className="sprints-detail-page-body">
        <div className="sprints-detail-page-body-content">
          <Space direction="vertical" size="large">
            <Space direction="vertical" size="large">
              <h3>How ProjectX Works</h3>
              {/* <div
              className="details"
              dangerouslySetInnerHTML={{
                __html: (skillCohort.howProjectXWorks || {}).html || "",
              }}
            /> */}

              <div className="details">
                <p>
                  <strong>Driving Change and Innovation</strong> ProjectX Cohort
                  is a 66-day program that is 100% virtual focusing on learning
                  the skill of Driving Change and Innovation. There are daily
                  and weekly activities that you are required to complete. You
                  will receive a daily learning resource for 66 consecutive
                  days. The learning resource is either reading material, audio,
                  or video to help you master the skill. Daily, you will reflect
                  on what they learned and how you plan to apply what you
                  learned. In addition, there is a weekly activity where you
                  will interact and collaborate with peers worldwide. Finally,
                  you will work on a study case to demonstrate what you have
                  learned during the program.
                </p>
              </div>
            </Space>
            <Space direction="vertical" size="large">
              <h3>Description </h3>
              {/* <div
                className="details"
                dangerouslySetInnerHTML={{
                  __html: (skillCohort.description || {}).html || "",
                }}
              /> */}

              <div className="details">
                <p>
                  <strong>Driving Change and Innovation</strong> is the path to
                  developing innovation from an aspirational concept to the
                  driving force of a company starts with understanding the
                  origin reasons of our resistance to change.
                </p>
              </div>
            </Space>

            <Space direction="vertical" size="large">
              <h3>Schedule</h3>
              <div className="details">Starting on {moment().format("LL")}</div>
              <div className="details">
                Finishing on {moment().format("LL")}
              </div>
            </Space>
          </Space>
        </div>
      </div>
      <CustomModal
        visible={confirmJoinModal}
        title="Join this Sprint?"
        subTitle="Click confirm if you want to join"
        onCancel={() => setConfirmJoinModal(false)}
        width={376}
      >
        <div className="confirm-modal">
          <CustomButton
            text="Cancel"
            type="primary outlined"
            htmlType="button"
            onClick={() => setConfirmJoinModal(false)}
          />
          <CustomButton
            text="Confirm"
            type="primary"
            htmlType="button"
            onClick={() => setConfirmJoinModal(false)}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default SimulationSprint;
