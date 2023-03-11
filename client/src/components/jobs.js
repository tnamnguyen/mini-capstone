import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/job.scss";

function JobList() {
  const [login, setLogin] = useState(true)
  const [jobs, setJobs] = useState([]);

 // const SERVER_URL = "//localhost:3001"
  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const accessToken = localStorage.getItem("token")
  const isTokenAvailable = (localStorage.getItem("token") != null)
  if(isTokenAvailable){
    axios.post(SERVER_URL + '/home', {accessToken})
    .then(response => {
      setLogin(false)
    })

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
  function saveJob(job_id){
    console.log('save button was clicked')
    axios.post(SERVER_URL + '/savejob', {job_id, accessToken})
    .then(response => {
      //Display success message
    })
  }

  // Add the save button if the user is logged in
  function addSave(job_id){
    if(!login){
      return(
      <td><button onClick={() => saveJob(job_id)} className = 'jobs_saveJob_button'>Save Job</button></td>
    )
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
                <th>Apply</th>
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
                    <button>Apply</button>
                  </td>
                  {addSave(job._id)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/createJobs" className="myButton">
          Create A new Job
        </Link>
        <Link to="/savedJobs" className="myButton">
          View Saved Jobs
        </Link>
        <Link to="/myJobs" className="myButton">
          View Created Jobs
        </Link>
      </div>
    </div>
  );
}

export default JobList;
