import React from "react";
import { Form } from "antd";

import { CustomInput } from "components";

const SignupForm = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
          className="form-full-name"
        >
          <CustomInput placeholder="First Name" size="sm" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
          className="form-full-name"
        >
          <CustomInput placeholder="Last Name" size="sm" />
        </Form.Item>
      </React.Fragment>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email!",
          },
          {
            type: "email",
            message: "Please enter the valid email!",
          },
        ]}
        className="form-full-name"
      >
        <CustomInput placeholder="Email" size="sm" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password!",
          },
          {
            min: 8,
            message: "Password length should be 8 or more!",
          },
        ]}
        className="form-full-name"
      >
        <CustomInput type="password" placeholder="Password" size="sm" />
      </Form.Item>
      <Form.Item
        name="password2"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
        className="form-full-name"
      >
        <CustomInput type="password" placeholder="Confirm Password" size="sm" />
      </Form.Item>
    </React.Fragment>
  );
};

export default SignupForm;
