import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Form, Input } from "antd";

import { CustomButton } from "components";

import { addComment as addPostComment } from "redux/actions/post-comment-actions";
import "./style.scss";

const PostCommentForm = ({
  postId,
  postCommentId,
  addPostComment,
  afterSave,
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
    <Card className="form-comment-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={(data) => {
          addComment(data, postId);
        }}
      >
        <Form.Item name="comment">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item>
          <CustomButton
            htmlType="submit"
            size="sm"
            text="Add comment"
          ></CustomButton>
        </Form.Item>
      </Form>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addPostComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentForm);
