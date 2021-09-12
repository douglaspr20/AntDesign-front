import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";

import { getPost, updatePost } from "redux/actions/post-actions";
import { getAllComments } from "redux/actions/post-comment-actions";
import { postSelector } from "redux/selectors/postSelector";
import { postCommentSelector } from "redux/selectors/postCommentSelector";

import PostCard from "components/PostCard";

import PostCommentForm from "containers/PostCommentForm";
import PostForm from "containers/PostForm";

import { ReactComponent as IconArrowBackCircleOutline } from "images/icon-arrow-back-circle-outline.svg";

import { INTERNAL_LINKS } from "enum";

import "./style.scss";
import PostComment from "components/PostComment";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="post-page-container--header-button-section">
          <IconArrowBackCircleOutline
            title="Back to home"
            onClick={() => {
              if (isUpdate === true) {
                setIsUpdate(false);
              } else {
                history.push(INTERNAL_LINKS.HOME);
              }
            }}
          />
        </div>
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
            <PostCard
              data={post}
              showEdit={true}
              generalFooter={false}
              onEditClick={() => {
                setIsUpdate(true);
              }}
            />
            <PostCommentForm postId={post.id} afterSave={afterSaveComment} />
            <div className="post-page-container--comments-container">
              {allComments.length > 0 ? (
                <>
                  {allComments.map((item) => (
                    <PostComment
                      key={`post-comment-${item.id}`}
                      data={item}
                      postId={post.id}
                      afterSave={afterSaveComment}
                    />
                  ))}
                </>
              ) : (
                <div className="post-page-container--comments-container--empty-message">
                  Comments not found.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

PostPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

PostPage.defaultProps = {
  match: null,
  history: null,
};

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
