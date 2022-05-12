import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { setLoading } from "redux/actions/home-actions";
import { SpecialtyItem } from "components";
import { getBlogPost } from "api";
import { transformNames } from "utils/format";

import IconBack from "images/icon-back.svg";

import "./style.scss";
import moment from "moment";

const Blog = ({ setLoading }) => {
  const history = useHistory();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

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

  if (!blog.id) {
    return <></>;
  }

  return (
    <div className="blog-page">
      <div onClick={() => history.goBack()}>
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

          {blog.imageUrl && (
            <div className="blog-page-image">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2022/04/13/01/40/plum-blossoms-7129214_960_720.jpg"
                }
                alt={"cover"}
              />
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

                <div className="blog-page-date">
                  {moment(blog.createdAt).format("MMMM DD, YYYY")}
                </div>
              </div>
            </div>

            <div className="blog-page-categories">
              {blog.categories.map((category) => (
                <SpecialtyItem key={category} title={category} active={false} />
              ))}
            </div>
          </div>
        </div>

        <div className="blog-page-content">
          <div dangerouslySetInnerHTML={{ __html: blog.description?.html }} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
