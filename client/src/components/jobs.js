import React from "react";
import NavBar from "./navBar";
import Job from "./job";
import { Link } from "react-router-dom";
import "../Styles/job.scss";

function Jobs() {
  var rows = [];

  /*var tempTitle;
  var tempEduc;
  var tempExp;
  var tempTools;
  var tempPlace;
  var tempLang;
  var tempDescript;
var tempOwn;*/

  /*for(let i=0; i< 5; i++){
rows.push(Job({title : ,
  education : ,
  experience : ,
  tools : ,
  place : ,
  languages : ,
  description : ,
  ownerID : }))
} */

  rows.push(
    Job({
      title: "JobTest",
      education: "None",
      experience: "None",
      tools: "None",
      place: "Montreal",
      languages: "English, French",
      description: "Biography",
      ownerID: 1,
    })
  );

  rows.push(
    Job({
      title: "JobTest2",
      education: "None",
      experience: "None",
      tools: "None",
      place: "Montreal",
      languages: "English, French",
      description: "Biography",
      ownerID: 2,
    })
  );

  rows.push(
    Job({
      title: "JobTest3",
      education: "Bachelors in Science",
      experience: "None",
      tools: "None",
      place: "Laval",
      languages: "French",
      description: "Biography",
      ownerID: 1,
    })
  );

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <span style={{ fontWeight: "bold" }}>Job Title</span>
        <span>Education</span>
        <span>Experience</span>
        <span>Location</span>
        <button id="jobs_preferences">Preferences</button>
        {rows}
      </div>
      {/* <Link to = "#"><button id = "jobs_change_preferences">Change Preferences</button></Link>
  <Link to = "#"><button id = "jobs_saved_jobs">Saved Jobs</button></Link>*/}
      <div className="container2">
        <Link to="/yourJobs">
          <button id="jobs_your_jobs">Your Jobs</button>
        </Link>
        <Link to="/createJob">
          <button id="jobs_create_job">Create Job</button>
        </Link>
      </div>
    </>
  );
}

export default Jobs;
