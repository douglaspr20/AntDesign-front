import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Form, Input } from "antd";

import { CustomButton } from "components";

import { addComment as addPostComment } from "redux/actions/post-comment-actions";

const PostCommentForm = ({ postId, addPostComment, afterSave }) => {
  const [form] = Form.useForm();
  const addComment = (data, postCommentId = null) => {
    if (postCommentId) {
      addPostComment({ ...data, PostId: postId });
    } else {
      addPostComment(data);
    }
    afterSave();
    form.resetFields();
  };

  return (
    <Card>
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

PostCommentForm.propTypes = {};

PostCommentForm.defaultProps = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addPostComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentForm);
