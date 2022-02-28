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
  editAdvertisement,
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
  isEdit = false,
  advertisement = {},
  clearEditAndAdvertisement,
  editAdvertisement,
}) => {
  const [totalDays, setTotalDays] = useState(0);
  const [disabledDates, setDisabledDates] = useState([]);
  const [page_, setPage_] = useState(null);
  const [form] = Form.useForm();
  const [isPagePopulated, setIsPagePopulated] = useState(false);

  useEffect(() => {
    getAllActiveAdvertisements();
  }, []);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...advertisement,
        date: [moment(advertisement.startDate), moment(advertisement.endDate)],
        image: advertisement.adContentLink,
      });
    }
  }, [isEdit]);

  useEffect(() => {
    if (
      !isEmpty(allActiveAdvertisements) &&
      Array.isArray(allActiveAdvertisements)
    ) {
      let filteredDisabledDates = allActiveAdvertisements.filter(
        (advertisement) => advertisement.page === page_ || page
      );

      if (isEdit && !isEmpty(advertisement)) {
        filteredDisabledDates = filteredDisabledDates.filter(
          (date) => date.id !== advertisement.id
        );
      }

      let disabledDates = filteredDisabledDates.map(
        (advertisement) => advertisement.datesBetweenStartDateAndEndDate
      );

      disabledDates = disabledDates.flat();

      let _transformedDisabledDates = [];
      disabledDates.forEach((date) => {
        const filteredDates = disabledDates.filter((d) => d === date);

        if (filteredDates.length >= 3) {
          _transformedDisabledDates.push(date);
        }
      });

      _transformedDisabledDates = _transformedDisabledDates.map((date) => {
        return moment
          .tz(date, "America/Los_Angeles")
          .startOf("day")
          .format("YYYY-MM-DD");
      });

      setDisabledDates(_transformedDisabledDates);
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

    if (isEdit) {
      const transformedValues = {
        image: values.image,
        advertisementLink: values.advertisementLink,
      };
      editAdvertisement(advertisement.id, transformedValues);
    } else {
      const transformedValues = {
        ...values,
        startDate,
        endDate,
        adDurationByDays,
        datesBetweenStartDateAndEndDate,
        page: page || values.page,
      };

      createAdvertisement(transformedValues);
    }

    clearEditAndAdvertisement();
    setVisible(false);
    form.resetFields();
  };

  const handleOnSelect = (value) => {
    setPage_(value);

    if (!isEdit) {
      setIsPagePopulated(true);
    }
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

  const handleOnClose = () => {
    if (isEdit) {
      clearEditAndAdvertisement();
      form.resetFields();
    }
    setVisible(false);
  };

  return (
    <Drawer
      visible={visible}
      onClose={handleOnClose}
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
                  { text: "Project X", value: "project-x" },
                  { text: "Conference Library", value: "conference-library" },
                ]}
                bordered
                onSelect={handleOnSelect}
                disabled={isEdit}
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
              disabled={isEdit || !isPagePopulated}
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
          <Form.Item>
            <h3>Total credits: 5 Credits</h3>
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
  editAdvertisement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementDrawer);
