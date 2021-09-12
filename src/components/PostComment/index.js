import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment, Avatar, Popconfirm } from "antd";
import moment from "moment";

import { DeleteOutlined } from "@ant-design/icons";

import { default as SubPostComment } from "components/PostComment";
import PostCommentForm from "containers/PostCommentForm";
import { deleteComment } from "redux/actions/post-comment-actions";
import { authSelector } from "redux/selectors/authSelector";

const PostComment = ({
  userId,
  data,
  postId,
  afterSave,
  enableReply,
  deleteComment,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const onReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const getPostComments = (item) => {
    return (
      <SubPostComment
        key={`post-comment-${item.id}`}
        data={item}
        postId={postId}
        postCommentId={item.id}
        afterSave={afterSave}
        enableReply={false}
      />
    );
  };

  const onRemoveComment = () => {
    deleteComment({ id: data.id, PostId: data.PostId });
  };

  return (
    <Comment
      author={`${data.userFirstName} ${data.userLastName}`}
      avatar={
        <Avatar
          src={data.userImg}
          alt={`${data.userFirstName} ${data.userLastName}`}
        />
      }
      datetime={
        <span>{moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
      }
      content={data.comment}
      actions={[
        enableReply && (
          <span key="comment-basic-reply-to" onClick={onReplyClick}>
            Reply to
          </span>
        ),
        userId === data.UserId && (
          <Popconfirm
            title="Are you sure you want to permanently remove this item?"
            onConfirm={onRemoveComment}
          >
            <DeleteOutlined></DeleteOutlined> Remove
          </Popconfirm>
        ),
      ]}
    >
      {showReplyForm && (
        <PostCommentForm
          postId={postId}
          postCommentId={data.id}
          afterSave={() => {
            setShowReplyForm(!showReplyForm);
            afterSave();
          }}
        />
      )}
      {data.PostComments && (
        <>{data.PostComments.map((item) => getPostComments(item))}</>
      )}
    </Comment>
  );
};

PostComment.propTypes = {
  enableReply: PropTypes.bool,
  data: PropTypes.number,
  postId: PropTypes.number,
  afterSave: PropTypes.func,
};

PostComment.defaultProps = {
  enableReply: true,
  data: null,
  postId: 0,
  afterSave: () => {},
};

const mapStateToProps = (state) => ({
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
