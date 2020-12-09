import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const SignOutButton = ({ ...props }) => {
  const { logout } = useAuth0();

  return (
    <Button
      {...props}
      onClick={() => logout({ returnTo: window.location.origin })}
    />
  );
};

export default SignOutButton;
