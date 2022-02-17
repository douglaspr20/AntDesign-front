/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Drawer, Form, DatePicker } from "antd";
import {
  CustomButton,
  CustomInput,
  ImageUpload,
  CustomSelect,
} from "components";
import { isEmpty } from "lodash";
import moment from "moment-timezone";

const AdvertisementDrawer = ({
  visible,
  setVisible,
  page = null,
  onDashboard = false,
  createAdvertisement,
  advertisementsByPage,
}) => {
  const [totalDays, setTotalDays] = useState(0);
  const [disabledDates, setDisabledDates] = useState([]);
  const [page_, setPage_] = useState(null);

  useEffect(() => {
    if (!isEmpty(advertisementsByPage)) {
      const disabledDates = advertisementsByPage[page || page_].map(
        (advertisement) => {
          return advertisement.datesBetweenStartDateAndEndDate;
        }
      );

      setDisabledDates(disabledDates.flat());
    }
  }, []);

  console.log(disabledDates, 'bruh')
  console.log(advertisementsByPage, 'advertisementsByPage')

  const [form] = Form.useForm();

  const handleDatePickerOnChangeEndDate = (date) => {
    const { startDate } = form.getFieldsValue(["startDate"]) || null;

    if (!isEmpty(startDate)) {
      const endDate = moment.tz(date, "America/Los_Angeles").startOf("day");
      const transformedStartDate = moment
        .tz(startDate, "America/Los_Angeles")
        .startOf("day");
      const diff = endDate.diff(transformedStartDate, "days");

      setTotalDays(diff + 1);
    }
  };

  const handleDatePickerOnChangeStartDate = (date) => {
    const { endDate } = form.getFieldsValue(["endDate"]) || null;

    if (!isEmpty(endDate)) {
      const startDate = moment.tz(date, "America/Los_Angeles").startOf("day");
      const transformedEndDate = moment
        .tz(endDate, "America/Los_Angeles")
        .startOf("day");
      const diff = transformedEndDate.diff(startDate, "days");

      setTotalDays(diff + 1);
    }
  };

  const handleDisabledDate = (currentDate) => {
    return currentDate && currentDate.valueOf() < Date.now();
  };

  const handleOnFinish = (values) => {
    const startDate = moment
      .tz(values.startDate, "America/Los_Angeles")
      .startOf("day");

    const endDate = moment
      .tz(values.endDate, "America/Los_Angeles")
      .startOf("day");

    const diff = endDate.diff(startDate, "days");
    const adDurationByDays = diff + 1;

    const datesBetweenStartDateAndEndDate = [];

    for (let i = 0; i <= diff; i++) {
      const date = moment
        .tz(values.startDate, "America/Los_Angeles")
        .add(i, "days")
        .startOf("day");

      datesBetweenStartDateAndEndDate.push(date);
    }

    const transformedValues = {
      ...values,
      startDate,
      endDate,
      adDurationByDays,
      datesBetweenStartDateAndEndDate,
      page: page || values.page,
    };

    createAdvertisement(transformedValues);
    // setVisible(false);
    // form.resetFields();
  };

  return (
    <Drawer
      visible={visible}
      onClose={() => setVisible(false)}
      title="Rent this space"
      width={420}
    >
      <div>
        <Form
          form={form}
          onFinish={handleOnFinish}
          layout="vertical"
          validateMessages={{ required: "'${label}' is required!" }}
        >
          <Form.Item>
            <h3>Available credits: 999</h3>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true }]}
          >
            <DatePicker
              // disabledDate={handleDisabledDate}
              style={{ width: "100%" }}
              size="large"
              onChange={handleDatePickerOnChangeStartDate}
              showToday={false}
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true }]}
          >
            <DatePicker
              // disabledDate={handleDisabledDate}
              style={{ width: "100%" }}
              size="large"
              onChange={handleDatePickerOnChangeEndDate}
              showToday={false}
            />
          </Form.Item>
          {onDashboard && (
            <Form.Item label="Page" name="page" rules={[{ required: true }]}>
              <CustomSelect
                options={[{ text: "Home", value: "home" }]}
                bordered
              />
            </Form.Item>
          )}
          <Form.Item
            label="Advertisement Link"
            name="advertisementLink"
            rules={[{ required: true, type: "url" }]}
          >
            <CustomInput bordered />
          </Form.Item>
          <Form.Item>
            <h3>Total days: {totalDays}</h3>
          </Form.Item>
          {/* <Form.Item>
        <h3>Total credit cost: 0</h3>
      </Form.Item> */}
          <Form.Item label="Image" name="image" rules={[{ required: true }]}>
            <ImageUpload />
          </Form.Item>
          <Form.Item>
            <CustomButton text="Rent" type="primary" htmlType="submit" block />
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default AdvertisementDrawer;
