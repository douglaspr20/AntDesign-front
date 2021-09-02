import React from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { SpecialtyItem } from "components";

import { categorySelector } from "redux/selectors/categorySelector";
import { authSelector } from "redux/selectors/authSelector";

const PostCard = ({ allCategories, userId, data }) => {
  const markAsLiked = (postId) => {
    // setPostLike({ PostId: postId });
  };

  const renderLikeAction = (data) => {
    if (data.like === true) {
      return (
        <LikeFilled
          key="Like"
          onClick={() => {
            // removeLike(likeItem);
          }}
        />
      );
    } else {
      return (
        <LikeOutlined
          key="Like"
          onClick={() => {
            // markAsLiked(data.id);
          }}
        />
      );
    }
  };
  return (
    <Card
      title={`Posted by: ${data.User.firstName} ${data.User.lastName}`}
      actions={[
        renderLikeAction(data),
        <CommentOutlined key="Comment" />,
        data.UserId == userId && <EditOutlined key="Edit" />,
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
