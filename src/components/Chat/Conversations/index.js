import React from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";

import { Avatar, Badge } from "antd";

import "./style.scss";

const Conversation = ({
  user,
  conversation,
  handleConversation,
  userProfile,
}) => {
  const messagesNotViewed = conversation.messages.filter(
    (message) => !message?.viewedUser?.includes(userProfile.id)
  ).length;

  const transformNames = (name) => {
    const index = name.indexOf(" ");

    if (index !== -1) {
      return name.slice(0, index);
    }
    return name;
  };

  return (
    <div className="conversation-container">
      <Badge count={messagesNotViewed} offset={[0, 10]}>
        <div
          onClick={() => handleConversation(conversation)}
          className="conversation"
        >
          {user.img ? (
            <div
              className={`${user.isOnline === true ? "avatar-container" : ""}`}
            >
              <Avatar size={50} src={user.img} />
            </div>
          ) : (
            <div
              className={`${user.isOnline === true ? "avatar-container" : ""}`}
            >
              <Avatar size={40} style={{ fontSize: "1.5rem" }}>
                {user.abbrName}
              </Avatar>
            </div>
          )}

          <p className="user-name">
            {transformNames(user.firstName)} {transformNames(user.lastName)}
          </p>
        </div>
      </Badge>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(Conversation);
