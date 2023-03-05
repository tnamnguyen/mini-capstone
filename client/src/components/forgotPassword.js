import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/log-in.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <>
      <NavBar></NavBar>
      <div className="login-form">
        <div className="login-container">
          <h2 id="login_title">Password Recovery</h2>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button id="login_button">Send Email</button>
          <Link to="/signup">Need an account?</Link>
          <br></br>
          <Link to="/login">
            <button>Go Back</button>
          </Link>

          <div className="loginStatus_err"></div>
          <div className="loginStatus_success"></div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
