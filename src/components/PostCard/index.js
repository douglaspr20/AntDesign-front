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

import { CustomButton } from "components";

import {
  setPostLike,
  deletePostLike,
  setPostFollow,
  deletePostFollow,
  deletePost,
} from "redux/actions/post-actions";

import { categorySelector } from "redux/selectors/categorySelector";
import { authSelector } from "redux/selectors/authSelector";

import { ReactComponent as IconCreateOutline } from "images/icon-create-outline.svg";
import { ReactComponent as IconTrashOutline } from "images/icon-trash-outline.svg";
import { ReactComponent as IconWaterOutline } from "images/icon-water-outline.svg";
import { ReactComponent as IconFlameOutline } from "images/icon-flame-outline.svg";
import { ReactComponent as IconHeartOutline } from "images/icon-heart-outline.svg";
import { ReactComponent as IconChatBubblesOutline } from "images/icon-chatbubbles-outline.svg";

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
    <div key={`custom-post-card-${data.id}`} className="post-card-container">
      <div className="custom-post-card">
        <section className="custom-post-card--header">
          <section className="custom-post-card--header--user">
            <div className="header--user-image">
              <img src={data.User.img}></img>
            </div>
            <div className="header--user-text">
              <h4>
                {data.User.firstName} {data.User.lastName}
              </h4>
              <p>{data.User.about}</p>
              <span>Now</span>
            </div>
          </section>
          {data.UserId === userId ? (
            <section className="custom-post-card--header--actions">
              <ul>
                <li>
                  <IconCreateOutline /> Edit
                </li>
                <li>
                  <IconTrashOutline /> Delete
                </li>
                <li>
                  <IconWaterOutline /> Watercooler
                </li>
                <li>
                  <IconFlameOutline /> Bonfire
                </li>
              </ul>
            </section>
          ) : (
            <section className="custom-post-card--header--follow">
              + Follow conversation
            </section>
          )}
        </section>
        <section
          className="custom-post-card--content"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
        <section className="custom-post-card--topics">
          {(data.topics || []).map((dataTopic, index) => {
            const category = allCategories.find(
              (cat) => cat.value === dataTopic
            );
            return (
              <div className="custom-post-card--item">
                #{category ? category.title : dataTopic}
              </div>
            );
          })}
        </section>
        <section className="custom-post-card--image">
          {data.imageUrl && <img alt={`post-${data.id}`} src={data.imageUrl} />}
        </section>
        <section className="custom-post-card--counters"></section>
        <section className="custom-post-card--footer-actions">
          <ul>
            <li>
              <IconHeartOutline /> Like
            </li>
            <li>
              <IconChatBubblesOutline /> Comment
            </li>
          </ul>
        </section>
      </div>

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

        <div className="post-topics"></div>
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
