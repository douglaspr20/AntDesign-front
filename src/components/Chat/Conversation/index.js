import { Avatar } from "antd";
import React from "react";

import "./style.scss";

const Conversation = ({ user }) => {
  return (
    <div className="conversation">
      <Avatar
        src={user.img}
        alt={`${user.firstName} ${user.lastName}`}
        size={50}
      />

      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Conversation;
