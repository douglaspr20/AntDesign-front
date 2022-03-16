import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  CustomDrawer,
  CustomInput,
  CustomButton,
  CustomModal,
} from "components";
import { Form, DatePicker, InputNumber, Tag, Avatar } from "antd";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { actions as councilEventActions } from "redux/actions/council-events-actions";
import { councilEventSelector } from "redux/selectors/councilEventSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";
import moment from "moment-timezone";

const { RangePicker } = DatePicker;

const CouncilEvents = ({
  upsertCouncilEvent,
  allCouncilEvents,
  getCouncilEvents,
  deleteCouncilEvent,
  userProfile,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(1);
  const [numOfPanels, setNumOfPanels] = useState(1);
  const [status, setStatus] = useState(null);
  const [event, setEvent] = useState({});

  const [form] = Form.useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCouncilEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(event)) {
      const _event = { ...event };
      const panel = _event.panels[0];
      const panels = _event.panels.slice(1).map((panel) => {
        return {
          ...panel,
          panelStartAndEndDate: [
            moment.tz(panel.panelStartAndEndDate[0], "America/Los_Angeles"),
            moment.tz(panel.panelStartAndEndDate[1], "America/Los_Angeles"),
          ],
        };
      });

      const startDate = moment.tz(_event.startDate, "America/Los_Angeles");
      const endDate = moment.tz(_event.endDate, "America/Los_Angeles");
      const startAndEndDate = [startDate, endDate];

      form.setFieldsValue({
        ...event,
        startAndEndDate,
        panels,
        panelName: panel.panelName,
        panelStartAndEndDate: [
          moment.tz(panel.panelStartAndEndDate[0], "America/Los_Angeles"),
          moment.tz(panel.panelStartAndEndDate[1], "America/Los_Angeles"),
        ],
        linkToJoin: panel.linkToJoin,
      });

      setLimit(event.numberOfPanels); //max panels
      setNumOfPanels(event.panels.length); //total panels
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const disableDate = (date) => {
    return moment(date).isBefore(moment());
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
    const panel = {
      panelName: values.panelName,
      panelStartAndEndDate: [
        moment.tz(values.panelStartAndEndDate[0], "America/Los_Angeles"),
        moment.tz(values.panelStartAndEndDate[1], "America/Los_Angeles"),
      ],
      numberOfPanelists: values.numberOfPanelists,
      linkToJoin: values.linkToJoin,
    };
    let panels = values.panels || [];
    panels = [panel, ...panels];
    const isEdit = !isEmpty(event);
    panels = panels.map((panel, index) => {
      return {
        ...panel,
        panelStartAndEndDate: [
          moment.tz(panel.panelStartAndEndDate[0], "America/Los_Angeles"),
          moment.tz(panel.panelStartAndEndDate[1], "America/Los_Angeles"),
        ],
        panelists: isEdit ? event.panels[index]?.panelists || [] : [],
      };
    });

    const transformedValues = {
      ...values,
      id: event.id || null,
      startDate: moment
        .tz(values.startAndEndDate[0], "America/Los_Angeles")
        .startOf("day"),
      endDate: moment
        .tz(values.startAndEndDate[1], "America/Los_Angeles")
        .startOf("day"),
      panels,
      status,
    };

    upsertCouncilEvent(transformedValues);
    form.resetFields();
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

  const handleJoinPanel = (event, index, panelName, state) => {
    const panels = [...event.panels];
    const panel = panels[index];

    const isCorrect = panel.panelName === panelName;

    if (isCorrect) {
      let transformedPanel = {
        ...panel,
      };
      let panelists = [];
      let panelistsData = [];

      if (state === "Unjoin") {
        panelists = panel.panelists.filter((id) => id !== userProfile.id);
        panelistsData = panel.panelistsData.filter(
          (user) => user.id !== userProfile.id
        );
      } else {
        const isFull = panel.panelists.length >= +panel.numberOfPanelists;

        if (!isFull) {
          panelists = [...(panel.panelists || []), userProfile.id];
          panelistsData = [...(panel.panelistsData || []), userProfile];
        } else {
          panelists = [...(panel.panelists || []), -99]; // -99 arbitrary number, prevents "Join" button changing state
        }
      }

      transformedPanel = {
        ...transformedPanel,
        panelists,
        panelistsData,
      };

      panels[index] = transformedPanel;

      const transformedEvent = {
        ...event,
        panels,
        isJoining: state === "Join",
        panelIndex: index,
      };

      upsertCouncilEvent(transformedEvent);
      setEvent(transformedEvent);
    }
  };

  const displayPanels = event.panels?.map((panel, index) => {
    const isFull = panel.panelists.length >= +panel.numberOfPanelists;

    const displayJoinBtn = panel.panelists?.includes(userProfile.id) ? (
      <div>
        <CustomButton
          text="Unjoin"
          onClick={() =>
            handleJoinPanel(event, index, panel.panelName, "Unjoin")
          }
        />
        {/* <div>Paita</div> */}
      </div>
    ) : (
      <CustomButton
        text={isFull ? "Already Full" : "Join"}
        disabled={isFull}
        onClick={() => handleJoinPanel(event, index, panel.panelName, "Join")}
      />
    );

    const displayPanelists = panel.panelistsData.map((panelist) => {
      return (
        <div className="panelist" key={panelist}>
          <Avatar src={panelist.img} size={100} />
          <div>{`${panelist.firstName} ${panelist.lastName}`}</div>
          <div>{panelist.titleProfessions}</div>
        </div>
      );
    });

    return (
      <div
        className="d-flex justify-between"
        key={panel.panelName + index}
        style={{ marginTop: "1rem", background: "#f2f2f2", padding: "1rem" }}
      >
        <div>
          <div>Panel: {panel.panelName}</div>
          <div>
            Panel Date: {moment(panel.panelStartAndEndDate[0]).format("LL")}
          </div>
          <div>
            Panel Start Time:
            {moment(panel.panelStartAndEndDate[0]).format("HH:mm")}
          </div>
          <div>
            Panel End Time:
            {moment(panel.panelStartAndEndDate[1]).format("HH:mm")}
          </div>
          <div
            className="d-flex"
            style={{ marginTop: "1rem", flexWrap: "wrap" }}
          >
            {displayPanelists}
          </div>
        </div>
        {displayJoinBtn}
      </div>
    );
  });

  const displayCouncilEvents = allCouncilEvents.map((eve) => (
    <div className="council-event-card2" key={eve.eventName}>
      <div>
        <div
          className="d-flex justify-between"
          style={{ marginBottom: "1rem" }}
        >
          <h3>{eve.eventName}</h3>
          <Tag color={eve.status === "active" ? "#108ee9" : "orange"}>
            {eve.status}
          </Tag>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          Start date: {moment(eve.startDate).format("LL")}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          End date: {moment(eve.endDate).format("LL")}
        </div>
        <div style={{ marginBottom: "1rem" }} className="truncate">
          Description: {eve.description}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          Number of panels: {eve.numberOfPanels}
        </div>
        {userProfile.isExpertCouncilAdmin ? (
          <>
            <CustomButton
              text="Edit"
              style={{ marginRight: "1rem" }}
              onClick={() => handleEdit(eve)}
            />
            <CustomButton
              text="Delete"
              type="secondary"
              onClick={() => deleteCouncilEvent(eve.id)}
            />
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
              format="YYYY-MM-DD HH:mm"
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
          <Form.Item>
            <div>
              <h3>Panel #1</h3>
            </div>
          </Form.Item>
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
              showTime
              disabledDate={disableDate}
              style={{ width: "100%" }}
              size="large"
              format="YYYY-MM-DD HH:mm"
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
                        disabledDate={disableDate}
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
          <div>Event Name: {event.eventName}</div>
          <div>Start Date: {moment(event.startDate).format("LL")}</div>
          <div>Ebd Date: {moment(event.endDate).format("LL")}</div>
          <div>Description: {event.description}</div>
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
