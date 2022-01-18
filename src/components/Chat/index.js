import React, { useState } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { Affix, Avatar, Badge, Button } from "antd";
import moment from "moment";
import Conversation from "./Conversation";
import FormMessage from "./FormMessage";

import "./style.scss";

const Chat = ({ conversations, userProfile }) => {
  const [open, setOpen] = useState(false);

  return (
    <Affix offsetBottom={!open ? 150 : 40} className="affix">
      {!open ? (
        <Badge
          count={5}
          style={{
            position: "absolute",
            right: -380,
            top: 5,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<MessageOutlined style={{ fontSize: "2rem" }} />}
            onClick={() => setOpen(!open)}
            style={{
              width: 80,
              height: 80,
              position: "absolute",
              right: -400,
            }}
          />
        </Badge>
      ) : (
        <div className="chat">
          <div className="chat-messages-container">
            <div className="chat-messages">
              <p className="date-messages">
                {moment().format("MMM DD YYYY hh:mm")}
              </p>
              <div style={{ textAlign: "left" }}>
                <div className="chat-message chat-message-contact">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque eu vehicula justo. Donec tristique tortor non nisl
                    congue, non ornare dolor porta.
                  </p>
                </div>
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Eduardo Rivas"
                  size={25}
                  style={{ marginTop: "10px" }}
                />
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="chat-message chat-message-user">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque eu vehicula justo.
                  </p>
                </div>
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Eduardo Rivas"
                  size={25}
                  style={{ marginTop: "13px", marginRight: "8px" }}
                />
              </div>
            </div>
            <FormMessage />
          </div>

          <div className="conversations">
            <CloseOutlined
              style={{
                position: "sticky",
                zIndex: "10",
                top: 5,
                left: 150,
                cursor: "pointer",
              }}
              onClick={() => setOpen(!open)}
            />
            {conversations.map((conversation) => {
              const [otherMember] = conversation.members.filter(
                (member) => member.id !== userProfile.id
              );

              return <Conversation key={otherMember.id} user={otherMember} />;
            })}
          </div>
        </div>
      )}
    </Affix>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(Chat);
