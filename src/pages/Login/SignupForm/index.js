import React from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

import { CustomInput } from "components";
import { isValidPassword } from "utils/format";

const SecretKey = process.env.REACT_APP_RECAPTCHA_SITEKEY;

const SignupForm = ({ confirmEmail }) => {
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
      {confirmEmail && (
        <Form.Item
          name="confirmEmail"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value !== getFieldValue("email")) {
                  return Promise.reject(new Error("Confirm your email."));
                }
                return Promise.resolve();
              },
            }),
          ]}
          className="form-full-name"
        >
          <CustomInput placeholder="Confirm Email" size="sm" />
        </Form.Item>
      )}
      <Form.Item
        name="password"
        rules={[
          () => ({
            validator(rule, value) {
              switch (isValidPassword(value)) {
                case 0:
                  return Promise.resolve();
                case 1:
                  return Promise.reject("Password length should be 8 or more!");
                case 2:
                  return Promise.reject("Password should contain number!");
                case 3:
                  return Promise.reject("Password should contain symbol!");
                case 4:
                  return Promise.reject(
                    "Password should contain capital letter!"
                  );
                case 5:
                  return Promise.reject("Please enter your password!");
                default:
                  return Promise.reject("Something went wrong!");
              }
            },
          }),
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
      <Form.Item
        name="recaptcha"
        rules={[
          {
            required: true,
            message: "Please resolve the reCAPTCHA!",
          },
        ]}
        className="form-recaptcha"
      >
        <ReCAPTCHA sitekey={SecretKey} />
      </Form.Item>
    </React.Fragment>
  );
};

SignupForm.propTypes = {
  confirmEmail: PropTypes.bool,
};

SignupForm.defaultProps = {
  confirmEmail: false,
};

export default SignupForm;
