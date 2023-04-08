import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function MyJobList() {
  console.log("asdads")
  const [jobs, setJobs] = useState([])
  const [numApplicants, setNumApplicants] = useState([])
  //let [counter, setCounter] = useState(0)
  let counter = 0
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
                <th>Edit</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>
                    <Link to={`/editJob/${job._id}`}
                      state={{
                        data: job,
                      }}>
                      <button>Edit Job</button>
                    </Link>
                  </td>
                  <td><Link
                      to="/recruiterViewJob"
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
        <Link to="/jobs" className="myButton">
          Back
        </Link>
      </div>
    </div>
  );

}

export default MyJobList;
