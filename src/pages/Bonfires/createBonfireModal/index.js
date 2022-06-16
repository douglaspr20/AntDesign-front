import React from "react";
import { connect } from "react-redux";
import { Form, notification } from "antd";
import Modal from "components/Modal";
import {
  CategoriesSelect,
  CustomButton,
  CustomInput,
  CustomSelect,
} from "components";
import { TIMEZONE_LIST } from "enum";
import {
  createBonfire,
  getBonfires,
  updateBonfire,
  deleteBonfire,
} from "redux/actions/bonfire-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { bonfireSelector } from "redux/selectors/bonfireSelector";
import { categorySelector } from "redux/selectors/categorySelector";

import moment from "moment";

const CreateBonfireModal = ({
  visible,
  onCancel,
  userProfile,
  bonfireToEdit,
  allCategories,
  createBonfire,
  updateBonfire,
}) => {
  const [bonfireForm] = Form.useForm();

  const handleBonfire = (data) => {
    const timezone = TIMEZONE_LIST.find(
      (timezone) => timezone.value === data.timezone
    );
    const convertedStartTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .format();

    const convertedEndTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .add("hour", 1)
      .format();

    const bonfireInfo = {
      title: data.title,
      description: data.description,
      link: data.link,
      startTime: convertedStartTime,
      endTime: convertedEndTime,
      categories: data.categories,
      bonfireCreator: userProfile.id,
      timezone: data.timezone,
    };
    if (bonfireToEdit) {
      updateBonfire(bonfireToEdit.id, bonfireInfo, (error) => {
        if (error) {
          notification.error({
            message: error || "Something went wrong. Please try again.",
          });
        } else {
          onCancel();
          notification.success({
            message: "Bonfire updated succesfully",
          });
        }
      });
    } else {
      createBonfire(bonfireInfo, (error) => {
        if (error) {
          notification.error({
            message: error || "Something went wrong. Please try again.",
          });
        } else {
          notification.success({
            message: "Bonfire created succesfully",
          });

          onCancel();
        }
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        bonfireForm.submit();
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
            text="Post"
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
  ...bonfireSelector(state),
  userProfile: homeSelector(state).userProfile,
  bonfires: bonfireSelector(state).bonfires,
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  createBonfire,
  getBonfires,
  updateBonfire,
  deleteBonfire,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBonfireModal);
