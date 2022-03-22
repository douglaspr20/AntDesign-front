import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  CustomDrawer,
  CustomInput,
  CustomButton,
  CustomModal,
  CustomSelect,
} from "components";
import { Form, DatePicker, InputNumber, Tag, Space, Popconfirm } from "antd";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { TIMEZONE_LIST } from "enum";

import { actions as councilEventActions } from "redux/actions/council-events-actions";
import { councilEventSelector } from "redux/selectors/councilEventSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import CouncilEventPanel from "./CouncilEventPanel";

import "./style.scss";
import moment from "moment-timezone";
import TimezoneList from "enum/TimezoneList";

const { RangePicker } = DatePicker;

const CouncilEvents = ({
  upsertCouncilEvent,
  allCouncilEvents,
  getCouncilEvents,
  deleteCouncilEvent,
  userProfile,
  joinCouncilEvent,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(1);
  const [numOfPanels, setNumOfPanels] = useState(1);
  const [status, setStatus] = useState(null);
  const [event, setEvent] = useState({});

  const [form] = Form.useForm();

  const timezone =
    !isEmpty(event) && TIMEZONE_LIST.find((tz) => tz.value === event.timezone);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCouncilEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(event)) {
      const _event = allCouncilEvents.find((eve) => eve.id === event.id);
      setEvent(_event);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCouncilEvents]);

  useEffect(() => {
    if (!isEmpty(event)) {
      const councilEventPanels = event.CouncilEventPanels;
      let panel = councilEventPanels[0];
      const timezone = TimezoneList.find((tz) => tz.value === event.timezone);

      panel = {
        ...panel,
        councilEventPanelId: panel.id,
      };

      const panels = councilEventPanels.slice(1).map((panel) => {
        return {
          ...panel,
          panelStartAndEndDate: [
            moment.tz(panel.panelStartAndEndDate[0], timezone?.utc[0]),
            moment.tz(panel.panelStartAndEndDate[1], timezone?.utc[0]),
          ],
        };
      });

      const startDate = moment.tz(event.startDate, timezone?.utc[0]);
      const endDate = moment.tz(event.endDate, timezone?.utc[0]);
      const startAndEndDate = [startDate, endDate];

      form.setFieldsValue({
        ...event,
        startAndEndDate,
        panels,
        panelName: panel.panelName,
        numberOfPanelists: panel.numberOfPanelists,
        councilEventPanelId: panel.councilEventPanelId,
        panelStartAndEndDate: [
          moment.tz(panel.panelStartAndEndDate[0], timezone?.utc[0]),
          moment.tz(panel.panelStartAndEndDate[1], timezone?.utc[0]),
        ],
        linkToJoin: panel.linkToJoin,
      });

      setLimit(event.numberOfPanels); //max panels
      setNumOfPanels(event.CouncilEventPanels.length); //total panels
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const disableDate = (date, isPanel = false) => {
    const startAndEndDate = isPanel && form.getFieldValue(["startAndEndDate"]);

    return (
      moment(date).isBefore(moment()) ||
      (isPanel && moment(date).isBefore(moment(startAndEndDate[0])))
    );
  };

  const limitOnChange = (value) => {
    setLimit(+value);
  };

  const checkIfOverTheLimit = (add) => {
    if (numOfPanels < limit) {
      add();
      setNumOfPanels((state) => state + 1);
    }
  };

  const handleOnFinish = (values) => {
    const timezone = TimezoneList.find((tz) => tz.value === values.timezone);
    const panel = {
      panelName: values.panelName,
      panelStartAndEndDate: [
        moment.tz(values.panelStartAndEndDate[0], timezone.utc[0]),
        moment.tz(values.panelStartAndEndDate[1], timezone.utc[0]),
      ],
      numberOfPanelists: values.numberOfPanelists,
      linkToJoin: values.linkToJoin,
      id: values.councilEventPanelId,
      councilEventId: event.id || null,
    };
    let panels = values.panels || [];
    panels = [panel, ...panels];
    panels = panels.map((panel) => {
      return {
        ...panel,
        panelStartAndEndDate: [
          moment.tz(panel.panelStartAndEndDate[0], timezone.utc[0]),
          moment.tz(panel.panelStartAndEndDate[1], timezone.utc[0]),
        ],
      };
    });

    const transformedValues = {
      ...values,
      id: event.id || null,
      startDate: moment
        .tz(values.startAndEndDate[0], timezone.utc[0])
        .startOf("day"),
      endDate: moment
        .tz(values.startAndEndDate[1], timezone.utc[0])
        .startOf("day"),
      panels,
      status,
    };

    upsertCouncilEvent(transformedValues);
    form.resetFields();
    setEvent({});
    setIsDrawerOpen(false);
  };

  const handleSubmit = (status) => {
    setStatus(status);
    form.submit();
  };

  const handleEdit = (eve) => {
    setEvent(eve);
    setLimit(event.numberOfPanels);
    setNumOfPanels(event.numberOfPanels);
    setIsDrawerOpen(true);
  };

  const handleConfirmDelete = (id) => {
    deleteCouncilEvent(id);
  };

  const displayPanels = event.CouncilEventPanels?.map((panel) => (
    <CouncilEventPanel
      key={panel.id}
      panel={panel}
      userProfile={userProfile}
      joinCouncilEvent={joinCouncilEvent}
      tz={event.timezone}
      status={event.status}
    />
  ));

  const displayCouncilEvents = allCouncilEvents
    .filter((eve) => {
      if (!userProfile.isExpertCouncilAdmin) {
        return eve.status === "active";
      } else {
        return true;
      }
    })
    .map((eve) => (
      <div className="council-event-card2" key={eve.eventName}>
        <div className="council-event-card2-content">
          <div
            className="d-flex justify-between"
            style={{ marginBottom: "1rem" }}
          >
            <h3>{eve.eventName}</h3>
            {userProfile.isExpertCouncilAdmin && (
              <div>
                <Tag color={eve.status === "active" ? "#108ee9" : "orange"}>
                  {eve.status}
                </Tag>
              </div>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            Start date: {moment(eve.startDate).format("LL")}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            End date: {moment(eve.endDate).format("LL")}
          </div>
          <div style={{ marginTop: "auto" }}>
            {userProfile.isExpertCouncilAdmin ? (
              <Space>
                <CustomButton
                  text="Edit"
                  onClick={() => handleEdit(eve)}
                  size="small"
                />
                <Popconfirm
                  title="Are you sure to delete this event?"
                  onConfirm={() => handleConfirmDelete(eve.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <CustomButton text="Delete" type="secondary" size="small" />
                </Popconfirm>
                <CustomButton
                  text="More info"
                  type="third"
                  block
                  onClick={() => {
                    setEvent(eve);
                    setIsModalOpen(true);
                  }}
                  size="small"
                />
              </Space>
            ) : (
              <CustomButton
                text="More info"
                type="primary"
                block
                onClick={() => {
                  setEvent(eve);
                  setIsModalOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="council-events-wrapper">
      <div className="council-event-content">
        {userProfile.isExpertCouncilAdmin && (
          <div
            className="council-event-card"
            onClick={() => setIsDrawerOpen(true)}
          >
            <PlusOutlined style={{ fontSize: "2rem" }} />
          </div>
        )}
        {displayCouncilEvents}
      </div>
      <CustomDrawer
        onClose={() => {
          setEvent({});
          setIsDrawerOpen(false);
          form.resetFields();
        }}
        visible={isDrawerOpen}
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={handleOnFinish}>
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[{ required: true }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            label="Date"
            name="startAndEndDate"
            rules={[{ required: true }]}
          >
            <RangePicker
              style={{ width: "100%" }}
              size="large"
              disabledDate={disableDate}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <CustomInput multiple />
          </Form.Item>
          <Form.Item
            label="Number of panels"
            name="numberOfPanels"
            initialValue="1"
            rules={[{ required: true }]}
          >
            <InputNumber
              size="large"
              min="1"
              style={{ width: "100%" }}
              onChange={limitOnChange}
            />
          </Form.Item>
          <Form.Item
            label="Timezone"
            name="timezone"
            rules={[{ required: true }]}
          >
            <CustomSelect
              showSearch
              options={TIMEZONE_LIST}
              optionFilterProp="children"
              bordered
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item>
            <div>
              <h3>Panel #1</h3>
            </div>
          </Form.Item>
          <Form.Item name="councilEventPanelId" noStyle />
          <Form.Item
            label="Panel name"
            name="panelName"
            rules={[{ required: true }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            label="Start And End Date"
            name="panelStartAndEndDate"
            rules={[{ required: true }]}
          >
            <RangePicker
              disabledDate={(date) => disableDate(date, true)}
              style={{ width: "100%" }}
              size="large"
              format="YYYY-MM-DD HH:mm"
              showTime
            />
          </Form.Item>
          <Form.Item
            label="Number of panelists"
            name="numberOfPanelists"
            initialValue="1"
            rules={[{ required: true }]}
          >
            <InputNumber size="large" min="1" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Link to join each panel"
            name="linkToJoin"
            rules={[{ required: true, type: "url" }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.List name="panels">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} style={{ marginTop: "2rem" }}>
                    <Form.Item {...restField}>
                      <div className="add-panel-title">
                        <h3>Panel #{index + 2}</h3>
                        <MinusCircleOutlined
                          onClick={() => {
                            setNumOfPanels((state) => state - 1);
                            remove(name);
                          }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Panel name"
                      name={[name, "panelName"]}
                      rules={[{ required: true }]}
                    >
                      <CustomInput />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Start and End Date"
                      name={[name, "panelStartAndEndDate"]}
                      rules={[{ required: true }]}
                    >
                      <RangePicker
                        showTime
                        disabledDate={(date) => disableDate(date, true)}
                        style={{ width: "100%" }}
                        size="large"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Number of panelists"
                      name={[name, "numberOfPanelists"]}
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        size="large"
                        min="1"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Link to join each panel"
                      name={[name, "linkToJoin"]}
                      rules={[{ required: true, type: "url" }]}
                    >
                      <CustomInput />
                    </Form.Item>
                  </div>
                ))}
                {numOfPanels !== limit && (
                  <Form.Item>
                    <CustomButton
                      text="Add Panel"
                      onClick={() => checkIfOverTheLimit(add)}
                      icon={<PlusOutlined />}
                      type="ghost"
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
          <div className="form-btns">
            <Form.Item>
              <CustomButton
                text="Draft"
                type="secondary"
                style={{ marginRight: "1rem" }}
                onClick={() => handleSubmit("draft")}
              />
            </Form.Item>
            <Form.Item>
              <CustomButton
                text="Submit"
                onClick={() => handleSubmit("active")}
              />
            </Form.Item>
          </div>
        </Form>
      </CustomDrawer>
      <CustomModal
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        width={1000}
      >
        <div style={{ padding: "1rem" }}>
          <Space direction="vertical">
            <h2>Event Name: {event.eventName}</h2>
            <h4>
              Date:{" "}
              {moment
                .tz(event.startDate, !isEmpty(timezone) && timezone?.utc[0])
                .format("LL")}{" "}
              -{" "}
              {moment
                .tz(event.endDate, !isEmpty(timezone) && timezone?.utc[0])
                .format("LL")}{" "}
              ({timezone.abbr})
            </h4>
            <h4>Description: {event.description}</h4>
          </Space>
        </div>
        <div>
          <div className="display-panel">{displayPanels}</div>
        </div>
      </CustomModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...councilEventSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...councilEventActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilEvents);
