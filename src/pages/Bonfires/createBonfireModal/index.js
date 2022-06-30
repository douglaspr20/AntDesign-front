import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import Modal from "components/Modal";
import {
  CategoriesSelect,
  CustomButton,
  CustomInput,
  CustomSelect,
} from "components";
import { categorySelector } from "redux/selectors/categorySelector";
import { useSearchCity } from "hooks";

const CreateBonfireModal = ({
  visible,
  onCancel,
  bonfireToEdit,
  allCategories,
  handleBonfire,
}) => {
  const [searchCity, setSearchCity] = useState("");
  const cities = useSearchCity(searchCity);

  const [bonfireForm] = Form.useForm();

  useEffect(() => {
    if (bonfireToEdit && bonfireToEdit.timezone) {
      let indexSlice = bonfireToEdit.timezone.indexOf("/");

      let city = bonfireToEdit.timezone.slice(indexSlice + 1);

      while (indexSlice !== -1) {
        indexSlice = city.indexOf("/");

        city = city.slice(indexSlice + 1);
      }

      if (city.includes("_")) {
        city = city.split("_").join(" ");
      }

      setSearchCity(city);

      bonfireForm.setFieldsValue({
        timezone: `${city}/${bonfireToEdit.timezone}`,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonfireToEdit]);

  const handleSearchCity = (value) => {
    if (value === "") {
      return;
    }

    let timer = setTimeout(() => {
      setSearchCity(value);
      clearTimeout(timer);
    }, 1000);
  };

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
          label="City"
          rules={[{ required: true, message: "City is required." }]}
        >
          <CustomSelect
            showSearch
            options={cities}
            optionFilterProp="children"
            onSearch={(value) => handleSearchCity(value)}
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
