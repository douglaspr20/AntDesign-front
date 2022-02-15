import React, { useMemo, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import { getMoreMessages } from "redux/actions/conversation-actions";
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
  getMoreMessages,
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

  useMemo(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_ONLINE, (user) => {
      if (user.id === userProfile.id && currentConversation === {}) return;

      const newMembers = currentConversation?.members?.map((member) => {
        if (member.id === user.id) {
          return {
            id: user.id,
            abbrName: user.abbrName,
            email: user.email,
            firstName: user.firstName,
            img: user.img,
            isOnline: user.isOnline,
            lastName: user.lastName,
            timezone: user.timezone,
          };
        }

        return {
          ...member,
        };
      });

      setCurrentConversation({
        ...currentConversation,
        members: newMembers,
      });
    });
  }, [currentConversation, userProfile]);

  useMemo(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_OFFLINE, (user) => {
      if (user.id === userProfile.id && currentConversation === {}) return;

      const newMembers = currentConversation.members.map((member) => {
        if (member.id === user.id) {
          return {
            id: user.id,
            abbrName: user.abbrName,
            email: user.email,
            firstName: user.firstName,
            img: user.img,
            isOnline: user.isOnline,
            lastName: user.lastName,
            timezone: user.timezone,
          };
        }

        return {
          ...member,
        };
      });

      setCurrentConversation({
        ...currentConversation,
        members: newMembers,
      });
    });
  }, [currentConversation, userProfile]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_ONLINE, (user) => {
      if (user.id === userProfile.id || conversations.length === 0) return;
      const newConversations = conversations.map((conversation) => {
        const newMembers = conversation.members.map((member) => {
          if (member.id === user.id) {
            return {
              id: user.id,
              abbrName: user.abbrName,
              email: user.email,
              firstName: user.firstName,
              img: user.img,
              isOnline: user.isOnline,
              lastName: user.lastName,
              timezone: user.timezone,
            };
          }

          return {
            ...member,
          };
        });
        return {
          ...conversation,
          members: newMembers,
        };
      });
      setConversations(newConversations);
    });
  }, [conversations, setConversations, userProfile]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.USER_OFFLINE, (user) => {
      if (user.id === userProfile.id || conversations.length === 0) return;
      const newConversations = conversations.map((conversation) => {
        const newMembers = conversation.members.map((member) => {
          if (member.id === user.id) {
            return {
              id: user.id,
              abbrName: user.abbrName,
              email: user.email,
              firstName: user.firstName,
              img: user.img,
              isOnline: user.isOnline,
              lastName: user.lastName,
              timezone: user.timezone,
            };
          }

          return {
            ...member,
          };
        });
        return {
          ...conversation,
          members: newMembers,
        };
      });
      setConversations(newConversations);
    });
  }, [conversations, setConversations, userProfile]);

  const BadgeProps = {
    count: messasgesNotViewed > 0 ? messasgesNotViewed : null,
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.offsetHeight + 400;
    }
  });

  const handleScroll = () => {
    if (messagesRef.current) {
      const { scrollTop } = messagesRef.current;
      if (scrollTop === 0 && currentConversation.messages?.length >= 15) {
        getMoreMessages(
          currentConversation.messages?.length,
          currentConversation.id
        );
      }
    }
  };

  const otherUser = currentConversation?.members?.find(
    (member) => member.id !== userProfile.id
  );

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
              <div className="chat-mobile-user-info">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  {otherUser.img ? (
                    <div
                      className={`${
                        otherUser.isOnline === true ? "avatar-container" : ""
                      }`}
                    >
                      <Avatar size={40} src={otherUser.img} />
                    </div>
                  ) : (
                    <div
                      className={`${
                        otherUser.isOnline === true ? "avatar-container" : ""
                      }`}
                    >
                      <Avatar
                        size={40}
                        style={{ fontSize: "1.5rem" }}
                        className="avatar"
                      >
                        {otherUser.abbrName}
                      </Avatar>
                    </div>
                  )}

                  <div className="chat-mobile-user-names">
                    <p style={{ marginBottom: 0 }}>
                      {otherUser.firstName} {otherUser.lastName}
                    </p>

                    {otherUser.isOnline && (
                      <p style={{ marginBottom: 0, fontSize: ".7rem" }}>
                        Active now
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="chat-mobile-messages"
                ref={messagesRef}
                onScroll={handleScroll}
              >
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
                  <div
                    style={{
                      width: "100%",
                      height: "calc(100vh - 300px)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>Send the first message of conversation</h2>
                  </div>
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
  getMoreMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMobile);
