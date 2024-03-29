import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/create-job.scss";
import "../Styles/editJob.scss";

function JobEditForm(props) {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editErr, setEditErr] = useState("");

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const accessToken = localStorage.getItem("token");

  const { jobId } = useParams();
  console.log(jobId);
  const l = useLocation();
  console.log(l.state);
  const job = l.state.data;
  useEffect(() => {
    setTitle(job.title);
    setExperience(job.experience);
    setLocation(job.location);
    setDescription(job.experience);
  }, []);

  // Getting the parameter from my jobs page

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data, such as send it to a server
    console.log({ title, experience, location, description });
    //Change to edit and not post
    await axios
      .post(SERVER_URL + "/editjob", {
        jobId,
        title,
        experience,
        location,
        description,
        accessToken,
      })
      .then((response) => {
        //If backend returns an error
        if (response.data.isError == "True") {
          setEditErr(response.data.message);
          setEditSuccess("");
          setTimeout(() => {
            window.location.href = "/myJobs";
          }, 3000);
        }

        //If backend returns success
        if (response.data.isError == "False") {
          setEditErr("");
          setEditSuccess(response.data.message);
          setTimeout(() => {
            window.location.href = "/myJobs";
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar></NavBar>

      <div className="createjob-form" data-testid="createjob-form">
        <div className="createjob-container">
          <h2 id="createjob_title">Edit Job</h2>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                required
                type="text"
                value={title}
                id="inputA"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <br />
            <label>
              Experience:
              <input
                required
                type="text"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
              />
            </label>
            <br />
            <label>
              Location:
              <input
                required
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <br />
              <textarea
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <br />

            <button type="submit" id="submit">
              Submit
            </button>
            <div className="editErr">{editErr}</div>
            <div className="editSuccess" id="success">
              {editSuccess}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobEditForm;
