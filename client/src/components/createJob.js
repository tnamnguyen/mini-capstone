import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/create_job.scss";

function CreateJob() {
  const [title, setTitle] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [tools, setTools] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const SERVER_URL = "//localhost:3001";

  return (
    <>
      <NavBar></NavBar>
      <div className="createjob-form">
        {error && <div className="error">{error}</div>}
        <div className="createjob-container">
          <h2 id="createjob_title">Create Job</h2>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tools"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Langauge"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Link to=".jobs">
            <button id="createJob_button">Back</button>
          </Link>
          <button id="createJob_button" /*onClick={handleJobCreation}*/>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateJob;
