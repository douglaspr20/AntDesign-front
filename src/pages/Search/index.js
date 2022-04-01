import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, List, Pagination, Skeleton } from "antd";
import {
  searchUser,
  setVisibleProfileUser,
  setUserShow,
} from "redux/actions/home-actions";
import { createConversartion } from "redux/actions/conversation-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import { CustomButton, CustomSelect } from "components";
import { COUNTRIES, PROFILE_SETTINGS } from "enum";
import "./style.scss";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 5",
  },
  {
    title: "Ant Design Title 6",
  },
  {
    title: "Ant Design Title 7",
  },
  {
    title: "Ant Design Title 8",
  },
  {
    title: "Ant Design Title 9",
  },
];

const SearchPage = ({
  searchedUsers,
  userProfile,
  searchUser,
  setUserShow,
  setVisibleProfileUser,
  createConversartion,
  allCategories,
  pagesSearchedUsers,
}) => {
  const [countryFilterValue, setCountryFilterValue] = useState("");
  const [jobLevelFilterValue, setJobLevelFilterValue] = useState("");
  const [topicsFilterValue, setTopicFilterValue] = useState("");
  const [OrgSizeFilterValue, setOrgSizeFilterValue] = useState("");

  useEffect(() => {
    if (searchedUsers.length === 0) {
      searchUser({
        city: userProfile.city,
        recentJobLevel: userProfile.recentJobLevel,
        titleProfessions: userProfile.titleProfessions,
        location: userProfile.location,
        topicsOfInterest: userProfile.topicsOfInterest,
      });
    }
  }, [searchedUsers, searchUser, userProfile]);

  const handleStartConversation = (members) => {
    createConversartion(members);
  };

  return (
    <div className="search">
      <div className="search-filters">
        <CustomSelect
          bordered={true}
          mode="multiple"
          options={COUNTRIES}
          placeholder={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="ant-select-selection-item"
                style={{ background: "none", border: "none" }}
              >
                Countries
              </span>

              <span className="ant-select-arrow">
                <i className="fal fa-angle-down" />
              </span>
            </div>
          }
          onChange={(value) => setCountryFilterValue(value)}
        />
        <CustomSelect
          bordered={true}
          mode="multiple"
          placeholder={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="ant-select-selection-item"
                style={{ background: "none", border: "none" }}
              >
                Job Levels
              </span>

              <span className="ant-select-arrow">
                <i className="fal fa-angle-down" />
              </span>
            </div>
          }
          options={PROFILE_SETTINGS.JOB_LEVELS}
          onChange={(value) => setJobLevelFilterValue(value)}
        />
        <CustomSelect
          mode="multiple"
          placeholder={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="ant-select-selection-item"
                style={{ background: "none", border: "none" }}
              >
                Topics
              </span>

              <span className="ant-select-arrow">
                <i className="fal fa-angle-down" />
              </span>
            </div>
          }
          bordered={true}
          options={allCategories}
          onChange={(value) => setTopicFilterValue(value)}
        />

        <CustomSelect
          bordered={true}
          mode="multiple"
          placeholder={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="ant-select-selection-item"
                style={{ background: "none", border: "none" }}
              >
                Organization Size
              </span>

              <span className="ant-select-arrow">
                <i className="fal fa-angle-down" />
              </span>
            </div>
          }
          options={PROFILE_SETTINGS.ORG_SIZES}
          onChange={(value) => setOrgSizeFilterValue(value)}
        />
      </div>
      <div className="search-container">
        <List
          itemLayout="horizontal"
          dataSource={searchedUsers.length === 0 ? data : searchedUsers}
          renderItem={(user) => (
            <List.Item key={user.id}>
              <Skeleton loading={searchedUsers.length === 0} active avatar>
                <List.Item.Meta
                  avatar={
                    user.img ? (
                      <Avatar
                        size={30}
                        src={user.img}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                    ) : (
                      <Avatar size={30}>{user.abbrName}</Avatar>
                    )
                  }
                  title={
                    <h5>
                      {" "}
                      {user.firstName} {user.lastName}
                    </h5>
                  }
                  description={user.titleProfessions}
                  onClick={() => {
                    setUserShow(user);
                    setVisibleProfileUser(true);
                  }}
                  style={{ cursor: "pointer" }}
                />

                {userProfile.id !== user.id && (
                  <CustomButton
                    type="primary"
                    size="sm"
                    text={`Chat`}
                    onClick={() =>
                      handleStartConversation([user.id, userProfile.id])
                    }
                  />
                )}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>

      <div className="search-pagination">
        <Pagination
          defaultPageSize={50}
          pageSize={50}
          showSizeChanger={false}
          pageSizeOptions={[]}
          total={pagesSearchedUsers}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchedUsers: homeSelector(state).searchedUsers,
  userProfile: homeSelector(state).userProfile,
  pagesSearchedUsers: homeSelector(state).pagesSearchedUsers,
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  searchUser,
  setUserShow,
  setVisibleProfileUser,
  createConversartion,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
