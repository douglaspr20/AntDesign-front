import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Collapse } from "components";
import MemberSpeakers from "./MembersSpeakers";
import Modal from "antd/lib/modal/Modal";
import {
  Form,
  Select,
  Switch
} from "antd";

import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as speaker } from "redux/actions/speaker-actions";

import "./style.scss";

const PanelSpeakers = ({
    role,
    addUserSpeakerToPanel,
    allPanelSpeakers,
    getAllPanelSpeakers,
    getAllUserSpeaker,
    allUserSpeaker,
    removeUserSpeakerToPanel,
    userProfile,
  }) => {
  
    const [speakersUserForm] = Form.useForm();
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [Panel, setPanel] = useState({})

    const { Option } = Select;

    useEffect(() => {
      getAllPanelSpeakers(userProfile.id)
      getAllUserSpeaker(userProfile.id)
    },[getAllPanelSpeakers, getAllUserSpeaker, userProfile.id])

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

    const joinUser = (data) => {
      const usersNames = [[ userProfile.id , userProfile.firstName , userProfile.email ]]
      addUserSpeakerToPanel({usersNames, bul: false, panel: data}, () => {
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
  