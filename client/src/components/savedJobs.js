import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function SavedJobList() {
  const [login, setLogin] = useState(true)
  const [jobs, setJobs] = useState([]);
  const [removeSuccess, setRemoveSuccess] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const accessToken = localStorage.getItem("token")
  const isTokenAvailable = (localStorage.getItem("token") != null)
  if(isTokenAvailable) {
    axios.post(SERVER_URL + '/home', {accessToken})
    .then(response => {
      setLogin(false)
    })
  }


  useEffect(() => {
    // Fetch all jobs from the backend API when the component mounts
    axios
      .post(SERVER_URL + "/savedjobs", {accessToken})
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [buttonClicked]);

  // Call to remove saved job
  function removeJob(job_id){
    console.log('remove button was clicked')
    axios.post(SERVER_URL + '/removejob', {job_id, accessToken})
    .then(response => {
      setRemoveSuccess(response.data.message)
      console.log(removeSuccess);
    })
    setButtonClicked(!buttonClicked)
  };

    // Add remove button if user is logged in
    function removeButton(job_id){
      if(!login){
        return(
          <button onClick={() => removeJob(job_id)} className = 'jobs_removeJob_button'>Remove from Saved</button>
        )
      }
    }

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
                    {removeButton(job._id)}
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
