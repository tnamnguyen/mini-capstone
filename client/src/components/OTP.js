import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import { useContext } from "react";
import '../Styles/otp.scss';


function OTP() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState()
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([1, 0, 0, 0]);
  const [disable, setDisable] = useState(true);


  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      alert(
        "The entered the correct code, pls wait while you are redirected to the reset page"
      );
      setTimeout(()=>{
        window.location.href = "/login"
    }, 1000)
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }


  return (
    <><NavBar></NavBar>
    <div className="container1" data-testid="otpcontainerTest">
      <div className="container2">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="header">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
              <p>Enter you Code Below {otp}</p>
            </div>
          </div>


          <body>
    <form>
      <input  type="text" maxlength="4" pattern="[0-9]{4}"  onChange={(e) => setOTPinput(e.target.value)} required />
      <br />
      <button type="submit" onClick={() => verfiyOTP()} >Verify</button>
    </form>
  </body>
          
        </div>
      </div>
    </div>
    
    </>
  );
}

export default OTP;
