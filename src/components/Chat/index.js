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

  // useMemo(() => {
  //   SocketIO.on(SOCKET_EVENT_TYPE.USER_ONLINE, (user) => {
  //     if (user.id === userProfile.id || currentConversations.length === 0) {
  //       return;
  //     }
  //     const updateConversation = currentConversations.find(
  //       (currentConversation) =>
  //         currentConversation.members.find((member) => member.id === user.id)
  //     );

  //     const userToUpdate = updateConversation.members.find(
  //       (member) => member.id === user.id
  //     );

  //     if (!userToUpdate || userToUpdate.isOnline === true) {
  //       console.log("holis");
  //       return;
  //     }

  //     const newCurrentConversations = currentConversations.map(
  //       (currentConversation) => {
  //         const newMembers = currentConversation.members.map((member) => {
  //           if (member.id === user.id) {
  //             return {
  //               id: user.id,
  //               abbrName: user.abbrName,
  //               email: user.email,
  //               firstName: user.firstName,
  //               img: user.img,
  //               isOnline: user.isOnline,
  //               lastName: user.lastName,
  //               timezone: user.timezone,
  //             };
  //           }

  //           return {
  //             ...member,
  //           };
  //         });

  //         return {
  //           ...currentConversation,
  //           members: newMembers,
  //         };
  //       }
  //     );

  //     setCurrentConversations(newCurrentConversations);
  //   });

  //   SocketIO.on(SOCKET_EVENT_TYPE.USER_OFFLINE, (user) => {
  //     if (user.id === userProfile.id || currentConversations.length === 0) {
  //       return;
  //     }
  //     const updateConversation = currentConversations.find(
  //       (currentConversation) =>
  //         currentConversation.members.find((member) => member.id === user.id)
  //     );

  //     const userToUpdate = updateConversation.members.find(
  //       (member) => member.id === user.id
  //     );

  //     if (!userToUpdate || userToUpdate.isOnline === false) {
  //       return;
  //     }

  //     const newCurrentConversations = currentConversations.map(
  //       (currentConversation) => {
  //         const newMembers = currentConversation.members.map((member) => {
  //           if (member.id === user.id) {
  //             return {
  //               id: user.id,
  //               abbrName: user.abbrName,
  //               email: user.email,
  //               firstName: user.firstName,
  //               img: user.img,
  //               isOnline: user.isOnline,
  //               lastName: user.lastName,
  //               timezone: user.timezone,
  //             };
  //           }
  //           return {
  //             ...member,
  //           };
  //         });
  //         return {
  //           ...currentConversation,
  //           members: newMembers,
  //         };
  //       }
  //     );
  //     setCurrentConversations(newCurrentConversations);
  //   });
  // }, [currentConversations, userProfile]);

  // useMemo(() => {
  //   if (currentConversations.length > 0) {
  //     const newCurrentConversations = currentConversations.map(
  //       (conversation) => {
  //         const newConversation = conversations.find(
  //           (gConversation) => gConversation.id === conversation.id
  //         );
  //         if (newConversation) {
  //           return newConversation;
  //         }

  //         return conversation;
  //       }
  //     );

  //     let canUpdate = false;

  //     for (let i = 0; i < currentConversations.length; i++) {
  //       const oldUser = currentConversations[i].members.find(
  //         (member) => member.id !== userProfile.id
  //       );
  //       const newUser = newCurrentConversations[i].members.find(
  //         (member) => member.id !== userProfile.id
  //       );
  //       if (oldUser.isOnline !== newUser.isOnline) {
  //         canUpdate = true;
  //         break;
  //       }
  //     }

  //     if (canUpdate) {
  //       setCurrentConversations(newCurrentConversations);
  //     }
  //   }
  // }, [currentConversations, conversations, userProfile]);

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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Chat));
