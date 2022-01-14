import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";

import { homeSelector } from "redux/selectors/homeSelector";
import { actions as homeActions } from "redux/actions/home-actions";
import { LibraryFilterPanel, Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import BusinessPartnerDocuments from "containers/BusinessPartnerDocuments";

import { INTERNAL_LINKS } from "enum";

import IconBack from "images/icon-back.svg";

import BusinessPartnerMembers from "./BusinessPartnerMembers";
import "./style.scss";

const BusinessPartnerPage = ({ userProfile, confirmApply, getUser }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const history = useHistory();

  const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const accepted = query.get("accepted");
  const id = query.get("id");
  const [, setFilter] = useState({});

  useEffect(() => {
    if (accepted != null && id)
      confirmApply(id, accepted === "true" ? true : false);
    history.push("business-partner");
  }, [id, confirmApply, accepted, getUser, history]);

  const onFilterChange = (values) => {
    setFilter(values);
  };
  const TabData = [
    {
      title: "Members",
      content: () => <BusinessPartnerMembers />,
    },
    {
      title: "Relevant Content",
      content: () => <></>,
    },
    // {
    //   title: "Resources",
    //   content: () => (
    //     <BusinessPartnerList
    //       type="article"
    //       refresh={currentTab === "0"}
    //       setCurrentValue={setCurrentTab}
    //       filter={filter}
    //       currentTab={currentTab}
    //     />
    //   ),
    // },
    {
      title: "Resources",
      content: () => <BusinessPartnerDocuments currentTab={currentTab} />,
    },
    {
      title: "Projects",
      content: () => <>Cooming Soon</>,
    },
    {
      title: "Roundtable",
      content: () => <>Cooming Soon</>,
    },
  ];
  return (
    <>
      {userProfile.isBusinessPartner &&
      userProfile.role === "admin" &&
      userProfile.memberShip === "premium" ? (
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
            message={
              userProfile.isBusinessPartner
                ? "You must be a premium member to see this view"
                : `You must be a business partner and premium member to see this view.`
            }
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
