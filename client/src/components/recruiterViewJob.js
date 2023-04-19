import React from "react";
import NavBar from "./navBar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Styles/viewJob.scss";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";

function RecruiterViewJob(props) {
  const location = useLocation();
  const data = location.state.data;
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState("");

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const accessToken = localStorage.getItem("token");

 
  useEffect(() => {
    console.log(data)

    // Fetch all jobs from the backend API when the component mounts
    axios
      .post(SERVER_URL + "/getApplicants", {job_id: data._id})
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

  }, []);

  

  function acceptDeny(job_id, user_id, acceptdeny, typeOfNotification)
  {
    //Update status of the job
    axios.post(SERVER_URL + "/acceptDenyApplication", {job_id, user_id, acceptdeny})
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

    //Send a notification
    axios.post(SERVER_URL + "/createNotification", { object_id: job_id , accessToken, type: typeOfNotification, user_id })
      .then((response) => {
  
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

    //updating the message 
    if (typeOfNotification == "Job Offer Accepted"){
      setMessage("Job Offer have been successfully accepted! Deleting Job...")
    }
    else{
      setMessage("Job Offer have been successfully rejected! Deleting Job...")
    }
    

    //Redirect to Jobs page and deleting the job
    setTimeout(()=>{
      axios.post(SERVER_URL + "/deleteJob", {job_id})
      window.location.href = "/myJobs"
    }, 3000)

  }

  function displayApplicationsButton()
  {
    if(data.accepting_applications == true)
    {
      return (<><h5>You are currently accepting new applications for this job!</h5><button id="viewJob_save" onClick={()=>{stopAccepting()}}>Stop Accepting Applications!</button></>)
    }
    else
    {
      return (<><h5>You are currently not accepting any new applications for this job!</h5><button id="viewJob_save" onClick={()=>{startAccepting()}}>Start Accepting Applications!</button></>)

    }
  }

  function stopAccepting()
  {
    axios.post(SERVER_URL + "/stopAcceptingApplications", {job_id: data._id})
  }

  function startAccepting()
  {
    axios.post(SERVER_URL + "/startAcceptingApplications", {job_id: data._id})
  }



  return (
    <>
      <NavBar></NavBar>
      <div className="viewJob_container1" data-testid="containerTest">
        <h1>{data ? data.title : "Go to Home"}</h1>
        <h2>Experience Requirements: {data ? data.experience : "Oops"}</h2>
        <h3>Location of Job Site: {data ? data.location : "Oops"}</h3>
      </div>
      <div className="extra">
        <h1>Description:</h1>
      </div>

      <div className="viewJob_container2" data-testid="containerTwoTest">
        <h3>{data ? data.description : "Oops"}</h3>
        <br></br>
      </div>


      <div>
        <h1 id="job_title">List of Applicants</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Visit Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>TO BE IMPLEMENTED</td>
                  <td>
                    <button onClick={() => acceptDeny(data._id, app._id, "accepted", "Job Offer Accepted")}>
                      Accept Application
                    </button>
                    <br></br>
                    <button onClick={() => acceptDeny(data._id, app._id, "rejected", "Job Offer Rejected")}>
                      Reject Application
                    </button>
                  </td>
         
                </tr>
              ))}
             
            </tbody>
          </table>
          <div className="loginStatus_success">{message}</div>
        </div>
      </div>


      <Link to="/myJobs">
        <button id="viewJob_save">Back</button>
      </Link>
      <br></br>

      {displayApplicationsButton()}
      
    
    </>
  );
}

export default RecruiterViewJob;
