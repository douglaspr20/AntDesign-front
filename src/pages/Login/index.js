import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { connect } from "react-redux";

import { CustomButton, CustomInput } from "components";

import { actions as authActions } from "redux/actions/auth-actions";
import { authSelector } from "redux/selectors/authSelector";
import { INTERNAL_LINKS } from "enum";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const Login = ({ isAuthenticated, error, login, signUp, history }) => {
  const [isLogin, setIsLogin] = useState(true);
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (values) => {
    if (isLogin) {
      const { email, password } = values;
      login(email, password);
    } else {
      signUp({ ...values });
    }
  };

  const onFinishFailed = () => {};

  const onValuesChange = () => {};

  const onChangeType = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(INTERNAL_LINKS.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="login-page">
      <div className="login-dialog">
        <div className="login-dialog-header">
          <h3>{isLogin ? "Log In" : "Sign up"}</h3>
          <div className="login-dialog-logo">
            <img src={IconLogo} alt="login-logo" />
          </div>
        </div>
        <Form
          {...layout}
          className="login-dialog-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <div className="login-dialog-content">
            {!isLogin && (
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
            )}
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
            {!isLogin && (
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
                <CustomInput
                  type="password"
                  placeholder="Confirm Password"
                  size="sm"
                />
              </Form.Item>
            )}
          </div>
          <div className="login-dialog-footer">
            <span className="login-dialog-footer-error">{error}</span>
            <CustomButton
              htmlType="submit"
              text={isLogin ? "Log In" : "Sign up"}
              type="primary"
              size="lg"
            />
            <span className="signup-select" onClick={onChangeType}>
              {isLogin ? "Sign up?" : "Log in?"}
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: authSelector(state).isAuthenticated,
  error: authSelector(state).error,
});

const mapDispatchToProps = {
  ...authActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
