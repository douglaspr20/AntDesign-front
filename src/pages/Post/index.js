import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Card, Comment, Tooltip, Avatar } from "antd";
import { getPost, updatePost } from "redux/actions/post-actions";
import { getAllComments } from "redux/actions/post-comment-actions";
import { postSelector } from "redux/selectors/postSelector";
import { postCommentSelector } from "redux/selectors/postCommentSelector";

import { CustomButton } from "components";
import PostCard from "components/PostCard";

import PostCommentForm from "containers/PostCommentForm";
import PostForm from "containers/PostForm";

import "./style.scss";

const PostPage = ({
  getPost,
  match,
  post,
  updatePost,
  getAllComments,
  allComments,
  history,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getPost(match.params.id);
    getAllComments({ postId: match.params.id });
  }, []);

  const onUpdate = (data) => {
    updatePost({ ...data, id: post.id });
    setIsUpdate(false);
  };

  const afterSaveComment = () => {
    getAllComments({ postId: post.id });
  };

  return (
    <div className="post-page">
      <div className="post-page-container">
        <CustomButton
          onClick={() => {
            setIsUpdate(true);
          }}
          text="Edit"
        />
        {post != null && isUpdate && (
          <>
            {isUpdate && (
              <Card title="Edit Post">
                <PostForm
                  postData={post}
                  buttonText="Edit"
                  onUpdate={onUpdate}
                />
              </Card>
            )}
          </>
        )}
        {post != null && !isUpdate && (
          <>
            <PostCard data={post} />
            <PostCommentForm postId={post.id} afterSave={afterSaveComment} />
            <div className="post-page-comments-container">
              {allComments.map((item) => (
                <Comment
                  author={`${item.User.firstName} ${item.User.lastName}`}
                  avatar={
                    <Avatar
                      src={item.User.img}
                      alt={`${item.User.firstName} ${item.User.lastName}`}
                    />
                  }
                  datetime={
                    <span>
                      {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  }
                  content={item.comment}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

PostPage.propTypes = {};

PostPage.defaultProps = {};

const mapStateToProps = (state) => ({
  post: postSelector(state).post,
  allComments: postCommentSelector(state).allComments,
});

const mapDispatchToProps = {
  getPost,
  updatePost,
  getAllComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
