import React from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import "./style.scss";

const FormMessage = ({ handleSendMessage }) => {
  const [message] = Form.useForm();

  const handleSubmit = (values) => {
    handleSendMessage(values.message);
    message.resetFields();
  };
  return (
    <div className="form-message-container">
      <Form form={message} onFinish={handleSubmit} className="form-message">
        <Form.Item name="message">
          <Input.TextArea
            rows={2}
            className="form-message-textarea"
            size="small"
            placeholder="Message"
            onKeyPress={(e) => (e.key === "Enter" ? message.submit() : null)}
          />
        </Form.Item>

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
