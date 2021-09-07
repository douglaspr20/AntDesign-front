import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

import { INTERNAL_LINKS } from "enum";

const PostCard = ({ allCategories, userId, data, setPostLike, deletePostLike }) => {
  const [like, setLike] = useState();
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
    <Card
      title={`Posted by: ${data.User.firstName} ${data.User.lastName}`}
      actions={[
        like ? (
          <LikeFilled key={`like-filled-${data.id}`} onClick={removeLike} />
        ) : (
          <LikeOutlined
            key={`like-outlined-${data.id}`}
            onClick={markAsLiked}
          />
        ),
        <CommentOutlined key="Comment" />,
        data.UserId == userId && (
          <Link to={`${INTERNAL_LINKS.POST}/${data.id}`}>
            <EditOutlined key="Edit" />
          </Link>
        ),
      ]}
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
          const category = allCategories.find((cat) => cat.value === dataTopic);
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
  );
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
