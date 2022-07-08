import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberSpeakers from "./MembersSpeakers";

import PropTypes from "prop-types";
import { CustomButton, ModalCompleteYourProfile, CollapseComponent } from "components";
import ButtonsSpeakers from "./ButtonsSpeakers";
import Modal from "antd/lib/modal/Modal";
import {
  Form,
  Select,
  Switch
} from "antd";

import moment from "moment";

import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as speaker } from "redux/actions/speaker-actions";
import { getUser } from "redux/actions/home-actions";

import "./style.scss";

const PanelSpeakers = ({
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
    const [removeMembersSpeakers, setRemoveMembersSpeakers] = useState(false)
    const [Panel, setPanel] = useState({})

    const { Option } = Select;

    useEffect(() => {
      getAllPanelSpeakers(userProfile.id)
      getAllUserSpeaker(userProfile.id)
    },[getAllPanelSpeakers, getAllUserSpeaker, userProfile.id])

    const addUser = (data) => {
      const bulModerator = (data.isModerator === undefined) ? false : data.isModerator
      addUserSpeakerToPanel({usersNames: data.users,bul: bulModerator, panel: Panel, type: "addUserAdmin"}, () => {
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

    const removeUserFunction = (id, user) => {
      removeUserSpeakerToPanel(id, () => {
        getAllPanelSpeakers(userProfile.id)
        getAllUserSpeaker(userProfile.id)
        if(userProfile.id === user){
          setRemoveMembersSpeakers(true)
        }
      })
    }

    const content = (panels) => (
      <div className="content-collapse" key={panels.id}>
          <p className="title-collapse">{panels.panelName}</p>
          <div className="content-information">
              <div className="content-first-information">
                  <p className="p-content">Start Time: 
                      <span className="date"> {moment(panels.startDate).format("MM-DD-YYYY hh:mm a")}</span>
                  </p>
                  <p className="p-content">End Time: 
                      <span className="date"> {moment(panels.endDate).format("MM-DD-YYYY hh:mm a")}</span>
                  </p>
              </div>
              <div className="content-second-information">
                  <p className="p-location">Location:</p> 
                  <p className="p-location-data">{panels.timeZone}</p>
              </div>
          </div>
      </div>
    )

    const dataIterated = (panels) => (
      <div className="ajust-contain">
          { panels?.SpeakerMemberPanels?.map((user) => (
                  <MemberSpeakers 
                    key={user?.id}
                    usersPanel={user}
                    isAdmin={(userProfile.role === "admin") ? true : false}
                    remove={removeUserFunction}
                  />
            ))}
      </div>
    )

    return (
      <>
        <div className="container-collapse">
          {allPanelSpeakers?.panelsSpeakers?.map((panels) => ( 
            <CollapseComponent 
              key={panels?.id}
              informationCollapse={content(panels)}
              className={"container-panel"}
              dataIterated={dataIterated(panels)}
              buttons={
                <ButtonsSpeakers 
                  panels={panels} 
                  removeUserFunction={removeUserFunction}
                  joinUser={joinUser}
                  setPanel={setPanel}
                  setBulCompleteProfile={setPopUpGoCompleteYourProfile}
                  role={userProfile.role}
                  setOpenSearchUser={setOpenSearchUser}
                  setRemoveMembersSpeakers={setRemoveMembersSpeakers}
                  removeMembersSpeakers={removeMembersSpeakers}
                />
              }
            />
          ))}
        </div>
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
              name="users"
              size="large"
              rules={[{ required: true, message: "Users is necesary" }]}
            >
              <Select 
                  style={{ width: "100%" }} 
                  mode="multiple" 
                  allowClear
                  placeholder="Select users"
                  optionFilterProp="children"
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
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
    getAllUserSpeaker: speaker.getAllUserSpeaker,
    removeUserSpeakerToPanel: speaker.removeUserSpeakerToPanel,
    addUserSpeakerToPanel: speaker.addUserSpeakerToPanel,
    getUser
  };

  PanelSpeakers.propTypes = {
    role: PropTypes.string
  };
  
  PanelSpeakers.defaultProps = {
    role: ""
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelSpeakers);
  