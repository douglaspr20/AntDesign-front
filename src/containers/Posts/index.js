import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Avatar, Comment, Card, Form, Input } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { CustomButton, SpecialtyItem } from "components";

import { categorySelector } from "redux/selectors/categorySelector";
import { postSelector } from "redux/selectors/postSelector";
import { authSelector } from "redux/selectors/authSelector";

import {
  getAllPost,
  setPostLike,
  deletePostLike,
  addPostComment,
} from "redux/actions/post-actions";

import "./style.scss";

const Posts = ({
  allCategories,
  getAllPost,
  allPost,
  setPostLike,
  deletePostLike,
  addPostComment,
  userId,
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
    const likeItem = searchLike(item.id, item.PostLikes);
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
      {allPost.map((item) => {
        return (
          <>
            <Card
              title={`Posted by: ${item.User.firstName} ${item.User.lastName}`}
              actions={[
                renderLikeAction(item),
                <CommentOutlined key="Comment" />,
                item.UserId == userId && <EditOutlined key="Edit" />,
              ]}
            >
              <div dangerouslySetInnerHTML={{ __html: item.text }} />

              {item.imageUrl && (
                <img alt={`post-${item.id}`} src={item.imageUrl} />
              )}

              {item.videoUrl && (
                <div className="video-container" dangerouslySetInnerHTML={{ __html: item.videoUrl }}></div>
              )}

              <div className="post-topics">
                {(item.topics || []).map((itemTopic, index) => {
                  const category = allCategories.find(
                    (cat) => cat.value === itemTopic
                  );
                  return (
                    <>
                      <SpecialtyItem
                        key={index}
                        title={category ? category.title : itemTopic}
                        active={false}
                      />
                    </>
                  );
                })}
              </div>
            </Card>
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
            </Card>
            <Card></Card>
          </>
        );
      })}
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
  allPost: postSelector(state).posts,
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  getAllPost,
  setPostLike,
  deletePostLike,
  addPostComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
