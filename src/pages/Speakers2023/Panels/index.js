import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Collapse, CustomButton, ModalCompleteYourProfile } from "components";
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
import { getUser } from "redux/actions/home-actions";

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
    getUser
  }) => {
  
    const [speakersUserForm] = Form.useForm();
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [popUpGoCompleteYourProfile, setPopUpGoCompleteYourProfile] = useState(false)
    const [popUpCompleteYourProfile, setPopUpCompleteYourProfile] = useState(false)
    const [Panel, setPanel] = useState({})

    const { Option } = Select;

    useEffect(() => {
      getAllPanelSpeakers(userProfile.id)
      getAllUserSpeaker(userProfile.id)
    },[getAllPanelSpeakers, getAllUserSpeaker, userProfile.id])

    const addUser = (data) => {
      const bulModerator = (data.isModerator === undefined) ? false : data.isModerator
      const {usersNames} = data.users
      addUserSpeakerToPanel({usersNames,bul: bulModerator, panel: Panel, type: "addUserAdmin"}, () => {
        setPanel({})
        speakersUserForm.resetFields();
        getAllPanelSpeakers(userProfile.id)
        getAllUserSpeaker(userProfile.id)
      })
    }

    const joinUser = (data) => {
      const usersNames = { 
        userId: userProfile.id, 
        userName: userProfile.firstName, 
        userEmail: userProfile.email,
      }
      addUserSpeakerToPanel({usersNames, bul: false, panel: data, type: "joinUser"}, () => {
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

    const content = (panels) => (
      <>
        <p className="container-panel-speaker-parraf" style={{fontSize: "16px"}}>Title: <span className="not-bold">{panels.panelName}</span></p>
        <p className="container-panel-speaker-parraf">Description: <span className="not-bold">{panels.description}</span></p>
      </>
    )

    return (
      <>
        {allPanelSpeakers?.panelsSpeakers?.map((panels) => ( 
          <Collapse 
            key={panels?.id}
            panels={panels} 
            searchUser={setOpenSearchUser}
            isAdmin={(role === "admin") ? true : false}
            setId={setPanel}
            joinUser={joinUser}
            UserProfile={userProfile}
            removeUserFunction={removeUserFunction}
            setBulCompleteProfile={setPopUpGoCompleteYourProfile}
            contentText={content(panels)}
            bulJoin={true}
            typeCard={"container-panel-speaker"}
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
                    <Option key={users.id} value={JSON.stringify({userId:users.id, userName:users.firstName, userEmail:users.email})}>
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
        <Modal
          visible={popUpGoCompleteYourProfile}
          centered
          footer={[
            <CustomButton
              key="Cancel"
              text="Later"
              type="primary outlined"
              style={{paddingLeft: "10px", paddingRight: "10px"}}
              size="xs"
              onClick={() => setPopUpGoCompleteYourProfile(false)}
            />,
            <CustomButton
              key="Delete"
              text="Complete here"
              type="primary"
              style={{paddingLeft: "10px", paddingRight: "10px"}}
              size="xs"
              onClick={() => {
                setPopUpGoCompleteYourProfile(false)
                setPopUpCompleteYourProfile(true)
              }}
            />,
          ]}
          onCancel={() => setPopUpGoCompleteYourProfile(false)}
        >
          <h4>Please complete all the information in your profile. You will only be able to join this panel when your profile is 100% completed</h4>
        </Modal>
        {popUpCompleteYourProfile &&
          <div className="container-modal-complete-profile">
            <ModalCompleteYourProfile
              userProfile={userProfile}
              get={getUser}
              onCancel={setPopUpCompleteYourProfile}
            />
          </div>
        }
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
    addUserSpeakerToPanel: speaker.addUserSpeakerToPanel,
    getUser
  };

  MemberSpeakers.propTypes = {
    role: PropTypes.string
  };
  
  MemberSpeakers.defaultProps = {
    role: ""
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelSpeakers);
  