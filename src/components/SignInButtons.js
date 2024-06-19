import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./SignInButtons.css";

const SignInButtons = () => {
  return (
    <div className="sign-in-buttons">
      <div className="or">OR</div>
      <div className="button-wrapper">
        <button className="login-button google">
          <FcGoogle className="icon" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignInButtons;
