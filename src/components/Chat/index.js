import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { homeSelector } from "redux/selectors/homeSelector";
import {
  setConversations,
  readMessages,
} from "redux/actions/conversation-actions";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import Conversation from "./Conversations";
import InternalChat from "./Chat";

import "./style.scss";

const Chat = ({
  conversations,
  userProfile,
  setConversations,
  readMessages,
}) => {
  const [currentConversations, setCurrentConversations] = useState([]);

  useEffect(() => {
    if (userProfile?.isOnline === false) {
      SocketIO.emit(SOCKET_EVENT_TYPE.USER_ONLINE, {
        id: userProfile.id,
      });
    }
  }, [userProfile]);

  const handleConversation = (conversation) => {
    if (
      conversation.messages.find(
        (message) => !message.viewedUser.includes(userProfile.id)
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

          for (let i = 0; i < currentConversations.length; i++) {
            if (
              newConversation.members[i].isOnline !==
              conversation.members[i].isOnline
            ) {
              return newConversation;
            }
          }

          return conversation;
        }
      );

      let canUpdate = false;

      for (let i = 0; i < currentConversations.length; i++) {
        for (let j = 0; j < currentConversations[i].members.length; j++) {
          if (
            newCurrentConversations[i].members[j].isOnline !==
            currentConversations[i].members[j].isOnline
          ) {
            canUpdate = true;
            break;
          }
        }

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

  useMemo(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.NEW_CONVERSATION, (newConversation) => {
      const currentConversation = conversations.find(
        (conversation) => conversation.id === newConversation
      );

      if (
        currentConversation.messages.find(
          (message) => !message.viewedUser.includes(userProfile.id)
        )
      ) {
        readMessages(userProfile.id, currentConversation.id);
      }

      if (currentConversations.find((c) => c.id === currentConversation.id)) {
        return;
      }

      if (
        (currentConversations.length === 3 && window.screen.width > 1600) ||
        (currentConversations.length === 2 && window.screen.width <= 1600)
      ) {
        const newCurrentConversations = [
          ...currentConversations,
          currentConversation,
        ];
        newCurrentConversations.splice(0, 1);
        return setCurrentConversations(newCurrentConversations);
      }

      setCurrentConversations([...currentConversations, currentConversation]);
    });
  }, [conversations, currentConversations, readMessages, userProfile.id]);

  return (
    <>
      {currentConversations.map((currentConversation, i) => (
        <InternalChat
          key={currentConversation.id}
          style={{ right: i === 0 ? "210px" : i === 1 ? "550px" : "890px" }}
          currentConversation={currentConversation}
          closeConversation={closeConversation}
          onClick={() => handleConversation(currentConversation)}
        />
      ))}

      <div
        className={`conversations ${
          userProfile.memberShip === "free" ? "conversations-not-available" : ""
        }`}
      >
        {userProfile.memberShip === "free" ? (
          <>
            <h2>Update your account to start chatting with other members</h2>
          </>
        ) : (
          <>
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
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Chat));
