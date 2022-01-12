import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import "./style.scss";

const FormMessage = () => {
  return (
    <div className="form-message-container">
      <Form className="form-message">
        <Form.Item name="text">
          <Input.TextArea
            rows={2}
            className="form-message-textarea"
            size="small"
            placeholder="Message"
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
