import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CustomButton } from "components";
import PostCard from "components/PostCard";

import { categorySelector } from "redux/selectors/categorySelector";
import { postSelector } from "redux/selectors/postSelector";
import { authSelector } from "redux/selectors/authSelector";

import { SETTINGS } from "enum";

import {
  getAllPost,
  setPostLike,
  deletePostLike,
  addPostComment,
} from "redux/actions/post-actions";
import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const Posts = ({
  loading,
  getAllPost,
  allPosts,
  setPostLike,
  currentPage,
  countOfResults,
  deletePostLike,
  onShowMore,
}) => {
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div id="posts-container">
      {allPosts.map((item) => {
        return (
          <>
            <PostCard data={item} />
          </>
        );
      })}
      {currentPage * SETTINGS.MAX_SEARCH_ROW_NUM < countOfResults && (
        <div className="post-page-footer d-flex justify-center items-center">
          {loading && (
            <div className="post-page-loading-more">
              <img src={IconLoadingMore} alt="loading-more-img" />
            </div>
          )}
          {!loading && (
            <CustomButton
              text="Show more"
              type="primary outlined"
              size="lg"
              onClick={onShowMore}
            />
          )}
        </div>
      )}
    </div>
  );
};

Posts.propTypes = {
  allCategories: PropTypes.array,
};

Posts.defaultProps = {
  allCategories: [],
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userId: authSelector(state).id,
  ...postSelector(state),
});

const mapDispatchToProps = {
  getAllPost,
  setPostLike,
  deletePostLike,
  addPostComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);