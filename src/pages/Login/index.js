import React from "react";

import { SignInButton } from "components";

import "./style.scss";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <SignInButton text="Log In" type="primary" size="lg" />
      </div>
    );
  }
}

export default Login;
