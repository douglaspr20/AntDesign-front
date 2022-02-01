import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import {
  setConversations,
  readMessages,
} from "redux/actions/conversation-actions";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import Conversation from "./Conversation";
import InternalChat from "./Chat";

import "./style.scss";

const Chat = ({
  conversations,
  userProfile,
  openChat,
  setOpenChat,
  setConversations,
  readMessages,
}) => {
  const [currentConversations, setCurrentConversations] = useState([]);

  const handleConversation = (conversation) => {
    if (
      conversation.messages.find(
        (message) => !message.viewedUser.includes(userProfile.id)
      )
    ) {
      readMessages(userProfile.id, conversation.id);
    }

    if (currentConversations.length === 3) {
      if (
        currentConversations.find(
          (currentConversation) => currentConversation.id === conversation.id
        )
      ) {
        return;
      }

      const newCurrentConversations = [...currentConversations, conversation];
      newCurrentConversations.splice(0, 1);
      return setCurrentConversations(newCurrentConversations);
    }

    setCurrentConversations([...currentConversations, conversation]);
  };

  const closeConversation = (conversation) => {
    const newConversations = currentConversations.filter(
      (currentConversation) => currentConversation.id !== conversation.id
    );

    setCurrentConversations(newConversations);
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

  useEffect(() => {
    if (currentConversations.length > 0) {
      const newCurrentConversations = currentConversations.map(
        (conversation) => {
          const newConversation = conversations.find(
            (gConversation) => gConversation.id === conversation.id
          );

          if (
            newConversation?.messages?.length !== conversation?.messages?.length
          ) {
            return newConversation;
          }

          return conversation;
        }
      );

      let canUpdate = false;

      for (let i = 0; i < currentConversations.length; i++) {
        if (
          newCurrentConversations[i].messages.length !==
          currentConversations[i].messages.length
        ) {
          canUpdate = true;
          break;
        }
      }

      if (canUpdate) {
        setCurrentConversations(newCurrentConversations);
      }
    }
  }, [conversations, currentConversations]);

  return (
    <>
      {currentConversations.map((currentConversation, i) => (
        <InternalChat
          key={currentConversation.id}
          style={{ right: i === 0 ? "190px" : i === 1 ? "530px" : "870px" }}
          currentConversation={currentConversation}
          closeConversation={closeConversation}
        />
      ))}

      <div className="conversations">
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
