import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const SigninButton = ({ ...props }) => {
  const { loginWithRedirect } = useAuth0();

  return <Button {...props} onClick={() => loginWithRedirect()} />;
};

export default SigninButton;
