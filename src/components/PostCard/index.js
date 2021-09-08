import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { SpecialtyItem } from "components";

import { setPostLike, deletePostLike } from "redux/actions/post-actions";

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
  generalFooter,
  onCommentClick,
  onEditClick,
}) => {
  const [like, setLike] = useState();

  const generalFooterActions = [
    like ? (
      <LikeFilled key={`like-filled-${data.id}`} onClick={removeLike} />
    ) : (
      <LikeOutlined key={`like-outlined-${data.id}`} onClick={markAsLiked} />
    ),
    <CommentOutlined
      onClick={onCommentClick}
      key={`comment-action-${data.id}`}
    />,
  ];

  const detailsFooterActions = [
    like ? (
      <LikeFilled key={`like-filled-${data.id}`} onClick={removeLike} />
    ) : (
      <LikeOutlined key={`like-outlined-${data.id}`} onClick={markAsLiked} />
    ),
    showEdit && data.UserId == userId && (
      <EditOutlined onClick={onEditClick} key={`edit-action-${data.id}`} />
    ),
  ];

  useEffect(() => {
    setLike(data.like);
  }, []);

  const markAsLiked = () => {
    setPostLike({ PostId: data.id });
    setLike(!like);
  };

  const removeLike = () => {
    deletePostLike({ id: data.id });
    setLike(!like);
  };

  return (
    <div className="post-card-container">
      <Card
        title={`Posted by: ${data.User.firstName} ${data.User.lastName}`}
        actions={
          generalFooter === true ? generalFooterActions : detailsFooterActions
        }
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
              <>
                <SpecialtyItem
                  key={index}
                  title={category ? category.title : dataTopic}
                  active={false}
                />
              </>
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
};

PostCard.defaultProps = {
  showEdit: false,
  generalFooter: true,
  onCommentClick: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userId: authSelector(state).id,
});

const mapDispatchToProps = {
  setPostLike,
  deletePostLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
