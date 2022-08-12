import React, { useState } from "react";
import { connect } from "react-redux";
import { Select, Form} from "antd";
import { categorySelector } from "redux/selectors/categorySelector";
import { envSelector } from "redux/selectors/envSelector";
import clsx from "clsx";

import {
  CustomButton,
  CustomInput,
  CustomModal,
  FroalaEdit,
  ImageUpload,
} from "components";

const ModalCreateOrEdit = ({
  onCancelModal,
  handleCreateOrEditBlog,
  editOrDeleteBlogPost,
  allCategories,
  s3Hash,
}) => {
  const [blogForm] = Form.useForm();
  const [summary, setSummary] = useState("");

  const handleSummary = (value) => {
    setSummary(value.slice(0, 100));
  };

  const handleSaveDraftBlogPost = (type) => {
    let values = blogForm.getFieldsValue();

    for (const key in values) {
      if (!values[key] && key !== "imageUrl") {
        blogForm.submit();
        return;
      }
    }
    handleCreateOrEditBlog({ ...values, status: type });
    onCancelModal();
  };

  return (
    <CustomModal
      visible={true}
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
              max: 100,
              message: "The summary cannot be longer than 100 characters",
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
          className="categoris-input"
          rules={[{ required: true, message: "Categories is required." }]}
        >
          <Select mode="multiple" className={clsx("custom-select", { border: "bordered" })} style={{background:"white"}}>
            {allCategories?.map((item) => {
              return (
                <Select.Option key={item?.value} value={item?.value}>
                  {item?.title}
                </Select.Option>
              );
            })}
          </Select>
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
            text="Save As Draft"
            type="primary"
            size="lg"
            onClick={() => {
              handleSaveDraftBlogPost("draft");
            }}
            style={{ marginLeft: "10px" }}
          />

          <CustomButton
            htmlType="submit"
            text="Post"
            type="secondary"
            size="lg"
            style={{ marginLeft: "10px" }}
          />
        </div>
      </Form>
    </CustomModal>
  );
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateOrEdit);
