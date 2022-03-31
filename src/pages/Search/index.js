import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, List, Skeleton } from "antd";
import {
  searchUser,
  setVisibleProfileUser,
  setUserShow,
} from "redux/actions/home-actions";
import { createConversartion } from "redux/actions/conversation-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { CustomButton } from "components";
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
];

const SearchPage = ({
  searchedUsers,
  userProfile,
  searchUser,
  setUserShow,
  setVisibleProfileUser,
  createConversartion,
}) => {
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
        <CustomButton text="Country" type="" size="md" />
        <CustomButton text="Topics of interest" type="" size="md" />
        <CustomButton text="Job Level" type="" size="md" />
        <CustomButton text="Size Of Organization" type="" size="md" />
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
                    <Avatar
                      size={30}
                      src={user.img}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchedUsers: homeSelector(state).searchedUsers,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  searchUser,
  setUserShow,
  setVisibleProfileUser,
  createConversartion,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
