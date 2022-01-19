import { Avatar } from "antd";
import React from "react";

import "./style.scss";

const Conversation = ({ user, conversation, handleConversation }) => {
  return (
    <div
      className="conversation"
      onClick={() => handleConversation(conversation)}
    >
      {user.img ? (
        <Avatar size={50} src={user.img} />
      ) : (
        <Avatar size={40} style={{ fontSize: "1.5rem" }}>
          {user.abbrName}
        </Avatar>
      )}

      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Conversation;
