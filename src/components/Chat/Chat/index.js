import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Avatar, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { homeSelector } from "redux/selectors/homeSelector";
import SocketIO from "services/socket";
import { SOCKET_EVENT_TYPE } from "enum";
import FormMessage from "../FormMessage";

const Chat = ({
  userProfile,
  currentConversation,
  closeConversation,
  ...rest
}) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const handleSendMessage = (message) => {
    SocketIO.emit(SOCKET_EVENT_TYPE.SEND_MESSAGE, {
      ConversationId: currentConversation.id,
      sender: userProfile.id,
      text: message,
      viewedUser: [userProfile.id],
    });
  };

  const otherUser = currentConversation.members.find(
    (member) => member.id !== userProfile.id
  );

  return (
    <div className="chat" {...rest}>
      <div
        style={{
          width: "100%",
          padding: "0px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e1e2ee",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "50px",
          }}
        >
          {otherUser.img ? (
            <Avatar size={50} src={otherUser.img} />
          ) : (
            <Avatar size={40} style={{ fontSize: "1.5rem" }}>
              {otherUser.abbrName}
            </Avatar>
          )}

          <p style={{ marginLeft: "5px" }}>
            {otherUser.firstName} {otherUser.lastName}
          </p>
        </div>

        <CloseOutlined
          style={{ fontSize: "1rem", cursor: "pointer" }}
          onClick={() => closeConversation(currentConversation)}
        />
      </div>
      <div className="chat-messages">
        {currentConversation.messages?.length > 0 ? (
          currentConversation?.messages?.map((message, i) => {
            const user = currentConversation.members.find(
              (member) => member?.id === message?.sender
            );
            const lastMessage = currentConversation.messages.length - 1 === i;
            return (
              <div
                ref={lastMessage ? setRef : null}
                style={{
                  textAlign: `${user.id !== userProfile.id ? "left" : "right"}`,
                  marginBottom: "5px",
                }}
                key={message.id}
              >
                <Tooltip
                  placement={
                    user.id !== userProfile.id ? "bottomRight" : "bottomLeft"
                  }
                  title={
                    <p className="date-messages">
                      {moment(message.messageDate).format("MMM DD YYYY hh:mm")}
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
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(Chat);
