import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/log-in.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus_success, setLoginStatus_success] = useState("");
  const [loginStatus_err, setLoginStatus_err] = useState("");

  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const handleLogin = async () => {
    // Send a request to the server to log the user in
    // If the login is successful, redirect the user to the home page
    // If the login fails, update the error state with the error message
    await axios
      .post(SERVER_URL + "/login", { email, password })
      .then((response) => {
        //If backend returns an error
        if (response.data.isError == "True") {
          setLoginStatus_err(response.data.message);
          setLoginStatus_success("");
        }
        //If backend returns success
        if (response.data.isError == "False") {
          //Store token locally to be accessed across pages
          localStorage.setItem("token", response.data.token);

          //Print success message
          setLoginStatus_err("");
          setLoginStatus_success(response.data.message);

          //Redirect to main page
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        }
      });
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="login-form" data-testid="login-form">
        <div className="login-container">
          <h2 id="login_title">Log In</h2>
          <div>
            <input
              type="text"
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
          </div>
          <button id="login_button" onClick={handleLogin}>
            Login
          </button>
          <Link to="/signup">Need an account?</Link>
          <br></br>
          <Link to="/forgotPassword">Forgot Password?</Link>

          <div className="loginStatus_err">{loginStatus_err}</div>
          <div className="loginStatus_success">{loginStatus_success}</div>
        </div>
      </div>
    </>
  );
}

export default Login;
