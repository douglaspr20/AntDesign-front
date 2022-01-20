import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { setConversations } from "redux/actions/conversation-actions";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { Affix, Avatar, Badge, Button, Tooltip } from "antd";
import moment from "moment";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import Conversation from "./Conversation";
import FormMessage from "./FormMessage";

import "./style.scss";

const Chat = ({
  conversations,
  userProfile,
  openChat,
  setOpenChat,
  setConversations,
}) => {
  const [currentConversation, setCurrentConversation] = useState({});

  useEffect(() => {
    if (conversations.length > 0) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversations]);

  const handleConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleSendMessage = (message) => {
    SocketIO.emit(SOCKET_EVENT_TYPE.SEND_MESSAGE, {
      ConversationId: currentConversation.id,
      sender: userProfile.id,
      text: message,
    });
  };

  useMemo(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.MESSAGE, (message) => {
      const updateConversation = conversations.find(
        (conversation) => conversation.id === message.ConversationId
      );

      if (
        updateConversation.messages.some(
          (oldMessage) => oldMessage.id === message.id
        )
      ) {
        return;
      }
      updateConversation.messages.push(message);

      const newConversations = conversations.map((conversation) =>
        conversation.id === updateConversation.id
          ? updateConversation
          : conversation
      );

      setConversations(newConversations);
    });
  }, [conversations, setConversations]);

  return (
    <Affix offsetBottom={!openChat ? 150 : 40} className="affix">
      {!openChat ? (
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
            onClick={() => setOpenChat(!openChat)}
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
            <FormMessage handleSendMessage={handleSendMessage} />
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
              onClick={() => setOpenChat(!openChat)}
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

const mapDispatchToProps = {
  setConversations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
