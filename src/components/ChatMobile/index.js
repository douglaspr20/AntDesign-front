import React, { useMemo, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import {
  setConversations,
  readMessages,
} from "redux/actions/conversation-actions";
import { MessageOutlined } from "@ant-design/icons";
import { Affix, Avatar, Badge, Button, Tooltip } from "antd";
import moment from "moment";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import Conversation from "./Conversation";
import FormMessage from "./FormMessage";

import "./style.scss";
import { CustomDrawer } from "components";
import { useRef } from "react";

const ChatMobile = ({
  conversations,
  userProfile,
  openChat,
  setOpenChat,
  setConversations,
  readMessages,
}) => {
  const [currentConversation, setCurrentConversation] = useState({});
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const messagesRef = useRef(null);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  let messasgesNotViewed = 0;

  if (conversations.length > 0) {
    for (const conversation of conversations) {
      messasgesNotViewed += conversation.messages.filter(
        (message) => !message.viewedUser.includes(userProfile.id)
      ).length;
    }
  }

  useMemo(() => {
    const lastConversationId = localStorage.getItem("lastConversationOpen");

    const lastConversation = conversations.find(
      (conversation) => conversation.id === +lastConversationId
    );

    if (lastConversation) {
      setCurrentConversation(lastConversation);
      if (
        lastConversation.messages.find(
          (message) => !message.viewedUser.includes(userProfile.id)
        ) &&
        openChat
      ) {
        readMessages(userProfile.id, lastConversation.id);
      }
    } else {
      setCurrentConversation(conversations[0]);
      if (
        conversations[0].messages.find(
          (message) => !message.viewedUser.includes(userProfile.id)
        ) &&
        openChat
      ) {
        readMessages(userProfile.id, conversations[0].id);
      }
    }
  }, [conversations, userProfile, readMessages, openChat]);

  const handleConversation = (conversation) => {
    if (
      conversation.messages.find(
        (message) => !message.viewedUser.includes(userProfile.id)
      )
    ) {
      readMessages(userProfile.id, conversation.id);
    }

    localStorage.setItem("lastConversationOpen", `${conversation.id}`);

    setCurrentConversation(conversation);
  };

  const handleSendMessage = (message) => {
    SocketIO.emit(SOCKET_EVENT_TYPE.SEND_MESSAGE, {
      ConversationId: currentConversation.id,
      sender: userProfile.id,
      text: message,
      viewedUser: [userProfile.id],
    });
  };

  useMemo(() => {
    if (conversations.length > 0) {
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
    }
  }, [conversations, setConversations]);

  const BadgeProps = {
    count: messasgesNotViewed > 0 ? messasgesNotViewed : null,
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.offsetHeight + 200;
    }
  });

  return (
    <>
      {!openChat ? (
        <Affix offsetBottom={!openChat ? 150 : 40} className="affix">
          <Badge
            {...BadgeProps}
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
              onClick={() => setOpenChat()}
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                right: -400,
              }}
            />
          </Badge>
        </Affix>
      ) : (
        <CustomDrawer
          className=""
          title="Messages"
          width="90%"
          visible={openChat}
          onClose={() => setOpenChat(false)}
          destroyOnClose={true}
        >
          <div className="chat-mobile">
            <div className="chat-mobile-messages-container">
              <div className="chat-mobile-messages" ref={messagesRef}>
                {currentConversation.messages?.length > 0 ? (
                  currentConversation?.messages?.map((message, i) => {
                    const user = currentConversation.members.find(
                      (member) => member?.id === message?.sender
                    );
                    const lastMessage =
                      currentConversation.messages.length - 1 === i;

                    return (
                      <div
                        ref={lastMessage ? setRef : null}
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
              <FormMessage
                handleSendMessage={handleSendMessage}
                openEmojiPicker={openEmojiPicker}
                setOpenEmojiPicker={setOpenEmojiPicker}
              />
            </div>

            <div className="conversations-mobile">
              {conversations.map((conversation) => {
                const otherMember = conversation.members.find(
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
        </CustomDrawer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  setConversations,
  readMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMobile);
