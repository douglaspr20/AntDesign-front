import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import moment from "moment";

import { default as SubPostComment } from "components/PostComment";

import PostCommentForm from "containers/PostCommentForm";

const PostComment = ({ data, postId, afterSave }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const onReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const getPostComments = (item) => {
    return (
      <SubPostComment
        data={item}
        postId={postId}
        postCommentId={item.id}
        afterSave={afterSave}
      />
    );
  };

  return (
    <Comment
      author={`${data.User.firstName} ${data.User.lastName}`}
      avatar={
        <Avatar
          src={data.User.img}
          alt={`${data.User.firstName} ${data.User.lastName}`}
        />
      }
      datetime={
        <span>{moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
      }
      content={data.comment}
      actions={[
        <span key="comment-basic-reply-to" onClick={onReplyClick}>
          Reply to
        </span>,
      ]}
    >
      {showReplyForm && (
        <PostCommentForm
          postId={postId}
          postCommentId={data.id}
          afterSave={afterSave}
        />
      )}
    </Comment>
  );
};

export default PostComment;
