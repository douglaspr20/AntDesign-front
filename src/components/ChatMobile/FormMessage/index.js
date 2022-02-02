import React, { useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import "./style.scss";

const FormMessage = ({
  handleSendMessage,
  openEmojiPicker,
  setOpenEmojiPicker,
}) => {
  const focusMessage = useRef();
  const [message] = Form.useForm();

  useEffect(() => {
    if (focusMessage.current) focusMessage.current.focus();
  }, [focusMessage]);

  const handleSubmit = (values) => {
    handleSendMessage(values.message);
    message.resetFields();
  };

  const handleOpenEmojiPicker = () => {
    setOpenEmojiPicker(!openEmojiPicker);
  };

  const onEmojiClick = (event, emojiObject) => {
    const prevValue = message.getFieldsValue().message || "";
    message.setFieldsValue({
      message: `${prevValue} ${emojiObject.emoji}`,
    });
  };

  return (
    <div className="form-message-mobile-container">
      <Form
        form={message}
        onFinish={handleSubmit}
        className="form-message-mobile"
      >
        <Form.Item name="message" className="form-message-mobile-textarea">
          <Input.TextArea
            ref={focusMessage}
            rows={2}
            size="small"
            placeholder="Message"
            onKeyPress={(e) => (e.key === "Enter" ? message.submit() : null)}
            onClick={() => setOpenEmojiPicker(false)}
            autoFocus
          />
        </Form.Item>

        {openEmojiPicker && (
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              width: "40%",
              position: "absolute",
              zIndex: "500",
              bottom: 60,
              right: 130,
            }}
            native
            disableSearchBar
          />
        )}
        <SmileOutlined
          style={{ fontSize: "1.2rem", cursor: "pointer", margin: "0px 10px" }}
          onClick={handleOpenEmojiPicker}
        />

        <Form.Item>
          <Button
            htmlType="submit"
            className="button-send-message"
            shape="circle"
            icon={<SendOutlined />}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMessage;
