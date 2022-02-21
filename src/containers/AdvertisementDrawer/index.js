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
import { connect } from "react-redux";

import {
  getAllActiveAdvertisements,
  createAdvertisement,
} from "redux/actions/advertisment-actions";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";

const { RangePicker } = DatePicker;

const AdvertisementDrawer = ({
  visible,
  setVisible,
  page = null,
  onDashboard = false,
  getAllActiveAdvertisements,
  createAdvertisement,
  allActiveAdvertisements,
}) => {
  const [totalDays, setTotalDays] = useState(0);
  const [disabledDates, setDisabledDates] = useState([]);
  const [page_, setPage_] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllActiveAdvertisements();
  }, []);

  useEffect(() => {
    if (!isEmpty(allActiveAdvertisements)) {
      const filteredDisabledDates = allActiveAdvertisements.filter(
        (advertisement) => advertisement.page === page_ || page
      );

      let homeCount = 0;
      let disabledDates = filteredDisabledDates.map((advertisement) => {
        if (advertisement.page === "home" && homeCount < 2) {
          homeCount += 1;

          return [];
        }

        return advertisement.datesBetweenStartDateAndEndDate;
      });

      disabledDates = disabledDates.flat();
      disabledDates = disabledDates.map((date) => {
        return moment
          .tz(date, "America/Los_Angeles")
          .startOf("day")
          .format("YYYY-MM-DD");
      });

      console.log(allActiveAdvertisements);

      setDisabledDates(disabledDates);
      form.resetFields(["startDate", "endDate"]);
    }
  }, [allActiveAdvertisements, page_]);

  const handleDisabledDate = (currentDate) => {
    const current = moment
      .tz(currentDate, "America/Los_Angeles")
      .startOf("day")
      .format("YYYY-MM-DD");

    const isMatch = disabledDates.some((date) => {
      const transformedDate = moment(date).format("YYYY-MM-DD");

      return transformedDate === current;
    });

    return (
      // (currentDate &&
      //   currentDate.valueOf() <
      //     moment().tz("America/Los_Angeles")) ||
      isMatch
    );
  };

  const handleOnFinish = (values) => {
    const startDate = moment
      .tz(values.date[0], "America/Los_Angeles")
      .startOf("day");

    const endDate = moment
      .tz(values.date[1], "America/Los_Angeles")
      .startOf("day");

    const diff = endDate.diff(startDate, "days");
    const adDurationByDays = diff + 1;

    const datesBetweenStartDateAndEndDate = [];

    for (let i = 0; i <= diff; i++) {
      const date = moment
        .tz(values.date[0], "America/Los_Angeles")
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
    setVisible(false);
    form.resetFields();
  };

  const handleOnSelect = (value) => {
    setPage_(value);
  };

  // dates = [moment, moment]
  const validateDateRange = (_, value) => {
    const startDate = moment.tz(value[0], "America/Los_Angeles").startOf("day");
    const endDate = moment.tz(value[1], "America/Los_Angeles").startOf("day");

    const datesInBetween = [];
    const diff = endDate.diff(startDate, "days");
    setTotalDays(diff + 1);

    for (let i = 0; i <= diff; i++) {
      const date = moment
        .tz(value[0], "America/Los_Angeles")
        .startOf("day")
        .add(i, "day")
        .format("YYYY-MM-DD");

      datesInBetween.push(date);
    }

    const isOverlap = disabledDates.some((date) =>
      datesInBetween.includes(date)
    );

    if (isOverlap) {
      return Promise.reject(
        new Error(
          "Start Date and End Date are overlapping with disabled dates."
        )
      );
    } else {
      return Promise.resolve();
    }
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
          {onDashboard && (
            <Form.Item label="Page" name="page" rules={[{ required: true }]}>
              <CustomSelect
                options={[
                  { text: "Home", value: "home" },
                  { text: "Events", value: "events" },
                ]}
                bordered
                onSelect={handleOnSelect}
              />
            </Form.Item>
          )}
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true }, { validator: validateDateRange }]}
          >
            <RangePicker
              showTime={false}
              style={{ width: "100%" }}
              size="large"
              disabledDate={handleDisabledDate}
            />
          </Form.Item>
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

const mapStateToProps = (state) => ({
  ...advertisementSelector(state),
});

const mapDispatchToProps = {
  getAllActiveAdvertisements,
  createAdvertisement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementDrawer);
