import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Form,
  DatePicker,
  InputNumber,
  Tag,
  Space,
  Popconfirm,
  Tooltip,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import SocketIO from "services/socket";
import moment from "moment-timezone";
import {
  CustomDrawer,
  CustomInput,
  CustomButton,
  CustomModal,
  CustomSelect,
} from "components";

import { useSearchCity } from "hooks";
import { SOCKET_EVENT_TYPE } from "enum";

import { actions as councilEventActions } from "redux/actions/council-events-actions";
import { councilEventSelector } from "redux/selectors/councilEventSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import CouncilEventPanel from "./CouncilEventPanel";

import "./style.scss";
import { convertToLocalTime, getNameOfCityWithTimezone } from "utils/format";
import FormListPanelItem from "./FomrListPanelItem";

const { RangePicker } = DatePicker;

const statusColor = {
  active: "#108ee9",
  draft: "orange",
  closed: "black",
};

const CouncilEvents = ({
  upsertCouncilEvent,
  allCouncilEvents,
  getCouncilEvents,
  deleteCouncilEvent,
  setJoinCouncilEvent,
  userProfile,
  setCouncilEventPanelComment,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(1);
  const [numOfPanels, setNumOfPanels] = useState(1);
  const [status, setStatus] = useState(null);
  const [event, setEvent] = useState({});
  const [edit, setEdit] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const cities = useSearchCity(searchCity);
  const [form] = Form.useForm();

  const userTimezone = moment.tz.guess();

  const timezone = !isEmpty(event) && event.timezone;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCouncilEvents();

    SocketIO.on(SOCKET_EVENT_TYPE.UPDATE_COUNCIL_EVENT_PANEL, (data) =>
      setJoinCouncilEvent(data)
    );

    SocketIO.on(SOCKET_EVENT_TYPE.UPDATE_COUNCIL_EVENT_COMMENTS, (data) =>
      setCouncilEventPanelComment(data)
    );

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
    if (!isEmpty(event) && event.CouncilEventPanels !== undefined) {
      const councilEventPanels = event.CouncilEventPanels;
      let panel = councilEventPanels[0];

      let startTime = moment.utc(panel.startDate);
      let endTime = moment.utc(panel.endDate);

      panel = {
        ...panel,
        councilEventPanelId: panel.id,
      };

      const panels = councilEventPanels.slice(1).map((panel) => {
        let startTime = moment.utc(panel.startDate);
        let endTime = moment.utc(panel.endDate);

        return {
          ...panel,
          panelStartAndEndDate: [startTime, endTime],
        };
      });

      const startDate = moment.utc(event.startDate);
      const endDate = moment.utc(event.endDate);
      const startAndEndDate = [startDate, endDate];

      const city = getNameOfCityWithTimezone(event.timezone);

      if (city) {
        setSearchCity(city);
      }

      form.setFieldsValue({
        ...event,
        startAndEndDate,
        panels,
        panelName: panel.panelName,
        numberOfPanelists: panel.numberOfPanelists,
        councilEventPanelId: panel.councilEventPanelId,
        panelStartAndEndDate: [startTime, endTime],
        linkToJoin: panel.linkToJoin,
        timezone: `${city}/${event.timezone}`,
      });

      setLimit(event.numberOfPanels); //max panels
      setNumOfPanels(event.CouncilEventPanels.length); //total panels
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const disableDate = (date = moment(), isPanel = false) => {
    const startAndEndDate = isPanel && form.getFieldValue(["startAndEndDate"]);

    if (startAndEndDate) {
      return (
        moment(date).isBefore(moment()) ||
        (isPanel &&
          moment(date).isBefore(moment(startAndEndDate[0]).startOf("day"))) ||
        (isPanel &&
          moment(date).isAfter(
            moment(startAndEndDate[1]).add(1, "days").startOf("day")
          ))
      );
    } else {
      return (
        moment(date).isBefore(moment()) ||
        (isPanel && moment(date).isBefore(moment().startOf("day")))
      );
    }
  };

  const limitOnChange = (value) => {
    setLimit(+value);
  };

  const checkIfOverTheLimit = (add) => {
    if (numOfPanels <= limit) {
      add();
      setNumOfPanels((state) => state + 1);
    }
  };

  const handleOnFinish = (values) => {
    const timezoneFirstSliceIndex = values.timezone.indexOf("/");
    const convertedStartTime = moment
      .utc(values.startAndEndDate[0].format("YYYY-MM-DD"))
      .format();

    const convertedEndTime = moment
      .utc(values.startAndEndDate[1].format("YYYY-MM-DD"))
      .format();

    const panel = {
      panelName: values.panelName,
      startDate: moment.utc(
        values.panelStartAndEndDate[0].format("YYYY-MM-DD HH:mm")
      ),
      endDate: moment.utc(
        values.panelStartAndEndDate[1].format("YYYY-MM-DD HH:mm")
      ),
      numberOfPanelists: values.numberOfPanelists,
      timezone: values.timezone.slice(
        timezoneFirstSliceIndex + 1,
        values.timezone.length
      ),
      linkToJoin: values.linkToJoin,
      id: values.councilEventPanelId,
      councilEventId: event ? event.id : null,
    };

    let panels = values.panels || [];

    panels = panels.map((panel) => {
      return {
        ...panel,
        startDate: moment
          .utc(panel.panelStartAndEndDate[0].format("YYYY-MM-DD HH:mm"))
          .format(),
        endDate: moment
          .utc(panel.panelStartAndEndDate[1].format("YYYY-MM-DD HH:mm"))
          .format(),
      };
    });
    panels = [panel, ...panels];

    const transformedValues = {
      ...values,
      id: event ? event.id : null,
      startDate: convertedStartTime,
      endDate: convertedEndTime,
      timezone: values.timezone.slice(
        timezoneFirstSliceIndex + 1,
        values.timezone.length
      ),
      panels,
      status,
      isEdit: edit,
      idEvent: event?.id,
    };

    upsertCouncilEvent(transformedValues, (error) => {
      if (error) {
        notification.error({
          message: "Something went wrong.",
        });
      } else {
        form.resetFields();
        setEvent({});
        setIsDrawerOpen(false);
        setEdit(false);
        getCouncilEvents();
      }
    });
  };

  const handleSubmit = (status) => {
    setStatus(status);
    form.submit();
  };

  const handleEdit = (eve) => {
    setEdit(true);
    setEvent(eve);
    setLimit(event.numberOfPanels);
    setNumOfPanels(event.numberOfPanels);
    setIsDrawerOpen(true);
  };

  const handleCloseEvent = (eve) => {
    upsertCouncilEvent({
      id: eve.id,
      status: "closed",
    });
  };

  const handleConfirmDelete = (id) => {
    deleteCouncilEvent(id);
  };

  const handleSearchCity = (value) => {
    if (value === "") {
      return;
    }

    let timer = setTimeout(() => {
      setSearchCity(value);
      clearTimeout(timer);
    }, 1000);
  };

  const displayPanels = event?.CouncilEventPanels?.map((panel) => {
    return (
      <CouncilEventPanel
        key={panel.id}
        panel={panel}
        tz={event.timezone}
        userTimezone={userTimezone}
        closeMainModal={() => setIsModalOpen(false)}
        councilEventId={event.id}
      />
    );
  });

  const displayCouncilEvents = allCouncilEvents
    .filter((eve) => {
      if (!userProfile.isExpertCouncilAdmin) {
        return eve.status === "active";
      } else {
        return true;
      }
    })
    .map((eve) => (
      <div
        className="council-event-card2"
        key={eve.eventName}
        onClick={(e) => {
          setEvent(eve);
          setIsModalOpen(true);
        }}
      >
        <div className="council-event-card2-content">
          <div
            className="d-flex justify-between"
            style={{ marginBottom: "1rem" }}
          >
            <div style={{ width: "175px" }}>
              <Tooltip title={eve.eventName}>
                <h3 className="truncate">{eve.eventName}</h3>
              </Tooltip>
            </div>
            {userProfile.isExpertCouncilAdmin && (
              <div>
                <Tag color={statusColor[eve.status]}>{eve.status}</Tag>
              </div>
            )}
          </div>
          <div>Start date: {moment.utc(eve.startDate).format("LL")}</div>
          <div style={{ marginBottom: "10px" }}>
            End date: {moment.utc(eve.endDate).format("LL")}
          </div>
          <div style={{ marginTop: "auto" }}>
            {userProfile.isExpertCouncilAdmin ? (
              <>
                <Space wrap>
                  <CustomButton
                    text="Edit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEdit(eve);
                    }}
                    size="small"
                  />
                  <CustomButton
                    text="Close"
                    type="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCloseEvent(eve);
                    }}
                    size="small"
                  />
                  <span onClick={(e) => e.stopPropagation()}>
                    <Popconfirm
                      title="Are you sure to delete this event?"
                      onConfirm={() => handleConfirmDelete(eve.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <CustomButton text="Delete" type="third" size="small" />
                    </Popconfirm>
                  </span>
                </Space>
                <div style={{ marginTop: "5px" }}>
                  <CustomButton
                    text="More info"
                    type="third"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEvent(eve);
                      setIsModalOpen(true);
                    }}
                    size="small"
                  />
                </div>
              </>
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
            onClick={() => {
              setIsDrawerOpen(true);
              form.resetFields();
              setEdit(false);
            }}
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
          setEdit(false);
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
            label="Max number of panels a user can join"
            name="maxNumberOfPanelsUsersCanJoin"
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
            name={"timezone"}
            label="Select the timezone using the city name"
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
                  <FormListPanelItem
                    key={key}
                    restField={restField}
                    index={index}
                    name={name}
                    limit={limit}
                    numOfPanels={numOfPanels}
                    setNumOfPanels={setNumOfPanels}
                    remove={remove}
                    disableDate={disableDate}
                  />
                ))}
                {numOfPanels < limit && (
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
            <h2>Event Name: {event?.eventName}</h2>
            <h4>
              Date:{" "}
              {convertToLocalTime(event?.startDate, timezone).format("LL")} -{" "}
              {convertToLocalTime(event?.endDate, timezone).format("LL")} (
              {userTimezone})
            </h4>
            <h4>Description: {event?.description}</h4>
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
