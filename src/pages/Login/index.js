import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CustomButton } from "components";

import { actions as authActions } from "redux/actions/auth-actions";
import { authSelector } from "redux/selectors/authSelector";
import { INTERNAL_LINKS } from "enum";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthAlert from "containers/AuthAlert";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const Login = ({ isAuthenticated, error, login, signUp, history, match }) => {
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

        { match.params.sentEmail === 'passwordRecoverySent' &&
            <AuthAlert
              title="Check your inbox"
              message="We will send you an email with the instructions on how to reset your password."
            />
        }

        <Form
          {...layout}
          className="login-dialog-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <div className="login-dialog-content">
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
          <div className="login-dialog-footer">
            <span className="login-dialog-footer-error">{error}</span>
            <CustomButton
              htmlType="submit"
              text={isLogin ? "Log In" : "Sign up"}
              type="primary"
              size="lg"
            />
            <Link to={ INTERNAL_LINKS.PASSWORD_RECOVERY } className="forgot-password">
              Forgot password?
            </Link>
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
