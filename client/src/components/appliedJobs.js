import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sign-up.scss";

function AppliedJobList() {
  const [render, setRender] = useState(false)
  const [login, setLogin] = useState(true)
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [removedJobId, setRemovedJobId] = useState(null);
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
      .post(SERVER_URL + "/appliedjobs", {accessToken})
      .then((response) => {
        setJobs(response.data.jobs);
        setApplications(response.data.applications)
        setRender(true);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [buttonClicked]);    // Refresh the table when the buttonClicked state changes

  // Call to remove saved job
  async function removeJob(job_id){
    clearTimer();
    console.log('remove button was clicked')

    //Creating a notification
    createNotification(job_id, "Job Application Withdrawal")

    await axios.post(SERVER_URL + '/removejobApplication', {job_id, accessToken})
    .then(response => {
      setRemoveSuccess(response.data.message)
      setRemovedJobId(job_id);
      //await new Promise(resolve => setTimeout(resolve, 5000));
      const timer = setTimeout(() => {
        setRemoveSuccess("");
        setRemovedJobId(null);
        setRender(true);
      }, 3000);
     
     
      timerRef.current = timer;
      
    })
    if(jobs.length === 1){
      setJobs([])
    }
    else{
      setButtonClicked(!buttonClicked)
    }
  };


  // Call to create a new notification
  function createNotification(job_id, typeOfNotification) {
    console.log("Notification creation is called!");
    axios
      .post(SERVER_URL + "/createNotification", { object_id: job_id , accessToken, type: typeOfNotification })
      .then((response) => {
        const timer = setTimeout(() => {
        }, 3000);
        timerRef.current = timer;
      });
  }

    // Add remove button if user is logged in
    function removeButton(job_id){
      if(!login){
        return(
          <>
            <button onClick={() => removeJob(job_id)} className = 'jobs_removeJob_button'>Withdraw my application!</button>
            {removedJobId === job_id && (
              <div className="success-message popup">{removeSuccess}</div>
            )}
          </>
        )
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
  
  //Only Render page when all variables are loaded to avoid errors!
  if(render)
  {
  return (
    <div data-testid="jobs-1">
      <NavBar></NavBar>

      <div>
        <h1 id="job_title">My Job applications</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Description</th>
                <th>Application Status</th>
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
                  <td>{applications.find(({job_id}) => job_id === job._id).status}</td>
                  <td>{removeButton(job._id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/jobs" className="myButton">
          See All Jobs
        </Link>
      </div>
    </div>
  );}
}

export default AppliedJobList;
