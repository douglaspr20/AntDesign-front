import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";

import PostForm from "containers/PostForm";
import { getPost, updatePost } from "redux/actions/post-actions";
import { postSelector } from "redux/selectors/postSelector";

import "./style.scss";

const PostPage = ({ getPost, match, post, updatePost }) => {
  useEffect(() => {
    console.log(match.params.id);
    getPost(match.params.id);
  }, []);

  const onUpdate = (data) => {
    updatePost({...data, id: post.id});
  };

  return (
    <div className="post-page">
      <div className="post-page-container">
        {post && (
          <Card title="Edit Post">
            <PostForm postData={post} buttonText="Edit" onUpdate={onUpdate} />
          </Card>
        )}
      </div>
    </div>
  );
};

PostPage.propTypes = {};

PostPage.defaultProps = {};

const mapStateToProps = (state) => ({
  post: postSelector(state).post,
});

const mapDispatchToProps = {
  getPost,
  updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
