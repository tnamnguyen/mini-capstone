import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function MyJobList() {
  const [jobs, setJobs] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const accessToken = localStorage.getItem("token")

  useEffect(() => {
    // Fetch all jobs from the backend API when the component mounts
    axios
      .post(SERVER_URL + "/myjobs", {accessToken})
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [buttonClicked]);


  function deleteJob(job_id){
    console.log(`delete button was clicked`);
    axios.post(SERVER_URL + '/deletejob', {job_id})
    .then(response => {
      setDeleteSuccess(response.data.message)
      console.log(deleteSuccess);
    })
    if(jobs.length === 1){
      setJobs([])
    }
    else{
      setButtonClicked(!buttonClicked)
    }
  };

  return (
    <div data-testid="jobs-1">
      <NavBar></NavBar>

      <div>
        <h1 id="job_title">Created Jobs</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Description</th>
                <th>Edit Button</th>
                <th>View</th>
                <th>Delete</th>
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
                    <Link to={`/editJob/${job._id}`}>
                      <button>Edit Job</button>
                    </Link>
                  </td>
                  <td><Link
                      to="/viewJob"
                      state={{
                        data: job,
                      }}
                    >
                      <button>View Details</button>
                    </Link></td>
                  <td><button onClick={() => deleteJob(job._id)} className = 'deleteJob_button'>Delete</button></td>
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
        <Link to="/jobs" className="myButton">
          Back
        </Link>
      </div>
    </div>
  );
}

export default MyJobList;
