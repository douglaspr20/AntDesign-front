import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Collapse } from "components";
import MemberSpeakers from "./MembersSpeakers";
import { TIMEZONE_LIST } from "enum";
import Modal from "antd/lib/modal/Modal";
import {
  CustomDrawer,
  CustomInput,
  CustomButton,
  CustomSelect,
} from "components";
import {
  Form,
  DatePicker,
  Select,
  Switch
} from "antd";

import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as speaker } from "redux/actions/speaker-actions";

import "./style.scss";
import IconPlus from "images/icon-plus.svg";
import moment from "moment-timezone";
import TimezoneList from "enum/TimezoneList";

const { RangePicker } = DatePicker;

const PanelSpeakers = ({
    role,
    addPanelSpeakers,
    addUserSpeakerToPanel,
    allPanelSpeakers,
    getAllPanelSpeakers,
    getAllUserSpeaker,
    allUserSpeaker,
    removeUserSpeakerToPanel,
    userProfile,
  }) => {
  
    const [form] = Form.useForm();
    const [speakersUserForm] = Form.useForm();
    //const [panel, setPanel] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    //const [status, setStatus] = useState(null);
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [Panel, setPanel] = useState({})

    const { Option } = Select;

    const disableDate = (date, isPanel = false) => {
      const startAndEndDate = isPanel && form.getFieldValue(["startAndEndDate"]);

      return (
        moment(date).isBefore(moment()) ||
        (isPanel &&
          moment(date).isBefore(moment(startAndEndDate[0]).startOf("day")))
      );
    };

    useEffect(() => {
      getAllPanelSpeakers(userProfile.id)
      getAllUserSpeaker(userProfile.id)
    },[getAllPanelSpeakers, getAllUserSpeaker, userProfile.id])

    const handleOnFinish = (values) => {
      
      const timezone = TimezoneList.find((tz) => tz.value === values.timezone);

      const panel = {
        panelName: values.panelName,
        timeZone: values.timezone,
        startDate: values.startAndEndDate[0]
          .utcOffset(timezone.offset, true)
          .set({ second: 0, millisecond: 0 }),
        endDate: values.startAndEndDate[1]
          .utcOffset(timezone.offset, true)
          .set({ second: 0, millisecond: 0 }),
        description: values.description,
        OwnerId: userProfile.id
      };

      addPanelSpeakers(panel)

      getAllPanelSpeakers(userProfile.id)
      getAllUserSpeaker(userProfile.id)

      setIsDrawerOpen(false);
      form.resetFields();
    }

    const handleSubmit = (status) => {
      form.submit();
    };

    const addUser = (data) => {
      const bulModerator = (data.isModerator === undefined) ? false : data.isModerator
      const {usersNames} = data.users
      addUserSpeakerToPanel({usersNames,bul: bulModerator, panel: Panel}, () => {
        setPanel({})
        speakersUserForm.resetFields();
        getAllPanelSpeakers(userProfile.id)
        getAllUserSpeaker(userProfile.id)
      })
    }

    const joinUser = (id) => {
      const usersNames = [userProfile.id]
      addUserSpeakerToPanel({usersNames, bul: false, Panel: id}, () => {
        getAllPanelSpeakers(userProfile.id)
        getAllUserSpeaker(userProfile.id)
      })
    }

    const removeUserFunction = (id) => {
      removeUserSpeakerToPanel(id, () => {
        getAllPanelSpeakers(userProfile.id)
        getAllUserSpeaker(userProfile.id)
      })
    }

    return (
      <>
        <div className="conteiner-speaker">
            { (role === "admin") && 
              <div className="add-panel-speaker" onClick={() => setIsDrawerOpen(true)}>
                  <img src={IconPlus} className="icon-add" alt="agregar"></img>
              </div>
            }
            {allPanelSpeakers?.panelsSpeakers?.map((panels) => ( 
              <Collapse 
                key={panels?.id}
                panels={panels} 
                searchUser={setOpenSearchUser}
                isAdmin={(role === "admin") ? true : false}
                setId={setPanel}
                joinUser={joinUser}
                members={(
                  <div className="ajust-contain">
                    { panels?.SpeakerMemberPanels?.map((user) => (
                        <MemberSpeakers 
                          key={user?.id}
                          usersPanel={user}
                          isAdmin={(role === "admin") ? true : false}
                          remove={removeUserFunction}
                        />
                      ))}
                  </div>
                )} 
              />
            ))}
            <Modal
              visible={openSearchUser}
              title="Searh a speaker."
              width={500}
              onCancel={() => {
                setOpenSearchUser(false)
                speakersUserForm.resetFields();
                setPanel({})
              }}
              onOk={() => {
                setOpenSearchUser(false)
                speakersUserForm.submit();
              }}
              okText="Yes"
            >
              <Form
                form={speakersUserForm}
                layout="vertical"
                onFinish={(data) => {
                  addUser(data);
                }}
              >
                <Form.Item
                  label="Users"
                  name={["users", "usersNames"]}
                  size="large"
                  rules={[{ required: true, message: "Users is necesary" }]}
                >
                  <Select 
                      style={{ width: "100%" }} 
                      mode="multiple" 
                      optionFilterProp="children"
                      filtersort={`${(optionA, optionB) => {
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                      }`}
                    >
                      {allUserSpeaker?.userSpeakers !== undefined ? allUserSpeaker?.userSpeakers.map((users) => (
                        <Option key={users.id} value={[users.id,users.firstName,users.email]}>
                          {`${users.firstName} / ${users.email}`}
                        </Option>
                      )): <div></div>}
                  </Select>
                </Form.Item>
                <Form.Item name="isModerator" label="Is a moderator" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Form>
            </Modal>
            <CustomDrawer
              onClose={() => {
                setIsDrawerOpen(false);
                form.resetFields();
              }}
              visible={isDrawerOpen}
              width={520}
              title={"Panels"}
            >
              <Form form={form} layout="vertical" onFinish={handleOnFinish} style={{padding: "20px"}}>
                <Form.Item
                  label="Panel Name"
                  name="panelName"
                  rules={[{ required: true }]}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="startAndEndDate"
                  rules={[{ required: true }]}
                  style={{borderRadius: "7.5px"}}
                >
                  <RangePicker
                    style={{ width: "100%",borderRadius: "7.5px" }}
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
                 <div className="form-btns">
                  {/* <Form.Item>
                    <CustomButton
                      text="Draft"
                      type="secondary"
                      style={{ marginRight: "1rem" }}
                      onClick={() => handleSubmit("draft")}
                    />
                  </Form.Item> */}
                  <Form.Item>
                    <CustomButton
                      text="Submit"
                      onClick={() => handleSubmit("active")}
                    />
                  </Form.Item>
                </div>
              </Form>
          </CustomDrawer>
        </div>
      </>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
    allUserSpeaker: speakerAllPanelSpeakerSelector(state).allUserSpeakers,
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    addPanelSpeakers: speaker.addPanelSpeakers,
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
    getAllUserSpeaker: speaker.getAllUserSpeaker,
    removeUserSpeakerToPanel: speaker.removeUserSpeakerToPanel,
    addUserSpeakerToPanel: speaker.addUserSpeakerToPanel
  };

  MemberSpeakers.propTypes = {
    role: PropTypes.string
  };
  
  MemberSpeakers.defaultProps = {
    role: ""
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelSpeakers);
  