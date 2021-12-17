import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Avatar, Card, Form } from "antd";
import { useLocation } from "react-router-dom";

import { CustomButton, CustomInput } from "components";

import { addCouncilComment } from "redux/actions/council-comments-actions";

import { homeSelector } from "redux/selectors/homeSelector";

import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const CouncilCommentForm = ({
  councilId,
  councilCommentId,
  addCouncilComment,
  userProfile,
}) => {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const addComment = (data) => {
    if (councilCommentId) {
      form.resetFields();
      return addCouncilComment({
        ...data,
        CouncilCommentId: councilCommentId,
        CouncilId: query.get("id"),
      });
    } else {
      form.resetFields();
      return addCouncilComment({ ...data, CouncilId: query.get("id") });
    }
  };

  const onOpenFirewallModal = () => {
    Emitter.emit(EVENT_TYPES.SHOW_FIREWALL, "comment");
  };

  return (
    <Card bordered={false} className="form-comment-container">
      <div className="form-comment-container--content">
        <section className="user-img">
          {userProfile.img != null ? (
            <img src={userProfile.img} alt="user-img-form-comment" />
          ) : (
            <Avatar>{`${userProfile.firstName[0]}${userProfile.lastName[0]}`}</Avatar>
          )}
        </section>
        <section className="comment-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={(data) => {
              if (userProfile.completed === true) {
                addComment(data, councilId);
              } else {
                onOpenFirewallModal();
              }
            }}
          >
            <Form.Item name="comment">
              <CustomInput
                multiple={true}
                placeholder="Add a comment..."
                rows={2}
              />
            </Form.Item>
            <Form.Item>
              <CustomButton
                htmlType="submit"
                size="sm"
                text="Post comment"
              ></CustomButton>
            </Form.Item>
          </Form>
        </section>
      </div>
    </Card>
  );
};

CouncilCommentForm.propTypes = {
  councilId: PropTypes.number,
  councilCommentId: PropTypes.number,
  afterSave: PropTypes.func,
};

CouncilCommentForm.defaultProps = {
  councilId: 0,
  councilCommentId: 0,
  afterSave: () => {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  addCouncilComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilCommentForm);
