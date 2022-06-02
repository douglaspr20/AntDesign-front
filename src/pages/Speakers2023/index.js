import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as homeActions } from "redux/actions/home-actions";

import { Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import PanelSpeakers from "./Panels";

import "./style.scss";

const Speaker2023 = ({
  userProfile,
  sendEmailAuthorization,
  activeOrDenyAuthorization
}) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const [visibleConfirmApply, setVisibleConfirmApply] = useState(true);
  const id = query.get("id");
  const accepted = query.get("accepted");

  const TabData = [
    {
      title: "Panels",
      key: 1,
      content: () => (<PanelSpeakers role={userProfile.role} />)
    },
    {
      title: "Prueba algo mas",
      key: 2,
      content: () =>
        <div>Funciona</div>
    }
  ];

  const onApplySpeaker = () => {
    sendEmailAuthorization({ userId: userProfile.id});
  };

  useEffect( () => {
    if(id !== null){
      if(accepted === "true" || accepted === "false"){
        activeOrDenyAuthorization({userId: id , typeAuthorization: (accepted === "true") ? "accepted" : "reject"})
      }
    }
  },[id,accepted,activeOrDenyAuthorization])

  const responseAuthorization = (userProfile.speakersAuthorization === "reject") ? (
    <div className="council-page__list-wrap">
        <NoItemsMessageCard
          message={`You must be a proud speaker member to see this view.`}
        />
      </div>
  ) : (
    (userProfile.speakersAuthorization === "pending") ? (
      <div className="council-page__list-wrap">
          <NoItemsMessageCard
            message={`Do you go to be a answer before of 24 hours.`}
          />
        </div>
    ) : (
      <Modal
        visible={visibleConfirmApply}
        title="Apply to Speakers 2023"
        width={500}
        onCancel={() => setVisibleConfirmApply(false)}
        onOk={() => {
          onApplySpeaker()
          setVisibleConfirmApply(false)
        }}
        okText="Yes"
      >
        Do you want to aply to speakers2023?.
      </Modal>
    )
  )

  return (
    <>
      {userProfile.speakersAuthorization === "accepted" ? (
        <div className="speaker2023-page">
          <div>
            <Tabs
              data={TabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
          </div>
        </div>
      ) : (
        <div>
          {responseAuthorization}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile
});

const mapDispatchToProps = {
  sendEmailAuthorization: homeActions.sendEmailAuthorizationSpeakers,
  activeOrDenyAuthorization: homeActions.activeOrDenyAuthorization
};

export default connect(mapStateToProps, mapDispatchToProps)(Speaker2023);
