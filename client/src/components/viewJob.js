import React from "react";
import NavBar from "./navBar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Styles/viewJob.scss";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";

function ViewJob(props) {
  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const data = location.state.data;

  const [login, setLogin] = useState(true);

  const [saveSuccess, setSaveSuccess] = useState("");
  const [savedJobId, setSavedJobId] = useState(null);
  const [applySuccess, setApplySuccess] = useState("");
  const [appliedJobId, setAppliedJobId] = useState(null);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const accessToken = localStorage.getItem("token");
  const isTokenAvailable = localStorage.getItem("token") != null;
  if (isTokenAvailable) {
    axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
      setLogin(false);
    });
  }

  // Call to save the job to database
  function saveJob(job_id) {
    clearTimer();
    console.log("save button was clicked");
    axios
      .post(SERVER_URL + "/savejob", { job_id, accessToken })
      .then((response) => {
        setSavedJobId(job_id);
        setSaveSuccess(response.data.message);
        const timer = setTimeout(() => {
          setSaveSuccess("");
          setSavedJobId(null);
        }, 5000);
        timerRef.current = timer;
      });
  }
  // Call to apply to the job
  function applyJob(job_id) {
    clearTimer();
    console.log("apply button was clicked");
    axios
      .post(SERVER_URL + "/applyJob", { job_id, accessToken })
      .then((response) => {
        setAppliedJobId(job_id);
        setApplySuccess(response.data.message);
        const timer = setTimeout(() => {
          setApplySuccess("");
          setAppliedJobId(null);
        }, 3000);
        timerRef.current = timer;
      });
  }
  //Job Application Button
  function addApply(job_id) {
    if (!login) {
      return (
        <td>
          <button onClick={() => applyJob(job_id)} id="viewJob_apply">
            Apply
          </button>
          {appliedJobId === job_id && (
            <div className="success-message popup">{applySuccess}</div>
          )}
        </td>
      );
    }
  }

  // Hold a reference to the timer
  const timerRef = useRef(null);

  // Add the save button if the user is logged in
  function addSave(job_id) {
    if (!login) {
      return (
        <td>
          <button onClick={() => saveJob(job_id)} id="viewJob_save">
            Save Job
          </button>
          {savedJobId === job_id && (
            <div className="success-message popup">{saveSuccess}</div>
          )}
        </td>
      );
    }
  }

  // Reset the timer when the button is pressed
  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="viewJob_container1">
        <h1>{data ? data.title : "Go to Home"}</h1>
        <h2>Experience Requirements: {data ? data.experience : "Oops"}</h2>
        <h3>Location of Job Site: {data ? data.location : "Oops"}</h3>
      </div>
      <div className="extra">
        <h1>Description:</h1>
      </div>

      <div className="viewJob_container2">
        <h3>{data ? data.description : "Oops"}</h3>
        <br></br>
      </div>
      {addSave(data._id)}
      {addApply(data._id)}
      <Link to="/jobs">
        <button id="viewJob_save">Back</button>
      </Link>
    </>
  );
}

export default ViewJob;
