import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberSpeakers from "./MembersSpeakers";
import { notification } from "antd";

import PropTypes from "prop-types";
import {
  CustomButton,
  ModalCompleteYourProfile,
  CollapseComponent,
} from "components";
import ButtonsSpeakers from "./ButtonsSpeakers";
import Modal from "antd/lib/modal/Modal";
import { Form, Select, Switch } from "antd";

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
  getUser,
  getAllMemberSpeakerPanel,
  allMember,
  getAllPanelsOfOneUserSpeakers,
  allMyPanels,
  type,
  changeTab
}) => {
  const [speakersUserForm] = Form.useForm();
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [popUpGoCompleteYourProfile, setPopUpGoCompleteYourProfile] =
    useState(false);
  const [popUpCompleteYourProfile, setPopUpCompleteYourProfile] =
    useState(false);
  const [removeMembersSpeakers, setRemoveMembersSpeakers] = useState(false);
  const [Panel, setPanel] = useState({});
  const [change, setChange] = useState()

  useEffect(() => {
    setChange(changeTab)
  }, [changeTab])

  const { Option } = Select;

  useEffect(() => {
    getAllPanelSpeakers("Panels");
    getAllPanelsOfOneUserSpeakers();
    getAllMemberSpeakerPanel()
    getAllUserSpeaker(userProfile.id);
  }, [getAllPanelSpeakers, getAllUserSpeaker, getAllMemberSpeakerPanel, userProfile.id, change]);

  const addUser = (data) => {
    const bulModerator =
      data.isModerator === undefined ? false : data.isModerator;
    addUserSpeakerToPanel(
      {
        usersNames: data.users,
        bul: bulModerator,
        panel: Panel,
        type: "addUserAdmin",
      },
      () => {
        setPanel({});
        speakersUserForm.resetFields();
        getAllPanelSpeakers("Panels");
        getAllPanelsOfOneUserSpeakers();
        getAllUserSpeaker(userProfile.id);
      }
    );
  };

  const joinUser = (data,index) => {
    const usersNames = {
      userId: userProfile.id,
      userName: userProfile.firstName,
      userEmail: userProfile.email,
    };

    let arrayMemberNotModerator = allPanelSpeakers.panelsSpeakers[index]?.SpeakerMemberPanels.filter((member) => {
      return member.isModerator === false
    })

    if(allMember.length < 2 && userProfile.role === 'user' && arrayMemberNotModerator.length < 5){
      addUserSpeakerToPanel(
        { usersNames, bul: false, panel: data, type: "joinUser" },
        () => {
          getAllPanelSpeakers("Panels");
          getAllPanelsOfOneUserSpeakers();
          getAllUserSpeaker(userProfile.id);
          getAllMemberSpeakerPanel()
        }
      );
    }else{
      if(userProfile.role !== "admin"){
        if(arrayMemberNotModerator.length === 5){
          notification.error({
          message: "ERROR:",
          description: "This panel is full.",
        });
        }
        if(allMember.length === 2){
          notification.error({
            message: "ERROR:",
            description: "You can't join more than two panels.",
          });
        }
      }
    }
    if(userProfile.role === 'admin'){
      addUserSpeakerToPanel(
        { usersNames, bul: false, panel: data, type: "joinUser" },
        () => {
          getAllPanelSpeakers("Panels");
          getAllPanelsOfOneUserSpeakers();
          getAllUserSpeaker(userProfile.id);
          getAllMemberSpeakerPanel()
        }
      );
    }
  };

  const removeUserFunction = (id, user) => {
    removeUserSpeakerToPanel(id, () => {
      getAllPanelSpeakers("Panels");
      getAllPanelsOfOneUserSpeakers();
      getAllUserSpeaker(userProfile.id);
      getAllMemberSpeakerPanel()
      if (userProfile.id === user) {
        setTimeout(() => {
          setRemoveMembersSpeakers(true);
        }, 100);
      }
    });
  };

  const content = (panels) => (
    <div className="content-collapse" key={panels.id}>
      <p className="title-collapse">{panels.panelName}</p>
    </div>
  );

  const dataIterated = (panels) => (
    <div className="ajust-contain">
      {panels?.SpeakerMemberPanels?.map((user) => (
        <MemberSpeakers
          key={user?.id}
          usersPanel={user}
          isAdmin={userProfile.role === "admin" ? true : false}
          remove={removeUserFunction}
        />
      ))}
    </div>
  );

  const dataStatic = (panels) => (
    <p
      className="container-panel-speaker-parraf"
      style={{ marginBottom: "40px", fontSize: "18px" }}
    >
      Description: <span className="not-bold">{panels.description}</span>
    </p>
  );

  return (
    <>
      {type === "panels" && 
        <div className="container-collapse">
          {allPanelSpeakers?.panelsSpeakers?.map((panels, index) => (
            <CollapseComponent
              key={panels?.id}
              informationCollapse={content(panels)}
              className={"container-panel"}
              dataIterated={dataIterated(panels)}
              dataStatic={dataStatic(panels)}
              buttons={
                <ButtonsSpeakers
                  index={index}
                  panels={panels}
                  removeUserFunction={removeUserFunction}
                  joinUser={joinUser}
                  setPanel={setPanel}
                  setBulCompleteProfile={setPopUpGoCompleteYourProfile}
                  role={userProfile.role}
                  setOpenSearchUser={setOpenSearchUser}
                  setRemoveMembersSpeakers={setRemoveMembersSpeakers}
                  removeMembersSpeakers={removeMembersSpeakers}
                  allMyPanels={allMyPanels}
                />
              }
            />
          ))}
        </div>
      }
      {type === "myPanels" && 
        <div className="container-collapse">
          {allMyPanels?.map((panels, index) => (
            <CollapseComponent
              key={panels?.SpeakerPanel?.id}
              informationCollapse={content(panels?.SpeakerPanel)}
              className={"container-panel"}
              dataIterated={dataIterated(panels?.SpeakerPanel)}
              dataStatic={dataStatic(panels?.SpeakerPanel)}
              buttons={
                <ButtonsSpeakers
                  index={index}
                  panels={panels?.SpeakerPanel}
                  removeUserFunction={removeUserFunction}
                  joinUser={joinUser}
                  setPanel={setPanel}
                  setBulCompleteProfile={setPopUpGoCompleteYourProfile}
                  role={userProfile.role}
                  setOpenSearchUser={setOpenSearchUser}
                  setRemoveMembersSpeakers={setRemoveMembersSpeakers}
                  removeMembersSpeakers={removeMembersSpeakers}
                  allMyPanels={allMyPanels}
                />
              }
            />
          ))}
        </div>
      }
      <Modal
        visible={openSearchUser}
        title="Searh a speaker."
        width={500}
        onCancel={() => {
          setOpenSearchUser(false);
          speakersUserForm.resetFields();
          setPanel({});
        }}
        onOk={() => {
          setOpenSearchUser(false);
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
              {allUserSpeaker?.userSpeakers !== undefined ? (
                allUserSpeaker?.userSpeakers.map((users) => (
                  <Option
                    key={users.id}
                    value={JSON.stringify({
                      userId: users.id,
                      userName: users.firstName,
                      userEmail: users.email,
                    })}
                  >
                    {`${users.firstName} / ${users.email}`}
                  </Option>
                ))
              ) : (
                <div></div>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="isModerator"
            label="Is a moderator"
            valuePropName="checked"
          >
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
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
            size="xs"
            onClick={() => setPopUpGoCompleteYourProfile(false)}
          />,
          <CustomButton
            key="Delete"
            text="Complete here"
            type="primary"
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
            size="xs"
            onClick={() => {
              setPopUpGoCompleteYourProfile(false);
              setPopUpCompleteYourProfile(true);
            }}
          />,
        ]}
        onCancel={() => setPopUpGoCompleteYourProfile(false)}
      >
        <h4>
          Please complete all the information in your profile. You will only be
          able to join this panel when your profile is 100% completed
        </h4>
      </Modal>
      {popUpCompleteYourProfile && (
        <div className="container-modal-complete-profile">
          <ModalCompleteYourProfile
            userProfile={userProfile}
            get={getUser}
            onCancel={setPopUpCompleteYourProfile}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  allMyPanels: speakerAllPanelSpeakerSelector(state).allMyPanels,
  allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
  allUserSpeaker: speakerAllPanelSpeakerSelector(state).allUserSpeakers,
  allMember: speakerAllPanelSpeakerSelector(state).allMember,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  getAllPanelsOfOneUserSpeakers: speaker.getAllPanelsOfOneUserSpeakers,
  getAllPanelSpeakers: speaker.getAllPanelSpeakers,
  getAllUserSpeaker: speaker.getAllUserSpeaker,
  removeUserSpeakerToPanel: speaker.removeUserSpeakerToPanel,
  addUserSpeakerToPanel: speaker.addUserSpeakerToPanel,
  getAllMemberSpeakerPanel: speaker.getAllMemberSpeakerPanel,
  getUser,
};

PanelSpeakers.propTypes = {
  role: PropTypes.string,
};

PanelSpeakers.defaultProps = {
  role: "",
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelSpeakers);