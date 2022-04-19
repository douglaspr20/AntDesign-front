/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Avatar, Badge, Popover } from "antd";
import { FileImageOutlined, FilePdfOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  readMessages,
  setCurrentConversations,
} from "redux/actions/conversation-actions";
import { conversationsSelector } from "redux/selectors/conversationSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import IconMail from "images/icon-mail-outline.svg";
import "./style.scss";
import { transformNames } from "utils/format";

const Imbox = ({
  className,
  conversations,
  currentConversations,
  userProfile,
  readMessages,
  setCurrentConversations,
}) => {
  let messasgesNotViewed = 0;

  if (conversations.length > 0) {
    for (const conversation of conversations) {
      messasgesNotViewed += conversation.messages.filter(
        (message) => !message.viewedUser.includes(userProfile.id)
      ).length;
    }
  }

  const conversationsSort = useMemo(() => {
    return conversations.sort((a, b) => {
      if (
        a?.messages[a.messages.length - 1]?.messageDate >
        b?.messages[b.messages.length - 1]?.messageDate
      ) {
        return 1;
      } else if (
        b?.messages[b.messages.length - 1]?.messagedate >
        a?.messages[a.messages.length - 1]?.messagedate
      ) {
        return -1;
      }
      return 0;
    });
  }, [conversations]);

  const BadgeProps = {
    count: messasgesNotViewed > 0 ? messasgesNotViewed : null,
  };

  const handleConversation = (conversation) => {
    if (
      conversation.messages.find(
        (message) => !message?.viewedUser?.includes(userProfile.id)
      )
    ) {
      readMessages(userProfile.id, conversation.id);
    }

    if (
      currentConversations.find(
        (currentConversation) => currentConversation.id === conversation.id
      )
    ) {
      return;
    }

    if (
      (currentConversations.length === 3 && window.screen.width > 1600) ||
      (currentConversations.length === 2 && window.screen.width <= 1600)
    ) {
      const newCurrentConversations = [...currentConversations, conversation];
      newCurrentConversations.splice(0, 1);
      return setCurrentConversations(newCurrentConversations);
    }

    setCurrentConversations([...currentConversations, conversation]);
  };

  const content = () => (
    <div className="imbox-content ">
      {conversationsSort.length > 0 ? (
        conversationsSort.map((conversation) => {
          const user = conversation.members.find(
            (member) => member.id !== userProfile.id
          );
          return (
            <div
              key={conversation.id}
              className={`imbox-conversation ${
                conversation.messages.some(
                  (message) => !message.viewedUser.includes(userProfile.id)
                )
                  ? "messages-not-viewed"
                  : ""
              }`}
              onClick={() => handleConversation(conversation)}
            >
              {user.img ? (
                <div
                  className={`${
                    user.isOnline === true ? "avatar-container" : ""
                  }`}
                >
                  <Avatar
                    size={50}
                    src={user.img}
                    style={{ marginRight: ".5rem" }}
                  />
                </div>
              ) : (
                <div
                  className={`${
                    user.isOnline === true ? "avatar-container" : ""
                  }`}
                >
                  <Avatar
                    size={50}
                    style={{ fontSize: "1.5rem", marginRight: ".5rem" }}
                  >
                    {user.abbrName}
                  </Avatar>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "50px",
                }}
              >
                <span className="name-user">
                  {transformNames(user.firstName)}{" "}
                  {transformNames(user.lastName)}
                </span>
                <div>
                  {conversation.messages[conversation?.messages?.length - 1]
                    .type === "image" ? (
                    <>
                      <FileImageOutlined
                        style={{
                          color: "#438cef",
                          fontSize: "1.2rem",
                          position: "absolute",
                        }}
                      />
                      <span style={{ marginLeft: "20px" }}>Image</span>
                    </>
                  ) : conversation.messages[conversation?.messages?.length - 1]
                      .type === "document" ? (
                    <>
                      <FilePdfOutlined
                        style={{
                          color: "#438cef",
                          fontSize: "1.2rem",
                          position: "absolute",
                        }}
                      />
                      <span style={{ marginLeft: "20px" }}>File</span>
                    </>
                  ) : (
                    <span className="conversation-text">
                      {
                        conversation.messages[
                          conversation?.messages?.length - 1
                        ].text
                      }
                    </span>
                  )}{" "}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="notification-item">
          <div />
          <h5 className="notification-item-message">No Conversations.</h5>
        </div>
      )}
    </div>
  );
  return (
    <Popover placement="bottom" title="" content={content}>
      <Badge
        {...BadgeProps}
        className={className}
        count={messasgesNotViewed}
        overflowCount={999}
      >
        <div className="imbox-icon">
          <img src={IconMail} alt="icon-mail" />
        </div>
      </Badge>
    </Popover>
  );
};

Imbox.propTypes = {
  className: PropTypes.string,
};

Imbox.defaultProps = {
  className: "",
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  conversations: conversationsSelector(state).conversations,
  currentConversations: conversationsSelector(state).currentConversations,
});

const mapDispatchToProps = {
  readMessages,
  setCurrentConversations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Imbox);
