import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/job.scss";

function JobList() {
  const [login, setLogin] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [savedJobId, setSavedJobId] = useState(null);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const accessToken = localStorage.getItem("token");
  const isTokenAvailable = localStorage.getItem("token") != null;
  if (isTokenAvailable) {
    axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
      setLogin(false);
    });
  }

  useEffect(() => {
    // Fetch all jobs from the backend API when the component mounts
    axios
      .get(SERVER_URL + "/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

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

  // Add the save button if the user is logged in
  function addSave(job_id) {
    if (!login) {
      return (
        <td>
          <button
            onClick={() => saveJob(job_id)}
            className="jobs_saveJob_button"
          >
            Save Job
          </button>
          {savedJobId === job_id && (
            <div className="success-message popup">{saveSuccess}</div>
          )}
        </td>
      );
    }
  }

  // Hold a reference to the timer
  const timerRef = useRef(null);

  // Reset the timer when the button is pressed
  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  //========== Add specific Buttons if signed in ==========//
  function applyRow() {
    if (!login) {
      return <th>Apply</th>;
    }
  }

  function applyButton() {
    if (!login) {
      return (
        <td>
          <button>Apply</button>
        </td>
      );
    }
  }

  function addCreateJobButton() {
    if (!login) {
      return (
        <Link to="/createJobs" className="myButton">
          Create A new Job
        </Link>
      );
    }
  }

  function addSavedJobButton() {
    if (!login) {
      return (
        <Link to="/savedJobs" className="myButton">
          View Saved Jobs
        </Link>
      );
    }
  }

  function addCreatedJobButton() {
    if (!login) {
      return (
        <Link to="/myJobs" className="myButton">
          View Created Jobs
        </Link>
      );
    }
  }

  return (
    <div data-testid="jobs-1">
      <NavBar></NavBar>

      <div>
        <h1 id="job_title">All Jobs</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Description</th>
                {applyRow()}
                <th>Save</th>
                <th>View Job</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.experience}</td>
                  <td>{job.location}</td>
                  <td>{job.description}</td>
                  {applyButton()}
                  {addSave(job._id)}

                  <td>
                    <Link
                      to="/viewJob"
                      state={{
                        data: job,
                      }}
                    >
                      <button>View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {addCreateJobButton()}
        {addSavedJobButton()}
        {addCreatedJobButton()}
      </div>
    </div>
  );
}

export default JobList;
