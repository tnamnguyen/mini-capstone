import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import { useContext } from "react";
import "../Styles/log-in.scss";


function ForgotPassword() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState()
  //const SERVER_URL = "//localhost:3001"
  const SERVER_URL = "https://jobilee-server.vercel.app";

  function navigateToOtp() {
    //if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post(SERVER_URL + "/send_recovery_email", {
          OTP,
          recipient_email: email,
          
        })
        .then((response) => {
          alert(
            "A link to reset your password has been sent to your email . If you have not received the email, please wait and try again. Once you receive the email, you can close this window."
          );
          setTimeout(()=>{
            window.location.href = "/forgotPassword"
        }, 3000)
        //  setPage("OTP")
        })
        .catch(console.log);
      return;
    //}
   // return alert("Please enter your email");
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="login-form">
        <div className="login-container">
          <h2 id="login_title">Password Recovery</h2>
          <h3 >Confirm you email below</h3>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button id="login_button" onClick={() => navigateToOtp()} >Send Email</button>
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
