import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as homeActions } from "redux/actions/home-actions";
import { LibraryFilterPanel, Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import { INTERNAL_LINKS } from "enum";

import IconBack from "images/icon-back.svg";

import BusinessPartnerMembers from "./BusinessPartnerMembers";
import BusinessPartnerList from "./BusinessPartnerList";
import "./style.scss";

const BusinessPartnerPage = ({ userProfile, confirmApply, getUser }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const accepted = query.get("accepted");
  const id = query.get("id");
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if(accepted != null && id)
    confirmApply(id, accepted === "true" ? true : false);
  }, [id, confirmApply, accepted, getUser]);

  const onFilterChange = (values) => {
    setFilter(values);
  };
  const TabData = [
    {
      title: "Resources",
      content: () => (
        <BusinessPartnerList
          type="article"
          refresh={currentTab === "0"}
          setCurrentValue={setCurrentTab}
          filter={filter}
        />
      ),
    },
    // {
    //   title: "Conversations",
    //   content: () => (
    //     <NoItemsMessageCard
    //       message={`There are no
    //     conversations
    //   for you at the moment`}
    //     />
    //   ),
    // },
    {
      title: "Business Partners Members",
      content: () => <BusinessPartnerMembers />,
    },
  ];

  return (
    <>
      {userProfile.isBusinessPartner || userProfile.role === "admin" ? (
        <div className="businessPartner-page">
          <LibraryFilterPanel onChange={onFilterChange} />
          <div className="businessPartner-page__container">
            <div className="businessPartner-page__results">
              <div className="businessPartner-page__row">
                <div className="businessPartner-page__info-column"></div>
                <div className="businessPartner-page__content">
                  <Link to={INTERNAL_LINKS.HOME}>
                    <div className="businessPartner-page__content-top">
                      <div className="businessPartner-page__content-top-back">
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
        <div className="businessPartner-page__list-wrap">
          <NoItemsMessageCard
            message={`You must be a business partner to see this view.`}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  confirmApply: homeActions.confirmInvitationApply,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessPartnerPage);
