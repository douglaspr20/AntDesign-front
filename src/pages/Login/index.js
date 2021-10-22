import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import { EVENT_TYPES } from "enum";
import { CustomButton } from "components";
import Emitter from "services/emitter";

import { getUser } from "redux/actions/home-actions";
import { actions as authActions } from "redux/actions/auth-actions";
import { authSelector } from "redux/selectors/authSelector";
import { addToMyEventList } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { liveSelector } from "redux/selectors/liveSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { INTERNAL_LINKS } from "enum";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthAlert from "containers/AuthAlert";

import IconLogo from "images/logo-sidebar.svg";

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
  userProfile,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showFirewall, setShowFirewall] = useState(false);

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

  const planUpgrade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
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
        if (updatedEvent.ticket === "premium") {
          if (!isEmpty(userProfile) && userProfile.memberShip === "premium") {
            setShowFirewall(false);
            addToMyEventList(updatedEvent);
            if (onClose) {
              onClose();
            }
          } else {
            setShowFirewall(true);
          }
        } else {
          addToMyEventList(updatedEvent);
          if (onClose) {
            onClose();
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, userProfile]);

  useEffect(() => {
    setIsLogin(!signup);

    return () => {};
  }, [signup]);

  const closeFirewall = () => {
    setShowFirewall(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="login-page">
      {showFirewall && (
        <div className="event-card-firewall" onClick={closeFirewall}>
          <div className="upgrade-notification-panel" onClick={planUpgrade}>
            <h3>
              This event requires a PREMIUM Membership to join. Click here to
              upgrate to a Premium Membership and get unlimited access to the
              LAB features.
            </h3>
          </div>
        </div>
      )}
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
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...authActions,
  addToMyEventList,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
