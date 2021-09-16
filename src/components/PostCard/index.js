import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Popconfirm } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { CustomButton, SpecialtyItem } from "components";

import {
  setPostLike,
  deletePostLike,
  setPostFollow,
  deletePostFollow,
  deletePost,
} from "redux/actions/post-actions";

import { categorySelector } from "redux/selectors/categorySelector";
import { authSelector } from "redux/selectors/authSelector";

import "./style.scss";

const PostCard = ({
  allCategories,
  userId,
  data,
  setPostLike,
  deletePostLike,
  showEdit,
  onCommentClick,
  onEditClick,
  deletePost,
  afterRemove,
  setPostFollow,
  deletePostFollow,
}) => {
  const [like, setLike] = useState();
  const [follow, setFollow] = useState();

  useEffect(() => {
    setLike(data.like);
    setFollow(data.follow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAsLiked = () => {
    setPostLike({ PostId: data.id });
    setLike(!like);
  };

  const removeLike = () => {
    deletePostLike({ id: data.id });
    setLike(!like);
  };

  const markAsFollowing = () => {
    setPostFollow({ PostId: data.id });
    setFollow(!follow);
  };

  const removeFollow = () => {
    deletePostFollow({ id: data.id });
    setFollow(!follow);
  };

  const footerActions = [
    like ? (
      <LikeFilled key={`like-filled-${data.id}`} onClick={removeLike} />
    ) : (
      <LikeOutlined key={`like-outlined-${data.id}`} onClick={markAsLiked} />
    ),
    <CommentOutlined
      onClick={onCommentClick}
      key={`comment-action-${data.id}`}
    />,
    showEdit && data.UserId === userId && (
      <EditOutlined onClick={onEditClick} key={`edit-action-${data.id}`} />
    ),
    data.UserId === userId && (
      <Popconfirm
        title="Are you sure you want to permanently remove this item?"
        onConfirm={() => {
          deletePost(data);
          afterRemove();
        }}
      >
        <DeleteOutlined key={`edit-action-${data.id}`} />
      </Popconfirm>
    ),
  ];

  return (
    <div className="post-card-container">
      <Card
        key={`post-card-${data.id}`}
        title={
          <div className="post-card-container-title">
            {`Posted by: ${data.User.firstName} ${data.User.lastName}`}
            {follow === false ? (
              <CustomButton
                text="Follow Conversation"
                size="sm"
                onClick={markAsFollowing}
              />
            ) : (
              <CustomButton
                text="Following Conversation"
                size="sm"
                onClick={removeFollow}
              />
            )}
          </div>
        }
        actions={footerActions}
      >
        <div dangerouslySetInnerHTML={{ __html: data.text }} />

        {data.imageUrl && <img alt={`post-${data.id}`} src={data.imageUrl} />}

        {data.videoUrl && (
          <div
            className="video-container"
            dangerouslySetInnerHTML={{ __html: data.videoUrl }}
          ></div>
        )}

        <div className="post-topics">
          {(data.topics || []).map((dataTopic, index) => {
            const category = allCategories.find(
              (cat) => cat.value === dataTopic
            );
            return (
              <SpecialtyItem
                key={index}
                title={category ? category.title : dataTopic}
                active={false}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

PostCard.propTypes = {
  showEdit: PropTypes.bool,
  generalFooter: PropTypes.bool,
  onCommentClick: PropTypes.func,
  afterRemove: PropTypes.func,
};

PostCard.defaultProps = {
  showEdit: false,
  generalFooter: true,
  onCommentClick: () => {},
  afterRemove: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  setPostLike,
  deletePostLike,
  deletePost,
  setPostFollow,
  deletePostFollow,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
