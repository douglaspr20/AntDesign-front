import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { INTERNAL_LINKS } from "enum";
import ChannelFilterPanel from "../Channel/ChannelFilterPanel";

import { homeSelector } from "redux/selectors/homeSelector";

import IconBack from "images/icon-back.svg";

import "./style.scss";
import CouncilMembers from "./CouncilMembers";

const CouncilPage = ({ userProfile }) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [, setFilter] = useState({});

  const onFilterChange = (values) => {
    setFilter(values);
  };

  const TabData = [
    {
      title: "Resources",
      content: () => (
        <>
          <div className="council-page__list-wrap">
            <NoItemsMessageCard
              message={`There are no resources for you at the moment`}
            />
          </div>
        </>
      ),
    },
    {
      title: "Council Members",
      content: () => <CouncilMembers />,
    },
  ];

  return (
    <>
      {userProfile.councilMember || userProfile.role === "admin" ? (
        <div className="council-page">
          <ChannelFilterPanel onChange={onFilterChange} />
          <div className="council-page__container">
            <div className="council-page__results">
              <div className="council-page__row">
                <div className="council-page__info-column"></div>
                <div className="council-page__content">
                  <Link to={INTERNAL_LINKS.HOME}>
                    <div className="council-page__content-top">
                      <div className="council-page__content-top-back">
                        <img src={IconBack} alt="icon-back" />
                      </div>
                      <h4>Back</h4>
                    </div>
                  </Link>
                  <Tabs
                    data={TabData}
                    current={currentTab}
                    onChange={setCurrentTab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="council-page__list-wrap">
        <NoItemsMessageCard
          message={`You must be a council member to see this view.`}
        />
      </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilPage);
