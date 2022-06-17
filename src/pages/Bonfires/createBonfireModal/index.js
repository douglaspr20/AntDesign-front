import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import Modal from "components/Modal";
import {
  CategoriesSelect,
  CustomButton,
  CustomInput,
  CustomSelect,
} from "components";
import { TIMEZONE_LIST } from "enum";
import { categorySelector } from "redux/selectors/categorySelector";

const CreateBonfireModal = ({
  visible,
  onCancel,
  bonfireToEdit,
  allCategories,
  handleBonfire,
}) => {
  const [bonfireForm] = Form.useForm();

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={(data) => {
        handleBonfire(data);
      }}
      width={800}
    >
      <Form
        form={bonfireForm}
        layout="vertical"
        initialValues={bonfireToEdit}
        onFinish={(data) => {
          handleBonfire(data);
        }}
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
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required." }]}
        >
          <CustomInput multiple={true} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Start time"
          rules={[{ required: true, message: "Time is required." }]}
        >
          <CustomInput type="time" value={bonfireToEdit?.time} />
        </Form.Item>

        <Form.Item
          name={"timezone"}
          label="Timezone"
          rules={[{ required: true, message: "Timezone is required." }]}
        >
          <CustomSelect
            showSearch
            options={TIMEZONE_LIST}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="border"
          />
        </Form.Item>

        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true, message: "Categories is required." }]}
        >
          <CategoriesSelect options={allCategories} maxValues={2} />
        </Form.Item>

        <Form.Item
          label="Link"
          name="link"
          rules={[{ required: true, message: "Link is required." }]}
        >
          <CustomInput />
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
            onClick={() => onCancel()}
          />

          <CustomButton
            htmlType="submit"
            text={bonfireToEdit ? "Save" : "Post"}
            type="primary"
            size="lg"
            style={{ marginLeft: "10px" }}
          />
        </div>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBonfireModal);
