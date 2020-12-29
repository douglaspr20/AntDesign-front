import React from "react";

import { CustomButton } from "components";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-dialog">
        <div className="login-dialog-header">
          <h3>Log In</h3>
          <div className="login-dialog-logo">
            <img src={IconLogo} alt="login-logo" />
          </div>
        </div>
        <div className="login-dialog-content"></div>
        <div className="login-dialog-footer">
          <CustomButton text="Log In" type="primary" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
