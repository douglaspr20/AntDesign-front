/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Drawer, Form, DatePicker, Modal } from "antd";
import { CustomButton, CustomInput, CustomSelect } from "components";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import { connect } from "react-redux";
import UploadImageForm from "../UploadImageForm";

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
  const [editImageUrl, setEditImageUrl] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [hasAdvertisementStarted, setHasAdvertisementStarted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

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

      setEditImageUrl(advertisement.adContentLink);

      const dateToday = moment().tz("America/Los_Angeles");
      const hasStarted = dateToday.isAfter(
        moment(advertisement.startDate).tz("America/Los_Angeles")
      );
      setHasAdvertisementStarted(
        hasStarted && advertisement.status === "active"
      );
      setIsDraft(advertisement.status === "draft");
      setPage_(advertisement.page);
    }

    return () => {
      setHasAdvertisementStarted(false);
      setEditImageUrl(null);
      setIsDraft(false);
      setIsPagePopulated(false);
    };
  }, [isEdit, advertisement]);

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

  const handleOnSave = (url, base64) => {
    setEditImageUrl(url);
    form.setFieldsValue({
      image: base64,
    });
    setVisibleModal(false);
  };

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
      (currentDate &&
        currentDate.valueOf() < moment().tz("America/Los_Angeles")) ||
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
        status: values.status,
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

  const handleDynamicSubmit = (status) => {
    form.setFieldsValue({
      status,
    });

    form.submit();
  };

  return (
    <>
      <Drawer
        visible={visible}
        onClose={handleOnClose}
        title="Rent this space"
        width={500}
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
                disabled={(isEdit || !isPagePopulated) && !isDraft}
                // disabled={(isEdit || !isPagePopulated) && !isDraft}
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
            <Form.Item name="image" noStyle />
            <div style={{ marginBottom: "1rem" }}>
              Image (Aspect Ratio: 1 / 1)
            </div>
            <div style={{ marginBottom: "1rem" }}>
              {editImageUrl && (
                <img
                  src={editImageUrl}
                  alt="advertisement-img"
                  style={{ width: "100%", marginBottom: "1rem" }}
                />
              )}
              <CustomButton
                text="Upload Advertisement Image"
                type="third"
                block
                onClick={() => setVisibleModal(true)}
              />
            </div>
            <Form.Item name="status" noStyle />
            <Form.Item>
              <div className="d-flex">
                {!hasAdvertisementStarted && (
                  <CustomButton
                    text="Save as Draft"
                    type="secondary outline"
                    block
                    onClick={() => handleDynamicSubmit("draft")}
                    style={{ width: "100%", marginRight: "1rem" }}
                  />
                )}
                <CustomButton
                  text='Start Campaign'
                  type="primary"
                  block
                  onClick={() => handleDynamicSubmit("active")}
                  style={{ width: "100%" }}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
      <Modal
        className="photo-upload-modal"
        title={<div className="photo-upload-modal-title">Select an image.</div>}
        centered
        visible={visibleModal}
        width={500}
        closable={true}
        maskClosable={false}
        footer={[]}
        onCancel={() => setVisibleModal(false)}
      >
        <UploadImageForm onSave={handleOnSave} isFixed aspectRatio={1 / 1} />
      </Modal>
    </>
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
