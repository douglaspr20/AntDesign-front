import React from "react";

import { SignInButton } from "components";

import IconLogo from "images/logo-sidebar.svg";

import "./style.scss";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-dialog">
          <div className="login-dialog-header">
            <h3>Log In</h3>
            <div className="login-dialog-logo">
              <img src={IconLogo} alt="login-logo" />
            </div>
          </div>
          <div className="login-dialog-footer">
            <SignInButton text="Log In" type="primary" size="lg" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
