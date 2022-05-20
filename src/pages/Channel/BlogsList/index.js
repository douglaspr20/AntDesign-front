import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Checkbox, Form, notification } from "antd";
import { CARD_TYPE } from "enum";
import { blogPostSelector } from "redux/selectors/blogPostSelector";
import {
  createBlogPost,
  getBlogsPostsByChannel,
  updateBlogPost,
  deleteBlogPost,
} from "redux/actions/blog-post-action";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import {
  CustomButton,
  CustomCheckbox,
  CustomInput,
  CustomModal,
  FroalaEdit,
  ImageUpload,
  BlogCard,
} from "components";
import { envSelector } from "redux/selectors/envSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";

const BlogList = ({
  isOwner,
  userProfile,
  filter,
  s3Hash,
  allCategories,
  blogsPostByChannel,
  createBlogPost,
  getBlogsPostsByChannel,
  updateBlogPost,
  deleteBlogPost,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [editOrDeleteBlogPost, setEditOrDeleteBlogPost] = useState({});
  const [summary, setSummary] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const [blogForm] = Form.useForm();

  const onShowBlogPosstModal = () => {
    setVisibleModal(true);
  };

  const onCancelModal = () => {
    setVisibleModal(false);
    setVisibleDeleteModal(false);
    blogForm.resetFields();
  };

  const handleCreateOrEditBlog = (data) => {
    if (editOrDeleteBlogPost.id) {
      updateBlogPost(editOrDeleteBlogPost.id, data, (error) => {
        if (error) {
          return notification.error({
            message: error,
          });
        }
        getBlogsPostsByChannel(id);

        return notification.success({
          message: "Blog Created Successfully",
        });
      });
    } else {
      createBlogPost(
        { ...data, UserId: userProfile.id, ChannelId: id },
        (error) => {
          if (error) {
            return notification.error({
              message: error,
            });
          }
          getBlogsPostsByChannel(id);

          return notification.success({
            message: "Blog Created Successfully",
          });
        }
      );
    }

    setEditOrDeleteBlogPost({});
    onCancelModal();
  };

  const handleEditOrDelete = (option, blogId) => {
    const blogPost = blogsPostByChannel.find(
      (blogPost) => blogPost.id === blogId
    );

    if (!blogPost) return;
    setEditOrDeleteBlogPost(blogPost);
    if (option === "edit") {
      return setVisibleModal(true);
    }
    setVisibleDeleteModal(true);
  };

  const handleDeleteBlogPost = (blogPostId) => {
    deleteBlogPost(blogPostId, (error) => {
      if (error) {
        return notification.error({
          message: error,
        });
      }
      getBlogsPostsByChannel(id);

      return notification.success({
        message: "Blog Deleted Successfully",
      });
    });

    setVisibleDeleteModal(false);
    setEditOrDeleteBlogPost({});
  };
  const handleSummary = (value) => {
    setSummary(value.slice(0, 100));
  };

  const handleCategories = (categories) => {
    if (categories.length === 5) {
      return notification.warning({
        message: "You can only have a maximum of 5 categories in each blog",
      });
    }

    setCategories(categories);
  };

  useEffect(() => {
    getBlogsPostsByChannel(id);
  }, [getBlogsPostsByChannel, id]);

  return (
    <div className="channel-page__list-wrap">
      <CustomModal
        visible={visibleModal}
        title="Create Blog"
        width={800}
        onCancel={() => onCancelModal()}
      >
        <Form
          form={blogForm}
          layout="vertical"
          onFinish={(data) => {
            handleCreateOrEditBlog(data);
          }}
          initialValues={editOrDeleteBlogPost}
          style={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item
            label="Summary"
            name="summary"
            rules={[
              { required: true, message: "Summary is required." },
              {
                max: 200,
                message: "The summary cannot be longer than 200 characters",
              },
            ]}
          >
            <CustomInput multiple onChange={handleSummary} />
          </Form.Item>

          <div className="counter">
            <span>{100 - summary.length} / 100</span>
          </div>

          <Form.Item
            label={<label className="labelFroala">Body</label>}
            name="description"
            rules={[
              {
                required: true,
                message: "Body is required.",
              },
            ]}
          >
            <FroalaEdit
              s3Hash={s3Hash}
              additionalConfig={{
                placeholderText: "Add a blog...",
                toolbarButtons: [
                  "bold",
                  "italic",
                  "strikeThrough",
                  "paragraphFormat",
                  "align",
                  "formatOL",
                  "formatUL",
                  "indent",
                  "outdent",
                ],
              }}
            />
          </Form.Item>

          <Form.Item name="imageUrl" label="Image">
            <ImageUpload className="event-pic-2" aspect={755 / 305} />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categories"
            rules={[{ required: true, message: "Categories is required." }]}
          >
            <Checkbox.Group
              className="d-flex flex-column event-addedit-form-topics"
              value={categories}
              onChange={handleCategories}
            >
              {allCategories.map((topic, index) => (
                <CustomCheckbox
                  key={index}
                  value={topic.value}
                  disabled={
                    categories.length === 5 && !categories.includes(topic.value)
                  }
                >
                  {topic.title}
                </CustomCheckbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CustomButton
              text="Cancel"
              type="third outlined"
              size="lg"
              onClick={() => onCancelModal()}
            />
            <CustomButton
              htmlType="submit"
              text="Submit"
              type="secondary"
              size="lg"
              style={{ marginLeft: "10px" }}
            />
          </div>
        </Form>
      </CustomModal>

      <CustomModal
        visible={visibleDeleteModal}
        title={`Are you sure to delete this blog?`}
        subTitle="this option is not reversible"
        onCancel={() => setVisibleDeleteModal(false)}
        width={500}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomButton
            type="primary outlined"
            text="No"
            onClick={() => onCancelModal()}
          />
          <CustomButton
            type="primary"
            text="Yes"
            style={{ marginLeft: "5px" }}
            onClick={() => handleDeleteBlogPost(editOrDeleteBlogPost.id)}
          />
        </div>
      </CustomModal>
      {!isOwner && blogsPostByChannel?.length === 0 ? (
        <NoItemsMessageCard
          message={`There are no Blogs for you at the moment`}
        />
      ) : (
        <>
          <div className="channels__list">
            {isOwner && (
              <BlogCard type={CARD_TYPE.ADD} onAdd={onShowBlogPosstModal} />
            )}

            {blogsPostByChannel.map((blogPost) => (
              <BlogCard
                onMenuClick={handleEditOrDelete}
                isOwner={isOwner}
                key={blogPost.id}
                id={blogPost.id}
                image={blogPost.imageUrl}
                date={blogPost.createdAt}
                title={blogPost.title}
                summary={blogPost.summary}
                categories={blogPost.categories}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

BlogList.propTypes = {
  blogPosts: PropTypes.array,
  isOwner: PropTypes.bool,
  filter: PropTypes.object,
};

BlogList.defaultProps = {
  blogPosts: [],
  isOwner: false,
  filter: {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  blogsPostByChannel: blogPostSelector(state).blogsPostByChannel,
  userProfile: homeSelector(state).userProfile,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  createBlogPost,
  getBlogsPostsByChannel,
  updateBlogPost,
  deleteBlogPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
