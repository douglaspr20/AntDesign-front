import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Form, } from "antd";

import { CustomButton, CustomInput } from "components";

import { addComment as addPostComment } from "redux/actions/post-comment-actions";

import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const PostCommentForm = ({
  postId,
  postCommentId,
  addPostComment,
  afterSave,
  userProfile,
}) => {
  const [form] = Form.useForm();
  const addComment = (data) => {
    if (postCommentId) {
      addPostComment({ ...data, PostCommentId: postCommentId, PostId: postId });
    } else {
      addPostComment({ ...data, PostId: postId });
    }
    afterSave();
    form.resetFields();
  };

  return (
    <Card bordered={false} className="form-comment-container">
      <div className="form-comment-container--content">
        <section class="user-img">
          <img src={userProfile.img} alt="user-img-form-comment" />
        </section>
        <section className="comment-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={(data) => {
              addComment(data, postId);
            }}
          >
            <Form.Item name="comment">
              <CustomInput multiple={true}  placeholder="Add a comment..." rows={2} />
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

PostCommentForm.propTypes = {
  postId: PropTypes.number,
  postCommentId: PropTypes.number,
  afterSave: PropTypes.func,
};

PostCommentForm.defaultProps = {
  postId: 0,
  postCommentId: 0,
  afterSave: () => {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  addPostComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentForm);
