import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { Affix, Avatar, Badge, Button, Tooltip } from "antd";
import moment from "moment";
import Conversation from "./Conversation";
import FormMessage from "./FormMessage";

import "./style.scss";

const Chat = ({ conversations, userProfile }) => {
  const [open, setOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({});

  useEffect(() => {
    if (conversations.length > 0) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversations]);

  const handleConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

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
              {currentConversation.messages?.length > 0 ? (
                currentConversation?.messages?.map((message, i) => {
                  const user = currentConversation.members.find(
                    (member) => member?.id === message?.sender
                  );
                  return (
                    <div
                      style={{
                        textAlign: `${
                          user.id !== userProfile.id ? "left" : "right"
                        }`,
                        marginBottom: "5px",
                      }}
                      key={message.id}
                    >
                      <Tooltip
                        placement={
                          user.id !== userProfile.id
                            ? "bottomRight"
                            : "bottomLeft"
                        }
                        title={
                          <p className="date-messages">
                            {moment(message.messageDate).format(
                              "MMM DD YYYY hh:mm"
                            )}
                          </p>
                        }
                      >
                        <div
                          className={`chat-message ${
                            user.id !== userProfile.id
                              ? "chat-message-contact"
                              : "chat-message-user"
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
                      </Tooltip>
                      {currentConversation?.messages[i + 1]?.sender !==
                      message?.sender ? (
                        <>
                          {user.img ? (
                            <Avatar
                              src={user.img}
                              alt={`${user.firstName} ${user.lastName}`}
                              size={25}
                            />
                          ) : (
                            <Avatar size={25} style={{ marginTop: "10px" }}>
                              {user.abbrName}
                            </Avatar>
                          )}
                        </>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <h3>Send the first message of conversation</h3>
              )}
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

              return (
                <Conversation
                  key={conversation.id}
                  user={otherMember}
                  conversation={conversation}
                  handleConversation={handleConversation}
                />
              );
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
