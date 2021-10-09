import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CustomButton } from "components";

import { actions as authActions } from "redux/actions/auth-actions";
import { authSelector } from "redux/selectors/authSelector";
import { addToMyEventList } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { liveSelector } from "redux/selectors/liveSelector";
import { INTERNAL_LINKS } from "enum";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthAlert from "containers/AuthAlert";

import IconLogo from "images/logo-sidebar.svg";
import IconBack from "images/icon-back.svg";

import "./style.scss";

const Login = ({
  isAuthenticated,
  error,
  login,
  signUp,
  history,
  match,
  signup,
  updatedEvent,
  addToMyEventList,
  onClose,
  live,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(0);
  const [prevAreaValues, setPrevAreaVaues] = useState([]);
  const [signupValues, setSignupValues] = useState({});

  const refForm = React.useRef(null);

  const onFinish = (values) => {
    if (isLogin) {
      const { email, password } = values;
      login(email, password);
    } else {
      const newSignupValues = {
        ...signupValues,
        ...values,
      };
      setSignupValues(newSignupValues);
      if (signupStep !== 3) {
        setSignupStep(signupStep + 1);
      }
      if (signupStep === 3) {
        signUp({ ...newSignupValues });
      }
    }
  };

  const onFinishFailed = () => {};

  const onValuesChange = (values) => {
    if (values && values.recentWorkArea !== undefined) {
      if (
        !prevAreaValues.includes("all") &&
        values.recentWorkArea.includes("all")
      ) {
        if (refForm && refForm.current) {
          refForm.current.setFieldsValue({
            recentWorkArea: ["all"],
          });
          setPrevAreaVaues(["all"]);
        }
      } else if (
        prevAreaValues.includes("all") &&
        values.recentWorkArea.includes("all")
      ) {
        if (refForm && refForm.current) {
          refForm.current.setFieldsValue({
            recentWorkArea: values.recentWorkArea.filter((v) => v !== "all"),
          });
          setPrevAreaVaues(values.recentWorkArea.filter((v) => v !== "all"));
        }
      }
    }
  };

  const onChangeType = () => {
    setIsLogin((prev) => !prev);
  };

  const onBackSignup = () => {
    setSignupStep(Math.max(signupStep - 1, 0));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (history != null) {
        if (live && live.live === true) {
          history.push(INTERNAL_LINKS.LIVE);
        } else {
          history.push(INTERNAL_LINKS.HOME);
        }
      } else {
        addToMyEventList(updatedEvent);
        if (onClose) {
          onClose();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    setIsLogin(!signup);

    return () => {};
  }, [signup]);

  return (
    <div className="login-page">
      <div className="login-dialog">
        <div className="login-dialog-header">
          <h3>{isLogin ? "Log In" : "Sign up"}</h3>
          <div className="login-dialog-logo">
            <img src={IconLogo} alt="login-logo" />
          </div>
        </div>

        {match.params.sentEmail === "passwordRecoverySent" && (
          <AuthAlert
            title="Check your inbox"
            message="We will send you an email with the instructions on how to reset your password."
          />
        )}

        <Form
          ref={refForm}
          layout="vertical"
          className="login-dialog-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <div className="login-dialog-content">
            {!isLogin && signupStep > 0 && (
              <div className="login-dialog-content-back" onClick={onBackSignup}>
                <img src={IconBack} alt="icon-back" />
              </div>
            )}
            {isLogin ? <LoginForm /> : <SignupForm step={signupStep} />}
          </div>
          <div className="login-dialog-footer">
            <span className="login-dialog-footer-error">{error}</span>
            <CustomButton
              htmlType="submit"
              text={isLogin ? "Log In" : signupStep === 3 ? "Sign up" : "Next"}
              type="primary"
              size="lg"
            />
            <div className="login-dialog-footer-bottom">
              <Link
                to={INTERNAL_LINKS.PASSWORD_RECOVERY}
                className="forgot-password"
              >
                Forgot password?
              </Link>
              <div className="login-dialog-footer-category">
                <span className="account-desc">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <span className="signup-select" onClick={onChangeType}>
                  {isLogin ? "Sign up?" : "Log in?"}
                </span>
              </div>
              <div className="term-and-conditions">
                <Link to={INTERNAL_LINKS.TERMSOFUSE}>Terms and Conditions</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func,
};

Login.defaultProps = {
  onClose: () => {},
};

const mapStateToProps = (state) => ({
  isAuthenticated: authSelector(state).isAuthenticated,
  error: authSelector(state).error,
  updatedEvent: eventSelector(state).updatedEvent,
  live: liveSelector(state).live,
});

const mapDispatchToProps = {
  ...authActions,
  addToMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
