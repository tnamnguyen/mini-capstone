import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function SavedJobList() {
  const [jobs, setJobs] = useState([]);

  const SERVER_URL = "https://jobilee-server.vercel.app";

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

  return (
    <div data-testid="jobs-1">
      <NavBar></NavBar>

      <div>
        <h1 id="job_title">Saved Jobs</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Description</th>
                <th>Remove Button</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.experience}</td>
                  <td>{job.location}</td>
                  <td>{job.description}</td>
                  <td>
                    <button>Remove From Saved</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/createJobs" className="myButton">
          Create A new Job
        </Link>
        <Link to="/jobs" className="myButton">
          Back
        </Link>
      </div>
    </div>
  );
}

export default SavedJobList;
