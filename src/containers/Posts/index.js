import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Avatar, Comment, Card, Form, Input } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { CustomButton, SpecialtyItem } from "components";
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
  addPostComment,
  userId,
  onShowMore,
}) => {
  useEffect(() => {
    getAllPost();
  }, []);

  const markAsLiked = (postId) => {
    setPostLike({ PostId: postId });
  };

  const removeLike = (id) => {
    deletePostLike({ id });
  };

  const addComment = (data, postId, postCommentId = null) => {
    data["PostId"] = postId;
    if (postCommentId) {
      addPostComment({ ...data, PostId: postId });
    } else {
      addPostComment(data);
    }
  };

  const searchLike = (postId, likes) => {
    let exists = false;
    for (let item of likes) {
      if (item.PostId === postId && item.UserId === userId) {
        exists = item.id;
        break;
      }
    }
    return exists;
  };

  const renderLikeAction = (item) => {
    /*const likeItem = searchLike(item.id, item.PostLikes);
    if (likeItem) {
      return (
        <LikeFilled
          key="Like"
          onClick={() => {
            removeLike(likeItem);
          }}
        />
      );
    }
    */
    return (
      <LikeOutlined
        key="Like"
        onClick={() => {
          markAsLiked(item.id);
        }}
      />
    );
  };

  return (
    <div id="posts-container">
      {allPosts.map((item) => {
        return (
          <>
            <PostCard data={item} />
            <Card>
              <Form
                layout="vertical"
                onFinish={(data) => {
                  addComment(data, item.id);
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
            <Card></Card>
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

/*
{item.PostComments.map((itemComment) => (
                <Comment
                  author={`${itemComment.User.firstName} ${itemComment.User.lastName}`}
                  avatar={
                    <Avatar
                      alt={itemComment.UserId}
                      src={itemComment.User.img != null && itemComment.User.img}
                    >
                      {itemComment.User.img == null &&
                        `${itemComment.User.firstName[0]}${itemComment.User.lastName[0]}`}
                    </Avatar>
                  }
                  content={itemComment.comment}
                  datetime={moment(itemComment.createdAt).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                ></Comment>
              ))}
*/
