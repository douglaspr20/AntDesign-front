import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Tooltip } from "antd";
import moment from "moment";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { setLoading } from "redux/actions/home-actions";
import {
  setFollowChannel,
  unsetFollowChannel,
} from "redux/actions/channel-actions";
import {
  setBlogPostLike,
  deleteBlogPostLike,
} from "redux/actions/blog-post-action";
import { homeSelector } from "redux/selectors/homeSelector";
import { CustomButton, SpecialtyItem } from "components";
import { getBlogPost, getChannel } from "api";
import { transformNames } from "utils/format";

import IconBack from "images/icon-back.svg";

import "./style.scss";
import { HeartOutlined } from "@ant-design/icons";

const Blog = ({
  setLoading,
  userProfile,
  setFollowChannel,
  unsetFollowChannel,
  setBlogPostLike,
  deleteBlogPostLike,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      if (isNaN(Number(id))) {
        return history.push("/blogs");
      }
      const { data, status } = await getBlogPost(id);

      if (status === 200) {
        return setBlog(data.blogPost);
      }

      return history.push("/blogs");
    };

    getBlog();
    setLoading(false);
  }, [id, history, setLoading]);

  useEffect(() => {
    const getChannelApi = async () => {
      const { data, status } = await getChannel({ id: blog.ChannelId });

      if (status === 200) {
        return setChannel(data.channel);
      }
    };

    if (blog?.id && !channel.id) {
      getChannelApi();
    }
  }, [blog, channel]);

  const followChannel = () => {
    if (channel?.followedUsers?.includes(userProfile.id)) {
      unsetFollowChannel(channel, () => {
        setChannel({
          ...channel,
          followedUsers: channel.followedUsers.filter(
            (userId) => userId !== userProfile.id
          ),
        });
      });
    } else {
      setFollowChannel(channel, () => {
        setChannel({
          ...channel,
          followedUsers: [...channel.followedUsers, userProfile.id],
        });
      });
    }
  };

  const handleLike = () => {
    if (!blog.BlogPostLikes.some((like) => like.UserId === userProfile.id)) {
      setBlogPostLike(
        {
          BlogPostId: blog.id,
          blogPostOwnerUserId: blog.UserId,
        },
        (like) => {
          setBlog({
            ...blog,
            BlogPostLikes: [...blog.BlogPostLikes, like],
          });
        }
      );
    } else {
      deleteBlogPostLike(blog.id, () => {
        setBlog({
          ...blog,
          BlogPostLikes: blog.BlogPostLikes.filter(
            (likes) => likes.UserId !== userProfile.id
          ),
        });
      });
    }
  };

  if (!blog.id) {
    return <></>;
  }

  if (blog.status === "draft") {
    history.goBack();
    return <></>;
  }

  return (
    <div className="blog-page">
      <div
        onClick={() => {
          if (location.pathname.includes("channels")) {
            return history.replace({
              pathname: location.pathname.slice(0, 11),
              search: `?tab=blogs`,
            });
          }
          history.push("/blogs");
        }}
      >
        <div className="blog-page-link">
          <div className="blog-page-link-back">
            <img src={IconBack} alt="icon-back" />
          </div>
          <h4>Back to Blogs</h4>
        </div>
      </div>
      <div className="blog-page-container">
        <div className="blog-page-header">
          <div className="blog-page-title">
            <h1>{blog.title}</h1>
          </div>

          <div className="blog-page-date">
            {moment(blog.createdAt).format("MMMM DD, YYYY")}
          </div>

          {blog.imageUrl && (
            <div className="blog-page-image">
              <img src={blog.imageUrl} alt={"cover"} />
            </div>
          )}

          <div className="blog-page-info">
            <div className="blog-page-author">
              {blog.User?.img ? (
                <Avatar size={40} src={blog.User.img} />
              ) : (
                <Avatar size={40}>DP</Avatar>
              )}
              <div>
                <span className="author-name">
                  {transformNames(blog.User?.firstName)}{" "}
                  {transformNames(blog.User?.lastName)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-page-content">
          <div dangerouslySetInnerHTML={{ __html: blog.description?.html }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <CustomButton
              htmlType="button"
              text={
                channel?.followedUsers?.includes(userProfile.id)
                  ? "Unfollow Channel"
                  : "Follow Channel"
              }
              type={
                channel?.followedUsers?.includes(userProfile.id)
                  ? "secondary"
                  : "primary"
              }
              size="sm"
              loading={false}
              onClick={followChannel}
              style={{ marginLeft: "10px" }}
            />

            <Tooltip title="Like">
              <Button
                shape="circle"
                className={`like-btn ${
                  blog?.BlogPostLikes?.some(
                    (like) => like.UserId === userProfile.id
                  ) && "liked"
                }`}
                onClick={() => handleLike()}
                icon={<HeartOutlined style={{ marginTop: "-30px" }} />}
              />
            </Tooltip>

            <span className="likes-counter">{blog?.BlogPostLikes?.length}</span>
          </div>
          <div className="blog-page-categories">
            {blog.categories.map((category) => (
              <SpecialtyItem key={category} title={category} active={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  setLoading,
  setFollowChannel,
  unsetFollowChannel,
  setBlogPostLike,
  deleteBlogPostLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
