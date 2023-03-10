import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [signUpStatus_success, setSignUpStatus_success] = useState("");
  const [signUpStatus_err, setSignUpStatus_err] = useState("");

  //const SERVER_URL = "http://localhost:3001"
  const SERVER_URL = "https://jobilee-server.vercel.app";

  const handleSignup = async () => {
    // Send a request to the server to sign the user up
    // If the signup is successful, redirect the user to the login page
    // If the signup fails, update the error state with the error message

    // Code Example:

    await axios
      .post(SERVER_URL + "/signup", {
        username,
        email,
        password,
        passwordConfirm,
      })
      .then((response) => {
        //If backend returns an error
        if (response.data.isError == "True") {
          setSignUpStatus_err(response.data.message);
          setSignUpStatus_success("");
        }

        //If backend returns success
        if (response.data.isError == "False") {
          setSignUpStatus_err("");
          setSignUpStatus_success(response.data.message);

          setTimeout(() => {
            window.location.href = "/login";
          }, 4000);
        }
      })
      .catch((error) => {
        setError(error.data.message);
      });
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="signup-form" data-testid="signUp">
        {error && <div className="error">{error}</div>}
        <div className="signup-container">
          <h2 id="signup_title">Sign Up</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button id="signup_button" onClick={handleSignup}>
            Sign Up
          </button>
          <Link to="/login">Already have an account?</Link>

          <div className="signUpStatus_err">{signUpStatus_err}</div>
          <div className="signUpStatus_success">{signUpStatus_success}</div>
        </div>
      </div>
    </>
  );
}

export default Signup;
